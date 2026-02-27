#!/bin/bash
set -e

echo "Setting up Hazards Directory..."

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
npm install

# Check for .env.local
if [ ! -f .env.local ]; then
    echo "Creating .env.local from example..."
    cp .env.local.example .env.local
    echo "⚠️  Please edit .env.local with your Supabase credentials"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Create a Supabase project at https://supabase.com"
echo "2. Run the SQL in supabase/schema.sql in your Supabase SQL Editor"
echo "3. Add your Supabase credentials to .env.local"
echo "4. Import your data: npm run import-csv path/to/your.csv"
echo "5. Start the dev server: npm run dev"
