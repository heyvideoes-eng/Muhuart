import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ShopNav from "@/components/ShopNav";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ slug: string }>;
}

const categoryMetadata: Record<string, { title: string, description: string }> = {
  "rings": { title: "Rings", description: "Timeless rings crafted to celebrate every occasion." },
  "earrings": { title: "Earrings", description: "Statement and everyday earrings inspired by heritage craftsmanship." },
  "necklaces": { title: "Necklaces", description: "Layered elegance designed for modern celebrations." },
  "bracelets": { title: "Bracelets", description: "Refined bracelets balancing tradition and contemporary design." },
  "bridal": { title: "Bridal Collection", description: "Heirloom bridal jewelry designed for your most precious moments." },
  "festive": { title: "Festive Edit", description: "Opulent pieces crafted to illuminate your celebrations." },
  "antique-collection": { title: "Antique Collection", description: "Museum-quality vintage inspired designs with aged luxury materials." },
  "best-sellers": { title: "Best Sellers", description: "Our most coveted luxury jewelry, celebrated by our inner circle." },
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const meta = categoryMetadata[slug];
  
  if (!meta) {
    return { title: "Shop | MUHURAT Essentials" };
  }

  return {
    title: `${meta.title} | MUHURAT Luxury Jewelry`,
    description: meta.description,
    openGraph: {
      title: `${meta.title} | MUHURAT`,
      description: meta.description,
    }
  };
}

export default async function CategoryPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const meta = categoryMetadata[slug];

  if (!meta) {
    notFound();
  }

  // Fetch products based on slug
  let products;
  
  if (slug === "best-sellers") {
    // For best sellers, just fetch featured or limit to top 8
    products = await prisma.product.findMany({
      where: { OR: [{ isFeatured: true }, { isNewArrival: false }] },
      take: 8
    });
  } else {
    // Dynamic fetch by category or collection slug
    products = await prisma.product.findMany({
      where: {
        OR: [
          { category: { slug: slug } },
          { collection: { slug: slug } }
        ]
      }
    });
  }

  return (
    <div className="flex flex-col min-h-screen px-[4vw] py-12 bg-background text-text-primary">
      {/* Category Hero */}
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-gold-primary mb-4 tracking-wide capitalize">{meta.title}</h1>
        <p className="text-text-secondary font-light">
          {meta.description}
        </p>
      </div>

      <ShopNav />

      <div className="flex flex-col md:flex-row gap-12 mt-8">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex flex-col gap-10">
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest text-gold-primary">Material</h3>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li><label className="flex items-center gap-3 cursor-pointer hover:text-gold-hover transition-colors"><input type="checkbox" className="accent-gold-primary w-4 h-4" /> Antique Gold</label></li>
              <li><label className="flex items-center gap-3 cursor-pointer hover:text-gold-hover transition-colors"><input type="checkbox" className="accent-gold-primary w-4 h-4" /> Rose Gold</label></li>
              <li><label className="flex items-center gap-3 cursor-pointer hover:text-gold-hover transition-colors"><input type="checkbox" className="accent-gold-primary w-4 h-4" /> Silver</label></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-widest text-gold-primary">Price Range</h3>
            <input type="range" min="0" max="1000" className="w-full accent-gold-primary cursor-pointer" />
            <div className="flex justify-between text-xs mt-2 text-text-secondary">
              <span>₹0</span>
              <span>₹100000+</span>
            </div>
          </div>
        </aside>

        {/* Main Content Grid */}
        <main className="flex-1">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-border">
            <span className="text-sm text-text-secondary">{products.length} Products</span>
            <select className="border border-border text-sm bg-surface text-text-primary py-2 px-4 outline-none cursor-pointer focus:border-gold-primary transition-colors">
              <option>Sort by: Featured</option>
              <option>Sort by: Newest</option>
              <option>Sort by: Price (Low to High)</option>
              <option>Sort by: Price (High to Low)</option>
            </select>
          </div>

          {/* Dynamic Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => {
              const images = JSON.parse(product.images);
              const mainImage = images[0] || "/images/pebble_ring_1781172068702.png";
              
              return (
                <div key={product.id} className="flex flex-col group cursor-pointer">
                  <div className="aspect-[4/5] bg-surface relative overflow-hidden mb-4 border border-transparent transition-all duration-500 group-hover:border-gold-primary/30">
                    <Image 
                      src={mainImage} 
                      alt={product.name} 
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 flex flex-col justify-end p-4">
                      <button className="w-full bg-gold-primary text-background py-3 text-xs font-medium uppercase tracking-widest hover:bg-gold-hover transition-colors shadow-lg">
                        View Details
                      </button>
                    </div>
                  </div>
                  <div className="text-sm flex flex-col gap-2">
                    <span className="font-serif text-lg text-text-primary group-hover:text-gold-primary transition-colors">{product.name}</span>
                    <div className="flex justify-between items-center">
                      <span className="text-gold-primary tracking-wide">₹{product.price.toFixed(2)}</span>
                      <span className="text-text-secondary text-xs uppercase tracking-wider">{product.material || "Gold"}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {products.length === 0 && (
            <div className="text-center py-20 text-text-secondary font-serif text-xl border border-border bg-surface/50">
              No pieces found for {meta.title} in the archive.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
