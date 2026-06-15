"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, User, ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === '/';
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const navClasses = `fixed top-0 w-full z-[100] transition-all duration-500 ${
    isScrolled 
      ? 'bg-background/95 backdrop-blur-md border-b border-border text-text-primary py-4' 
      : isHome 
        ? 'bg-transparent text-text-primary py-6 border-b border-transparent' 
        : 'bg-background text-text-primary py-6 border-b border-border'
  }`;

  const linkHoverClass = 'hover:text-gold-primary transition-colors';

  const megaMenuVariants = {
    hidden: { opacity: 0, y: 10, pointerEvents: 'none' as any },
    visible: { opacity: 1, y: 0, pointerEvents: 'auto' as any }
  };

  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <>
      <header className={navClasses}>
        <div className="flex justify-between items-center px-4 md:px-8 max-w-[1600px] mx-auto">
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex-1 flex items-center">
            <button onClick={() => setIsMobileMenuOpen(true)} className="p-2 -ml-2 hover:text-[#C9A86A] transition-colors" aria-label="Open Menu">
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>

          {/* Desktop Left Nav */}
          <div className="hidden md:flex flex-1 gap-8 text-xs md:text-sm uppercase tracking-widest items-center font-medium">
            {!isHome && (
              <button 
                onClick={() => window.history.back()} 
                className={`flex items-center gap-1 ${linkHoverClass}`}
                aria-label="Go Back"
              >
                <span>← BACK</span>
              </button>
            )}
            
            <div 
              className="relative py-2"
              onMouseEnter={() => setActiveMegaMenu('shop')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link href="/shop" className="hover:text-gold-primary transition-colors">Shop</Link>
              {/* Shop Mega Menu */}
              <AnimatePresence>
                {activeMegaMenu === 'shop' && (
                  <motion.div 
                    initial="hidden" animate="visible" exit="hidden" variants={megaMenuVariants}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 pt-4 w-[600px]"
                  >
                    <div className="bg-surface text-text-primary border border-border shadow-2xl p-8 grid grid-cols-3 gap-8">
                      <div>
                        <h4 className="font-serif text-lg mb-4 border-b border-border pb-2 text-gold-primary">Categories</h4>
                        <ul className="space-y-3 normal-case tracking-normal text-sm text-text-secondary">
                          <li><Link href="/shop/rings" className="hover:text-gold-hover transition-colors">Rings</Link></li>
                          <li><Link href="/shop/necklaces" className="hover:text-gold-hover transition-colors">Necklaces</Link></li>
                          <li><Link href="/shop/bracelets" className="hover:text-gold-hover transition-colors">Bracelets</Link></li>
                          <li><Link href="/shop/earrings" className="hover:text-gold-hover transition-colors">Earrings</Link></li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-serif text-lg mb-4 border-b border-border pb-2 text-gold-primary">Curated</h4>
                        <ul className="space-y-3 normal-case tracking-normal text-sm text-text-secondary">
                          <li><Link href="/shop/new-arrivals" className="hover:text-gold-hover transition-colors">New Arrivals</Link></li>
                          <li><Link href="/shop/best-sellers" className="hover:text-gold-hover transition-colors">Best Sellers</Link></li>
                          <li><Link href="/shop/bridal" className="hover:text-gold-hover transition-colors">Bridal Trousseau</Link></li>
                          <li><Link href="/shop/festive" className="hover:text-gold-hover transition-colors">Festive Edit</Link></li>
                        </ul>
                      </div>
                      <div className="bg-background p-4 flex flex-col justify-center items-center text-center border border-border">
                        <span className="text-xs uppercase tracking-widest text-gold-primary mb-2">Featured</span>
                        <h4 className="font-serif text-xl mb-4 text-text-primary">The Bridal Edit</h4>
                        <Link href="/shop/bridal" className="text-xs uppercase border-b border-gold-primary text-text-primary pb-1 hover:text-gold-hover hover:border-gold-hover transition-colors">Explore</Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div 
              className="relative py-2"
              onMouseEnter={() => setActiveMegaMenu('collections')}
              onMouseLeave={() => setActiveMegaMenu(null)}
            >
              <Link href="/collections" className="hover:text-gold-primary transition-colors">Collections</Link>
              {/* Collections Mega Menu */}
              <AnimatePresence>
                {activeMegaMenu === 'collections' && (
                  <motion.div 
                    initial="hidden" animate="visible" exit="hidden" variants={megaMenuVariants}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 pt-4 w-[600px]"
                  >
                    <div className="bg-surface text-text-primary border border-border shadow-2xl p-8 grid grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <Link href="/shop/festive" className="group block">
                          <h4 className="font-serif text-xl mb-1 group-hover:text-gold-primary transition-colors">Festive Radiance</h4>
                          <p className="text-xs tracking-normal text-text-secondary normal-case">Statement masterpieces for celebration.</p>
                        </Link>
                        <Link href="/collections/everyday-luxury" className="group block">
                          <h4 className="font-serif text-xl mb-1 group-hover:text-gold-primary transition-colors">Everyday Luxury</h4>
                          <p className="text-xs tracking-normal text-text-secondary normal-case">Minimalist elegance for daily rituals.</p>
                        </Link>
                        <Link href="/shop/antique-collection" className="group block">
                          <h4 className="font-serif text-xl mb-1 group-hover:text-gold-primary transition-colors">The Antique Edit</h4>
                          <p className="text-xs tracking-normal text-text-secondary normal-case">Honoring tradition and craftsmanship.</p>
                        </Link>
                      </div>
                      <div className="relative aspect-square overflow-hidden bg-background border border-border">
                        {/* Placeholder for featured collection image */}
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="font-serif text-gold-primary text-2xl drop-shadow-md">Signature</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/bespoke" className={linkHoverClass}>Bespoke</Link>
            <Link href="/our-story" className={linkHoverClass}>Our Story</Link>
          </div>
          
          {/* Logo */}
          <div className="flex-none flex flex-col items-center justify-center">
            <Link href="/" className="flex flex-col items-center group">
              <span className="text-3xl md:text-4xl tracking-[0.2em] md:tracking-[0.25em] font-normal font-serif text-text-primary">MUHURAT</span>
              <span className="text-[0.55rem] md:text-[0.65rem] tracking-[0.4em] mt-2 uppercase transition-colors text-gold-primary">
                ESSENTIALS
              </span>
            </Link>
          </div>

          {/* Right Nav */}
          <div className="flex flex-1 justify-end items-center gap-4 md:gap-6">
            <div className="relative flex items-center h-full">
              <AnimatePresence>
                {isSearchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 180, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    type="text"
                    autoFocus
                    placeholder="Search collections..."
                    className="absolute right-10 top-1/2 -translate-y-1/2 bg-transparent border-b border-gold-primary text-sm outline-none px-2 py-1 text-text-primary placeholder:text-text-secondary font-light"
                  />
                )}
              </AnimatePresence>
              <button onClick={() => setIsSearchOpen(!isSearchOpen)} className={linkHoverClass} aria-label="Toggle Search">
                <Search size={24} strokeWidth={1.5} />
              </button>
            </div>
            <Link href="/wishlist" className={`hidden md:block ${linkHoverClass}`} aria-label="Wishlist">
              <Heart size={24} strokeWidth={1.5} />
            </Link>
            <Link href="/account" className={`hidden md:block ${linkHoverClass}`} aria-label="Account">
              <User size={24} strokeWidth={1.5} />
            </Link>
            <button onClick={() => setIsCartOpen(true)} className={`flex items-center gap-2 ${linkHoverClass}`} aria-label="Open Cart">
              <div className="relative">
                <ShoppingBag size={24} strokeWidth={1.5} />
                <span className="absolute -top-1 -right-1.5 bg-gold-primary text-background text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </div>
            </button>
          </div>
        </div>
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 z-[60] backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[85vw] max-w-sm bg-white text-black border-r border-gray-200 z-[70] overflow-y-auto flex flex-col shadow-2xl"
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                <Link href="/" className="font-serif tracking-[0.2em] text-xl" onClick={() => setIsMobileMenuOpen(false)}>MUHURAT</Link>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-gray-400 hover:text-[#C9A86A] transition-colors">
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>
              
              <div className="flex-1 py-8 px-6 flex flex-col gap-6 text-sm uppercase tracking-wider font-medium">
                <Link href="/" className="flex items-center justify-between pb-4 border-b border-gray-200 hover:text-[#C9A86A] transition-colors">
                  Home <ChevronRight size={16} className="text-[#C9A86A]" />
                </Link>
                <Link href="/shop" className="flex items-center justify-between pb-4 border-b border-gray-200 hover:text-[#C9A86A] transition-colors">
                  Shop <ChevronRight size={16} className="text-[#C9A86A]" />
                </Link>
                <Link href="/collections" className="flex items-center justify-between pb-4 border-b border-gray-200 hover:text-[#C9A86A] transition-colors">
                  Collections <ChevronRight size={16} className="text-[#C9A86A]" />
                </Link>
                <Link href="/bridal" className="flex items-center justify-between pb-4 border-b border-gray-200 hover:text-[#C9A86A] transition-colors">
                  Bridal <ChevronRight size={16} className="text-[#C9A86A]" />
                </Link>
                <Link href="/new-arrivals" className="flex items-center justify-between pb-4 border-b border-gray-200 hover:text-[#C9A86A] transition-colors">
                  New Arrivals <ChevronRight size={16} className="text-[#C9A86A]" />
                </Link>
                <Link href="/bespoke" className="flex items-center justify-between pb-4 border-b border-gray-200 text-[#C9A86A]">
                  Bespoke Creations <ChevronRight size={16} className="text-[#C9A86A]" />
                </Link>
                <Link href="/our-story" className="flex items-center justify-between pb-4 border-b border-gray-200 hover:text-[#C9A86A] transition-colors">
                  Our Story <ChevronRight size={16} className="text-[#C9A86A]" />
                </Link>
              </div>

              <div className="bg-white p-6 flex flex-col gap-4 text-xs uppercase tracking-widest text-center mt-auto border-t border-gray-200">
                <Link href="/account" className="py-3 border border-gray-300 text-black hover:bg-gray-100 transition-colors">Log In / Register</Link>
                <Link href="/wishlist" className="py-3 bg-black text-white hover:bg-gray-800 transition-colors">Wishlist</Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
