// WebSocket connection manager for real-time features

import { reportWebSocketError, reportError } from '@/lib/error-handling/global-error-handler';

export interface WebSocketMessage {
  id: string;
  type: string;
  payload: any;
  timestamp: number;
  userId?: string;
  sessionId?: string;
}

export interface WebSocketConnectionConfig {
  url: string;
  protocols?: string[];
  reconnectAttempts?: number;
  reconnectInterval?: number;
  heartbeatInterval?: number;
  timeout?: number;
}

export type WebSocketEventHandler = (message: WebSocketMessage) => void;
export type WebSocketStatusHandler = (status: 'connecting' | 'connected' | 'disconnected' | 'error') => void;

export class WebSocketManager {
  private static instance: WebSocketManager;
  private connections: Map<string, WebSocket> = new Map();
  private eventHandlers: Map<string, Map<string, WebSocketEventHandler[]>> = new Map();
  private statusHandlers: Map<string, WebSocketStatusHandler[]> = new Map();
  private reconnectAttempts: Map<string, number> = new Map();
  private heartbeatIntervals: Map<string, NodeJS.Timeout> = new Map();
  private config: Map<string, WebSocketConnectionConfig> = new Map();

  static getInstance(): WebSocketManager {
    if (!WebSocketManager.instance) {
      WebSocketManager.instance = new WebSocketManager();
    }
    return WebSocketManager.instance;
  }

