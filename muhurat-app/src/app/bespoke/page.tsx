import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bespoke Creations | MUHURAT Essentials",
  description: "Experience the luxury of custom jewelry design.",
};

export default function BespokePage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F6F2] text-[#1A1A1A]">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden">
        <Image 
          src="/images/layering_model_1781172115132.png" 
          alt="Bespoke Jewelry Design" 
          fill 
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center text-white px-4">
          <span className="text-xs uppercase tracking-[0.4em] mb-4 block text-white/80">Private Commission</span>
          <h1 className="text-[40px] md:text-[64px] lg:text-[80px] font-serif tracking-wide leading-[1.1] mb-6">
            Bespoke Creations
          </h1>
          <p className="text-[16px] md:text-[20px] font-light max-w-xl mx-auto">
            Your unique story, translated into a timeless masterpiece by our master artisans.
          </p>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-24 md:py-32 px-[4vw] bg-white">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-[32px] md:text-[48px] font-serif text-[#1A1A1A] mb-8">The Design Journey</h2>
          <div className="w-12 h-[1px] bg-[#E6E1D8] mx-auto mb-8"></div>
          <p className="text-[16px] md:text-[18px] text-[#5E5E5E] font-light leading-relaxed">
            From the initial spark of inspiration to the final polish, our bespoke process is an intimate collaboration dedicated to realizing your exact vision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-[1200px] mx-auto">
          <div className="flex flex-col items-center text-center">
            <span className="text-[48px] font-serif text-[#C6A15B] mb-4 opacity-50">01</span>
            <h3 className="text-[20px] font-serif mb-4 text-[#1A1A1A]">Consultation</h3>
            <p className="text-[#5E5E5E] font-light">Meet with our head designer to discuss your inspirations, material preferences, and budget.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-[48px] font-serif text-[#C6A15B] mb-4 opacity-50">02</span>
            <h3 className="text-[20px] font-serif mb-4 text-[#1A1A1A]">Design & Sketch</h3>
            <p className="text-[#5E5E5E] font-light">We present detailed hand-sketches and 3D renderings for your approval, refining until perfect.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-[48px] font-serif text-[#C6A15B] mb-4 opacity-50">03</span>
            <h3 className="text-[20px] font-serif mb-4 text-[#1A1A1A]">Craftsmanship</h3>
            <p className="text-[#5E5E5E] font-light">Our master artisans bring the design to life using generations of traditional techniques.</p>
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-24 px-[4vw] bg-[#F8F6F2] border-t border-[#E6E1D8]">
        <div className="max-w-2xl mx-auto bg-white p-8 md:p-16 border border-[#E6E1D8] shadow-xl">
          <div className="text-center mb-12">
            <h2 className="text-[28px] md:text-[36px] font-serif text-[#1A1A1A] mb-4">Request a Consultation</h2>
            <p className="text-[#5E5E5E] font-light text-sm">Our bespoke concierge will contact you within 24 hours.</p>
          </div>

          <form className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" placeholder="First Name" className="w-full bg-transparent border-b border-[#E6E1D8] pb-3 outline-none text-[#1A1A1A] placeholder-[#5E5E5E] font-light" />
              <input type="text" placeholder="Last Name" className="w-full bg-transparent border-b border-[#E6E1D8] pb-3 outline-none text-[#1A1A1A] placeholder-[#5E5E5E] font-light" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-[#E6E1D8] pb-3 outline-none text-[#1A1A1A] placeholder-[#5E5E5E] font-light" />
            <input type="tel" placeholder="Phone Number" className="w-full bg-transparent border-b border-[#E6E1D8] pb-3 outline-none text-[#1A1A1A] placeholder-[#5E5E5E] font-light" />
            <textarea placeholder="Tell us about your vision..." rows={4} className="w-full bg-transparent border-b border-[#E6E1D8] pb-3 outline-none text-[#1A1A1A] placeholder-[#5E5E5E] font-light resize-none mt-4"></textarea>
            
            <button type="button" className="mt-8 w-full bg-[#1A1A1A] text-white py-5 text-sm uppercase tracking-[0.2em] hover:bg-[#C6A15B] transition-colors duration-300">
              Submit Request
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
