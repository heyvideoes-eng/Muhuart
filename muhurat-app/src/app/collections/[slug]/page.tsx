import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import FeaturedShowcase from "@/components/FeaturedShowcase";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const collection = await prisma.collection.findUnique({
    where: { slug: params.slug },
  });

  if (!collection) return { title: "Collection Not Found" };

  return {
    title: `${collection.name} | MUHURAT Essentials`,
    description: collection.description || `Discover the ${collection.name} collection.`,
  };
}

export default async function CollectionDetailPage({ params }: { params: { slug: string } }) {
  const collection = await prisma.collection.findUnique({
    where: { slug: params.slug },
  });

  if (!collection) {
    notFound();
  }

  // Fetch products that belong to this collection
  const products = await prisma.product.findMany({
    where: { collection: collection.name },
  });

  return (
    <div className="flex flex-col min-h-screen bg-white text-[#1A1A1A]">
      {/* Collection Hero */}
      <section className="relative w-full h-[60vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-[#F8F6F2]">
        <Image 
          src={collection.banner_image_url || "/images/layering_model_1781172115132.png"} 
          alt={collection.name} 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white px-4">
          <span className="text-xs uppercase tracking-[0.4em] mb-4 block text-white/80">Collection</span>
          <h1 className="text-[40px] md:text-[64px] lg:text-[80px] font-serif tracking-wide leading-[1.1] mb-6">
            {collection.name}
          </h1>
        </div>
      </section>

      {/* Collection Story */}
      <section className="py-20 md:py-32 px-[4vw] bg-[#F8F6F2] border-b border-[#E6E1D8]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-[28px] md:text-[40px] font-serif text-[#1A1A1A] mb-8">The Inspiration</h2>
          <div className="w-12 h-[1px] bg-[#E6E1D8] mx-auto mb-8"></div>
          <p className="text-[16px] md:text-[18px] text-[#5E5E5E] font-light leading-relaxed">
            {collection.description || "An exclusive curation of heirloom pieces designed to celebrate life's most precious moments. Every piece reflects an intricate balance between historical craftsmanship and modern aesthetics."}
          </p>
        </div>
      </section>

      {/* Product Gallery */}
      <section className="py-20 md:py-32 px-[4vw]">
        <div className="flex justify-between items-center mb-12 max-w-[1600px] mx-auto border-b border-[#E6E1D8] pb-6">
          <h2 className="text-[24px] md:text-[32px] font-serif text-[#1A1A1A]">The Pieces</h2>
          <span className="text-sm text-[#5E5E5E] tracking-widest uppercase">{products.length} Designs</span>
        </div>

        {products.length > 0 ? (
          <FeaturedShowcase products={products} />
        ) : (
          <div className="text-center py-20">
            <p className="text-[18px] text-[#5E5E5E] font-light mb-8">This collection is currently being curated. Please check back soon.</p>
            <Link href="/shop" className="text-sm uppercase tracking-[0.2em] border-b border-[#C6A15B] text-[#C6A15B] pb-1 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors">
              Explore All Jewelry
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
