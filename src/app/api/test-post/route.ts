import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log('Test POST received:', body)
    
    return NextResponse.json({
      message: 'POST is working',
      receivedData: body,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Test POST error:', error)
    return NextResponse.json(
      { error: 'Test POST failed', details: error instanceof Error ? error.message : 'Unknown' },
      { status: 500 }
    )
  }
}