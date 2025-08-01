import { supabase } from './client';
import type { User } from '@supabase/supabase-js';

// 저널 포스트 타입 정의
export interface JournalPost {
  id: string;
  title: string;
  excerpt: string | null;
  content: string;
  author_id: string;
  category: string;
  tags: string[];
  thumbnail_url: string | null;
  video_id: string | null;
  read_time: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  ai_assisted: boolean;
  featured: boolean;
  status: 'draft' | 'published' | 'archived';
  published_at: string | null;
  views: number;
  likes: number;
  comments_count: number;
  bookmarks_count: number;
  shares_count: number;
  created_at: string;
  updated_at: string;
  
  // 추가 필드 (조인된 데이터)
  author_profile?: {
    id: string;
    full_name?: string;
    avatar_url?: string;
  };
  user_liked?: boolean;
  user_bookmarked?: boolean;
}

export interface PostResource {
  id: string;
  post_id: string;
  title: string;
  description: string | null;
  type: 'template' | 'checklist' | 'guide' | 'worksheet';
  file_size: string | null;
  file_url: string;
  download_count: number;
  created_at: string;
  updated_at: string;
}

export interface PostComment {
  id: string;
  post_id: string;
  user_id: string;
  parent_id: string | null;
  content: string;
  likes: number;
  created_at: string;
  updated_at: string;
  author_profile?: {
    id: string;
    full_name?: string;
    avatar_url?: string;
  };
  replies?: PostComment[];
}

// 포스트 목록 조회 옵션
export interface PostsQueryOptions {
  category?: string;
  tags?: string[];
  difficulty?: string;
  ai_assisted?: boolean;
  featured?: boolean;
  search?: string;
  sort_by?: 'created_at' | 'published_at' | 'views' | 'likes' | 'title';
  sort_direction?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

// =====================================================
// 포스트 조회 함수들
// =====================================================

/**
 * 발행된 포스트 목록을 가져옵니다
 */
export async function getPublishedPosts(options: PostsQueryOptions = {}, user?: User) {
  try {
    let query = supabase
      .from('posts')
      .select(`
        *,
        author_profile:auth.users!author_id(id, raw_user_meta_data),
        post_resources(*),
        ${user ? `
          post_likes!inner(user_id),
          post_bookmarks!inner(user_id)
        ` : ''}
      `)
      .eq('status', 'published');

    // 필터링 적용
    if (options.category) {
      query = query.eq('category', options.category);
    }
    
    if (options.tags && options.tags.length > 0) {
      query = query.overlaps('tags', options.tags);
    }
    
    if (options.difficulty) {
      query = query.eq('difficulty', options.difficulty);
    }
    
    if (typeof options.ai_assisted === 'boolean') {
      query = query.eq('ai_assisted', options.ai_assisted);
    }
    
    if (typeof options.featured === 'boolean') {
      query = query.eq('featured', options.featured);
    }
    
    if (options.search) {
      query = query.or(`title.ilike.%${options.search}%,excerpt.ilike.%${options.search}%,content.ilike.%${options.search}%`);
    }
    
    // 정렬 적용
    const sortBy = options.sort_by || 'published_at';
    const sortDirection = options.sort_direction || 'desc';
    query = query.order(sortBy, { ascending: sortDirection === 'asc' });
    
    // 페이지네이션 적용
    if (options.limit) {
      query = query.limit(options.limit);
    }
    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }

    // 사용자별 좋아요/북마크 상태 설정
    const postsWithUserStatus = data?.map(post => ({
      ...post,
      user_liked: user ? post.post_likes?.some((like: any) => like.user_id === user.id) : false,
      user_bookmarked: user ? post.post_bookmarks?.some((bookmark: any) => bookmark.user_id === user.id) : false,
    })) || [];

    return postsWithUserStatus;
  } catch (error) {
    console.error('Error in getPublishedPosts:', error);
    throw error;
  }
}

/**
 * 특정 포스트의 상세 정보를 가져옵니다
 */
export async function getPostById(postId: string, user?: User) {
  try {
    let query = supabase
      .from('posts')
      .select(`
        *,
        author_profile:auth.users!author_id(id, raw_user_meta_data),
        post_resources(*),
        ${user ? `
          post_likes!inner(user_id),
          post_bookmarks!inner(user_id)
        ` : ''}
      `)
      .eq('id', postId);

    // 로그인한 사용자가 작성자가 아닌 경우, 발행된 포스트만 조회
    if (!user) {
      query = query.eq('status', 'published');
    } else {
      query = query.or(`status.eq.published,author_id.eq.${user.id}`);
    }

    const { data, error } = await query.single();

    if (error) {
      console.error('Error fetching post:', error);
      throw error;
    }

    // 조회수 증가 (작성자가 아닌 경우에만)
    if (user?.id !== data.author_id) {
      await supabase
        .from('posts')
        .update({ views: data.views + 1 })
        .eq('id', postId);
    }

    // 사용자별 좋아요/북마크 상태 설정
    const postWithUserStatus = {
      ...data,
      user_liked: user ? data.post_likes?.some((like: any) => like.user_id === user.id) : false,
      user_bookmarked: user ? data.post_bookmarks?.some((bookmark: any) => bookmark.user_id === user.id) : false,
    };

    return postWithUserStatus;
  } catch (error) {
    console.error('Error in getPostById:', error);
    throw error;
  }
}

