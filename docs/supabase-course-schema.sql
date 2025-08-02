-- Course System Database Schema for IdeaWorkLab v3.0
-- 8-Phase Thinking Expansion Course System
-- This schema supports flexible course structures, user progress tracking, and content management

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ===============================
-- COURSES TABLE
-- ===============================
CREATE TABLE courses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN (
        'thinking-expansion', 'creativity', 'problem-solving', 
        'innovation', 'design-thinking', 'systems-thinking', 
        'critical-thinking', 'strategic-thinking'
    )),
    difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced', 'expert')),
    total_levels INTEGER NOT NULL DEFAULT 1,
    estimated_duration VARCHAR(50) NOT NULL,
    enrolled_count INTEGER NOT NULL DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 0.0 CHECK (rating >= 0 AND rating <= 5),
    is_published BOOLEAN NOT NULL DEFAULT false,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    tags TEXT[] DEFAULT '{}',
    thumbnail_url TEXT,
    preview_video_url TEXT,
    learning_objectives TEXT[],
    prerequisites TEXT[],
    target_audience TEXT,
    price DECIMAL(10,2) DEFAULT 0.00,
    currency VARCHAR(3) DEFAULT 'KRW',
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    
    -- Add indexes for performance
    INDEX idx_courses_category (category),
    INDEX idx_courses_difficulty (difficulty),
    INDEX idx_courses_published (is_published),
    INDEX idx_courses_featured (is_featured),
    INDEX idx_courses_author (author_id),
    INDEX idx_courses_rating (rating DESC),
    INDEX idx_courses_enrolled (enrolled_count DESC)
);

-- ===============================
-- COURSE LEVELS TABLE
-- ===============================
CREATE TABLE course_levels (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    level_number INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    color VARCHAR(7) NOT NULL, -- Hex color code
    icon VARCHAR(10), -- Emoji or icon identifier
    estimated_duration VARCHAR(50),
    skills TEXT[] DEFAULT '{}',
    prerequisites INTEGER[], -- Array of previous level numbers required
    is_locked_by_default BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    
    UNIQUE(course_id, level_number),
    INDEX idx_course_levels_course (course_id),
    INDEX idx_course_levels_order (course_id, sort_order)
);

-- ===============================
-- COURSE SESSIONS TABLE
-- ===============================
CREATE TABLE course_sessions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    level_id UUID REFERENCES course_levels(id) ON DELETE CASCADE NOT NULL,
    session_number INTEGER NOT NULL,
    title VARCHAR(300) NOT NULL,
    description TEXT,
    duration_minutes INTEGER NOT NULL DEFAULT 30,
    learning_objectives TEXT[],
    is_published BOOLEAN NOT NULL DEFAULT false,
    sort_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    
    UNIQUE(level_id, session_number),
    INDEX idx_sessions_course (course_id),
    INDEX idx_sessions_level (level_id),
    INDEX idx_sessions_order (level_id, sort_order)
);

-- ===============================
-- CONTENT BLOCKS TABLE
-- ===============================
CREATE TABLE content_blocks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id UUID REFERENCES course_sessions(id) ON DELETE CASCADE NOT NULL,
    type VARCHAR(20) NOT NULL CHECK (type IN (
        'text', 'video', 'audio', 'image', 'quiz', 
        'exercise', 'reflection', 'code', 'diagram', 'checklist'
    )),
    title VARCHAR(300),
    content TEXT NOT NULL,
    metadata JSONB DEFAULT '{}', -- Flexible storage for type-specific data
    is_interactive BOOLEAN NOT NULL DEFAULT false,
    is_required BOOLEAN NOT NULL DEFAULT true,
    points INTEGER DEFAULT 0, -- Points awarded for completion
    sort_order INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    
    INDEX idx_content_blocks_session (session_id),
    INDEX idx_content_blocks_type (type),
    INDEX idx_content_blocks_order (session_id, sort_order)
);

-- ===============================
-- USER COURSE ENROLLMENTS TABLE
-- ===============================
CREATE TABLE user_course_enrollments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    enrolled_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    completed_at TIMESTAMPTZ,
    certificate_url TEXT,
    payment_status VARCHAR(20) DEFAULT 'free' CHECK (payment_status IN ('free', 'paid', 'refunded')),
    payment_amount DECIMAL(10,2) DEFAULT 0.00,
    payment_date TIMESTAMPTZ,
    
    UNIQUE(user_id, course_id),
    INDEX idx_enrollments_user (user_id),
    INDEX idx_enrollments_course (course_id),
    INDEX idx_enrollments_status (payment_status)
);

