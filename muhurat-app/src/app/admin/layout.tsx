"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Tag, Users, ShoppingCart, BarChart3, Settings, LogOut, Search, Bell } from "lucide-react";
import { useState, useEffect } from "react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        // open command palette
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Collections", href: "/admin/collections", icon: Tag },
    { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
    { name: "Customers", href: "/admin/customers", icon: Users },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#F8F9FA] text-[#2a2523] font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className={`flex-shrink-0 transition-all duration-300 ${isSidebarOpen ? 'w-[280px]' : 'w-[80px]'} border-r border-gray-200 bg-white flex flex-col`}>
        {/* Brand */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200 cursor-pointer" onClick={() => setSidebarOpen(!isSidebarOpen)}>
          <span className="font-serif tracking-widest text-[#C9A15A]">
            {isSidebarOpen ? "MUHURAT ADMIN" : "M"}
          </span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6 flex flex-col gap-2 px-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors ${
                  isActive 
                    ? "bg-[#C9A15A]/10 text-[#C9A15A]" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <Icon size={20} strokeWidth={isActive ? 2 : 1.5} className="shrink-0" />
                {isSidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-gray-500 hover:bg-red-50 hover:text-red-500 transition-colors ${!isSidebarOpen && 'justify-center'}`}>
            <LogOut size={20} strokeWidth={1.5} className="shrink-0" />
            {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 shrink-0">
          {/* Search */}
          <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md px-3 py-1.5 w-96 text-sm text-gray-500">
            <Search size={16} className="mr-2" />
            <input type="text" placeholder="Search (Cmd + K)" className="bg-transparent outline-none flex-1 text-gray-900 placeholder:text-gray-400" />
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-6">
            <button className="relative text-gray-500 hover:text-gray-900 transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#C9A15A] rounded-full"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#C9A15A]/20 border border-[#C9A15A] flex items-center justify-center text-[#C9A15A] text-xs font-bold uppercase cursor-pointer">
              AD
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-auto bg-[#F8F9FA] p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
