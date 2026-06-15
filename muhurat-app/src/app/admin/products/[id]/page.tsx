"use client";

import { useEffect, useState, use } from "react";
import { supabase, Product } from "@/lib/supabase";
import ImageUploader from "@/components/admin/ImageUploader";
import { Loader2, ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductEditor({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase.from('products').select('*').eq('id', productId).single();
      if (data) setProduct(data);
      setLoading(false);
    }
    fetchProduct();
  }, [productId]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setSaving(true);
    
    // We update all fields except id, created_at, updated_at
    const { error } = await supabase.from('products').update({
      name: product.name,
      slug: product.slug,
      description: product.description,
      price: product.price,
      sale_price: product.sale_price,
      category: product.category,
      collection: product.collection,
      material: product.material,
    }).eq('id', productId);

    setSaving(false);
    if (error) alert("Error saving: " + error.message);
    else router.push('/admin/products');
  };

  if (loading) return (
    <div className="flex justify-center py-40">
      <Loader2 className="animate-spin text-[#C9A15A]" size={40} />
    </div>
  );

  if (!product) return <div className="text-white">Product not found.</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/products" className="p-2 border border-gray-200 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-serif text-[#C9A15A] tracking-wide">Edit Product</h1>
          <p className="text-xs text-gray-500 mt-1">{productId}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Form */}
        <div className="lg:col-span-2 space-y-6">
          <form id="product-form" onSubmit={handleSave} className="bg-white border border-gray-200 p-6 md:p-8 rounded-xl space-y-6 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Product Name</label>
                <input required value={product.name} onChange={e => setProduct({...product, name: e.target.value})} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-900 outline-none focus:border-[#C9A15A] transition-colors" />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Slug</label>
                <input required value={product.slug} onChange={e => setProduct({...product, slug: e.target.value})} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-900 outline-none focus:border-[#C9A15A] transition-colors" />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Category</label>
                <select required value={product.category || ""} onChange={e => setProduct({...product, category: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-900 outline-none focus:border-[#C9A15A] transition-colors">
                  <option value="">Select Category...</option>
                  <option value="rings">Rings</option>
                  <option value="necklaces">Necklaces</option>
                  <option value="earrings">Earrings</option>
                  <option value="bracelets">Bracelets</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Price (₹)</label>
                <input required value={product.price} onChange={e => setProduct({...product, price: parseFloat(e.target.value)})} type="number" className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-900 outline-none focus:border-[#C9A15A] transition-colors" />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Sale Price (Optional)</label>
                <input value={product.sale_price || ""} onChange={e => setProduct({...product, sale_price: e.target.value ? parseFloat(e.target.value) : null})} type="number" className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-900 outline-none focus:border-[#C9A15A] transition-colors" />
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Description</label>
                <textarea rows={5} value={product.description || ""} onChange={e => setProduct({...product, description: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-900 outline-none focus:border-[#C9A15A] transition-colors resize-none" />
              </div>
            </div>
          </form>
        </div>

        {/* Right Column: Media Manager */}
        <div className="space-y-6">
          <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
            <h2 className="text-sm uppercase tracking-widest text-gray-900 mb-4">Media Manager</h2>
            <ImageUploader 
              productId={product.id} 
              currentImageUrl={product.image_url} 
              onUploadComplete={(url) => setProduct({...product, image_url: url})} 
            />
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              Main product image. Changes here are synced instantly to the storefront via Supabase Realtime.
            </p>
          </div>

          <button 
            type="submit" 
            form="product-form"
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 bg-[#C9A15A] text-white px-6 py-4 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#b8914b] transition-colors disabled:opacity-50"
          >
            {saving ? <Loader2 className="animate-spin" size={18} /> : <><Save size={18} /> Save Changes</>}
          </button>
        </div>

      </div>
    </div>
  );
}
