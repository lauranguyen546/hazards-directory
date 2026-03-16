-- Hazards Directory Database Schema
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Providers table (matches your CSV structure)
CREATE TABLE IF NOT EXISTS providers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  state TEXT NOT NULL,
  county TEXT NOT NULL,
  service_category TEXT NOT NULL,
  provider_name TEXT NOT NULL,
  primary_category TEXT,
  address TEXT NOT NULL,
  phone TEXT,
  website TEXT,
  rating NUMERIC(3,2),
  review_count INTEGER,
  place_id TEXT UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_providers_state ON providers(state);
CREATE INDEX IF NOT EXISTS idx_providers_county ON providers(county);
CREATE INDEX IF NOT EXISTS idx_providers_service_category ON providers(service_category);
CREATE INDEX IF NOT EXISTS idx_providers_rating ON providers(rating);

-- Full-text search index (optional, for advanced search)
CREATE INDEX IF NOT EXISTS idx_providers_search ON providers 
  USING gin(to_tsvector('english', provider_name || ' ' || COALESCE(address, '')));

-- Row Level Security (disabled for public read access)
ALTER TABLE providers ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read access" ON providers
  FOR SELECT USING (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to auto-update updated_at
CREATE TRIGGER update_providers_updated_at 
  BEFORE UPDATE ON providers 
  FOR EACH ROW 
  EXECUTE FUNCTION update_updated_at_column();

-- Sample query to get providers by state and category
-- SELECT * FROM providers
-- WHERE state = 'Florida'
--   AND service_category = 'Mold'
-- ORDER BY rating DESC NULLS LAST;

-- ─────────────────────────────────────────────
-- MONETIZATION SCHEMA
-- ─────────────────────────────────────────────

-- Add slug for clean URLs (run as migration if providers table already exists)
ALTER TABLE providers ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE;
CREATE INDEX IF NOT EXISTS idx_providers_slug ON providers(slug);

-- Homeowner lead inquiries
CREATE TABLE IF NOT EXISTS leads (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  homeowner_name        TEXT NOT NULL,
  homeowner_email       TEXT NOT NULL,
  homeowner_phone       TEXT,
  service_category      TEXT NOT NULL CHECK (service_category IN ('Mold','Water','Pest','Radon')),
  urgency               TEXT DEFAULT 'standard' CHECK (urgency IN ('emergency','within_week','standard','planning')),
  description           TEXT,
  zip_code              TEXT,
  city                  TEXT,
  state                 TEXT NOT NULL,
  county                TEXT,
  source_page           TEXT,
  source_provider_id    UUID REFERENCES providers(id),
  utm_source            TEXT,
  utm_medium            TEXT,
  utm_campaign          TEXT,
  status                TEXT DEFAULT 'new' CHECK (status IN ('new','distributed','contacted','converted','invalid','expired')),
  distributed_at        TIMESTAMP WITH TIME ZONE,
  lead_price_cents      INTEGER DEFAULT 0,
  created_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at            TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_state ON leads(state);
CREATE INDEX IF NOT EXISTS idx_leads_county ON leads(county);
CREATE INDEX IF NOT EXISTS idx_leads_zip ON leads(zip_code);
CREATE INDEX IF NOT EXISTS idx_leads_category ON leads(service_category);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source_provider ON leads(source_provider_id);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- RLS: only service role can read/write leads (homeowner data is private)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role only" ON leads USING (false);

-- Provider subscription tiers
CREATE TABLE IF NOT EXISTS provider_tiers (
  id                          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id                 UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  tier                        TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free','basic','premium')),
  stripe_customer_id          TEXT,
  stripe_subscription_id      TEXT,
  subscription_status         TEXT DEFAULT 'inactive',
  monthly_lead_cap            INTEGER DEFAULT 0,
  leads_received_this_month   INTEGER DEFAULT 0,
  featured_badge              BOOLEAN DEFAULT false,
  priority_listing            BOOLEAN DEFAULT false,
  current_period_end          TIMESTAMP WITH TIME ZONE,
  created_at                  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at                  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(provider_id)
);

CREATE INDEX IF NOT EXISTS idx_provider_tiers_provider_id ON provider_tiers(provider_id);
CREATE INDEX IF NOT EXISTS idx_provider_tiers_tier ON provider_tiers(tier);

-- Which providers received which lead (many-to-many)
CREATE TABLE IF NOT EXISTS lead_distributions (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id             UUID NOT NULL REFERENCES leads(id) ON DELETE CASCADE,
  provider_id         UUID NOT NULL REFERENCES providers(id) ON DELETE CASCADE,
  notified_at         TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  viewed_at           TIMESTAMP WITH TIME ZONE,
  claimed_at          TIMESTAMP WITH TIME ZONE,
  charged             BOOLEAN DEFAULT false,
  charge_cents        INTEGER DEFAULT 0,
  stripe_charge_id    TEXT,
  UNIQUE(lead_id, provider_id)
);

CREATE INDEX IF NOT EXISTS idx_lead_dist_lead ON lead_distributions(lead_id);
CREATE INDEX IF NOT EXISTS idx_lead_dist_provider ON lead_distributions(provider_id);

-- Provider portal authentication (links Supabase auth users to providers)
CREATE TABLE IF NOT EXISTS provider_portal_users (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  provider_id   UUID NOT NULL REFERENCES providers(id),
  email         TEXT NOT NULL UNIQUE,
  auth_user_id  UUID,
  role          TEXT DEFAULT 'owner' CHECK (role IN ('owner','manager')),
  created_at    TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(provider_id, email)
);

-- Affiliate click tracking (no PII — aggregate analytics only)
CREATE TABLE IF NOT EXISTS affiliate_clicks (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  program         TEXT NOT NULL,
  product_slug    TEXT,
  source_page     TEXT,
  source_category TEXT,
  state           TEXT,
  session_id      TEXT,
  clicked_at      TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_program ON affiliate_clicks(program);
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_clicked_at ON affiliate_clicks(clicked_at);
