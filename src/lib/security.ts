/**
 * Security utilities for IdeaWorkLab v4.0
 * Provides simple encryption/decryption for client-side data
 */

// Simple encryption using Base64 with salt for basic obfuscation
// Note: This is not cryptographically secure but provides basic protection
// against casual inspection of sessionStorage data

const SALT = 'IWL-v4.0-2024';

/**
 * Encrypts data to a base64 encoded string with salt
 * @param data - Any JSON-serializable data
 * @returns Encrypted string
 */
export function encryptData(data: any): string {
  try {
    const jsonString = JSON.stringify(data);
    // Add salt and reverse the string for basic obfuscation
    const saltedString = `${SALT}:${jsonString}:${Date.now()}`;
    const reversed = saltedString.split('').reverse().join('');
    // Encode to base64
    const encoded = btoa(unescape(encodeURIComponent(reversed)));
    return encoded;
  } catch (error) {
    console.error('Encryption failed:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypts a base64 encoded string back to original data
 * @param encryptedData - Encrypted string from encryptData
 * @returns Original data
 */
export function decryptData(encryptedData: string): any {
  try {
    // Decode from base64
    const decoded = decodeURIComponent(escape(atob(encryptedData)));
    // Reverse back
    const reversed = decoded.split('').reverse().join('');
    // Extract data between salt markers
    const parts = reversed.split(':');
    
    if (parts.length < 3 || parts[0] !== SALT) {
      throw new Error('Invalid encrypted data format');
    }
    
    // Remove salt and timestamp, join remaining parts
    const jsonString = parts.slice(1, -1).join(':');
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Decryption failed:', error);
    throw new Error('Failed to decrypt data');
  }
}

/**
 * Safely stores encrypted data in sessionStorage
 * @param key - Storage key
 * @param data - Data to store
 */
export const secureSessionStorage = {
  setItem: (key: string, data: any): void => {
    try {
      const encrypted = encryptData(data);
      sessionStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('Failed to store encrypted data:', error);
      throw error;
    }
  },

  getItem: (key: string): any => {
    try {
      const encrypted = sessionStorage.getItem(key);
      if (!encrypted) return null;
      return decryptData(encrypted);
    } catch (error) {
      console.error('Failed to retrieve encrypted data:', error);
      // Clear corrupted data
      sessionStorage.removeItem(key);
      return null;
    }
  },

  removeItem: (key: string): void => {
    sessionStorage.removeItem(key);
  }
};