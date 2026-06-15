"use client";

import { usePathname } from "next/navigation";
import { Footerdemo } from "./ui/footer-section";

export default function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return <Footerdemo />;
}
