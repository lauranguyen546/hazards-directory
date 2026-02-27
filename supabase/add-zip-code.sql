-- Add zip_code column to providers table
ALTER TABLE providers ADD COLUMN IF NOT EXISTS zip_code TEXT;

-- Create index for zip code lookups
CREATE INDEX IF NOT EXISTS idx_providers_zip_code ON providers(zip_code);

-- Update existing providers with zip codes extracted from addresses
-- This will be done via the extraction script