-- ===============================
-- USER COURSE PROGRESS TABLE
-- ===============================
CREATE TABLE user_course_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    current_level_id UUID REFERENCES course_levels(id) ON DELETE SET NULL,
    current_session_id UUID REFERENCES course_sessions(id) ON DELETE SET NULL,
    overall_progress INTEGER NOT NULL DEFAULT 0 CHECK (overall_progress >= 0 AND overall_progress <= 100),
    time_spent_minutes INTEGER NOT NULL DEFAULT 0,
    last_accessed_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    
    UNIQUE(user_id, course_id),
    INDEX idx_progress_user (user_id),
    INDEX idx_progress_course (course_id),
    INDEX idx_progress_level (current_level_id),
    INDEX idx_progress_accessed (last_accessed_at DESC)
);

-- ===============================
-- USER SESSION PROGRESS TABLE
-- ===============================
CREATE TABLE user_session_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    session_id UUID REFERENCES course_sessions(id) ON DELETE CASCADE NOT NULL,
    progress_percentage INTEGER NOT NULL DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
    time_spent_minutes INTEGER NOT NULL DEFAULT 0,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    completed_at TIMESTAMPTZ,
    started_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    last_accessed_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    
    UNIQUE(user_id, session_id),
    INDEX idx_session_progress_user (user_id),
    INDEX idx_session_progress_session (session_id),
    INDEX idx_session_progress_completed (is_completed)
);

-- ===============================
-- USER CONTENT BLOCK PROGRESS TABLE
-- ===============================
CREATE TABLE user_content_block_progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    content_block_id UUID REFERENCES content_blocks(id) ON DELETE CASCADE NOT NULL,
    is_completed BOOLEAN NOT NULL DEFAULT false,
    user_response JSONB DEFAULT '{}', -- Store quiz answers, exercise results, etc.
    score INTEGER, -- For quizzes and assessments
    time_spent_minutes INTEGER DEFAULT 0,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    
    UNIQUE(user_id, content_block_id),
    INDEX idx_block_progress_user (user_id),
    INDEX idx_block_progress_block (content_block_id),
    INDEX idx_block_progress_completed (is_completed)
);

-- ===============================
-- COURSE REVIEWS TABLE
-- ===============================
CREATE TABLE course_reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(200),
    comment TEXT,
    is_verified_purchase BOOLEAN NOT NULL DEFAULT false,
    helpful_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    
    UNIQUE(user_id, course_id),
    INDEX idx_reviews_course (course_id),
    INDEX idx_reviews_rating (rating DESC),
    INDEX idx_reviews_helpful (helpful_count DESC)
);

-- ===============================
-- USER ACHIEVEMENTS TABLE
-- ===============================
CREATE TABLE user_achievements (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    achievement_type VARCHAR(50) NOT NULL CHECK (achievement_type IN (
        'level_completion', 'perfect_score', 'quick_learner', 
        'deep_thinker', 'consistent_learner', 'course_completion',
        'first_enrollment', 'streak_7_days', 'streak_30_days'
    )),
    achievement_data JSONB DEFAULT '{}', -- Additional data about the achievement
    earned_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    
    INDEX idx_achievements_user (user_id),
    INDEX idx_achievements_type (achievement_type),
    INDEX idx_achievements_course (course_id)
);

-- ===============================
-- LEARNING ANALYTICS TABLE
-- ===============================
CREATE TABLE learning_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    course_id UUID REFERENCES courses(id) ON DELETE CASCADE,
    session_id UUID REFERENCES course_sessions(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL CHECK (event_type IN (
        'session_start', 'session_complete', 'session_pause', 'session_resume',
        'content_view', 'content_complete', 'quiz_attempt', 'quiz_complete',
        'exercise_submit', 'reflection_submit', 'bookmark_add', 'note_create'
    )),
    event_data JSONB DEFAULT '{}',
    duration_seconds INTEGER,
    timestamp TIMESTAMPTZ DEFAULT now() NOT NULL,
    
    INDEX idx_analytics_user (user_id),
    INDEX idx_analytics_course (course_id),
    INDEX idx_analytics_session (session_id),
    INDEX idx_analytics_event_type (event_type),
    INDEX idx_analytics_timestamp (timestamp DESC)
);

-- ===============================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ===============================

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_session_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_content_block_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_analytics ENABLE ROW LEVEL SECURITY;

-- Courses policies
CREATE POLICY "Public courses are viewable by everyone" ON courses
    FOR SELECT USING (is_published = true);

CREATE POLICY "Authors can manage their courses" ON courses
    FOR ALL USING (auth.uid() = author_id);

-- Course structure policies (levels, sessions, content)
CREATE POLICY "Course structure viewable for published courses" ON course_levels
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM courses 
            WHERE courses.id = course_levels.course_id 
            AND courses.is_published = true
        )
    );