/**
 * 작성자의 포스트 목록을 가져옵니다 (본인 포스트인 경우 draft도 포함)
 */
export async function getPostsByAuthor(authorId: string, user?: User, options: PostsQueryOptions = {}) {
  try {
    let query = supabase
      .from('posts')
      .select(`
        *,
        author_profile:auth.users!author_id(id, raw_user_meta_data),
        post_resources(*)
      `)
      .eq('author_id', authorId);

    // 본인이 아닌 경우 발행된 포스트만 조회
    if (!user || user.id !== authorId) {
      query = query.eq('status', 'published');
    }

    // 정렬
    const sortBy = options.sort_by || 'created_at';
    const sortDirection = options.sort_direction || 'desc';
    query = query.order(sortBy, { ascending: sortDirection === 'asc' });

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching author posts:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getPostsByAuthor:', error);
    throw error;
  }
}

// =====================================================
// 좋아요/북마크 관리 함수들
// =====================================================

/**
 * 포스트에 좋아요를 추가/제거합니다
 */
export async function togglePostLike(postId: string, userId: string) {
  try {
    // 기존 좋아요 확인
    const { data: existingLike } = await supabase
      .from('post_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single();

    if (existingLike) {
      // 좋아요 제거
      const { error } = await supabase
        .from('post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId);

      if (error) throw error;
      return { liked: false };
    } else {
      // 좋아요 추가
      const { error } = await supabase
        .from('post_likes')
        .insert({ post_id: postId, user_id: userId });

      if (error) throw error;
      return { liked: true };
    }
  } catch (error) {
    console.error('Error toggling post like:', error);
    throw error;
  }
}

/**
 * 포스트에 북마크를 추가/제거합니다
 */
export async function togglePostBookmark(postId: string, userId: string) {
  try {
    // 기존 북마크 확인
    const { data: existingBookmark } = await supabase
      .from('post_bookmarks')
      .select('id')
      .eq('post_id', postId)
      .eq('user_id', userId)
      .single();

    if (existingBookmark) {
      // 북마크 제거
      const { error } = await supabase
        .from('post_bookmarks')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', userId);

      if (error) throw error;
      return { bookmarked: false };
    } else {
      // 북마크 추가
      const { error } = await supabase
        .from('post_bookmarks')
        .insert({ post_id: postId, user_id: userId });

      if (error) throw error;
      return { bookmarked: true };
    }
  } catch (error) {
    console.error('Error toggling post bookmark:', error);
    throw error;
  }
}

// =====================================================
// 댓글 관리 함수들
// =====================================================

/**
 * 포스트의 댓글 목록을 가져옵니다
 */
export async function getPostComments(postId: string) {
  try {
    const { data, error } = await supabase
      .from('post_comments')
      .select(`
        *,
        author_profile:auth.users!user_id(id, raw_user_meta_data)
      `)
      .eq('post_id', postId)
      .is('parent_id', null)
      .order('created_at', { ascending: true });

    if (error) throw error;

    // 각 댓글의 대댓글도 가져오기
    const commentsWithReplies = await Promise.all(
      (data || []).map(async (comment) => {
        const { data: replies } = await supabase
          .from('post_comments')
          .select(`
            *,
            author_profile:auth.users!user_id(id, raw_user_meta_data)
          `)
          .eq('parent_id', comment.id)
          .order('created_at', { ascending: true });

        return {
          ...comment,
          replies: replies || []
        };
      })
    );

    return commentsWithReplies;
  } catch (error) {
    console.error('Error fetching post comments:', error);
    throw error;
  }
}

/**
 * 새 댓글을 추가합니다
 */
export async function addPostComment(postId: string, userId: string, content: string, parentId?: string) {
  try {
    const { data, error } = await supabase
      .from('post_comments')
      .insert({
        post_id: postId,
        user_id: userId,
        content,
        parent_id: parentId || null
      })
      .select(`
        *,
        author_profile:auth.users!user_id(id, raw_user_meta_data)
      `)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error adding post comment:', error);
    throw error;
  }
}

// =====================================================
// 리소스 관리 함수들
// =====================================================

/**
 * 포스트의 리소스 목록을 가져옵니다
 */
export async function getPostResources(postId: string) {
  try {
    const { data, error } = await supabase
      .from('post_resources')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching post resources:', error);
    throw error;
  }
}

/**
 * 리소스 다운로드 수를 증가시킵니다
 */
export async function incrementResourceDownload(resourceId: string) {
  try {
    const { error } = await supabase.rpc('increment_resource_download', {
      resource_id: resourceId
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error incrementing resource download:', error);
    throw error;
  }
}

// =====================================================
// 포스트 작성/수정 함수들
// =====================================================

/**
 * 새 포스트를 생성합니다
 */
export async function createPost(postData: Partial<JournalPost>) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert(postData)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
}

/**
 * 포스트를 수정합니다
 */
export async function updatePost(postId: string, postData: Partial<JournalPost>) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .update(postData)
      .eq('id', postId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
}

/**
 * 포스트를 삭제합니다
 */
export async function deletePost(postId: string) {
  try {
    const { error } = await supabase
      .from('posts')
      .delete()
      .eq('id', postId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
}