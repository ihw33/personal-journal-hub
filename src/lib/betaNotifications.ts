// v116: 베타 런치 알림 시스템
"use client";

interface NotificationTemplate {
  id: string;
  name: string;
  type: 'email' | 'sms' | 'kakao';
  subject?: string;
  title: string;
  content: string;
  variables: string[];
}

interface NotificationHistory {
  id: string;
  templateId: string;
  recipient: {
    email?: string;
    phone?: string;
    name: string;
  };
  type: 'email' | 'sms' | 'kakao';
  status: 'pending' | 'sent' | 'failed' | 'delivered' | 'read';
  sentAt?: string;
  deliveredAt?: string;
  readAt?: string;
  error?: string;
  metadata?: Record<string, any>;
}

export class BetaNotificationService {
  private static instance: BetaNotificationService;
  private readonly TEMPLATES_KEY = 'beta-notification-templates';
  private readonly HISTORY_KEY = 'beta-notification-history';

  static getInstance(): BetaNotificationService {
    if (!BetaNotificationService.instance) {
      BetaNotificationService.instance = new BetaNotificationService();
    }
    return BetaNotificationService.instance;
  }

  // 기본 알림 템플릿들
  private getDefaultTemplates(): NotificationTemplate[] {
    return [
      {
        id: 'beta-approval-email',
        name: '베타 승인 이메일',
        type: 'email',
        subject: '🎉 ideaworklab 베타 테스트 승인 안내',
        title: '베타 테스터로 선정되셨습니다!',
        content: `안녕하세요 {{name}}님,

축하합니다! ideaworklab 베타 테스트에 선정되셨습니다.

🚀 **베타 테스터 혜택**
• 프리미엄 기능 6개월 무료 이용
• 베타 테스터 전용 커뮤니티 참여
• 개발팀과 직접 소통 기회
• 베타 테스터 인증 배지

🔗 **지금 바로 시작하기**
링크: {{loginUrl}}
초대 코드: {{inviteCode}}

문의사항이 있으시면 언제든 연락주세요.

감사합니다.
ideaworklab 팀`,
        variables: ['name', 'loginUrl', 'inviteCode']
      },
      {
        id: 'beta-waitlist-confirmation',
        name: '베타 대기열 확인 이메일',
        type: 'email',
        subject: '🔔 ideaworklab 베타 테스트 신청 완료',
        title: '베타 테스트 신청이 완료되었습니다',
        content: `안녕하세요 {{name}}님,

ideaworklab 베타 테스트 신청이 완료되었습니다.

📊 **현재 상태**
• 대기 순번: {{position}}번째
• 신청일: {{appliedDate}}
• 예상 승인일: {{estimatedApproval}}

💡 **베타 테스트가 출시되면**
• 이메일로 즉시 알려드립니다
• 프리미엄 기능을 무료로 체험하실 수 있습니다
• 개발 과정에 직접 참여하실 수 있습니다

조금만 기다려주세요!

ideaworklab 팀`,
        variables: ['name', 'position', 'appliedDate', 'estimatedApproval']
      },
      {
        id: 'beta-launch-announcement',
        name: '베타 런치 공지 이메일',
        type: 'email',
        subject: '🚀 ideaworklab 공개 베타 런치!',
        title: 'AI와 함께하는 새로운 학습이 시작됩니다',
        content: `안녕하세요!

드디어 ideaworklab 공개 베타가 런치되었습니다!

🎯 **새로운 학습 경험**
• AI와 대화하며 제주도 여행 기획
• 단계별 가이드와 자기주도 학습 모드
• 실시간 피드백과 진도 관리

🎁 **베타 테스터 특별 혜택**
• 선착순 100명 한정
• 프리미엄 6개월 무료
• 베타 커뮤니티 참여

🔗 **지금 바로 참여하기**
{{betaSignupUrl}}

기회를 놓치지 마세요!

ideaworklab 팀`,
        variables: ['betaSignupUrl']
      },
      {
        id: 'beta-approval-kakao',
        name: '베타 승인 카카오톡',
        type: 'kakao',
        title: '[ideaworklab] 베타 테스터 선정 🎉',
        content: `{{name}}님, 축하합니다!

ideaworklab 베타 테스터로 선정되셨습니다.

🎁 특별혜택
✓ 프리미엄 6개월 무료
✓ 베타 커뮤니티 참여
✓ 개발팀 직접 소통

▶ 지금 시작하기
{{loginUrl}}

초대코드: {{inviteCode}}`,
        variables: ['name', 'loginUrl', 'inviteCode']
      },
      {
        id: 'beta-reminder-sms',
        name: '베타 참여 독려 SMS',
        type: 'sms',
        title: '',
        content: `[ideaworklab] {{name}}님, 베타 테스트가 기다리고 있어요! AI와 함께하는 새로운 학습을 경험해보세요. 지금 참여: {{shortUrl}}`,
        variables: ['name', 'shortUrl']
      }
    ];
  }