CREATE POLICY "Course structure viewable for published courses" ON course_sessions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM courses 
            WHERE courses.id = course_sessions.course_id 
            AND courses.is_published = true
        )
    );

CREATE POLICY "Content viewable for enrolled users" ON content_blocks
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM user_course_enrollments uce
            JOIN course_sessions cs ON cs.id = content_blocks.session_id
            WHERE uce.user_id = auth.uid() 
            AND uce.course_id = cs.course_id
        )
    );

-- User progress policies
CREATE POLICY "Users can view own progress" ON user_course_progress
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own session progress" ON user_session_progress
    FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can view own content progress" ON user_content_block_progress
    FOR ALL USING (auth.uid() = user_id);

-- Enrollment policies
CREATE POLICY "Users can manage own enrollments" ON user_course_enrollments
    FOR ALL USING (auth.uid() = user_id);

-- Review policies
CREATE POLICY "Reviews viewable by everyone" ON course_reviews
    FOR SELECT USING (true);

CREATE POLICY "Users can manage own reviews" ON course_reviews
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" ON course_reviews
    FOR UPDATE USING (auth.uid() = user_id);

-- Achievement policies
CREATE POLICY "Users can view own achievements" ON user_achievements
    FOR SELECT USING (auth.uid() = user_id);

-- Analytics policies
CREATE POLICY "Users can insert own analytics" ON learning_analytics
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ===============================
-- FUNCTIONS AND TRIGGERS
-- ===============================

