import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('GET /api/journals called')
    
    // 환경 변수 확인
    const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim()
    const supabaseKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim()
    
    console.log('Environment check:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
      urlPreview: supabaseUrl?.substring(0, 30) + '...'
    })
    
    if (!supabaseUrl || !supabaseKey) {
      console.log('Missing environment variables, using dummy data')
      // 환경 변수가 없으면 더미 데이터 반환
      const dummyJournals = [
        {
          id: 'dummy-1',
          title: '환경 변수 설정 필요',
          content: 'Supabase 환경 변수가 설정되지 않았습니다.',
          category: '공지',
          published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_id: '00000000-0000-0000-0000-000000000000'
        }
      ]
      return NextResponse.json({ journals: dummyJournals })
    }
    
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
      
      // 데이터베이스 오류 시 더미 데이터 반환
      console.log('Database error, falling back to dummy data')
      const dummyJournals = [
        {
          id: 'dummy-error-1',
          title: '데이터베이스 연결 오류',
          content: `데이터베이스 연결에 문제가 있습니다: ${error.message}`,
          category: '오류',
          published: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          user_id: '00000000-0000-0000-0000-000000000000'
        }
      ]
      return NextResponse.json({ journals: dummyJournals })
    }
    
    console.log('Successfully fetched journals:', journals?.length || 0)
    console.log('Journal IDs:', journals?.map(j => ({ id: j.id, title: j.title?.slice(0, 30) })))
    
    return NextResponse.json({ journals: journals || [] })
  } catch (error) {
    console.error('GET /api/journals error:', error)
    
    // 모든 오류에 대해 더미 데이터 반환
    const dummyJournals = [
      {
        id: 'dummy-catch-1',
        title: '서버 오류 발생',
        content: `서버에서 오류가 발생했습니다: ${error instanceof Error ? error.message : 'Unknown error'}`,
        category: '오류',
        published: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        user_id: '00000000-0000-0000-0000-000000000000'
      }
    ]
    return NextResponse.json({ journals: dummyJournals })
  }
}

export async function POST(request: NextRequest) {
  console.log('=== POST /api/journals START ===')
  
  try {
    console.log('1. Reading request body...')
    const body = await request.json()
    console.log('2. Body parsed successfully:', { 
      hasTitle: !!body.title,
      hasContent: !!body.content,
      category: body.category,
      status: body.status
    })
    
    const { title, content, category, status } = body

    if (!title || !content) {
      console.log('3. Validation failed: missing title or content')
      return NextResponse.json(
        { error: '제목과 내용은 필수입니다.' },
        { status: 400 }
      )
    }

    console.log('4. Checking environment variables...')
    const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').trim()
    const supabaseKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim()
    
    console.log('5. Environment check:', {
      hasUrl: !!supabaseUrl,
      hasKey: !!supabaseKey,
      urlPreview: supabaseUrl?.substring(0, 30)
    })
    
    if (!supabaseUrl || !supabaseKey) {
      console.log('6. Environment variables missing!')
      return NextResponse.json(
        { error: '서버 설정 오류: 환경 변수가 없습니다.' },
        { status: 500 }
      )
    }

    console.log('7. Creating Supabase client...')
    const supabase = createClient()
    console.log('8. Supabase client created successfully')
    
    const newJournal = {
      title: title,
      content: content,
      category: category || null,
      user_id: '00000000-0000-0000-0000-000000000000'
    }

    console.log('9. Prepared journal data:', { 
      title: newJournal.title?.slice(0, 30),
      contentLength: newJournal.content?.length,
      category: newJournal.category,
      published: newJournal.published,
      user_id: newJournal.user_id
    })

    console.log('10. Attempting database insert...')
    const { data: savedJournal, error } = await supabase
      .from('journals')
      .insert([newJournal])
      .select()
      .single()

    if (error) {
      console.error('11. Database insert failed:', {
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

    console.log('12. Database insert successful:', savedJournal?.id)
    console.log('=== POST /api/journals SUCCESS ===')
    
    return NextResponse.json({ 
      journal: savedJournal,
      message: '저널이 성공적으로 저장되었습니다.'
    })
    
  } catch (error) {
    console.error('=== POST /api/journals ERROR ===')
    console.error('Error details:', {
      name: error instanceof Error ? error.name : 'Unknown',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    
    return NextResponse.json(
      { 
        error: '저널 저장 중 오류가 발생했습니다.', 
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}