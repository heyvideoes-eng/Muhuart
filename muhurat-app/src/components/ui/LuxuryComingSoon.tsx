import Link from 'next/link';
import Image from 'next/image';

interface LuxuryComingSoonProps {
  title: string;
  subtitle?: string;
  imagePath?: string;
}

export default function LuxuryComingSoon({ 
  title, 
  subtitle = "Curated pieces arriving soon.",
  imagePath = "/images/layering_model_1781172115132.png"
}: LuxuryComingSoonProps) {
  return (
    <div className="min-h-[85vh] flex items-center justify-center bg-white text-[#28251d] relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src={imagePath}
          alt={title}
          fill
          className="object-cover opacity-30 grayscale mix-blend-overlay"
          priority
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 text-center px-4 flex flex-col items-center max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-[0.3em] text-[#C9A86A] mb-6">Coming Soon</span>
        <h1 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-gray-300 text-sm md:text-base mb-12 tracking-wide font-light">
          {subtitle}
        </p>
        
        <Link 
          href="/shop" 
          className="group relative inline-flex items-center justify-center px-8 py-3 text-xs tracking-widest uppercase overflow-hidden border border-[#F5F0EA]/30 hover:border-[#F5F0EA] transition-colors duration-500"
        >
          <span className="relative z-10 group-hover:text-[#111111] transition-colors duration-500">Return to Shop</span>
          <div className="absolute inset-0 bg-[#eaeaea] transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-in-out" />
        </Link>
      </div>
    </div>
  );
}
