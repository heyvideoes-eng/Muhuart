import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import FeaturedShowcase from "@/components/FeaturedShowcase";

export default async function HomePage() {
  // Fetch products for New Arrivals and Best Sellers
  const allProducts = await prisma.product.findMany({ take: 8 });
  const newArrivals = allProducts.slice(0, 4);
  const bestSellers = allProducts.slice(4, 8); // No fallback to avoid repeating sections
  
  const featuredProducts = await prisma.product.findMany({
    where: {
      isFeatured: true
    },
    take: 8
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F6F2] text-[#1A1A1A]">
      
      {/* 1. Premium Hero */}
      <section className="min-h-[80vh] w-full flex flex-col md:flex-row items-stretch bg-[#F8F6F2]">
        <div className="w-full md:w-1/2 relative min-h-[50vh] md:min-h-[80vh]">
          <Image 
            src="/images/hero_bangle_1781172056556.png" 
            alt="Muhurat Hero Banner"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center px-8 py-16 md:px-16 lg:px-24">
          <span className="text-sm uppercase tracking-[0.3em] mb-4 text-[#C6A15B] font-medium">The Auspicious Moment</span>
          <h1 className="text-[40px] md:text-[56px] lg:text-[72px] xl:text-[96px] font-light font-serif mb-6 tracking-wide leading-[1.1] text-[#1A1A1A]">
            Heritage Meets <br /> Modern Elegance
          </h1>
          <div className="w-16 h-[1px] bg-[#E6E1D8] mb-6"></div>
          <p className="text-[16px] md:text-[18px] text-[#5E5E5E] mb-10 max-w-md font-light leading-relaxed">
            Discover mindfully designed, ethically sourced luxury jewelry that celebrates tradition with contemporary sophistication.
          </p>
          <div className="flex gap-8">
            <Link href="/shop" className="group border-b border-[#C6A15B] text-[#C6A15B] pb-1 text-sm tracking-[0.2em] uppercase transition-all duration-300 hover:text-[#1A1A1A] hover:border-[#1A1A1A]">
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      {/* 2. New Arrivals */}
      <section className="py-12 md:py-20 px-[4vw]">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-serif text-[#C6A15B] mb-4">New Arrivals</h2>
          <div className="w-12 h-[1px] bg-[#E6E1D8] mb-6"></div>
          <Link href="/new-arrivals" className="text-xs tracking-[0.2em] uppercase text-[#5E5E5E] hover:text-[#C6A15B] transition-all duration-300">
            View Collection
          </Link>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-[1600px] mx-auto">
          {newArrivals.map((product, idx) => {
            const fallbacks = [
              "/images/pebble_ring_1781172068702.png",
              "/images/linear_pendant_1781172078189.png",
              "/images/arc_earrings_1781172090049.png",
              "/images/form_cuff_1781172100564.png",
            ];
            const fallbackIdx = idx % fallbacks.length;
            const imgUrl = product.image_url || fallbacks[fallbackIdx];
            
            return (
              <Link href={`/product/${product.slug}`} key={product.id} className="group cursor-pointer flex flex-col items-center text-center w-full">
                <div className="w-full aspect-[4/5] bg-[#F8F6F2] border border-[#E6E1D8] relative overflow-hidden mb-6 shadow-sm group-hover:shadow-lg transition-all duration-300">
                  <Image src={imgUrl} alt={product.name} fill className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]" />
                  <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center">
                    <span className="bg-white/90 backdrop-blur-sm border border-[#E6E1D8] text-[#1A1A1A] text-[10px] tracking-widest uppercase px-6 py-3 hover:text-[#C6A15B] transition-colors shadow-lg">
                      Quick View
                    </span>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] mb-2">{product.category || "Jewellery"}</span>
                <h3 className="text-[18px] md:text-[20px] font-serif text-[#1A1A1A] tracking-wide mb-2 group-hover:text-[#C6A15B] transition-colors">{product.name}</h3>
                <p className="text-[16px] md:text-[18px] text-[#5E5E5E]">₹{product.price.toLocaleString('en-IN')}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. Signature Collections */}
      <section className="py-12 md:py-20 px-[4vw]">
        <div className="max-w-[1600px] mx-auto border-t border-b border-[#E6E1D8] py-16 md:py-20">
          <div className="flex flex-col items-center mb-12 md:mb-16 text-center">
            <span className="text-sm uppercase tracking-[0.3em] mb-4 text-[#C6A15B] font-medium">Our Masterpieces</span>
            <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-serif text-[#1A1A1A] tracking-wide mb-6">Signature Collections</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-12">
            {/* Collection 1 */}
            <Link href="/collections/antique-edit" className="flex flex-col items-center group cursor-pointer transition-transform duration-[600ms] ease-out hover:-translate-y-2">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F8F6F2] mb-8">
                <Image 
                  src="/images/layering_detail_1781172127971.png" 
                  alt="The Antique Edit" 
                  fill 
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]" 
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <h3 className="font-serif text-[24px] md:text-[32px] leading-tight mb-3 text-[#C6A15B]">
                  The Antique Edit
                </h3>
                <p className="text-[16px] text-[#5E5E5E] font-light mb-5 max-w-[280px] mx-auto leading-relaxed">
                  Heritage-inspired jewellery crafted for timeless elegance.
                </p>
                <span className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A] relative overflow-hidden pb-1">
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#C6A15B]">Explore Collection &rarr;</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C6A15B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                </span>
              </div>
            </Link>

            {/* Collection 2 */}
            <Link href="/collections/everyday-luxury" className="flex flex-col items-center group cursor-pointer transition-transform duration-[600ms] ease-out hover:-translate-y-2">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F8F6F2] mb-8">
                <Image 
                  src="/images/layering_model_1781172115132.png" 
                  alt="Everyday Luxury" 
                  fill 
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]" 
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <h3 className="font-serif text-[24px] md:text-[32px] leading-tight mb-3 text-[#C6A15B]">
                  Everyday Luxury
                </h3>
                <p className="text-[16px] text-[#5E5E5E] font-light mb-5 max-w-[280px] mx-auto leading-relaxed">
                  Minimalist elegance designed for daily rituals and modern living.
                </p>
                <span className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A] relative overflow-hidden pb-1">
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#C6A15B]">Explore Collection &rarr;</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C6A15B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                </span>
              </div>
            </Link>

            {/* Collection 3 */}
            <Link href="/collections/festive-radiance" className="flex flex-col items-center group cursor-pointer md:col-span-2 lg:col-span-1 md:max-w-md md:mx-auto lg:max-w-none transition-transform duration-[600ms] ease-out hover:-translate-y-2">
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#F8F6F2] mb-8">
                <Image 
                  src="/images/arc_earrings_1781172090049.png" 
                  alt="Festive Radiance" 
                  fill 
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]" 
                />
              </div>
              <div className="flex flex-col items-center text-center">
                <h3 className="font-serif text-[24px] md:text-[32px] leading-tight mb-3 text-[#C6A15B]">
                  Festive Radiance
                </h3>
                <p className="text-[16px] text-[#5E5E5E] font-light mb-5 max-w-[280px] mx-auto leading-relaxed">
                  Statement masterpieces designed for celebration and auspicious moments.
                </p>
                <span className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A] relative overflow-hidden pb-1">
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#C6A15B]">Explore Collection &rarr;</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C6A15B] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                </span>
              </div>
            </Link>
            
          </div>
        </div>
      </section>

      {/* 4. Bridal Collection & 5. Editorial Campaign */}
      <section className="py-0 px-0 flex flex-col md:flex-row items-stretch">
        <div className="w-full md:w-1/2 relative aspect-square md:aspect-auto min-h-[60vh] overflow-hidden bg-[#F8F6F2]">
           <Image src="/images/layering_model_1781172115132.png" alt="Bridal Editorial" fill className="object-cover" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center text-center p-12 md:p-16 lg:p-24 bg-white border-l border-[#E6E1D8]">
          <span className="text-[#C6A15B] text-sm uppercase tracking-[0.3em] mb-4 font-medium">Editorial Campaign</span>
          <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-serif mb-6 leading-[1.1] text-[#1A1A1A]">The Modern <br/> Bridal Trousseau</h2>
          <div className="w-12 h-[1px] bg-[#E6E1D8] mb-8"></div>
          <p className="text-[#5E5E5E] mb-10 max-w-md text-[16px] md:text-[18px] leading-relaxed font-light">
            Curated for the contemporary bride. Discover pieces that honor tradition while embracing modern luxury. Book a personal consultation with our bridal concierges.
          </p>
          <div className="flex gap-8">
            <Link href="/bridal" className="group text-[#C6A15B] border-b border-[#C6A15B] pb-1 text-sm tracking-[0.2em] uppercase hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors text-center">
              View Lookbook
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="py-12 md:py-20 px-[4vw]">
          <div className="flex flex-col items-center mb-12">
            <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-serif text-[#C6A15B] mb-4">Best Sellers</h2>
            <div className="w-12 h-[1px] bg-[#E6E1D8] mb-6"></div>
            <Link href="/best-sellers" className="text-xs tracking-[0.2em] uppercase text-[#5E5E5E] hover:text-[#C6A15B] transition-colors">
              Shop All
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 max-w-[1600px] mx-auto">
            {bestSellers.map((product, idx) => {
              const fallbacks = [
                "/images/form_cuff_1781172100564.png",
                "/images/arc_earrings_1781172090049.png",
                "/images/pebble_ring_1781172068702.png",
                "/images/linear_pendant_1781172078189.png",
              ];
              const fallbackIdx = idx % fallbacks.length;
              const imgUrl = product.image_url || fallbacks[fallbackIdx];
              
              return (
                <Link href={`/product/${product.slug}`} key={product.id + '-bs'} className="group cursor-pointer flex flex-col items-center text-center w-full">
                  <div className="w-full aspect-[4/5] bg-[#F8F6F2] border border-[#E6E1D8] relative overflow-hidden mb-6 shadow-sm group-hover:shadow-lg transition-all duration-300">
                    <Image src={imgUrl} alt={product.name} fill className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]" />
                    <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center">
                      <span className="bg-white/90 backdrop-blur-sm border border-[#E6E1D8] text-[#1A1A1A] text-[10px] tracking-widest uppercase px-6 py-3 hover:text-[#C6A15B] transition-colors shadow-lg">
                        Quick View
                      </span>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#C6A15B] mb-2">{product.category || "Jewellery"}</span>
                  <h3 className="text-[18px] md:text-[20px] font-serif text-[#1A1A1A] tracking-wide mb-2 group-hover:text-[#C6A15B] transition-colors">{product.name}</h3>
                  <p className="text-[16px] md:text-[18px] text-[#5E5E5E]">₹{product.price.toLocaleString('en-IN')}</p>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* 7. Editorial Block (Replaces Reviews) */}
      <section className="py-16 md:py-24 px-[4vw] bg-[#F8F6F2] border-t border-b border-[#E6E1D8]">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
          
          <div className="flex flex-col items-center text-center p-6">
            <span className="text-[#C6A15B] mb-6 flex justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="8"></circle>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>
              </svg>
            </span>
            <h3 className="text-[24px] md:text-[28px] font-serif text-[#1A1A1A] mb-4">Craftsmanship</h3>
            <div className="w-8 h-[1px] bg-[#E6E1D8] mb-4"></div>
            <p className="text-[16px] text-[#5E5E5E] leading-relaxed max-w-xs font-light">
              Meticulously crafted by master artisans using generations of technique and precision.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 md:border-x md:border-[#E6E1D8]">
            <span className="text-[#C6A15B] mb-6 flex justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
              </svg>
            </span>
            <h3 className="text-[24px] md:text-[28px] font-serif text-[#1A1A1A] mb-4">Modern Luxury</h3>
            <div className="w-8 h-[1px] bg-[#E6E1D8] mb-4"></div>
            <p className="text-[16px] text-[#5E5E5E] leading-relaxed max-w-xs font-light">
              A curated blend of historical motifs and contemporary silhouettes for the modern woman.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6">
            <span className="text-[#C6A15B] mb-6 flex justify-center">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                <line x1="7" y1="7" x2="7.01" y2="7"></line>
              </svg>
            </span>
            <h3 className="text-[24px] md:text-[28px] font-serif text-[#1A1A1A] mb-4">Personalized Experience</h3>
            <div className="w-8 h-[1px] bg-[#E6E1D8] mb-4"></div>
            <p className="text-[16px] text-[#5E5E5E] leading-relaxed max-w-xs font-light">
              Bespoke consultations and curated edits tailored specifically to your bridal journey.
            </p>
          </div>

        </div>
      </section>

      {/* 8. Featured Pieces */}
      <section className="py-12 md:py-20 px-[4vw] bg-white flex flex-col items-center border-t border-[#E6E1D8]">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-serif text-[#1A1A1A] mb-4 tracking-wide">Featured Pieces</h2>
          <div className="w-12 h-[1px] bg-[#E6E1D8] mb-6"></div>
          <p className="text-[16px] md:text-[18px] tracking-widest text-[#5E5E5E] font-light max-w-md mx-auto">
            Discover timeless jewellery crafted for modern elegance.
          </p>
        </div>
        
        <FeaturedShowcase products={featuredProducts.length > 0 ? featuredProducts : allProducts} />
      </section>
      
      <div className="w-full bg-[#F8F6F2] py-16 flex justify-center border-y border-[#E6E1D8]">
        <Link href="#" className="text-[16px] font-serif text-[#C6A15B] tracking-[0.2em] uppercase hover:text-[#1A1A1A] transition-colors">
          @MuhuratEssentials
        </Link>
      </div>

      {/* 9. Featured Press */}
      <section className="py-20 md:py-24 px-[4vw] bg-white flex flex-col items-center justify-center text-center">
         <span className="text-sm uppercase tracking-[0.4em] text-[#C6A15B] mb-12 font-medium">As Seen In</span>
         <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-60 transition-all duration-700">
            <span className="text-2xl md:text-3xl font-serif text-[#1A1A1A]">VOGUE</span>
            <span className="text-2xl md:text-3xl font-serif text-[#1A1A1A]">Harper's BAZAAR</span>
            <span className="text-2xl md:text-3xl font-serif text-[#1A1A1A]">ELLE</span>
            <span className="text-2xl md:text-3xl font-serif text-[#1A1A1A]">GQ</span>
         </div>
      </section>

      {/* 10. Jewelry Care Section & 11. Newsletter */}
      <section className="py-0 px-0 flex flex-col md:flex-row items-stretch border-t border-[#E6E1D8]">
        <div className="w-full md:w-1/2 p-12 md:p-24 lg:p-32 flex flex-col justify-center bg-[#F8F6F2] border-r border-[#E6E1D8]">
          <h2 className="text-[32px] md:text-[48px] font-serif mb-6 text-[#1A1A1A]">The Care Guide</h2>
          <div className="w-12 h-[1px] bg-[#E6E1D8] mb-8"></div>
          <p className="text-[#5E5E5E] mb-12 text-[16px] md:text-[18px] leading-relaxed max-w-md font-light">
            Our pieces are designed to last lifetimes. Learn how to care for your artificial antique jewelry, store it properly, and preserve its royal finish.
          </p>
          <Link href="/journal/care-guide" className="w-max text-sm tracking-[0.2em] uppercase border-b border-[#C6A15B] text-[#C6A15B] pb-1 hover:text-[#1A1A1A] hover:border-[#1A1A1A] transition-colors">
            Read The Guide
          </Link>
        </div>
        <div className="w-full md:w-1/2 p-12 md:p-24 lg:p-32 flex flex-col justify-center items-center text-center bg-white">
          <span className="text-sm uppercase tracking-[0.3em] text-[#C6A15B] mb-4 font-medium">Newsletter</span>
          <h2 className="text-[32px] md:text-[48px] font-serif mb-6 text-[#1A1A1A]">Join The Inner Circle</h2>
          <p className="text-[16px] md:text-[18px] text-[#5E5E5E] mb-12 max-w-sm font-light">Sign up for exclusive access to new collections, bridal events, and VIP promotions.</p>
          <div className="flex w-full max-w-md border-b border-[#E6E1D8] hover:border-[#1A1A1A] transition-colors">
            <input type="email" placeholder="Email Address" className="w-full py-4 px-2 outline-none text-[16px] bg-transparent text-[#1A1A1A] placeholder-[#5E5E5E] font-light" />
            <button className="text-sm tracking-[0.2em] uppercase text-[#1A1A1A] font-medium px-6 hover:text-[#C6A15B] transition-colors">Subscribe</button>
          </div>
        </div>
      </section>

    </div>
  );
}
