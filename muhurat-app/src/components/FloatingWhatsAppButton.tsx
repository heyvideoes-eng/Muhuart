"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function FloatingWhatsAppButton() {
  const pathname = usePathname();
  const message = "Hello MUHURAT,\nI would like to know more about your jewellery collections.";
  const url = `https://wa.me/919540485094?text=${encodeURIComponent(message)}`;

  if (pathname.startsWith("/admin")) return null;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-white border border-[#eaeaea] text-[#B8913F] shadow-lg transition-all duration-300 hover:scale-105 hover:border-[#B8913F] hover:shadow-xl"
      aria-label="Chat with us on WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="transform transition-transform group-hover:scale-110">
        <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
        <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
      </svg>
    </a>
  );
}
