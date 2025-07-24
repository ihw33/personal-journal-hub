import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('GET /api/journals called')
    
    // 연결 테스트를 위한 더 간단한 접근
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    console.log('Environment check:', {
      url: !!supabaseUrl,
      key: !!supabaseKey,
      urlValue: supabaseUrl?.substring(0, 30) + '...'
    })
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase credentials')
    }
    
    // HTTP fetch 직접 사용해서 테스트
    const response = await fetch(`${supabaseUrl}/rest/v1/journals?select=*&order=created_at.desc`, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    })
    
    console.log('Direct fetch response status:', response.status)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Direct fetch error:', errorText)
      throw new Error(`HTTP ${response.status}: ${errorText}`)
    }
    
    const journals = await response.json()
    console.log('Successfully fetched journals via direct fetch:', journals?.length || 0)
    
    return NextResponse.json({ journals: journals || [] })
  } catch (error) {
    console.error('GET /api/journals error:', error)
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack')
    console.error('Error name:', error instanceof Error ? error.name : 'Unknown')
    console.error('Full error object:', JSON.stringify(error, null, 2))
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, excerpt, category, status } = body

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

    const { data: savedJournal, error } = await supabase
      .from('journals')
      .insert([newJournal])
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Database error', details: error.message },
        { status: 500 }
      )
    }
    
    return NextResponse.json({ 
      journal: savedJournal,
      message: '저널이 성공적으로 저장되었습니다.'
    })
  } catch (error) {
    console.error('저널 저장 에러:', error)
    return NextResponse.json(
      { error: '저널 저장 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}