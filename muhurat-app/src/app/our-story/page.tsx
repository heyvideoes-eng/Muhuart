"use client";

import Image from "next/image";
import { FlipReveal, FlipRevealItem } from "@/components/ui/flip-reveal";

export default function OurStoryPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F6F2] text-[#1A1A1A]">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="/images/layering_detail_1781172127971.png" 
          alt="Our Heritage" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4">
          <span className="text-xs uppercase tracking-[0.4em] mb-4 block text-white/80">Heritage & Craft</span>
          <h1 className="text-[40px] md:text-[64px] lg:text-[80px] font-serif tracking-wide leading-[1.1] mb-6">
            Our Story
          </h1>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-32 px-[4vw] bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-[32px] md:text-[48px] font-serif text-[#1A1A1A] mb-8">A Legacy of Elegance</h2>
          <div className="w-12 h-[1px] bg-[#E6E1D8] mx-auto mb-8"></div>
          <p className="text-[18px] md:text-[24px] text-[#5E5E5E] font-light leading-relaxed mb-12">
            MUHURAT Essentials was founded on a singular vision: to bridge the timeless majesty of historical jewelry with the refined minimalism of contemporary luxury.
          </p>
          <p className="text-[16px] text-[#5E5E5E] font-light leading-relaxed max-w-2xl mx-auto">
            Every piece in our archive is more than an accessory—it is a narrative of exceptional craftsmanship, designed to be passed down through generations. We believe that true luxury lies in the details, the materials, and the artisans who spend countless hours perfecting each curve and setting.
          </p>
        </div>
      </section>

      {/* Visual Timeline / Craftsmanship */}
      <section className="py-24 md:py-32 px-[4vw] bg-[#F8F6F2]">
        <div className="max-w-[1400px] mx-auto">
          <FlipReveal className="flex flex-col gap-24" keys={["story"]} showClass="flex flex-col" hideClass="hidden">
            
            {/* Block 1 */}
            <FlipRevealItem flipKey="story" className="flex flex-col md:flex-row items-center gap-12 md:gap-24">
              <div className="w-full md:w-1/2 aspect-[4/5] relative bg-white overflow-hidden shadow-xl">
                <Image src="/images/hero_bangle_1781172056556.png" alt="Craftsmanship" fill className="object-cover" />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <span className="text-[#C6A15B] text-xs uppercase tracking-[0.3em] mb-4">The Artisans</span>
                <h3 className="text-[32px] md:text-[40px] font-serif mb-6 text-[#1A1A1A]">Generations of Master Craft</h3>
                <p className="text-[16px] md:text-[18px] text-[#5E5E5E] font-light leading-relaxed mb-8">
                  We collaborate exclusively with master artisans whose techniques have been passed down through their families for centuries. By preserving these ancient methods, we ensure that every MUHURAT piece carries the soul of true craftsmanship.
                </p>
              </div>
            </FlipRevealItem>

            {/* Block 2 */}
            <FlipRevealItem flipKey="story" className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24">
              <div className="w-full md:w-1/2 aspect-[4/5] relative bg-white overflow-hidden shadow-xl">
                <Image src="/images/linear_pendant_1781172078189.png" alt="Materials" fill className="object-cover" />
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <span className="text-[#C6A15B] text-xs uppercase tracking-[0.3em] mb-4">The Materials</span>
                <h3 className="text-[32px] md:text-[40px] font-serif mb-6 text-[#1A1A1A]">Ethical Brilliance</h3>
                <p className="text-[16px] md:text-[18px] text-[#5E5E5E] font-light leading-relaxed mb-8">
                  From responsibly sourced metals to the highest grade simulated and semi-precious stones, we never compromise on quality. Our materials are chosen not just for their immediate beauty, but for their ability to endure lifetimes of wear.
                </p>
              </div>
            </FlipRevealItem>

          </FlipReveal>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-32 px-[4vw] bg-white text-center border-t border-[#E6E1D8]">
        <h2 className="text-[32px] md:text-[48px] font-serif text-[#1A1A1A] max-w-3xl mx-auto leading-tight">
          "Jewelry is the punctuation mark to a woman's elegance."
        </h2>
        <span className="block mt-8 text-xs uppercase tracking-[0.4em] text-[#C6A15B]">The Founders</span>
      </section>
    </div>
  );
}
