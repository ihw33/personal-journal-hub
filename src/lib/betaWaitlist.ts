// v116: 베타 대기열 관리 시스템
"use client";

interface BetaWaitlistEntry {
  id: string;
  name: string;
  email: string;
  inviteCode?: string;
  registeredAt: string;
  status: 'pending' | 'approved' | 'rejected';
  approvedAt?: string;
  rejectedAt?: string;
  position?: number;
  metadata?: {
    source: string;
    userAgent: string;
    referrer?: string;
  };
}

interface BetaInviteCode {
  code: string;
  maxUses: number;
  currentUses: number;
  createdBy: string;
  createdAt: string;
  expiresAt?: string;
  isActive: boolean;
  description?: string;
}

export class BetaWaitlistService {
  private static instance: BetaWaitlistService;
  private readonly MAX_BETA_USERS = 100;
  private readonly STORAGE_KEY = 'beta-waitlist';
  private readonly INVITE_CODES_KEY = 'beta-invite-codes';

  static getInstance(): BetaWaitlistService {
    if (!BetaWaitlistService.instance) {
      BetaWaitlistService.instance = new BetaWaitlistService();
    }
    return BetaWaitlistService.instance;
  }

  // 베타 대기열에 추가
  async addToWaitlist(entry: Omit<BetaWaitlistEntry, 'id' | 'status' | 'position'>): Promise<{ success: boolean; position?: number; error?: string }> {
    try {
      const waitlist = this.getWaitlist();
      
      // 이미 등록된 이메일인지 확인
      const existingEntry = waitlist.find(item => item.email === entry.email);
      if (existingEntry) {
        return { success: false, error: '이미 등록된 이메일입니다.' };
      }

      // 초대 코드 검증
      if (entry.inviteCode) {
        const codeValid = await this.validateInviteCode(entry.inviteCode);
        if (!codeValid) {
          return { success: false, error: '유효하지 않은 초대 코드입니다.' };
        }
      }

      // 새 엔트리 생성
      const newEntry: BetaWaitlistEntry = {
        ...entry,
        id: this.generateId(),
        status: 'pending',
        position: waitlist.length + 1
      };

      // 대기열에 추가
      waitlist.push(newEntry);
      this.saveWaitlist(waitlist);

      // 초대 코드 사용 처리
      if (entry.inviteCode) {
        await this.useInviteCode(entry.inviteCode);
      }

      return { success: true, position: newEntry.position };
    } catch (error) {
      console.error('Error adding to waitlist:', error);
      return { success: false, error: '등록 중 오류가 발생했습니다.' };
    }
  }

  // 베타 사용자 승인
  async approveUser(email: string): Promise<{ success: boolean; error?: string }> {
    try {
      const waitlist = this.getWaitlist();
      const entry = waitlist.find(item => item.email === email);
      
      if (!entry) {
        return { success: false, error: '사용자를 찾을 수 없습니다.' };
      }

      if (entry.status === 'approved') {
        return { success: false, error: '이미 승인된 사용자입니다.' };
      }

      // 현재 승인된 사용자 수 확인
      const approvedCount = waitlist.filter(item => item.status === 'approved').length;
      if (approvedCount >= this.MAX_BETA_USERS) {
        return { success: false, error: '베타 사용자 한도를 초과했습니다.' };
      }

      // 사용자 승인
      entry.status = 'approved';
      entry.approvedAt = new Date().toISOString();

      this.saveWaitlist(waitlist);
      
      // 승인 알림 이메일 발송 (시뮬레이션)
      await this.sendApprovalEmail(entry);

      return { success: true };
    } catch (error) {
      console.error('Error approving user:', error);
      return { success: false, error: '승인 중 오류가 발생했습니다.' };
    }
  }

  // 베타 사용자 거부
  async rejectUser(email: string, reason?: string): Promise<{ success: boolean; error?: string }> {
    try {
      const waitlist = this.getWaitlist();
      const entry = waitlist.find(item => item.email === email);
      
      if (!entry) {
        return { success: false, error: '사용자를 찾을 수 없습니다.' };
      }

      entry.status = 'rejected';
      entry.rejectedAt = new Date().toISOString();
      entry.metadata = { ...entry.metadata, rejectionReason: reason };

      this.saveWaitlist(waitlist);

      return { success: true };
    } catch (error) {
      console.error('Error rejecting user:', error);
      return { success: false, error: '거부 중 오류가 발생했습니다.' };
    }
  }

  // 초대 코드 생성
  generateInviteCode(description: string, maxUses: number = 10, expiresInDays?: number): string {
    const codes = this.getInviteCodes();
    const code = 'BETA' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    const newCode: BetaInviteCode = {
      code,
      maxUses,
      currentUses: 0,
      createdBy: 'admin',
      createdAt: new Date().toISOString(),
      expiresAt: expiresInDays ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000).toISOString() : undefined,
      isActive: true,
      description
    };

