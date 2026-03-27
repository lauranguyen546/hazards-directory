-- Migration: Listing Portal & Stripe Payments
-- Run this in Supabase SQL editor

-- 1. Add tier and Stripe fields to providers
ALTER TABLE providers
  ADD COLUMN IF NOT EXISTS tier varchar(20) NOT NULL DEFAULT 'free',
  ADD COLUMN IF NOT EXISTS stripe_subscription_id varchar(255),
  ADD COLUMN IF NOT EXISTS stripe_customer_id varchar(255),
  ADD COLUMN IF NOT EXISTS claimed_by_email varchar(255),
  ADD COLUMN IF NOT EXISTS claimed_at timestamptz;

-- 2. Index for fast featured-first sorting
CREATE INDEX IF NOT EXISTS idx_providers_tier ON providers(tier);
CREATE INDEX IF NOT EXISTS idx_providers_state_category_tier ON providers(state, service_category, tier);

-- 3. Listing claims table
CREATE TABLE IF NOT EXISTS listing_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES providers(id) ON DELETE SET NULL,
  contact_name varchar(200) NOT NULL,
  contact_email varchar(200) NOT NULL,
  contact_phone varchar(50),
  verification_token varchar(128) NOT NULL UNIQUE,
  verified boolean NOT NULL DEFAULT false,
  verified_at timestamptz,
  tier_selected varchar(20) NOT NULL DEFAULT 'free',
  stripe_session_id varchar(255),
  -- For new listings (no existing provider_id)
  new_business_name varchar(255),
  new_address varchar(500),
  new_city varchar(100),
  new_state varchar(2),
  new_zip varchar(20),
  new_phone varchar(50),
  new_website varchar(500),
  new_service_category varchar(50),
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT (now() + interval '24 hours')
);

-- 4. Leads table (if not exists)
CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  provider_id uuid REFERENCES providers(id) ON DELETE SET NULL,
  name varchar(200) NOT NULL,
  email varchar(200) NOT NULL,
  phone varchar(50),
  service_needed varchar(200) NOT NULL,
  message text,
  source_type varchar(50) DEFAULT 'provider_page',
  source_state varchar(100),
  source_category varchar(100),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_leads_provider_id ON leads(provider_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);
