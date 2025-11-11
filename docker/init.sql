-- Initialization script for PostgreSQL
-- This script runs when the container is first created

-- Create extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For text search

-- Set timezone
SET timezone = 'America/Bogota';

-- Grant privileges
GRANT ALL PRIVILEGES ON DATABASE orden_interno TO postgres;

-- Log initialization
DO $$
BEGIN
  RAISE NOTICE 'Orden Interno database initialized successfully!';
END $$;
