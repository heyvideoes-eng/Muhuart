"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const categories = [
  { name: "All", href: "/shop" },
  { name: "Rings", href: "/shop/rings" },
  { name: "Earrings", href: "/shop/earrings" },
  { name: "Necklaces", href: "/shop/necklaces" },
  { name: "Bracelets", href: "/shop/bracelets" },
  { name: "Bridal", href: "/shop/bridal" },
  { name: "Festive", href: "/shop/festive" },
  { name: "Antique Collection", href: "/shop/antique-collection" },
  { name: "Best Sellers", href: "/shop/best-sellers" },
];

export default function ShopNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-6 border-b border-border pb-4 mb-8">
      {categories.map((cat) => {
        const isActive = pathname === cat.href;
        return (
          <Link
            key={cat.href}
            href={cat.href}
            className={`text-sm tracking-widest uppercase transition-all duration-300 ${
              isActive 
                ? "text-gold-primary border-b border-gold-primary pb-1" 
                : "text-text-secondary hover:text-gold-hover hover:scale-105 inline-block"
            }`}
          >
            {cat.name}
          </Link>
        );
      })}
    </nav>
  );
}