-- Function to update course rating when reviews change
CREATE OR REPLACE FUNCTION update_course_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE courses SET 
        rating = (
            SELECT COALESCE(AVG(rating), 0)
            FROM course_reviews 
            WHERE course_id = COALESCE(NEW.course_id, OLD.course_id)
        ),
        updated_at = now()
    WHERE id = COALESCE(NEW.course_id, OLD.course_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_course_rating
    AFTER INSERT OR UPDATE OR DELETE ON course_reviews
    FOR EACH ROW EXECUTE FUNCTION update_course_rating();

-- Function to update enrollment count
CREATE OR REPLACE FUNCTION update_enrollment_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE courses SET 
        enrolled_count = (
            SELECT COUNT(*)
            FROM user_course_enrollments 
            WHERE course_id = COALESCE(NEW.course_id, OLD.course_id)
        ),
        updated_at = now()
    WHERE id = COALESCE(NEW.course_id, OLD.course_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_enrollment_count
    AFTER INSERT OR DELETE ON user_course_enrollments
    FOR EACH ROW EXECUTE FUNCTION update_enrollment_count();

-- Function to update progress automatically
CREATE OR REPLACE FUNCTION update_course_progress()
RETURNS TRIGGER AS $$
DECLARE
    total_sessions INTEGER;
    completed_sessions INTEGER;
    new_progress INTEGER;
BEGIN
    -- Calculate total sessions in the course
    SELECT COUNT(*) INTO total_sessions
    FROM course_sessions cs
    JOIN course_levels cl ON cl.id = cs.level_id
    WHERE cl.course_id = (
        SELECT cl2.course_id 
        FROM course_levels cl2 
        JOIN course_sessions cs2 ON cs2.level_id = cl2.id 
        WHERE cs2.id = NEW.session_id
    );
    
    -- Calculate completed sessions for this user
    SELECT COUNT(*) INTO completed_sessions
    FROM user_session_progress usp
    JOIN course_sessions cs ON cs.id = usp.session_id
    JOIN course_levels cl ON cl.id = cs.level_id
    WHERE usp.user_id = NEW.user_id 
    AND usp.is_completed = true
    AND cl.course_id = (
        SELECT cl2.course_id 
        FROM course_levels cl2 
        JOIN course_sessions cs2 ON cs2.level_id = cl2.id 
        WHERE cs2.id = NEW.session_id
    );
    
    -- Calculate new progress percentage
    new_progress := CASE 
        WHEN total_sessions > 0 THEN (completed_sessions * 100 / total_sessions)
        ELSE 0 
    END;
    
    -- Update course progress
    INSERT INTO user_course_progress (
        user_id, 
        course_id, 
        overall_progress, 
        last_accessed_at
    )
    SELECT 
        NEW.user_id,
        cl.course_id,
        new_progress,
        now()
    FROM course_levels cl 
    JOIN course_sessions cs ON cs.level_id = cl.id 
    WHERE cs.id = NEW.session_id
    ON CONFLICT (user_id, course_id) 
    DO UPDATE SET 
        overall_progress = new_progress,
        last_accessed_at = now(),
        updated_at = now();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_course_progress
    AFTER UPDATE OF is_completed ON user_session_progress
    FOR EACH ROW 
    WHEN (NEW.is_completed = true AND OLD.is_completed = false)
    EXECUTE FUNCTION update_course_progress();

-- Function to auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update triggers to all relevant tables
CREATE TRIGGER trigger_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_course_levels_updated_at BEFORE UPDATE ON course_levels
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_course_sessions_updated_at BEFORE UPDATE ON course_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_content_blocks_updated_at BEFORE UPDATE ON content_blocks
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ===============================
-- SAMPLE DATA FOR 8-PHASE THINKING EXPANSION
-- ===============================

-- Insert main 8-phase thinking expansion course
INSERT INTO courses (
    id,
    title,
    description,
    category,
    difficulty,
    total_levels,
    estimated_duration,
    is_published,
    is_featured,
    tags,
    learning_objectives,
    target_audience,
    author_id
) VALUES (
    'course-main-8phase',
    '사고 확장 8단계 마스터 과정',
    '창의적 사고와 문제해결 능력을 8단계로 체계화한 혁신적 학습 프로그램입니다. 관찰부터 실행까지, 사고의 전 과정을 체험하며 진정한 사고의 달인이 되어보세요.',
    'thinking-expansion',
    'intermediate',
    8,
    '6주',
    true,
    true,
    ARRAY['사고력', '창의성', '문제해결', '혁신', '디자인씽킹'],
    ARRAY[
        '체계적인 8단계 사고 과정 습득',
        '창의적 문제해결 능력 개발',
        '논리적 분석과 직관적 통찰의 균형',
        '실행 가능한 솔루션 도출 능력'
    ],
    '사고력 향상을 원하는 모든 분들',
    (SELECT id FROM auth.users LIMIT 1) -- 실제로는 적절한 author_id 사용
);

-- Insert 8 levels for the thinking phases
INSERT INTO course_levels (course_id, level_number, name, title, description, color, icon, estimated_duration, skills, sort_order) VALUES
('course-main-8phase', 1, 'observation', '관찰하기', '현상과 문제를 명확히 파악하는 단계', '#3B82F6', '👁️', '1주', ARRAY['세심한 관찰', '패턴 인식', '데이터 수집', '현상 파악'], 1),
('course-main-8phase', 2, 'questioning', '질문하기', '핵심 질문을 발견하고 정의하는 단계', '#10B981', '❓', '1주', ARRAY['핵심 질문 도출', '가설 설정', '문제 정의', '탐구 설계'], 2),
('course-main-8phase', 3, 'analyzing', '분석하기', '문제를 구조적으로 해부하는 단계', '#F59E0B', '🔍', '1주', ARRAY['구조적 분석', '요소 분해', '인과관계 파악', '논리적 추론'], 3),
('course-main-8phase', 4, 'connecting', '연결하기', '다양한 요소들의 관계를 파악하는 단계', '#8B5CF6', '🔗', '1주', ARRAY['패턴 연결', '시스템 이해', '관계 매핑', '통합적 사고'], 4),
('course-main-8phase', 5, 'imagining', '상상하기', '창의적 가능성을 탐구하는 단계', '#EC4899', '💭', '1주', ARRAY['창의적 발상', '가능성 탐구', '대안 생성', '확산적 사고'], 5),
('course-main-8phase', 6, 'synthesizing', '종합하기', '아이디어를 통합하고 재구성하는 단계', '#06B6D4', '⚡', '1주', ARRAY['아이디어 통합', '솔루션 설계', '개념 재구성', '수렴적 사고'], 6),
('course-main-8phase', 7, 'evaluating', '평가하기', '솔루션을 검증하고 개선하는 단계', '#84CC16', '⚖️', '1주', ARRAY['비판적 검토', '타당성 검증', '리스크 평가', '개선 방안 도출'], 7),
('course-main-8phase', 8, 'implementing', '실행하기', '아이디어를 현실로 구현하는 단계', '#EF4444', '🚀', '1주', ARRAY['실행 계획', '프로토타입 제작', '테스트 및 검증', '최종 구현'], 8);

-- Add sample sessions for first level
INSERT INTO course_sessions (course_id, level_id, session_number, title, description, duration_minutes, sort_order) 
SELECT 
    'course-main-8phase',
    cl.id,
    generate_series(1, 4),
    cl.title || ' - 세션 ' || generate_series(1, 4),
    '세션 ' || generate_series(1, 4) || ' 설명',
    30,
    generate_series(1, 4)
FROM course_levels cl 
WHERE cl.course_id = 'course-main-8phase' AND cl.level_number = 1;

-- Create indexes for better performance
CREATE INDEX idx_courses_search ON courses USING gin(to_tsvector('korean', title || ' ' || description));
CREATE INDEX idx_courses_tags ON courses USING gin(tags);
CREATE INDEX idx_content_blocks_metadata ON content_blocks USING gin(metadata);