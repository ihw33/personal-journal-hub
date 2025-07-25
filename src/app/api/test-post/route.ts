import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Test endpoint is working',
    methods: ['GET', 'POST'],
    timestamp: new Date().toISOString()
  })
}

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