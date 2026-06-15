"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye } from "lucide-react";
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import { useRealtimeProducts } from "./RealtimeProductsProvider";

type Product = {
  id: string;
  name: string;
  slug: string;
  price: number | any;
  category: string;
  image_url?: string;
  featured?: boolean;
};

export default function FeaturedShowcase({ products: initialProducts }: { products: Product[] }) {
  const [key, setKey] = useState("all");
  const products = useRealtimeProducts(initialProducts as any);

  return (
    <div className="flex flex-col items-center w-full max-w-[1600px] mx-auto">
      {/* Filters */}
      <ToggleGroup
        type="single"
        className="mb-12 border border-gray-200 rounded-full p-1 bg-white shadow-sm"
        value={key}
        onValueChange={(e) => {
          if (e) setKey(e); // prevent deselecting all
        }}
      >
        <ToggleGroupItem value="all" className="rounded-full px-6 py-2 text-xs uppercase tracking-widest text-[#5E5E5E] data-[state=on]:bg-[#C6A15B] data-[state=on]:text-[#1A1A1A] transition-colors">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="Rings" className="rounded-full px-6 py-2 text-xs uppercase tracking-widest text-[#5E5E5E] data-[state=on]:bg-[#C6A15B] data-[state=on]:text-[#1A1A1A] transition-colors">
          Rings
        </ToggleGroupItem>
        <ToggleGroupItem value="Earrings" className="rounded-full px-6 py-2 text-xs uppercase tracking-widest text-[#5E5E5E] data-[state=on]:bg-[#C6A15B] data-[state=on]:text-[#1A1A1A] transition-colors">
          Earrings
        </ToggleGroupItem>
        <ToggleGroupItem value="Necklaces" className="rounded-full px-6 py-2 text-xs uppercase tracking-widest text-[#5E5E5E] data-[state=on]:bg-[#C6A15B] data-[state=on]:text-[#1A1A1A] transition-colors">
          Necklaces
        </ToggleGroupItem>
        <ToggleGroupItem value="Bracelets" className="rounded-full px-6 py-2 text-xs uppercase tracking-widest text-[#5E5E5E] data-[state=on]:bg-[#C6A15B] data-[state=on]:text-[#1A1A1A] transition-colors">
          Bracelets
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Grid */}
      <FlipReveal 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-8 w-full" 
        keys={[key]} 
        showClass="flex" 
        hideClass="hidden"
      >
        {products.map((product) => {
          const fallbacks = [
            "/images/pebble_ring_1781172068702.png",
            "/images/linear_pendant_1781172078189.png",
            "/images/arc_earrings_1781172090049.png",
            "/images/form_cuff_1781172100564.png",
          ];
          const fallbackIdx = product.id ? product.id.charCodeAt(product.id.length - 1) % fallbacks.length : 0;
          const imgUrl = product.image_url || fallbacks[fallbackIdx];
          
          return (
            <FlipRevealItem key={product.id} flipKey={product.category} className="flex w-full">
              <div className="group relative flex flex-col w-full bg-[#F8F6F2] border border-[#E6E1D8] hover:border-[#C6A15B]/30 hover:shadow-lg transition-all duration-500 hover:-translate-y-[6px]">
                
                {/* Image Container */}
                <Link href={`/product/${product.slug}`} className="relative w-full aspect-[4/5] overflow-hidden block bg-[#F8F6F2]">
                  <Image 
                    src={imgUrl} 
                    alt={product.name} 
                    fill 
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]" 
                  />
                  
                  {/* Badges */}
                  {product.featured && (
                    <div className="absolute top-4 left-4 z-10 bg-[#C6A15B] text-[#1A1A1A] text-[10px] uppercase tracking-widest px-3 py-1 font-medium">
                      Featured
                    </div>
                  )}

                  {/* Quick Actions (Hover) */}
                  <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white/90 backdrop-blur-md border border-[#E6E1D8] text-[#1A1A1A] p-2 hover:bg-[#C6A15B] hover:text-[#1A1A1A] hover:border-[#C6A15B] transition-colors rounded-full shadow-lg" aria-label="Add to Wishlist">
                      <Heart size={18} strokeWidth={1.5} />
                    </button>
                    <button className="bg-white/90 backdrop-blur-md border border-[#E6E1D8] text-[#1A1A1A] p-2 hover:bg-[#C6A15B] hover:text-[#1A1A1A] hover:border-[#C6A15B] transition-colors rounded-full shadow-lg" aria-label="Quick View">
                      <Eye size={18} strokeWidth={1.5} />
                    </button>
                  </div>
                </Link>

                {/* Content Container */}
                <div className="flex flex-col flex-1 p-6 text-center">
                  <span className="text-[10px] text-[#C6A15B] uppercase tracking-[0.2em] mb-2">{product.category}</span>
                  <Link href={`/product/${product.slug}`}>
                    <h3 className="text-[18px] md:text-[20px] font-serif text-[#1A1A1A] tracking-wide mb-3 group-hover:text-[#C6A15B] transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-[16px] md:text-[18px] text-[#5E5E5E] mb-6">₹{product.price.toLocaleString('en-IN')}</p>
                  
                  <div className="mt-auto">
                    <Link href={`/product/${product.slug}`} className="inline-flex text-xs tracking-[0.2em] uppercase text-[#1A1A1A] relative overflow-hidden pb-1">
                      <span className="relative z-10 transition-colors duration-300 group-hover:text-[#C6A15B]">View Details &rarr;</span>
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C6A15B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                    </Link>
                  </div>
                </div>

              </div>
            </FlipRevealItem>
          );
        })}
      </FlipReveal>
    </div>
  );
}
