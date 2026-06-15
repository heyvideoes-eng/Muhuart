-- ==============================================================================
-- MUHURAT ESSENTIALS - SUPABASE POSTGRESQL SCHEMA
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE order_status AS ENUM ('PENDING', 'CONFIRMED', 'PACKED', 'SHIPPED', 'DELIVERED', 'CANCELLED');
CREATE TYPE user_role AS ENUM ('CUSTOMER', 'ADMIN', 'SUPER_ADMIN', 'CONTENT_MANAGER', 'CUSTOMER_SUPPORT');

-- ==============================================================================
-- TABLES
-- ==============================================================================

-- USERS (Extending auth.users or standalone if not using Supabase Auth yet)
CREATE TABLE users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  -- If using Supabase Auth, id should map to auth.users.id
  email text UNIQUE NOT NULL,
  full_name text,
  phone text,
  role user_role DEFAULT 'CUSTOMER',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- PRODUCTS
CREATE TABLE products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  short_description text,
  price numeric(10,2) NOT NULL,
  sale_price numeric(10,2),
  sku text UNIQUE,
  stock integer DEFAULT 0,
  category text,
  collection text,
  material text,
  featured boolean DEFAULT false,
  best_seller boolean DEFAULT false,
  new_arrival boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- PRODUCT IMAGES
CREATE TABLE product_images (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  storage_path text NOT NULL,
  alt_text text,
  is_primary boolean DEFAULT false,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now()
);

-- INDEXES
CREATE INDEX idx_product_images_product ON product_images(product_id);
CREATE INDEX idx_product_images_sort ON product_images(sort_order);

-- AUTO UPDATE TIMESTAMP
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_products_updated_at ON products;

CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE PROCEDURE update_updated_at_column();

-- COLLECTIONS
CREATE TABLE collections (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  banner_image_url text,
  seo_title text,
  seo_description text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ORDERS
CREATE TABLE orders (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  status order_status DEFAULT 'PENDING',
  total_amount numeric NOT NULL,
  payment_method text,
  payment_status text DEFAULT 'PENDING',
  shipping_address jsonb NOT NULL,
  billing_address jsonb NOT NULL,
  tracking_number text,
  invoice_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ORDER ITEMS
CREATE TABLE order_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id uuid REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid REFERENCES products(id) ON DELETE RESTRICT,
  quantity integer NOT NULL,
  price_at_time numeric NOT NULL
);

-- REVIEWS
CREATE TABLE reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  title text,
  content text,
  status text DEFAULT 'PENDING', -- PENDING, APPROVED, REJECTED
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- COUPONS
CREATE TABLE coupons (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  code text UNIQUE NOT NULL,
  discount_type text NOT NULL, -- PERCENTAGE, FIXED
  discount_value numeric NOT NULL,
  min_order_value numeric,
  usage_limit integer,
  times_used integer DEFAULT 0,
  is_active boolean DEFAULT true,
  expires_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- NEWSLETTER SUBSCRIBERS
CREATE TABLE newsletter_subscribers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  email text UNIQUE NOT NULL,
  is_active boolean DEFAULT true,
  subscribed_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==============================================================================
-- REALTIME
-- ==============================================================================

-- Drop existing publication if modifying
DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime;

-- Enable Realtime for critical tables
ALTER PUBLICATION supabase_realtime ADD TABLE products;
ALTER PUBLICATION supabase_realtime ADD TABLE product_images;
ALTER PUBLICATION supabase_realtime ADD TABLE orders;
ALTER PUBLICATION supabase_realtime ADD TABLE collections;

-- ==============================================================================
-- SECURITY & ROW LEVEL SECURITY (RLS)
-- ==============================================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;

-- PRODUCTS POLICIES
CREATE POLICY "Public Read Access" ON products FOR SELECT USING (true);
CREATE POLICY "Admin All Access" ON products FOR ALL USING (true); -- Replace 'true' with auth.role() = 'authenticated' in prod

-- PRODUCT IMAGES POLICIES
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public Read Access" ON product_images FOR SELECT USING (true);
CREATE POLICY "Admin All Access" ON product_images FOR ALL USING (true);

-- COLLECTIONS POLICIES
CREATE POLICY "Public Read Access" ON collections FOR SELECT USING (true);
CREATE POLICY "Admin All Access" ON collections FOR ALL USING (true);

-- ==============================================================================
-- STORAGE
-- ==============================================================================

-- Create Storage Buckets
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('products', 'products', true),
  ('collections', 'collections', true)
ON CONFLICT DO NOTHING;

-- Public Read Access for Storage
CREATE POLICY "Public Read Access for Products" ON storage.objects FOR SELECT USING (bucket_id = 'products');
CREATE POLICY "Public Read Access for Collections" ON storage.objects FOR SELECT USING (bucket_id = 'collections');

-- Admin Access for Storage (Set to true for dev ease, restrict with auth.uid() in prod)
CREATE POLICY "Admin Upload Access" ON storage.objects FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin Update Access" ON storage.objects FOR UPDATE USING (true);
CREATE POLICY "Admin Delete Access" ON storage.objects FOR DELETE USING (true);
