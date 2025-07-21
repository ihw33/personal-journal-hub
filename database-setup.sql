-- 개인 저널 허브 데이터베이스 스키마

-- 사용자 테이블 (확장된 auth.users)
create table public.users (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  name text,
  avatar_url text,
  bio text,
  website text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 저널 테이블
create table public.journals (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  title text not null,
  content text not null,
  excerpt text, -- 저널 요약/미리보기
  category text,
  tags text[],
  status text default 'draft', -- 'draft', 'review', 'published', 'private', 'archived'
  featured_image text,
  published_at timestamp with time zone, -- 실제 발행 시간
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 소셜 계정 연동 테이블
create table public.social_accounts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  provider text not null, -- 'youtube', 'instagram', 'facebook'
  provider_id text not null,
  provider_username text,
  access_token text,
  refresh_token text,
  token_expires_at timestamp with time zone,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, provider)
);

-- 강의 테이블
create table public.courses (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  price integer, -- 원화 기준
  thumbnail_url text,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 강의 신청 테이블
create table public.course_enrollments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) on delete cascade not null,
  course_id uuid references public.courses(id) on delete cascade not null,
  status text default 'pending', -- 'pending', 'paid', 'completed', 'cancelled'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, course_id)
);

-- 뉴스레터 구독 테이블
create table public.newsletter_subscriptions (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  name text,
  is_active boolean default false, -- 이메일 확인 후 true
  is_confirmed boolean default false, -- 이메일 확인 여부
  confirmation_token text unique, -- 확인 토큰
  confirmation_sent_at timestamp with time zone,
  confirmed_at timestamp with time zone,
  subscribed_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unsubscribed_at timestamp with time zone
);

-- 뉴스레터 발송 기록 테이블
create table public.newsletter_campaigns (
  id uuid default gen_random_uuid() primary key,
  subject text not null,
  content text not null,
  journal_id uuid references public.journals(id) on delete set null,
  sent_at timestamp with time zone default timezone('utc'::text, now()) not null,
  recipient_count integer default 0,
  success_count integer default 0,
  failure_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 설문조사 테이블
create table public.surveys (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  questions jsonb not null,
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 설문조사 응답 테이블
create table public.survey_responses (
  id uuid default gen_random_uuid() primary key,
  survey_id uuid references public.surveys(id) on delete cascade not null,
  user_id uuid references public.users(id) on delete cascade,
  email text,
  responses jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS (Row Level Security) 정책 설정
alter table public.users enable row level security;
alter table public.journals enable row level security;
alter table public.social_accounts enable row level security;
alter table public.course_enrollments enable row level security;
alter table public.survey_responses enable row level security;

-- 사용자는 자신의 데이터만 접근 가능
create policy "Users can view own profile" on public.users
  for select using (auth.uid() = id);

create policy "Users can update own profile" on public.users
  for update using (auth.uid() = id);

create policy "Users can view own journals" on public.journals
  for select using (auth.uid() = user_id);

create policy "Users can create own journals" on public.journals
  for insert with check (auth.uid() = user_id);

create policy "Users can update own journals" on public.journals
  for update using (auth.uid() = user_id);

create policy "Users can delete own journals" on public.journals
  for delete using (auth.uid() = user_id);

-- 발행된 저널은 모든 사용자가 볼 수 있음
create policy "Published journals are viewable by everyone" on public.journals
  for select using (status = 'published');

-- 소셜 계정은 본인만 접근
create policy "Users can manage own social accounts" on public.social_accounts
  for all using (auth.uid() = user_id);

-- 강의는 모든 사용자가 볼 수 있음
create policy "Courses are viewable by everyone" on public.courses
  for select using (is_active = true);

-- 강의 신청은 본인 것만 접근
create policy "Users can manage own enrollments" on public.course_enrollments
  for all using (auth.uid() = user_id);

-- 설문조사 응답은 본인 것만 접근
create policy "Users can manage own survey responses" on public.survey_responses
  for all using (auth.uid() = user_id);

-- 트리거 함수: updated_at 자동 업데이트
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- 트리거 설정
create trigger handle_users_updated_at
  before update on public.users
  for each row execute procedure public.handle_updated_at();

create trigger handle_journals_updated_at
  before update on public.journals
  for each row execute procedure public.handle_updated_at();

create trigger handle_social_accounts_updated_at
  before update on public.social_accounts
  for each row execute procedure public.handle_updated_at();

create trigger handle_courses_updated_at
  before update on public.courses
  for each row execute procedure public.handle_updated_at();

create trigger handle_course_enrollments_updated_at
  before update on public.course_enrollments
  for each row execute procedure public.handle_updated_at();

create trigger handle_surveys_updated_at
  before update on public.surveys
  for each row execute procedure public.handle_updated_at();