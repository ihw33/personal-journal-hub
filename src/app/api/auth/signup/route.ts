
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { validateEmail, validatePassword, validateName } from '@/lib/validation';
import { rateLimiter } from '@/lib/rate-limiter';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1';
  const { success } = await rateLimiter.limit(ip);

  if (!success) {
    return new NextResponse('Too many requests', { status: 429 });
  }

  const { email, password, name } = await request.json();

  if (!validateName(name)) {
    return NextResponse.json({ error: 'Invalid name' }, { status: 400 });
  }
  if (!validateEmail(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }
  const passwordValidation = validatePassword(password);
  if (!passwordValidation.success) {
    return NextResponse.json({ error: passwordValidation.message }, { status: 400 });
  }

  const supabase = createClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}
