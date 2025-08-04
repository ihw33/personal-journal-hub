-- Migration: Add subscriptions and payment_history tables
-- Date: 2025-08-04
-- Purpose: Fix missing database tables for payment system

-- Enable UUID extension if not exists
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create subscriptions table
CREATE TABLE public.subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('basic', 'premium', 'pro')),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'cancelled', 'payment_failed')),
  amount INTEGER NOT NULL, -- 원래 금액 (부가세 제외)
  total_amount INTEGER NOT NULL, -- 부가세 포함 총 금액
  payment_intent_id TEXT UNIQUE,
  stripe_customer_id TEXT,
  current_period_start TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  current_period_end TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '30 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Create payment_history table
CREATE TABLE public.payment_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  payment_intent_id TEXT NOT NULL,
  amount INTEGER NOT NULL, -- 원래 금액 (부가세 제외)
  total_amount INTEGER NOT NULL, -- 부가세 포함 총 금액
  plan_type TEXT NOT NULL CHECK (plan_type IN ('basic', 'premium', 'pro')),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  payment_method TEXT NOT NULL DEFAULT 'stripe',
  stripe_charge_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_history ENABLE ROW LEVEL SECURITY;

-- 4. Create RLS policies for subscriptions table
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions" ON public.subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own subscriptions" ON public.subscriptions
  FOR UPDATE USING (auth.uid() = user_id);

-- 5. Create RLS policies for payment_history table
CREATE POLICY "Users can view own payment history" ON public.payment_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payment history" ON public.payment_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 6. Create indexes for performance
CREATE INDEX idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON public.subscriptions(status);
CREATE INDEX idx_subscriptions_payment_intent_id ON public.subscriptions(payment_intent_id);
CREATE INDEX idx_payment_history_user_id ON public.payment_history(user_id);
CREATE INDEX idx_payment_history_payment_intent_id ON public.payment_history(payment_intent_id);
CREATE INDEX idx_payment_history_status ON public.payment_history(status);

-- 7. Create trigger for updating updated_at column in subscriptions
CREATE OR REPLACE FUNCTION update_subscriptions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_subscriptions_updated_at_trigger
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_subscriptions_updated_at();

-- 8. Add comments for documentation
COMMENT ON TABLE public.subscriptions IS 'User subscription information with payment details';
COMMENT ON TABLE public.payment_history IS 'Complete history of all payment transactions';
COMMENT ON COLUMN public.subscriptions.amount IS 'Original amount in KRW (excluding VAT)';
COMMENT ON COLUMN public.subscriptions.total_amount IS 'Total amount in KRW (including 10% VAT)';
COMMENT ON COLUMN public.payment_history.amount IS 'Original amount in KRW (excluding VAT)';
COMMENT ON COLUMN public.payment_history.total_amount IS 'Total amount in KRW (including 10% VAT)';