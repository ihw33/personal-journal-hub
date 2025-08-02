-- =======================================================================
-- IdeaWorkLab v3.3 AI Chatbot System Database Schema
-- "사고와 재능의 설계자 (The Architect of Thought and Talent)"
-- 
-- AI 파트너 '아키(Archi)'와의 학습 세션 및 대화 관리 시스템
-- =======================================================================

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- =======================================================================
-- 1. LEARNING SESSIONS TABLE
-- 사용자별, 강의별 학습 세션을 관리하는 테이블
-- =======================================================================

create table public.learning_sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete set null,
  
  -- 세션 기본 정보
  title text not null,
  mode text check (mode in ('guided', 'self-directed')) not null default 'guided',
  status text check (status in ('active', 'completed', 'paused', 'abandoned')) not null default 'active',
  
  -- 세션 진행 상황
  total_messages integer default 0,
  insights_count integer default 0,
  breakthroughs_count integer default 0,
  current_progress integer default 0 check (current_progress >= 0 and current_progress <= 100),
  
  -- 학습 관련 정보
  topics text[] default '{}',
  key_discoveries text[] default '{}',
  
  -- 감정적 여정 추적
  emotional_journey_start text check (emotional_journey_start in ('confused', 'curious', 'excited', 'frustrated')),
  emotional_journey_end text check (emotional_journey_end in ('enlightened', 'satisfied', 'motivated', 'thoughtful')),
  
  -- 성장 지표 (0-100)
  cognitive_growth integer default 0 check (cognitive_growth >= 0 and cognitive_growth <= 100),
  creativity_boost integer default 0 check (creativity_boost >= 0 and creativity_boost <= 100),
  problem_solving_improvement integer default 0 check (problem_solving_improvement >= 0 and problem_solving_improvement <= 100),
  
  -- 아키 성격 평가 (1-5)
  archi_helpfulness integer default 5 check (archi_helpfulness >= 1 and archi_helpfulness <= 5),
  archi_creativity integer default 5 check (archi_creativity >= 1 and archi_creativity <= 5),
  archi_patience integer default 5 check (archi_patience >= 1 and archi_patience <= 5),
  
  -- 세션 메타데이터
  summary text,
  next_recommendations text[] default '{}',
  duration_minutes integer default 0,
  
  -- 강의 컨텍스트
  course_context jsonb default '{}',
  
  -- 타임스탬프
  started_at timestamp with time zone default now(),
  completed_at timestamp with time zone,
  last_activity_at timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 인덱스 생성
create index idx_learning_sessions_user_id on public.learning_sessions(user_id);
create index idx_learning_sessions_course_id on public.learning_sessions(course_id);
create index idx_learning_sessions_status on public.learning_sessions(status);
create index idx_learning_sessions_mode on public.learning_sessions(mode);
create index idx_learning_sessions_created_at on public.learning_sessions(created_at desc);
create index idx_learning_sessions_last_activity on public.learning_sessions(last_activity_at desc);

-- =======================================================================
-- 2. CHAT MESSAGES TABLE
-- 각 세션에 속한 모든 대화 메시지를 저장하는 테이블
-- =======================================================================

