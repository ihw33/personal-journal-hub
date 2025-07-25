import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('GET /api/journals called')
    
    const supabase = createClient()
    
    console.log('Attempting to fetch journals with supabase client...')
    
    const { data: journals, error } = await supabase
      .from('journals')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Supabase select error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return NextResponse.json(
        { 
          error: 'Database error', 
          details: error.message,
          hint: error.hint,
          code: error.code
        },
        { status: 500 }
      )
    }
    
    console.log('Successfully fetched journals:', journals?.length || 0)
    console.log('Journal IDs:', journals?.map(j => ({ id: j.id, title: j.title?.slice(0, 30) })))
    
    return NextResponse.json({ journals: journals || [] })
  } catch (error) {
    console.error('GET /api/journals error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, excerpt, category, status } = body

    console.log('POST /api/journals called with data:', { 
      title: title?.slice(0, 50), 
      category, 
      status,
      contentLength: content?.length 
    })

    if (!title || !content) {
      return NextResponse.json(
        { error: '제목과 내용은 필수입니다.' },
        { status: 400 }
      )
    }

    const supabase = createClient()
    
    const newJournal = {
      title,
      content,
      excerpt: excerpt || content.slice(0, 120) + '...',
      category: category || '일상',
      status: status || 'draft',
      published_at: status === 'published' ? new Date().toISOString() : null,
      user_id: '00000000-0000-0000-0000-000000000000'
    }

    console.log('Attempting to insert journal with supabase client...')

    const { data: savedJournal, error } = await supabase
      .from('journals')
      .insert([newJournal])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code
      })
      return NextResponse.json(
        { 
          error: 'Database error', 
          details: error.message,
          hint: error.hint,
          code: error.code
        },
        { status: 500 }
      )
    }

    console.log('Journal saved successfully:', savedJournal?.id)
    
    return NextResponse.json({ 
      journal: savedJournal,
      message: '저널이 성공적으로 저장되었습니다.'
    })
  } catch (error) {
    console.error('저널 저장 에러:', error)
    return NextResponse.json(
      { 
        error: '저널 저장 중 오류가 발생했습니다.', 
        details: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined
      },
      { status: 500 }
    )
  }
}