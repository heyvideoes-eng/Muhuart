import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Ensure the client warns clearly if variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials are missing. Please provide NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.");
}

export const supabase = createClient(supabaseUrl || "https://placeholder.supabase.co", supabaseAnonKey || "placeholder-key")

export type Product = {
  id: string
  name: string
  slug: string
  description: string | null
  short_description: string | null
  price: number
  sale_price: number | null
  sku: string | null
  stock: number
  category: string | null
  collection: string | null
  material: string | null
  featured: boolean
  best_seller: boolean
  new_arrival: boolean
  image_url: string | null
  created_at: string
  updated_at: string
}