  // Connect to WebSocket
  async connect(
    connectionId: string, 
    config: WebSocketConnectionConfig
  ): Promise<boolean> {
    try {
      // Store config
      this.config.set(connectionId, {
        reconnectAttempts: 3,
        reconnectInterval: 5000,
        heartbeatInterval: 30000,
        timeout: 10000,
        ...config
      });

      // Close existing connection if any
      await this.disconnect(connectionId);

      const wsConfig = this.config.get(connectionId)!;
      
      // Emit connecting status
      this.emitStatus(connectionId, 'connecting');

      // Create WebSocket connection
      const ws = new WebSocket(wsConfig.url, wsConfig.protocols);
      
      // Setup event handlers
      ws.onopen = () => this.handleOpen(connectionId);
      ws.onmessage = (event) => this.handleMessage(connectionId, event);
      ws.onerror = (error) => this.handleError(connectionId, error);
      ws.onclose = (event) => this.handleClose(connectionId, event);

      // Store connection
      this.connections.set(connectionId, ws);
      
      // Wait for connection to be established
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('WebSocket connection timeout'));
        }, wsConfig.timeout);

        const originalOnOpen = ws.onopen;
        const originalOnError = ws.onerror;

        ws.onopen = (event) => {
          clearTimeout(timeout);
          if (originalOnOpen) originalOnOpen.call(ws, event);
          resolve(true);
        };

        ws.onerror = (error) => {
          clearTimeout(timeout);
          if (originalOnError) originalOnError.call(ws, error);
          reject(error);
        };
      });

    } catch (error) {
      reportError({
        type: 'websocket',
        level: 'error',
        message: `Failed to connect to WebSocket: ${connectionId}`,
        context: { connectionId, error }
      });
      return false;
    }
  }

  // Disconnect from WebSocket
  async disconnect(connectionId: string): Promise<void> {
    const ws = this.connections.get(connectionId);
    if (ws) {
      // Clear heartbeat
      const heartbeat = this.heartbeatIntervals.get(connectionId);
      if (heartbeat) {
        clearInterval(heartbeat);
        this.heartbeatIntervals.delete(connectionId);
      }

      // Close connection
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close(1000, 'Normal closure');
      }

      this.connections.delete(connectionId);
      this.reconnectAttempts.delete(connectionId);
      this.emitStatus(connectionId, 'disconnected');
    }
  }

  // Send message through WebSocket
  send(connectionId: string, type: string, payload: any): boolean {
    const ws = this.connections.get(connectionId);
    
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      reportError({
        type: 'websocket',
        level: 'warning',
        message: `Cannot send message: WebSocket ${connectionId} not connected`,
        context: { connectionId, type, readyState: ws?.readyState }
      });
      return false;
    }

    try {
      const message: WebSocketMessage = {
        id: this.generateMessageId(),
        type,
        payload,
        timestamp: Date.now(),
        userId: this.getCurrentUserId(),
        sessionId: this.getSessionId()
      };

      ws.send(JSON.stringify(message));
      return true;
    } catch (error) {
      reportError({
        type: 'websocket',
        level: 'error',
        message: `Failed to send WebSocket message: ${connectionId}`,
        context: { connectionId, type, error }
      });
      return false;
    }
  }

  // Subscribe to message type
  subscribe(
    connectionId: string, 
    messageType: string, 
    handler: WebSocketEventHandler
  ): () => void {
    if (!this.eventHandlers.has(connectionId)) {
      this.eventHandlers.set(connectionId, new Map());
    }

    const connectionHandlers = this.eventHandlers.get(connectionId)!;
    
    if (!connectionHandlers.has(messageType)) {
      connectionHandlers.set(messageType, []);
    }

    connectionHandlers.get(messageType)!.push(handler);

    // Return unsubscribe function
    return () => {
      const handlers = connectionHandlers.get(messageType);
      if (handlers) {
        const index = handlers.indexOf(handler);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      }
    };
  }

  // Subscribe to connection status changes
  onStatusChange(connectionId: string, handler: WebSocketStatusHandler): () => void {
    if (!this.statusHandlers.has(connectionId)) {
      this.statusHandlers.set(connectionId, []);
    }

    this.statusHandlers.get(connectionId)!.push(handler);

    // Return unsubscribe function
    return () => {
      const handlers = this.statusHandlers.get(connectionId);
      if (handlers) {
        const index = handlers.indexOf(handler);
        if (index > -1) {
          handlers.splice(index, 1);
        }
      }
    };
  }

  // Get connection status
  getStatus(connectionId: string): 'connecting' | 'connected' | 'disconnected' | 'error' {
    const ws = this.connections.get(connectionId);
    
    if (!ws) return 'disconnected';
    
    switch (ws.readyState) {
      case WebSocket.CONNECTING: return 'connecting';
      case WebSocket.OPEN: return 'connected';
      case WebSocket.CLOSING:
      case WebSocket.CLOSED: return 'disconnected';
      default: return 'error';
    }
  }

  // Private handlers
  private handleOpen(connectionId: string): void {
    console.log(`WebSocket ${connectionId} connected`);
    
    this.emitStatus(connectionId, 'connected');
    this.resetReconnectAttempts(connectionId);
    this.startHeartbeat(connectionId);
  }

  private handleMessage(connectionId: string, event: MessageEvent): void {
    try {
      const message: WebSocketMessage = JSON.parse(event.data);
      
      // Handle heartbeat response
      if (message.type === 'pong') {
        return;
      }

      // Emit to subscribers
      this.emitMessage(connectionId, message);
    } catch (error) {
      reportError({
        type: 'websocket',
        level: 'warning',
        message: `Invalid WebSocket message format: ${connectionId}`,
        context: { connectionId, data: event.data, error }
      });
    }
  }

  private handleError(connectionId: string, error: Event): void {
    console.error(`WebSocket ${connectionId} error:`, error);
    
    const config = this.config.get(connectionId);
    if (config) {
      reportWebSocketError(error, config.url);
    }
    
    this.emitStatus(connectionId, 'error');
  }

  private handleClose(connectionId: string, event: CloseEvent): void {
    console.log(`WebSocket ${connectionId} closed:`, event.code, event.reason);
    
    this.emitStatus(connectionId, 'disconnected');
    this.stopHeartbeat(connectionId);

    // Attempt reconnection if not a normal closure
    if (event.code !== 1000 && event.code !== 1001) {
      this.attemptReconnection(connectionId);
    }
  }

  private async attemptReconnection(connectionId: string): Promise<void> {
    const config = this.config.get(connectionId);
    if (!config) return;

    const attempts = this.reconnectAttempts.get(connectionId) || 0;
    
    if (attempts < config.reconnectAttempts!) {
      this.reconnectAttempts.set(connectionId, attempts + 1);
      
      console.log(`Attempting to reconnect ${connectionId} (${attempts + 1}/${config.reconnectAttempts})`);
      
      setTimeout(async () => {
        try {
          await this.connect(connectionId, config);
        } catch (error) {
          console.error(`Reconnection attempt ${attempts + 1} failed for ${connectionId}:`, error);
        }
      }, config.reconnectInterval);
    } else {
      reportError({
        type: 'websocket',
        level: 'error',
        message: `Max reconnection attempts reached for ${connectionId}`,
        context: { connectionId, attempts: config.reconnectAttempts }
      });
    }
  }

  private emitMessage(connectionId: string, message: WebSocketMessage): void {
    const connectionHandlers = this.eventHandlers.get(connectionId);
    if (!connectionHandlers) return;

    const handlers = connectionHandlers.get(message.type) || [];
    handlers.forEach(handler => {
      try {
        handler(message);
      } catch (error) {
        reportError({
          type: 'websocket',
          level: 'error',
          message: `WebSocket message handler error: ${connectionId}`,
          context: { connectionId, messageType: message.type, error }
        });
      }
    });
  }

  private emitStatus(connectionId: string, status: 'connecting' | 'connected' | 'disconnected' | 'error'): void {
    const handlers = this.statusHandlers.get(connectionId) || [];
    handlers.forEach(handler => {
      try {
        handler(status);
      } catch (error) {
        reportError({
          type: 'websocket',
          level: 'error',
          message: `WebSocket status handler error: ${connectionId}`,
          context: { connectionId, status, error }
        });
      }
    });
  }

  private startHeartbeat(connectionId: string): void {
    const config = this.config.get(connectionId);
    if (!config || !config.heartbeatInterval) return;

    this.stopHeartbeat(connectionId);

    const interval = setInterval(() => {
      if (!this.send(connectionId, 'ping', { timestamp: Date.now() })) {
        this.stopHeartbeat(connectionId);
      }
    }, config.heartbeatInterval);

    this.heartbeatIntervals.set(connectionId, interval);
  }

  private stopHeartbeat(connectionId: string): void {
    const interval = this.heartbeatIntervals.get(connectionId);
    if (interval) {
      clearInterval(interval);
      this.heartbeatIntervals.delete(connectionId);
    }
  }

  private resetReconnectAttempts(connectionId: string): void {
    this.reconnectAttempts.delete(connectionId);
  }

  private generateMessageId(): string {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getCurrentUserId(): string | undefined {
    try {
      const testUser = localStorage.getItem('test_user');
      if (testUser) {
        return JSON.parse(testUser).id;
      }
      return undefined;
    } catch {
      return undefined;
    }
  }

  private getSessionId(): string | undefined {
    try {
      return sessionStorage.getItem('iwl_session_id') || undefined;
    } catch {
      return undefined;
    }
  }

  // Cleanup all connections
  cleanup(): void {
    for (const connectionId of this.connections.keys()) {
      this.disconnect(connectionId);
    }
    
    this.eventHandlers.clear();
    this.statusHandlers.clear();
    this.config.clear();
  }
}

// Export singleton instance
export const webSocketManager = WebSocketManager.getInstance();

// Convenience functions
export const connectWebSocket = (connectionId: string, config: WebSocketConnectionConfig) =>
  webSocketManager.connect(connectionId, config);

export const disconnectWebSocket = (connectionId: string) =>
  webSocketManager.disconnect(connectionId);

export const sendWebSocketMessage = (connectionId: string, type: string, payload: any) =>
  webSocketManager.send(connectionId, type, payload);

export const subscribeToWebSocket = (connectionId: string, messageType: string, handler: WebSocketEventHandler) =>
  webSocketManager.subscribe(connectionId, messageType, handler);

export const onWebSocketStatusChange = (connectionId: string, handler: WebSocketStatusHandler) =>
  webSocketManager.onStatusChange(connectionId, handler);