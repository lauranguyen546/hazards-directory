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
