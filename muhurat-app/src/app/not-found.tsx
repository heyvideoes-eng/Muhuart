import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#F5F1EB] px-[4vw] py-24 text-center">
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C9A86A] mb-4">404 Error</span>
        <h1 className="text-4xl md:text-6xl font-serif text-[#111111] mb-6">Page Not Found</h1>
        <p className="text-gray-500 mb-12 text-sm leading-relaxed max-w-md">
          The curated piece you are looking for is currently unavailable or the page has been moved. Discover our current collections or return to the beginning of your journey.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full justify-center">
          <Link href="/" className="bg-gold-primary text-background px-8 py-3 text-xs tracking-widest uppercase hover:bg-gold-hover transition-colors">
            Back to Home
          </Link>
          <Link href="/search" className="border border-gold-primary text-gold-primary px-8 py-3 text-xs tracking-widest uppercase hover:bg-gold-primary hover:text-background transition-colors">
            Search Products
          </Link>
        </div>
      </div>

      {/* Collection Recommendations */}
      <div className="mt-32 w-full max-w-5xl mx-auto">
        <h3 className="text-2xl font-serif mb-12 text-[#111111]">Explore Collections</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link href="/collections/antique" className="group relative aspect-[4/5] overflow-hidden block bg-[#111111]">
            <Image src="/images/layering_detail_1781172127971.png" alt="Antique Collection" fill className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
              <h4 className="font-serif text-xl mb-2">The Antique Edit</h4>
              <span className="text-[10px] uppercase tracking-[0.15em]">Discover →</span>
            </div>
          </Link>
          <Link href="/collections/everyday" className="group relative aspect-[4/5] overflow-hidden block bg-[#111111]">
            <Image src="/images/layering_model_1781172115132.png" alt="Everyday Luxury" fill className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
              <h4 className="font-serif text-xl mb-2">Everyday Luxury</h4>
              <span className="text-[10px] uppercase tracking-[0.15em]">Discover →</span>
            </div>
          </Link>
          <Link href="/bridal" className="group relative aspect-[4/5] overflow-hidden block bg-[#111111]">
            <Image src="/images/hero_bangle_1781172056556.png" alt="Bridal Collection" fill className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 text-white bg-gradient-to-t from-black/60 to-transparent pointer-events-none">
              <h4 className="font-serif text-xl mb-2">Bridal Trousseau</h4>
              <span className="text-[10px] uppercase tracking-[0.15em]">Discover →</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