  // 템플릿 초기화
  initializeTemplates(): void {
    const existingTemplates = this.getTemplates();
    if (existingTemplates.length === 0) {
      const defaultTemplates = this.getDefaultTemplates();
      this.saveTemplates(defaultTemplates);
    }
  }

  // 알림 전송
  async sendNotification(
    templateId: string,
    recipient: { email?: string; phone?: string; name: string },
    variables: Record<string, string> = {}
  ): Promise<{ success: boolean; notificationId?: string; error?: string }> {
    try {
      const template = this.getTemplate(templateId);
      if (!template) {
        return { success: false, error: '템플릿을 찾을 수 없습니다.' };
      }

      // 변수 치환
      const processedContent = this.processTemplate(template.content, variables);
      const processedTitle = this.processTemplate(template.title, variables);
      const processedSubject = template.subject ? this.processTemplate(template.subject, variables) : undefined;

      // 알림 히스토리 생성
      const notification: NotificationHistory = {
        id: this.generateId(),
        templateId,
        recipient,
        type: template.type,
        status: 'pending',
        metadata: {
          processedContent,
          processedTitle,
          processedSubject,
          variables
        }
      };

      // 전송 시뮬레이션
      const sendResult = await this.simulateSend(notification, processedContent, processedTitle, processedSubject);
      
      // 결과에 따라 상태 업데이트
      notification.status = sendResult.success ? 'sent' : 'failed';
      notification.sentAt = sendResult.success ? new Date().toISOString() : undefined;
      notification.error = sendResult.error;

      // 히스토리에 저장
      this.addToHistory(notification);

      return {
        success: sendResult.success,
        notificationId: notification.id,
        error: sendResult.error
      };

    } catch (error) {
      console.error('Failed to send notification:', error);
      return { success: false, error: '알림 전송 중 오류가 발생했습니다.' };
    }
  }

