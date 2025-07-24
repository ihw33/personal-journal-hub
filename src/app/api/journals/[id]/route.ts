import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createClient()
    
    // 단일 저널 조회 - 모든 상태 포함해서 테스트
    const { data: journal, error } = await supabase
      .from('journals')
      .select('*')
      .eq('id', id)
      .single()
    
    console.log('Querying journal with ID:', id)
    console.log('Found journal:', journal ? { id: journal.id, title: journal.title, status: journal.status } : 'null')
    console.log('Query error:', error)
    
    if (error || !journal) {
      return NextResponse.json(
        { error: 'Journal not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ journal })
  } catch (error) {
    console.error('Journal fetch error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = createClient()
    
    const { error } = await supabase
      .from('journals')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Supabase delete error:', error)
      return NextResponse.json(
        { error: 'Database error', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      message: '저널이 성공적으로 삭제되었습니다.'
    })
  } catch (error) {
    console.error('저널 삭제 에러:', error)
    return NextResponse.json(
      { error: '저널 삭제 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { title, content, excerpt, category, status } = body

    if (!title || !content) {
      return NextResponse.json(
        { error: '제목과 내용은 필수입니다.' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    const updates = {
      title,
      content,
      excerpt: excerpt || content.slice(0, 120) + '...',
      category: category || '일상',
      status: status || 'draft',
      published_at: status === 'published' ? new Date().toISOString() : null,
      updated_at: new Date().toISOString()
    }

    const { data: updated, error } = await supabase
      .from('journals')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Supabase update error:', error)
      return NextResponse.json(
        { error: 'Database error', details: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json({ 
      journal: updated,
      message: '저널이 성공적으로 수정되었습니다.'
    })
  } catch (error) {
    console.error('저널 수정 에러:', error)
    return NextResponse.json(
      { error: '저널 수정 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}