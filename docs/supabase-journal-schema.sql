-- IdeaWorkLab v3.2 Journal System - Supabase Database Schema
-- 저널 시스템을 위한 데이터베이스 스키마 설계

-- =====================================================
-- POSTS 테이블 (저널 게시물)
-- =====================================================
CREATE TABLE posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    
    -- 기본 정보
    title VARCHAR(500) NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL, -- Markdown 형식의 본문 내용
    
    -- 작성자 정보 (auth.users 테이블과 연동)
    author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    
    -- 분류 및 태그
    category VARCHAR(50) NOT NULL DEFAULT 'general',
    tags TEXT[] DEFAULT '{}', -- 배열 형태로 태그 저장
    
    -- 미디어 및 자료
    thumbnail_url TEXT,
    video_id VARCHAR(50), -- YouTube video ID
    
    -- 메타데이터
    read_time INTEGER DEFAULT 0, -- 예상 읽기 시간 (분)
    difficulty VARCHAR(20) DEFAULT 'beginner', -- beginner, intermediate, advanced
    ai_assisted BOOLEAN DEFAULT false, -- AI 협업 여부
    featured BOOLEAN DEFAULT false, -- 추천 저널 여부
    
    -- 상태 및 발행
    status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
    published_at TIMESTAMP WITH TIME ZONE,
    
    -- 통계
    views INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    bookmarks_count INTEGER DEFAULT 0,
    shares_count INTEGER DEFAULT 0,
    
    -- 시스템 필드
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- POST_RESOURCES 테이블 (다운로드 자료)
-- =====================================================
CREATE TABLE post_resources (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
    
    title VARCHAR(200) NOT NULL,
    description TEXT,
    type VARCHAR(20) NOT NULL, -- template, checklist, guide, worksheet
    file_size VARCHAR(20),
    file_url TEXT NOT NULL,
    
    download_count INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- POST_LIKES 테이블 (좋아요)
-- =====================================================
CREATE TABLE post_likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(post_id, user_id)
);

-- =====================================================
-- POST_BOOKMARKS 테이블 (북마크)
-- =====================================================
CREATE TABLE post_bookmarks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    UNIQUE(post_id, user_id)
);

-- =====================================================
-- POST_COMMENTS 테이블 (댓글)
-- =====================================================
CREATE TABLE post_comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    parent_id UUID REFERENCES post_comments(id) ON DELETE CASCADE, -- 대댓글용
    
    content TEXT NOT NULL,
    likes INTEGER DEFAULT 0,
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =====================================================
-- INDEXES for Performance
-- =====================================================
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_published_at ON posts(published_at);
CREATE INDEX idx_posts_featured ON posts(featured);
CREATE INDEX idx_posts_ai_assisted ON posts(ai_assisted);

CREATE INDEX idx_post_resources_post_id ON post_resources(post_id);
CREATE INDEX idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX idx_post_likes_user_id ON post_likes(user_id);
CREATE INDEX idx_post_bookmarks_post_id ON post_bookmarks(post_id);
CREATE INDEX idx_post_bookmarks_user_id ON post_bookmarks(user_id);
CREATE INDEX idx_post_comments_post_id ON post_comments(post_id);
CREATE INDEX idx_post_comments_parent_id ON post_comments(parent_id);

-- =====================================================
-- TRIGGERS for Updated At
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_post_resources_updated_at BEFORE UPDATE ON post_resources
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_post_comments_updated_at BEFORE UPDATE ON post_comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- TRIGGERS for Statistics Update
-- =====================================================
-- 좋아요 수 자동 업데이트
CREATE OR REPLACE FUNCTION update_post_likes_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE posts SET likes = likes + 1 WHERE id = NEW.post_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE posts SET likes = likes - 1 WHERE id = OLD.post_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_update_post_likes_count
    AFTER INSERT OR DELETE ON post_likes
    FOR EACH ROW EXECUTE FUNCTION update_post_likes_count();

-- 북마크 수 자동 업데이트
CREATE OR REPLACE FUNCTION update_post_bookmarks_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE posts SET bookmarks_count = bookmarks_count + 1 WHERE id = NEW.post_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE posts SET bookmarks_count = bookmarks_count - 1 WHERE id = OLD.post_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_update_post_bookmarks_count
    AFTER INSERT OR DELETE ON post_bookmarks
    FOR EACH ROW EXECUTE FUNCTION update_post_bookmarks_count();

-- 댓글 수 자동 업데이트
CREATE OR REPLACE FUNCTION update_post_comments_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER trigger_update_post_comments_count
    AFTER INSERT OR DELETE ON post_comments
    FOR EACH ROW EXECUTE FUNCTION update_post_comments_count();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) 정책
-- =====================================================
-- posts 테이블 RLS 활성화
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- 모든 사용자가 published 상태의 게시물을 볼 수 있음
CREATE POLICY "Anyone can view published posts" ON posts
    FOR SELECT USING (status = 'published');

-- 작성자만 자신의 게시물을 볼 수 있음 (draft 포함)
CREATE POLICY "Authors can view own posts" ON posts
    FOR SELECT USING (auth.uid() = author_id);

-- 인증된 사용자만 게시물을 생성할 수 있음
CREATE POLICY "Authenticated users can create posts" ON posts
    FOR INSERT WITH CHECK (auth.role() = 'authenticated' AND auth.uid() = author_id);

-- 작성자만 자신의 게시물을 수정할 수 있음
CREATE POLICY "Authors can update own posts" ON posts
    FOR UPDATE USING (auth.uid() = author_id);

-- 작성자만 자신의 게시물을 삭제할 수 있음
CREATE POLICY "Authors can delete own posts" ON posts
    FOR DELETE USING (auth.uid() = author_id);

-- post_resources 테이블 RLS
ALTER TABLE post_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view resources of published posts" ON post_resources
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM posts 
            WHERE posts.id = post_resources.post_id 
            AND posts.status = 'published'
        )
    );

-- post_likes, post_bookmarks, post_comments 테이블도 유사한 RLS 정책 적용
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- 샘플 데이터 INSERT (테스트용)
-- =====================================================
-- 실제 Supabase 콘솔에서 실행할 때는 실제 user_id를 사용해야 합니다
/*
INSERT INTO posts (
    title,
    excerpt,
    content,
    author_id,
    category,
    tags,
    thumbnail_url,
    video_id,
    read_time,
    difficulty,
    ai_assisted,
    featured,
    status,
    published_at,
    views,
    likes,
    comments_count
) VALUES (
    'AI와 함께 제주도 여행 계획 세우기: 창의적 사고법 실습',
    'AI 파트너와 함께 효과적인 제주도 여행 계획을 세우는 과정을 통해 창의적 사고법을 학습했습니다.',
    '# 창의적 사고의 시작\n\n여행 계획을 세우는 것은 단순히 장소와 일정을 정하는 것이 아닙니다...',
    'USER_ID_HERE', -- 실제 사용자 ID로 교체
    'creative',
    ARRAY['여행계획', 'AI협업', '창의사고', '제주도'],
    'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=800&h=400&fit=crop',
    'dQw4w9WgXcQ',
    12,
    'intermediate',
    true,
    true,
    'published',
    NOW(),
    1247,
    89,
    23
);
*/