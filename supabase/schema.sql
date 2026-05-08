-- ==========================================
-- KJ Kakehashi B2B - Initial Database Schema
-- ==========================================

-- Enable the pg_trgm extension for text search if not already enabled
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 1. COMPANIES TABLE
CREATE TABLE companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  -- Multilingual Names
  name_ko TEXT NOT NULL,
  name_ja TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  
  -- Profile Media
  logo_url TEXT,
  cover_url TEXT,
  
  -- Multilingual Descriptions
  description_ko TEXT,
  description_ja TEXT,
  ai_summary_ko TEXT,
  ai_summary_ja TEXT,
  
  -- Business Data
  business_fields TEXT[],
  founded_year INTEGER,
  ceo_name TEXT,
  address TEXT,
  website TEXT,
  email TEXT,
  phone TEXT,
  
  -- Capabilities
  has_japanese_support BOOLEAN DEFAULT false,
  has_japan_partner BOOLEAN DEFAULT false,
  certifications TEXT[],
  
  -- Claim / Verification Status
  is_verified BOOLEAN DEFAULT false,
  membership_tier TEXT DEFAULT 'free', -- 'free', 'verified', 'premium'
  owner_id UUID REFERENCES auth.users(id) -- Linking to Supabase Auth
);

-- 2. CATEGORIES TABLE
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parent_id UUID REFERENCES categories(id),
  slug TEXT UNIQUE NOT NULL,
  name_ko TEXT NOT NULL,
  name_ja TEXT NOT NULL,
  level INTEGER NOT NULL DEFAULT 1
);

-- 3. PRODUCTS TABLE
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES companies(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  -- Core Info
  slug TEXT UNIQUE NOT NULL,
  name_ko TEXT NOT NULL,
  name_ja TEXT NOT NULL,
  thumbnail_url TEXT,
  images TEXT[],
  
  -- Descriptions
  summary_ko TEXT,
  summary_ja TEXT,
  detailed_desc_ko TEXT,
  detailed_desc_ja TEXT,
  ai_summary_ko TEXT,
  ai_summary_ja TEXT,
  
  -- Commercial Info
  moq INTEGER,
  lead_time_days INTEGER,
  has_sample BOOLEAN DEFAULT false,
  country_of_origin TEXT,
  
  -- Files
  catalog_pdf_url TEXT,
  cad_file_url TEXT,
  
  -- SEO
  seo_title TEXT,
  seo_description TEXT,
  target_keywords TEXT[]
);

-- 4. PRODUCT SPECIFICATIONS TABLE (EAV Pattern for dynamic filtering)
CREATE TABLE product_specs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  
  -- The name of the specification (e.g., 'Voltage', 'Torque', 'Dimensions')
  spec_key_ko TEXT NOT NULL,
  spec_key_ja TEXT NOT NULL,
  
  -- The actual value
  spec_value_ko TEXT NOT NULL,
  spec_value_ja TEXT NOT NULL,
  
  -- For numeric range filtering (if applicable)
  numeric_value NUMERIC,
  unit TEXT,
  
  -- Ensure unique spec key per product
  UNIQUE(product_id, spec_key_ko)
);

-- 5. STANDARDS TABLE (JIS / KS / ISO Mappings)
CREATE TABLE standards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  standard_type TEXT NOT NULL, -- 'JIS', 'KS', 'ISO', etc.
  standard_code TEXT NOT NULL UNIQUE, -- e.g., 'JIS B 1180'
  description TEXT,
  equivalent_standard_code TEXT -- For KS to JIS mapping
);

CREATE TABLE product_standards_mapping (
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  standard_id UUID REFERENCES standards(id) ON DELETE CASCADE,
  PRIMARY KEY (product_id, standard_id)
);

-- 6. RFQ REQUESTS TABLE
CREATE TABLE rfq_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  supplier_company_id UUID REFERENCES companies(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  
  -- Buyer Info
  buyer_user_id UUID REFERENCES auth.users(id), -- If logged in
  buyer_company_name TEXT NOT NULL,
  buyer_name TEXT NOT NULL,
  buyer_email TEXT NOT NULL,
  buyer_country TEXT,
  
  -- Request Details
  requested_quantity INTEGER NOT NULL,
  target_deadline DATE,
  material_requirements TEXT,
  notes TEXT,
  attached_file_urls TEXT[],
  
  status TEXT DEFAULT 'pending' -- 'pending', 'reviewed', 'responded', 'closed'
);

-- ==========================================
-- INDEXES FOR PERFORMANCE
-- ==========================================
CREATE INDEX idx_products_company_id ON products(company_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_product_specs_product_id ON product_specs(product_id);
CREATE INDEX idx_companies_slug ON companies(slug);
CREATE INDEX idx_products_slug ON products(slug);

-- Enable full text search indexes (PostgreSQL specific)
CREATE INDEX idx_products_name_ko_trgm ON products USING gin (name_ko gin_trgm_ops);
CREATE INDEX idx_products_name_ja_trgm ON products USING gin (name_ja gin_trgm_ops);

-- ==========================================
-- ROW LEVEL SECURITY (RLS)
-- ==========================================
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_specs ENABLE ROW LEVEL SECURITY;
ALTER TABLE rfq_requests ENABLE ROW LEVEL SECURITY;

-- 1. Companies are readable by everyone, but only updateable by their owners.
CREATE POLICY "Public profiles are viewable by everyone." 
  ON companies FOR SELECT USING (true);

CREATE POLICY "Users can update their own company profile." 
  ON companies FOR UPDATE USING (auth.uid() = owner_id);

-- 2. Products are readable by everyone, but only insert/updateable by company owners.
CREATE POLICY "Public products are viewable by everyone." 
  ON products FOR SELECT USING (true);

CREATE POLICY "Company owners can manage their products." 
  ON products FOR ALL USING (
    EXISTS (
      SELECT 1 FROM companies 
      WHERE companies.id = products.company_id AND companies.owner_id = auth.uid()
    )
  );

-- 3. Specs readable by everyone, manageable by product owner.
CREATE POLICY "Public specs are viewable by everyone." 
  ON product_specs FOR SELECT USING (true);

CREATE POLICY "Company owners can manage product specs." 
  ON product_specs FOR ALL USING (
    EXISTS (
      SELECT 1 FROM products 
      JOIN companies ON products.company_id = companies.id
      WHERE products.id = product_specs.product_id AND companies.owner_id = auth.uid()
    )
  );

-- 4. RFQ Requests readable by the specific supplier company owner, insertable by anyone.
CREATE POLICY "Anyone can insert an RFQ request." 
  ON rfq_requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Suppliers can view RFQs sent to their company." 
  ON rfq_requests FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM companies 
      WHERE companies.id = rfq_requests.supplier_company_id AND companies.owner_id = auth.uid()
    )
  );
