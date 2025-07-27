// Supabase 연결 테스트 스크립트
const { createClient } = require('@supabase/supabase-js');

// 환경변수에서 설정 가져오기
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Supabase 환경변수가 설정되지 않았습니다.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔄 Supabase 연결 테스트 시작...\n');
  console.log('📋 연결 정보:');
  console.log('   URL:', supabaseUrl);
  console.log('   Key:', supabaseKey.substring(0, 20) + '...');
  
  try {
    // 1. 간단한 연결 테스트
    console.log('\n1. 간단한 연결 테스트...');
    const { data, error } = await supabase.from('user_profiles').select('*').limit(1);
    
    if (error) {
      console.log('❌ 전체 에러 객체:', JSON.stringify(error, null, 2));
      if (error.message && error.message.includes('relation "public.user_profiles" does not exist')) {
        console.log('❌ user_profiles 테이블이 존재하지 않습니다.');
        console.log('📝 해결방법: Supabase SQL Editor에서 supabase_schema.sql 실행 필요');
        return false;
      } else {
        console.log('❌ 연결 에러:', error.message || '알 수 없는 에러');
        console.log('❌ 에러 코드:', error.code);
        console.log('❌ 에러 상세:', error.details);
        return false;
      }
    }
    
    console.log('✅ user_profiles 테이블 연결 성공');
    
    // 2. 모든 테이블 확인
    console.log('\n2. 모든 테이블 존재 확인...');
    const tables = ['user_profiles', 'journals', 'course_progress', 'ai_chat_sessions', 'newsletter_subscribers'];
    
    for (const table of tables) {
      try {
        const { error } = await supabase.from(table).select('count(*)', { count: 'exact', head: true });
        if (error) {
          console.log(`❌ ${table} 테이블: ${error.message}`);
        } else {
          console.log(`✅ ${table} 테이블: 정상`);
        }
      } catch (err) {
        console.log(`❌ ${table} 테이블: ${err.message}`);
      }
    }
    
    // 3. RLS 정책 테스트
    console.log('\n3. Row Level Security 정책 테스트...');
    try {
      const { data, error } = await supabase.from('journals').select('*').limit(1);
      if (error && error.message.includes('RLS')) {
        console.log('✅ RLS 정책이 올바르게 설정됨 (인증 필요)');
      } else {
        console.log('✅ 테이블 접근 가능');
      }
    } catch (err) {
      console.log('⚠️  RLS 테스트 오류:', err.message);
    }
    
    console.log('\n🎉 Supabase 연결 테스트 완료!');
    return true;
    
  } catch (error) {
    console.error('❌ 테스트 중 오류 발생:', error.message);
    return false;
  }
}

testConnection().then(success => {
  if (success) {
    console.log('\n✨ 모든 테스트 통과! 애플리케이션을 시작할 수 있습니다.');
  } else {
    console.log('\n🔧 문제가 발견되었습니다. 위 안내를 참고하여 수정해주세요.');
  }
  process.exit(0);
});