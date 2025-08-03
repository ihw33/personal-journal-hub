/**
 * 리다이렉트 URL 보안 유틸리티
 * 안전하지 않은 외부 URL로의 리디렉션을 방지합니다.
 */

// 허용된 리다이렉트 URL 경로 목록 (보안을 위한 화이트리스트)
export const ALLOWED_REDIRECT_PATHS = [
  '/dashboard',
  '/courses',
  '/payment',
  '/payment-confirmation',
  '/diagnosis',
  '/journal',
  '/settings',
  '/auth',
  '/course-session',
  '/'
] as const;

/**
 * 리다이렉트 URL의 유효성을 검사합니다.
 * @param url 검사할 URL 문자열
 * @returns 안전한 URL인지 여부
 */
export const validateRedirectUrl = (url: string): boolean => {
  try {
    // 빈 문자열 체크
    if (!url || typeof url !== 'string') {
      return false;
    }

    // 상대 URL만 허용 (프로토콜이 없어야 함)
    if (url.includes('://') || url.startsWith('//')) {
      return false;
    }
    
    // URL이 '/'로 시작하지 않으면 허용하지 않음
    if (!url.startsWith('/')) {
      return false;
    }
    
    // 위험한 문자 패턴 체크
    const dangerousPatterns = [
      '../',      // 디렉토리 트래버설
      '..\\',     // Windows 경로 트래버설
      'javascript:', // JavaScript 스키마
      'data:',    // Data URL 스키마
      'vbscript:', // VBScript 스키마
      'file:',    // 파일 시스템 접근
      'ftp:',     // FTP 프로토콜
    ];
    
    const urlLower = url.toLowerCase();
    if (dangerousPatterns.some(pattern => urlLower.includes(pattern))) {
      return false;
    }
    
    // 허용된 경로로 시작하는지 확인
    return ALLOWED_REDIRECT_PATHS.some(allowedPath => {
      if (allowedPath === '/') {
        return url === '/';
      }
      return url.startsWith(allowedPath);
    });
  } catch (error) {
    console.warn('Invalid redirect URL format:', url, error);
    return false;
  }
};

/**
 * 안전한 리다이렉트 URL을 생성합니다.
 * 위험한 URL인 경우 기본 대시보드 경로로 대체합니다.
 * @param url 원본 URL
 * @param fallbackUrl 기본 대체 URL (기본값: '/dashboard')
 * @returns 안전한 URL
 */
export const createSafeRedirectUrl = (
  url: string, 
  fallbackUrl: string = '/dashboard'
): string => {
  if (validateRedirectUrl(url)) {
    return url;
  }
  
  // 안전하지 않은 URL인 경우 기본 경로로 설정
  console.warn('Unsafe redirect URL detected, using fallback:', url, '→', fallbackUrl);
  return fallbackUrl;
};

/**
 * URL 파라미터에서 안전한 리다이렉트 URL을 추출합니다.
 * @param searchParams URLSearchParams 객체
 * @param paramName 리다이렉트 URL 파라미터 이름 (기본값: 'redirect')
 * @param fallbackUrl 기본 대체 URL (기본값: '/dashboard')
 * @returns 안전한 리다이렉트 URL
 */
export const getSafeRedirectFromParams = (
  searchParams: URLSearchParams | string,
  paramName: string = 'redirect',
  fallbackUrl: string = '/dashboard'
): string => {
  try {
    let params: URLSearchParams;
    
    if (typeof searchParams === 'string') {
      params = new URLSearchParams(searchParams);
    } else {
      params = searchParams;
    }
    
    const redirectUrl = params.get(paramName);
    
    if (!redirectUrl) {
      return fallbackUrl;
    }
    
    const decodedUrl = decodeURIComponent(redirectUrl);
    return createSafeRedirectUrl(decodedUrl, fallbackUrl);
  } catch (error) {
    console.warn('Error parsing redirect parameters:', error);
    return fallbackUrl;
  }
};

/**
 * 현재 URL을 안전한 리다이렉트 URL로 변환합니다.
 * @param includeSearch 쿼리 파라미터 포함 여부 (기본값: true)
 * @param fallbackUrl 기본 대체 URL (기본값: '/dashboard')
 * @returns 안전한 현재 URL
 */
export const getCurrentSafeUrl = (
  includeSearch: boolean = true,
  fallbackUrl: string = '/dashboard'
): string => {
  try {
    if (typeof window === 'undefined') {
      return fallbackUrl; // 서버 사이드에서는 기본값 반환
    }
    
    const currentUrl = includeSearch 
      ? window.location.pathname + window.location.search
      : window.location.pathname;
      
    return createSafeRedirectUrl(currentUrl, fallbackUrl);
  } catch (error) {
    console.warn('Error getting current URL:', error);
    return fallbackUrl;
  }
};