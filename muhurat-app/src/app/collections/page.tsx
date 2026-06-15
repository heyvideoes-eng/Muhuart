import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections | MUHURAT Essentials",
  description: "Discover our curated collections of luxury jewelry.",
};

export default async function CollectionsPage() {
  const collections = await prisma.collection.findMany();

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F6F2] text-[#1A1A1A]">
      <div className="py-20 md:py-32 px-[4vw] text-center max-w-3xl mx-auto pt-32">
        <h1 className="text-[40px] md:text-[56px] lg:text-[72px] font-serif mb-6 tracking-wide leading-[1.1] text-[#1A1A1A]">
          Our Masterpieces
        </h1>
        <div className="w-16 h-[1px] bg-[#E6E1D8] mx-auto mb-6"></div>
        <p className="text-[16px] md:text-[18px] text-[#5E5E5E] font-light leading-relaxed">
          Curated edits of historical motifs and contemporary silhouettes for the modern woman.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 px-[4vw] pb-32 max-w-[1600px] mx-auto w-full">
        {collections.map((collection) => (
          <Link href={`/collections/${collection.slug}`} key={collection.id} className="group cursor-pointer flex flex-col items-center transition-transform duration-[600ms] ease-out hover:-translate-y-2">
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F8F6F2] mb-8 border border-[#E6E1D8]">
              <Image 
                src={collection.banner_image_url || "/images/layering_detail_1781172127971.png"} 
                alt={collection.name} 
                fill 
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]" 
              />
            </div>
            <div className="flex flex-col items-center text-center px-4">
              <h3 className="font-serif text-[24px] md:text-[32px] leading-tight mb-3 text-[#1A1A1A] group-hover:text-[#C6A15B] transition-colors">
                {collection.name}
              </h3>
              <p className="text-[16px] text-[#5E5E5E] font-light mb-5 max-w-[280px] mx-auto leading-relaxed line-clamp-2">
                {collection.description || "Discover the essence of luxury."}
              </p>
              <span className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A] relative overflow-hidden pb-1">
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#C6A15B]">Explore Collection &rarr;</span>
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C6A15B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
              </span>
            </div>
          </Link>
        ))}

        {collections.length === 0 && (
          <div className="col-span-full text-center py-20 text-[#5E5E5E] font-serif text-[20px]">
            New collections arriving soon.
          </div>
        )}
      </div>
    </div>
  );
}