  // 벌크 알림 전송
  async sendBulkNotifications(
    templateId: string,
    recipients: Array<{ email?: string; phone?: string; name: string; variables?: Record<string, string> }>,
    globalVariables: Record<string, string> = {}
  ): Promise<{ 
    totalSent: number; 
    totalFailed: number; 
    results: Array<{ recipient: string; success: boolean; error?: string }> 
  }> {
    const results: Array<{ recipient: string; success: boolean; error?: string }> = [];
    let totalSent = 0;
    let totalFailed = 0;

    for (const recipient of recipients) {
      const variables = { ...globalVariables, ...recipient.variables };
      const result = await this.sendNotification(templateId, recipient, variables);
      
      const recipientIdentifier = recipient.email || recipient.phone || recipient.name;
      results.push({
        recipient: recipientIdentifier,
        success: result.success,
        error: result.error
      });

      if (result.success) {
        totalSent++;
      } else {
        totalFailed++;
      }

      // 전송 간격 (실제 서비스에서는 rate limiting 적용)
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return { totalSent, totalFailed, results };
  }

  // 템플릿 변수 치환
  private processTemplate(template: string, variables: Record<string, string>): string {
    let processed = template;
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      processed = processed.replace(regex, value);
    });
    return processed;
  }

  // 전송 시뮬레이션
  private async simulateSend(
    notification: NotificationHistory,
    content: string,
    title: string,
    subject?: string
  ): Promise<{ success: boolean; error?: string }> {
    // 실제 구현에서는 이메일/SMS/카카오 API 호출
    console.log(`📨 Sending ${notification.type} notification:`, {
      to: notification.recipient.email || notification.recipient.phone,
      subject,
      title,
      content: content.substring(0, 100) + '...'
    });

    // 95% 성공률로 시뮬레이션
    const success = Math.random() > 0.05;
    
    if (!success) {
      return { success: false, error: 'Network timeout' };
    }

    // 전송 지연 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));

    return { success: true };
  }

  // 알림 상태 업데이트 (실제 서비스에서는 webhook으로 처리)
  async updateNotificationStatus(
    notificationId: string, 
    status: 'delivered' | 'read',
    timestamp?: string
  ): Promise<void> {
    const history = this.getHistory();
    const notification = history.find(n => n.id === notificationId);
    
    if (notification) {
      if (status === 'delivered') {
        notification.status = 'delivered';
        notification.deliveredAt = timestamp || new Date().toISOString();
      } else if (status === 'read') {
        notification.status = 'read';
        notification.readAt = timestamp || new Date().toISOString();
      }
      
      this.saveHistory(history);
    }
  }

  // 알림 통계
  getNotificationStats(days: number = 7): {
    totalSent: number;
    totalDelivered: number;
    totalRead: number;
    totalFailed: number;
    deliveryRate: number;
    readRate: number;
    byType: Record<string, number>;
  } {
    const history = this.getHistory();
    const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000);
    
    const recentNotifications = history.filter(n => 
      n.sentAt && new Date(n.sentAt) >= cutoffDate
    );

    const totalSent = recentNotifications.filter(n => n.status !== 'failed').length;
    const totalDelivered = recentNotifications.filter(n => ['delivered', 'read'].includes(n.status)).length;
    const totalRead = recentNotifications.filter(n => n.status === 'read').length;
    const totalFailed = recentNotifications.filter(n => n.status === 'failed').length;

    const deliveryRate = totalSent > 0 ? (totalDelivered / totalSent) * 100 : 0;
    const readRate = totalDelivered > 0 ? (totalRead / totalDelivered) * 100 : 0;

    const byType = recentNotifications.reduce((acc, n) => {
      acc[n.type] = (acc[n.type] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      totalSent,
      totalDelivered,
      totalRead,
      totalFailed,
      deliveryRate,
      readRate,
      byType
    };
  }

  // 유틸리티 메서드들
  getTemplates(): NotificationTemplate[] {
    try {
      return JSON.parse(localStorage.getItem(this.TEMPLATES_KEY) || '[]');
    } catch {
      return [];
    }
  }

  getTemplate(templateId: string): NotificationTemplate | undefined {
    return this.getTemplates().find(t => t.id === templateId);
  }

  saveTemplates(templates: NotificationTemplate[]): void {
    localStorage.setItem(this.TEMPLATES_KEY, JSON.stringify(templates));
  }

  getHistory(): NotificationHistory[] {
    try {
      return JSON.parse(localStorage.getItem(this.HISTORY_KEY) || '[]');
    } catch {
      return [];
    }
  }

  private saveHistory(history: NotificationHistory[]): void {
    // 최대 1000개 히스토리만 유지
    if (history.length > 1000) {
      history.splice(0, history.length - 1000);
    }
    localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
  }

  private addToHistory(notification: NotificationHistory): void {
    const history = this.getHistory();
    history.push(notification);
    this.saveHistory(history);
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}

export type { NotificationTemplate, NotificationHistory };