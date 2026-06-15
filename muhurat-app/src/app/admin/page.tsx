"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, IndianRupee, ShoppingBag, Users, Package } from "lucide-react";

const revenueData = [
  { name: 'Jan', value: 4000 }, { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 }, { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 }, { name: 'Jun', value: 8000 },
];

export default function AdminDashboardHome() {
  const [stats, setStats] = useState({
    products: 0, orders: 0, revenue: 0, customers: 0
  });

  useEffect(() => {
    async function loadStats() {
      const { count: pCount } = await supabase.from('products').select('*', { count: 'exact', head: true });
      const { count: oCount } = await supabase.from('orders').select('*', { count: 'exact', head: true });
      
      setStats({
        products: pCount || 0,
        orders: oCount || 0,
        revenue: 124500, // mock revenue until transactions exist
        customers: 142
      });
    }
    loadStats();
  }, []);

  const statCards = [
    { title: "Total Revenue", value: `₹${stats.revenue.toLocaleString()}`, trend: "+12.5%", isPositive: true, icon: IndianRupee },
    { title: "Total Orders", value: stats.orders, trend: "+5.2%", isPositive: true, icon: ShoppingBag },
    { title: "Active Customers", value: stats.customers, trend: "-1.1%", isPositive: false, icon: Users },
    { title: "Total Products", value: stats.products, trend: "+18.0%", isPositive: true, icon: Package },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-serif text-[#C9A15A] tracking-wide mb-2">Overview</h1>
        <p className="text-sm text-gray-500">Welcome to the MUHURAT Internal Operating System.</p>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-white border border-gray-200 p-6 rounded-xl relative overflow-hidden group hover:border-[#C9A15A]/30 transition-colors shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <stat.icon size={20} className="text-[#C9A15A]" />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${stat.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </div>
            </div>
            <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-1">{stat.title}</h3>
            <p className="text-3xl font-serif text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-6">Revenue Overview</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C9A15A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C9A15A" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis dataKey="name" stroke="#9ca3af" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" tick={{ fill: '#6b7280', fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(val) => `₹${val/1000}k`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e5e7eb', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#111827' }}
                />
                <Area type="monotone" dataKey="value" stroke="#C9A15A" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-500 text-sm uppercase tracking-wider mb-6">Recent Activity</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex gap-4 items-start relative before:absolute before:left-1 before:top-2.5 before:bottom-[-20px] before:w-[1px] before:bg-gray-200 last:before:hidden">
                <div className="w-2.5 h-2.5 mt-1.5 rounded-full bg-[#C9A15A] shrink-0 z-10 shadow-[0_0_8px_rgba(201,161,90,0.3)]"></div>
                <div>
                  <p className="text-sm text-gray-900">New order <span className="text-[#C9A15A]">#ORD-00{i}</span> placed</p>
                  <p className="text-xs text-gray-500 mt-1">{i * 15} minutes ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
