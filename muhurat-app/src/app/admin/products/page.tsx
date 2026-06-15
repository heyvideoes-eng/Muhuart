"use client";

import { useEffect, useState } from "react";
import { supabase, Product } from "@/lib/supabase";
import ImageUploader from "@/components/admin/ImageUploader";
import { Loader2, Plus, Edit, Trash, CheckCircle, Search, Filter, MoreHorizontal } from "lucide-react";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [isAdding, setIsAdding] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "", slug: "", price: 0, category: "", description: ""
  });

  useEffect(() => {
    fetchProducts();
    const channel = supabase.channel('admin-products-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, () => {
         fetchProducts();
      }).subscribe();
    return () => { supabase.removeChannel(channel); }
  }, []);

  async function fetchProducts() {
    setLoading(true);
    try {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setProducts(data || []);
      setError(null);
    } catch (e: any) {
      console.warn("Supabase fetch failed:", e.message);
      setError("Please connect your Supabase database and ensure the schema is created.");
    } finally {
      setLoading(false);
    }
  }

  async function handleAddProduct(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.from('products').insert([{ ...newProduct }]);
    if (error) {
      alert("Error adding product: " + error.message);
    } else {
      setIsAdding(false);
      setNewProduct({ name: "", slug: "", price: 0, category: "", description: "" });
      fetchProducts();
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this product?")) return;
    await supabase.from('products').delete().eq('id', id);
    fetchProducts();
  }

  async function toggleStatus(id: string, field: 'featured' | 'best_seller' | 'new_arrival', currentValue: boolean) {
    await supabase.from('products').update({ [field]: !currentValue }).eq('id', id);
  }

  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif text-[#C9A15A] tracking-wide mb-1">Products</h1>
          <p className="text-sm text-gray-500">Manage your inventory, pricing, and live media.</p>
        </div>
        <button 
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center gap-2 bg-[#C9A15A] text-white px-6 py-2.5 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-[#b8914b] transition-colors"
        >
          {isAdding ? "Cancel" : <><Plus size={16} /> New Product</>}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-md text-sm">
          {error}
        </div>
      )}

      {isAdding && (
        <form onSubmit={handleAddProduct} className="bg-white border border-gray-200 p-6 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6 shadow-sm animate-in fade-in slide-in-from-top-4">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Product Name</label>
            <input required value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-')})} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-900 outline-none focus:border-[#C9A15A] transition-colors" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Slug</label>
            <input required value={newProduct.slug} onChange={e => setNewProduct({...newProduct, slug: e.target.value})} type="text" className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-900 outline-none focus:border-[#C9A15A] transition-colors" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Price (₹)</label>
            <input required value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})} type="number" className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-900 outline-none focus:border-[#C9A15A] transition-colors" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">Category</label>
            <select required value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})} className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 text-sm text-gray-900 outline-none focus:border-[#C9A15A] transition-colors">
              <option value="">Select Category...</option>
              <option value="rings">Rings</option>
              <option value="necklaces">Necklaces</option>
              <option value="earrings">Earrings</option>
              <option value="bracelets">Bracelets</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-[#C9A15A] text-white px-6 py-3 rounded-md text-xs font-bold uppercase tracking-widest hover:bg-[#b8914b] transition-colors">
              Save Product
            </button>
          </div>
        </form>
      )}

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between gap-4 bg-white border border-gray-200 p-4 rounded-xl shadow-sm">
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-2 flex-1 max-w-md text-sm text-gray-500">
          <Search size={16} className="mr-2" />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none flex-1 text-gray-900 placeholder:text-gray-400" 
          />
        </div>
        <button className="flex items-center gap-2 border border-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition-colors">
          <Filter size={16} /> Filter
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-[#C9A15A]" size={32} />
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-20 text-gray-500 border border-dashed border-gray-300 rounded-xl">
          No products found. Adjust your search or add a new product.
        </div>
      ) : (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left text-sm text-gray-500">
            <thead className="bg-gray-50 text-xs uppercase tracking-widest text-gray-700 border-b border-gray-200">
              <tr>
                <th className="p-4 font-medium">Product</th>
                <th className="p-4 font-medium">Category</th>
                <th className="p-4 font-medium">Price</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-md bg-gray-50 border border-gray-200 overflow-hidden relative shrink-0">
                      {product.image_url ? (
                        <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">No Img</div>
                      )}
                    </div>
                    <div>
                      <p className="font-serif text-base text-gray-900 group-hover:text-[#C9A15A] transition-colors">{product.name}</p>
                      <p className="text-xs mt-0.5">{product.slug}</p>
                    </div>
                  </td>
                  <td className="p-4 capitalize">{product.category}</td>
                  <td className="p-4">₹{product.price.toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded text-[10px] uppercase tracking-wider cursor-pointer transition-colors ${product.featured ? 'bg-[#C9A15A]/20 text-[#C9A15A]' : 'bg-gray-100 text-gray-500 hover:bg-[#C9A15A]/10'}`} onClick={() => toggleStatus(product.id, 'featured', product.featured)}>
                        Featured
                      </span>
                      <span className={`px-2 py-1 rounded text-[10px] uppercase tracking-wider cursor-pointer transition-colors ${product.best_seller ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500 hover:bg-green-50'}`} onClick={() => toggleStatus(product.id, 'best_seller', product.best_seller)}>
                        Best Seller
                      </span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-900 transition-colors rounded-md hover:bg-gray-100">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(product.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-md hover:bg-red-50">
                        <Trash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