    codes.push(newCode);
    this.saveInviteCodes(codes);

    return code;
  }

  // 초대 코드 검증
  async validateInviteCode(code: string): Promise<boolean> {
    const codes = this.getInviteCodes();
    const inviteCode = codes.find(c => c.code === code);

    if (!inviteCode || !inviteCode.isActive) {
      return false;
    }

    if (inviteCode.currentUses >= inviteCode.maxUses) {
      return false;
    }

    if (inviteCode.expiresAt && new Date() > new Date(inviteCode.expiresAt)) {
      return false;
    }

    return true;
  }

  // 초대 코드 사용
  private async useInviteCode(code: string): Promise<void> {
    const codes = this.getInviteCodes();
    const inviteCode = codes.find(c => c.code === code);

    if (inviteCode) {
      inviteCode.currentUses++;
      if (inviteCode.currentUses >= inviteCode.maxUses) {
        inviteCode.isActive = false;
      }
      this.saveInviteCodes(codes);
    }
  }

  // 대기열 통계
  getWaitlistStats(): {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
    availableSpots: number;
  } {
    const waitlist = this.getWaitlist();
    
    return {
      total: waitlist.length,
      pending: waitlist.filter(item => item.status === 'pending').length,
      approved: waitlist.filter(item => item.status === 'approved').length,
      rejected: waitlist.filter(item => item.status === 'rejected').length,
      availableSpots: Math.max(0, this.MAX_BETA_USERS - waitlist.filter(item => item.status === 'approved').length)
    };
  }

  // 사용자의 대기열 위치 확인
  getUserPosition(email: string): { position: number; status: string } | null {
    const waitlist = this.getWaitlist();
    const entry = waitlist.find(item => item.email === email);
    
    if (!entry) return null;

    if (entry.status === 'approved') {
      return { position: 0, status: 'approved' };
    }

    if (entry.status === 'rejected') {
      return { position: -1, status: 'rejected' };
    }

    // 대기 위치 계산 (등록 순서 기준)
    const pendingUsers = waitlist
      .filter(item => item.status === 'pending')
      .sort((a, b) => new Date(a.registeredAt).getTime() - new Date(b.registeredAt).getTime());
    
    const position = pendingUsers.findIndex(item => item.email === email) + 1;
    
    return { position, status: 'pending' };
  }

  // 전체 대기열 조회 (관리자용)
  getAllWaitlistEntries(): BetaWaitlistEntry[] {
    return this.getWaitlist().sort((a, b) => 
      new Date(a.registeredAt).getTime() - new Date(b.registeredAt).getTime()
    );
  }

  // 승인 이메일 발송 (시뮬레이션)
  private async sendApprovalEmail(entry: BetaWaitlistEntry): Promise<void> {
    // 실제 구현에서는 이메일 서비스 (SendGrid, AWS SES 등) 사용
    console.log(`📧 Sending approval email to ${entry.email}`);
    
    // 알림 로그 저장
    const notifications = JSON.parse(localStorage.getItem('beta-notifications') || '[]');
    notifications.push({
      type: 'approval',
      email: entry.email,
      sentAt: new Date().toISOString(),
      status: 'sent'
    });
    localStorage.setItem('beta-notifications', JSON.stringify(notifications));
  }

  // 유틸리티 메서드들
  private getWaitlist(): BetaWaitlistEntry[] {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || '[]');
    } catch {
      return [];
    }
  }

  private saveWaitlist(waitlist: BetaWaitlistEntry[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(waitlist));
  }

  private getInviteCodes(): BetaInviteCode[] {
    try {
      return JSON.parse(localStorage.getItem(this.INVITE_CODES_KEY) || '[]');
    } catch {
      return [];
    }
  }

  private saveInviteCodes(codes: BetaInviteCode[]): void {
    localStorage.setItem(this.INVITE_CODES_KEY, JSON.stringify(codes));
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }
}

// 기본 초대 코드 생성 (개발/테스트용)
export const createDefaultInviteCodes = () => {
  const service = BetaWaitlistService.getInstance();
  const codes = service.getInviteCodes();
  
  if (codes.length === 0) {
    // 기본 초대 코드들 생성
    service.generateInviteCode('VIP 얼리 액세스', 50, 30);
    service.generateInviteCode('개발팀 내부 테스트', 20);
    service.generateInviteCode('파트너사 전용', 30, 60);
    service.generateInviteCode('인플루언서 전용', 15, 45);
  }
};

export type { BetaWaitlistEntry, BetaInviteCode };