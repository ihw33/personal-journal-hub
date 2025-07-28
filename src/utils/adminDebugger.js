// 관리자 상태 완전 초기화 디버그 스크립트
// 브라우저 콘솔에서 실행: clearAdminState()

window.clearAdminState = function() {
  console.log('🧹 Starting complete admin state cleanup...');
  
  // 1. localStorage 완전 정리
  console.log('Clearing localStorage...');
  Object.keys(localStorage).forEach(key => {
    if (key.includes('admin') || key.includes('session')) {
      console.log(`Removing localStorage key: ${key}`);
      localStorage.removeItem(key);
    }
  });
  
  // 2. sessionStorage 완전 정리
  console.log('Clearing sessionStorage...');
  Object.keys(sessionStorage).forEach(key => {
    if (key.includes('admin') || key.includes('session')) {
      console.log(`Removing sessionStorage key: ${key}`);
      sessionStorage.removeItem(key);
    }
  });
  
  // 3. 쿠키 정리 (도메인 관련)
  console.log('Clearing cookies...');
  document.cookie.split(";").forEach(function(c) { 
    document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
  });
  
  // 4. 브라우저 캐시 무효화
  console.log('Invalidating browser cache...');
  if ('caches' in window) {
    caches.keys().then(names => {
      names.forEach(name => {
        caches.delete(name);
      });
    });
  }
  
  // 5. 페이지 새로고침으로 상태 완전 초기화
  console.log('🔄 Reloading page to ensure clean state...');
  setTimeout(() => {
    window.location.href = '/admin?t=' + Date.now();
  }, 500);
};

console.log('🔧 Admin debugger loaded. Run clearAdminState() to force cleanup.');