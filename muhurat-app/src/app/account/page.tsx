import { prisma } from "@/lib/prisma";
import Link from "next/link";

interface Props {
  searchParams: Promise<{ tab?: string }>;
}

export default async function AccountPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const tab = resolvedParams.tab || "profile";

  // Ensure a Demo User exists for presentation
  let user = await prisma.user.findFirst({
    where: { email: "demo@muhurat.com" },
    include: { addresses: true, orders: { include: { items: { include: { product: true } } } } }
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        name: "Demo User",
        email: "demo@muhurat.com",
        role: "USER",
        addresses: {
          create: {
            street: "123 Luxury Avenue",
            city: "New Delhi",
            state: "Delhi",
            country: "India",
            zipCode: "110001",
            isDefault: true
          }
        }
      },
      include: { addresses: true, orders: { include: { items: { include: { product: true } } } } }
    });
  }

  // Define tabs
  const tabs = [
    { id: "profile", label: "Profile Details" },
    { id: "orders", label: "Order History" },
    { id: "addresses", label: "Saved Addresses" },
  ];

  return (
    <div className="min-h-screen bg-background text-text-primary px-[4vw] py-16 pt-32">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <h1 className="text-3xl font-serif text-gold-primary mb-8 tracking-wide">My Account</h1>
          <nav className="flex flex-col gap-4 border-l border-border pl-6">
            {tabs.map((t) => (
              <Link 
                key={t.id} 
                href={`/account?tab=${t.id}`}
                className={`text-sm uppercase tracking-widest transition-colors duration-300 ${
                  tab === t.id ? "text-gold-primary font-medium" : "text-text-secondary hover:text-gold-hover"
                }`}
              >
                {t.label}
              </Link>
            ))}
            <button className="text-left text-sm uppercase tracking-widest text-text-secondary hover:text-red-400 transition-colors duration-300 mt-8">
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-surface p-8 md:p-12 border border-border">
          {tab === "profile" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-serif text-text-primary mb-6">Profile Details</h2>
              <div className="space-y-6 max-w-md">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2">Full Name</label>
                  <input type="text" defaultValue={user.name || ""} className="w-full bg-background border border-border p-3 text-sm text-text-primary outline-none focus:border-gold-primary transition-colors" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-text-secondary mb-2">Email Address</label>
                  <input type="email" defaultValue={user.email || ""} disabled className="w-full bg-background/50 border border-border p-3 text-sm text-text-secondary cursor-not-allowed outline-none" />
                </div>
                <button className="bg-gold-primary text-background px-8 py-3 text-xs uppercase tracking-widest hover:bg-gold-hover transition-colors shadow-md hover:shadow-lg">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-serif text-text-primary mb-6">Order History</h2>
              {user.orders.length === 0 ? (
                <div className="text-center py-12 border border-dashed border-border">
                  <p className="text-text-secondary font-light">You haven't placed any orders yet.</p>
                  <Link href="/shop" className="inline-block mt-4 border-b border-gold-primary text-gold-primary text-sm uppercase tracking-widest pb-1 hover:text-gold-hover transition-colors">
                    Explore Collections
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {user.orders.map(order => (
                    <div key={order.id} className="border border-border p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-gold-primary/30 transition-colors">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-gold-primary mb-1">Order #{order.id.slice(-8)}</p>
                        <p className="text-sm text-text-secondary">{new Date(order.createdAt).toLocaleDateString()}</p>
                      </div>
                      <div className="text-left md:text-right">
                        <p className="text-sm font-medium">₹{order.totalAmount.toFixed(2)}</p>
                        <p className="text-xs uppercase tracking-widest text-text-secondary mt-1">{order.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "addresses" && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-2xl font-serif text-text-primary mb-6">Saved Addresses</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {user.addresses.map(address => (
                  <div key={address.id} className="border border-border p-6 relative group bg-background">
                    {address.isDefault && (
                      <span className="absolute top-4 right-4 text-[10px] uppercase tracking-widest bg-gold-primary/20 text-gold-primary px-2 py-1">Default</span>
                    )}
                    <h3 className="text-sm font-medium mb-2">{user.name}</h3>
                    <p className="text-sm text-text-secondary font-light leading-relaxed">
                      {address.street}<br/>
                      {address.city}, {address.state} {address.zipCode}<br/>
                      {address.country}
                    </p>
                    <div className="mt-6 flex gap-4 text-xs uppercase tracking-widest">
                      <button className="text-gold-primary hover:text-gold-hover transition-colors">Edit</button>
                      <button className="text-red-400 hover:text-red-500 transition-colors">Remove</button>
                    </div>
                  </div>
                ))}
                
                <button className="border border-dashed border-border p-6 flex flex-col items-center justify-center text-text-secondary hover:text-gold-primary hover:border-gold-primary transition-colors min-h-[200px]">
                  <span className="text-2xl mb-2 font-light">+</span>
                  <span className="text-xs uppercase tracking-widest">Add New Address</span>
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