create table public.chat_messages (
  id uuid default uuid_generate_v4() primary key,
  session_id uuid references public.learning_sessions(id) on delete cascade not null,
  
  -- 메시지 기본 정보
  sender text check (sender in ('user', 'archi')) not null,
  content text not null,
  message_order integer not null, -- 세션 내 메시지 순서
  
  -- 메시지 메타데이터
  metadata jsonb default '{}', -- thinking, insight, exercise, feedback, resources 등
  
  -- AI 상태 정보
  archi_brain_state text check (archi_brain_state in ('thinking', 'ready', 'insights')),
  processing_time_ms integer, -- AI 응답 생성 시간
  
  -- 인사이트 및 피드백 플래그
  is_insight boolean default false,
  is_exercise boolean default false,
  is_feedback boolean default false,
  
  -- 리소스 및 참조
  generated_resources jsonb default '[]',
  referenced_topics text[] default '{}',
  
  -- 사용자 반응
  user_rating integer check (user_rating >= 1 and user_rating <= 5),
  user_found_helpful boolean,
  
  -- 타임스탬프
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- 인덱스 생성
create index idx_chat_messages_session_id on public.chat_messages(session_id);
create index idx_chat_messages_sender on public.chat_messages(sender);
create index idx_chat_messages_order on public.chat_messages(session_id, message_order);
create index idx_chat_messages_created_at on public.chat_messages(created_at desc);
create index idx_chat_messages_insights on public.chat_messages(is_insight) where is_insight = true;

-- =======================================================================
-- 3. AI CONVERSATION ANALYTICS TABLE
-- AI 대화 분석 및 학습 개선을 위한 테이블
-- =======================================================================

create table public.ai_conversation_analytics (
  id uuid default uuid_generate_v4() primary key,
  session_id uuid references public.learning_sessions(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  
  -- 대화 품질 지표
  total_messages integer not null,
  average_response_time_ms integer,
  user_satisfaction_score numeric(3,2) check (user_satisfaction_score >= 0 and user_satisfaction_score <= 5),
  
  -- AI 성능 지표
  insights_generated integer default 0,
  exercises_provided integer default 0,
  feedback_given integer default 0,
  
  -- 학습 효과성
  learning_objectives_met text[] default '{}',
  knowledge_gaps_identified text[] default '{}',
  recommended_next_steps text[] default '{}',
  
  -- 대화 패턴 분석
  conversation_flow jsonb default '{}',
  topic_transitions jsonb default '{}',
  engagement_metrics jsonb default '{}',
  
  -- 타임스탬프
  analyzed_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- 인덱스 생성
create index idx_ai_analytics_session_id on public.ai_conversation_analytics(session_id);
create index idx_ai_analytics_user_id on public.ai_conversation_analytics(user_id);
create index idx_ai_analytics_created_at on public.ai_conversation_analytics(created_at desc);

-- =======================================================================
-- 4. RLS (Row Level Security) POLICIES
-- 데이터 보안 및 접근 제어
-- =======================================================================

-- Learning Sessions RLS
alter table public.learning_sessions enable row level security;

create policy "Users can view their own sessions" on public.learning_sessions
  for select using (auth.uid() = user_id);

create policy "Users can create their own sessions" on public.learning_sessions
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own sessions" on public.learning_sessions
  for update using (auth.uid() = user_id);

create policy "Users can delete their own sessions" on public.learning_sessions
  for delete using (auth.uid() = user_id);

-- Chat Messages RLS
alter table public.chat_messages enable row level security;

create policy "Users can view messages from their sessions" on public.chat_messages
  for select using (
    exists (
      select 1 from public.learning_sessions 
      where id = chat_messages.session_id 
      and user_id = auth.uid()
    )
  );

create policy "Users can create messages in their sessions" on public.chat_messages
  for insert with check (
    exists (
      select 1 from public.learning_sessions 
      where id = chat_messages.session_id 
      and user_id = auth.uid()
    )
  );

create policy "Users can update messages in their sessions" on public.chat_messages
  for update using (
    exists (
      select 1 from public.learning_sessions 
      where id = chat_messages.session_id 
      and user_id = auth.uid()
    )
  );

-- AI Analytics RLS
alter table public.ai_conversation_analytics enable row level security;

create policy "Users can view their own analytics" on public.ai_conversation_analytics
  for select using (auth.uid() = user_id);

create policy "System can create analytics" on public.ai_conversation_analytics
  for insert with check (auth.uid() = user_id);

-- =======================================================================
-- 5. TRIGGERS AND FUNCTIONS
-- 자동화된 데이터 관리 및 통계 업데이트
-- =======================================================================

-- 세션 업데이트 시 last_activity_at 자동 갱신
create or replace function update_session_activity()
returns trigger as $$
begin
  new.updated_at = now();
  new.last_activity_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trigger_update_session_activity
  before update on public.learning_sessions
  for each row execute function update_session_activity();

-- 메시지 생성 시 세션 통계 자동 업데이트
create or replace function update_session_stats()
returns trigger as $$
begin
  if TG_OP = 'INSERT' then
    update public.learning_sessions 
    set 
      total_messages = total_messages + 1,
      insights_count = case when new.is_insight then insights_count + 1 else insights_count end,
      last_activity_at = now(),
      updated_at = now()
    where id = new.session_id;
    
    return new;
  elsif TG_OP = 'DELETE' then
    update public.learning_sessions 
    set 
      total_messages = greatest(0, total_messages - 1),
      insights_count = case when old.is_insight then greatest(0, insights_count - 1) else insights_count end,
      updated_at = now()
    where id = old.session_id;
    
    return old;
  end if;
  
  return null;
end;
$$ language plpgsql;

create trigger trigger_update_session_stats
  after insert or delete on public.chat_messages
  for each row execute function update_session_stats();

-- 메시지 순서 자동 할당
create or replace function auto_assign_message_order()
returns trigger as $$
begin
  if new.message_order is null then
    select coalesce(max(message_order), 0) + 1 
    into new.message_order 
    from public.chat_messages 
    where session_id = new.session_id;
  end if;
  
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger trigger_auto_assign_message_order
  before insert on public.chat_messages
  for each row execute function auto_assign_message_order();

-- =======================================================================
-- 6. UTILITY FUNCTIONS
-- 데이터 조회 및 분석을 위한 헬퍼 함수들
-- =======================================================================

-- 사용자의 AI 학습 통계 조회
create or replace function get_user_ai_learning_stats(user_uuid uuid)
returns jsonb as $$
declare
  result jsonb;
begin
  select jsonb_build_object(
    'total_sessions', count(*),
    'completed_sessions', count(*) filter (where status = 'completed'),
    'total_messages', sum(total_messages),
    'total_insights', sum(insights_count),
    'total_hours', round(sum(duration_minutes)::numeric / 60, 1),
    'average_session_rating', round(avg((archi_helpfulness + archi_creativity + archi_patience)::numeric / 3), 1),
    'favorite_mode', mode(mode),
    'learning_streak_days', calculate_learning_streak(user_uuid),
    'this_week_sessions', count(*) filter (where created_at >= date_trunc('week', now())),
    'cognitive_growth_avg', round(avg(cognitive_growth), 0),
    'creativity_boost_avg', round(avg(creativity_boost), 0),
    'problem_solving_avg', round(avg(problem_solving_improvement), 0)
  )
  into result
  from public.learning_sessions
  where user_id = user_uuid;
  
  return result;
end;
$$ language plpgsql security definer;

-- 학습 연속일 계산
create or replace function calculate_learning_streak(user_uuid uuid)
returns integer as $$
declare
  streak_days integer := 0;
  check_date date := current_date;
  has_activity boolean;
begin
  loop
    select exists(
      select 1 from public.learning_sessions 
      where user_id = user_uuid 
      and date(created_at) = check_date
    ) into has_activity;
    
    if has_activity then
      streak_days := streak_days + 1;
      check_date := check_date - interval '1 day';
    else
      exit;
    end if;
    
    -- 최대 365일까지만 체크
    if streak_days >= 365 then
      exit;
    end if;
  end loop;
  
  return streak_days;
end;
$$ language plpgsql security definer;

-- =======================================================================
-- 7. INITIAL DATA AND SAMPLE RECORDS
-- 테스트 및 개발용 초기 데이터
-- =======================================================================

-- 샘플 학습 세션 (개발용)
-- 실제 프로덕션에서는 제거해야 함
insert into public.learning_sessions (
  id,
  user_id,
  title,
  mode,
  status,
  total_messages,
  insights_count,
  breakthroughs_count,
  current_progress,
  topics,
  key_discoveries,
  emotional_journey_start,
  emotional_journey_end,
  cognitive_growth,
  creativity_boost,
  problem_solving_improvement,
  summary,
  duration_minutes
) values (
  'sample-session-001'::uuid,
  auth.uid(), -- 현재 사용자 (개발 시에만)
  '창의적 아이디어 발상 수련',
  'guided',
  'completed',
  23,
  4,
  1,
  100,
  array['창의적 사고', '아이디어 발상', '제약 조건 활용'],
  array['제약 조건이 오히려 창의성을 촉진한다', 'SCAMPER 기법을 일상에 적용할 수 있다'],
  'confused',
  'enlightened',
  85,
  92,
  78,
  '제약 조건을 활용한 창의적 발상법을 깊이 있게 탐구했습니다.',
  45
) on conflict do nothing;

-- COMMIT CHANGES
commit;