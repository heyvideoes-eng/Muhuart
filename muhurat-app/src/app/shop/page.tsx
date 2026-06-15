import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ShopNav from "@/components/ShopNav";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Jewelry | MUHURAT Essentials",
  description: "Explore our complete archive of heirloom-quality luxury jewelry, designed for modern celebrations.",
};

export default async function ShopPage() {
  // Fetch real products from SQLite Database
  const products = await prisma.product.findMany();

  return (
    <div className="flex flex-col min-h-screen px-[4vw] py-12 bg-background text-text-primary">
      {/* Category Hero */}
      <div className="mb-16 md:mb-24 text-center max-w-3xl mx-auto pt-8">
        <h1 className="text-[40px] md:text-[56px] lg:text-[72px] font-serif text-[#1A1A1A] mb-6 tracking-wide leading-[1.1]">The Complete Collection</h1>
        <div className="w-16 h-[1px] bg-[#E6E1D8] mx-auto mb-6"></div>
        <p className="text-[16px] md:text-[18px] text-[#5E5E5E] font-light leading-relaxed">
          Explore our complete archive of heirloom-quality luxury jewelry, meticulously crafted to celebrate every occasion and balance tradition with contemporary design.
        </p>
      </div>

      <ShopNav />

      <div className="flex flex-col md:flex-row gap-12 mt-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex flex-col gap-10">
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest text-gold-primary">Material</h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><label className="flex items-center gap-3 cursor-pointer hover:text-gold-hover transition-colors"><input type="checkbox" className="accent-gold-primary w-4 h-4" /> Antique Gold</label></li>
              <li><label className="flex items-center gap-3 cursor-pointer hover:text-gold-hover transition-colors"><input type="checkbox" className="accent-gold-primary w-4 h-4" /> Rose Gold</label></li>
              <li><label className="flex items-center gap-3 cursor-pointer hover:text-gold-hover transition-colors"><input type="checkbox" className="accent-gold-primary w-4 h-4" /> Silver</label></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest text-gold-primary">Price Range</h3>
            <input type="range" min="0" max="1000" className="w-full accent-gold-primary cursor-pointer" />
            <div className="flex justify-between text-xs mt-2 text-text-secondary">
              <span>₹0</span>
              <span>₹100000+</span>
            </div>
          </div>
        </aside>

        {/* Main Content Grid */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-border">
            <span className="text-sm text-text-secondary">{products.length} Products</span>
            <select className="border border-border text-sm bg-surface text-text-primary py-2 px-4 outline-none cursor-pointer focus:border-gold-primary transition-colors">
              <option>Sort by: Featured</option>
              <option>Sort by: Newest</option>
              <option>Sort by: Price (Low to High)</option>
              <option>Sort by: Price (High to Low)</option>
            </select>
          </div>

          {/* Dynamic Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => {
              const mainImage = product.image_url || "/images/pebble_ring_1781172068702.png";
              
              return (
                <div key={product.id} className="flex flex-col group cursor-pointer">
                  <div className="aspect-[4/5] bg-surface relative overflow-hidden mb-4 border border-transparent transition-all duration-500 group-hover:border-gold-primary/30">
                    <Image 
                      src={mainImage} 
                      alt={product.name} 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-4">
                      <button className="w-full bg-gold-primary text-background py-3 text-xs font-medium uppercase tracking-widest hover:bg-gold-hover transition-colors shadow-lg">
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="text-sm flex flex-col gap-2 p-2 text-center">
                    <span className="font-serif text-[18px] md:text-[20px] text-[#1A1A1A] group-hover:text-[#C6A15B] transition-colors">{product.name}</span>
                    <div className="flex justify-between items-center">
                      <span className="text-gold-primary tracking-wide">₹{product.price.toFixed(2)}</span>
                      <span className="text-text-secondary text-xs uppercase tracking-wider">{product.material || "Gold"}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {products.length === 0 && (
            <div className="text-center py-20 text-text-secondary font-serif text-xl">
              No pieces found in the archive.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
