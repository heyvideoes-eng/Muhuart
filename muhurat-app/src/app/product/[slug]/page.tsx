import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Heart, ShoppingBag, Truck, ShieldCheck, ArrowRight } from "lucide-react";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product) return { title: "Product Not Found" };

  return {
    title: `${product.name} | MUHURAT Essentials`,
    description: product.description || `Buy ${product.name} luxury jewelry.`,
  };
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
  });

  if (!product) {
    notFound();
  }

  const galleryImages = product.gallery_images && typeof product.gallery_images === 'string' 
    ? JSON.parse(product.gallery_images) 
    : [];
  
  const mainImage = product.image_url || (galleryImages[0] ?? "/images/pebble_ring_1781172068702.png");

  // Fetch related products
  const relatedProducts = await prisma.product.findMany({
    where: { category: product.category, id: { not: product.id } },
    take: 4,
  });

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1A1A1A] pt-24 md:pt-32 pb-20">
      <div className="max-w-[1600px] mx-auto w-full px-[4vw] grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
        
        {/* Left Column: Image Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative w-full aspect-[4/5] bg-[#F8F6F2] overflow-hidden">
            <Image 
              src={mainImage}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {galleryImages.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {galleryImages.slice(1, 5).map((img: string, idx: number) => (
                <div key={idx} className="relative w-full aspect-square bg-[#F8F6F2] cursor-pointer hover:opacity-80 transition-opacity">
                  <Image src={img} alt={`${product.name} view ${idx+2}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Info */}
        <div className="flex flex-col pt-8 md:pt-16">
          <div className="mb-8">
            <span className="text-[#C6A15B] text-xs uppercase tracking-[0.2em] mb-4 block">
              {product.category || "Jewelry"} / {product.collection || "Signature"}
            </span>
            <h1 className="text-[32px] md:text-[48px] font-serif leading-[1.1] mb-6 text-[#1A1A1A]">
              {product.name}
            </h1>
            <p className="text-[20px] md:text-[24px] text-[#5E5E5E] tracking-wider mb-6">
              ₹{Number(product.price).toLocaleString('en-IN')}
            </p>
          </div>

          <div className="w-full h-[1px] bg-[#E6E1D8] mb-8"></div>

          <p className="text-[#5E5E5E] leading-relaxed font-light mb-10">
            {product.description || "A masterpiece of modern design and heritage craftsmanship. This piece is meticulously hand-finished to ensure a flawless presentation suitable for life's most auspicious moments."}
          </p>

          <div className="flex flex-col gap-4 mb-12">
            <button className="w-full bg-[#1A1A1A] text-white py-5 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em] hover:bg-[#C6A15B] transition-colors duration-300">
              <ShoppingBag size={18} />
              Add To Cart
            </button>
            <button className="w-full bg-transparent border border-[#E6E1D8] text-[#1A1A1A] py-5 flex items-center justify-center gap-3 text-sm uppercase tracking-[0.2em] hover:border-[#1A1A1A] transition-colors duration-300">
              <Heart size={18} />
              Add To Wishlist
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-8 border-t border-[#E6E1D8]">
            <div className="flex items-start gap-4">
              <Truck size={24} className="text-[#C6A15B]" strokeWidth={1.5} />
              <div>
                <h4 className="text-sm font-medium mb-1">Complimentary Shipping</h4>
                <p className="text-xs text-[#5E5E5E] font-light">On all orders over ₹10,000.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ShieldCheck size={24} className="text-[#C6A15B]" strokeWidth={1.5} />
              <div>
                <h4 className="text-sm font-medium mb-1">Lifetime Warranty</h4>
                <p className="text-xs text-[#5E5E5E] font-light">Crafted to last generations.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-32 pt-20 border-t border-[#E6E1D8] px-[4vw]">
          <div className="max-w-[1600px] mx-auto">
            <div className="flex justify-between items-end mb-12">
              <h2 className="text-[28px] md:text-[40px] font-serif text-[#1A1A1A]">You May Also Like</h2>
              <Link href="/shop" className="text-xs uppercase tracking-[0.2em] border-b border-[#C6A15B] text-[#C6A15B] pb-1 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors hidden md:block">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map(rp => (
                <Link href={`/product/${rp.slug}`} key={rp.id} className="group flex flex-col items-center text-center">
                  <div className="w-full aspect-[4/5] bg-[#F8F6F2] overflow-hidden mb-6">
                    <Image 
                      src={rp.image_url || "/images/pebble_ring_1781172068702.png"} 
                      alt={rp.name} 
                      width={400} 
                      height={500} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <h3 className="text-[18px] font-serif text-[#1A1A1A] mb-2 group-hover:text-[#C6A15B] transition-colors">{rp.name}</h3>
                  <p className="text-[#5E5E5E]">₹{Number(rp.price).toLocaleString('en-IN')}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
