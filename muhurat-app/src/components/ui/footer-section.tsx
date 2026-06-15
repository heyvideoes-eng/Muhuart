"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Send, Check, Loader2 } from "lucide-react"
import FooterTrustBar from "@/components/FooterTrustBar"

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
  </svg>
);

function Footerdemo() {
  const [email, setEmail] = React.useState("");
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    setTimeout(() => setStatus("success"), 1500);
  };

  const linkHoverClass = "transition-all duration-300 hover:text-[#B8913F] hover:scale-105 inline-block";

  return (
    <footer className="relative border-t border-gray-200 bg-white text-black transition-colors duration-300">
      <div className="container mx-auto px-4 py-16 md:px-6 lg:px-8 max-w-[1600px]">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Column 1: Newsletter */}
          <div className="relative">
            <h2 className="mb-4 text-3xl font-serif tracking-wide text-black">Stay Connected</h2>
            <p className="mb-6 text-sm font-light text-gray-500">
              Join our newsletter for the latest updates and exclusive luxury offers.
            </p>
            <form onSubmit={handleSubscribe} className="relative group">
              <Input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                placeholder="Enter your email"
                disabled={status === "loading" || status === "success"}
                className={`pr-12 bg-white border-gray-300 focus-visible:ring-[#C9A86A] text-black placeholder:text-gray-500 transition-all duration-300 hover:border-[#C9A86A] ${status === "error" ? "border-red-500" : ""}`}
              />
              <Button
                type="submit"
                size="icon"
                disabled={status === "loading" || status === "success"}
                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-black hover:bg-[#C9A86A] text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(201,168,106,0.3)]"
              >
                {status === "loading" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : status === "success" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
            {status === "success" && (
              <p className="mt-2 text-xs text-[#B8913F] animate-in fade-in slide-in-from-bottom-2">
                Thank you for joining our inner circle.
              </p>
            )}
            {status === "error" && (
              <p className="mt-2 text-xs text-red-500 animate-in fade-in slide-in-from-bottom-2">
                Please enter a valid email address.
              </p>
            )}
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-6 text-sm uppercase tracking-widest text-[#B8913F]">Quick Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <nav className="space-y-4 text-sm font-light">
                <div><a href="/shop" className={linkHoverClass}>Shop All</a></div>
                <div><a href="/collections" className={linkHoverClass}>Collections</a></div>
                <div><a href="/bridal" className={linkHoverClass}>Bridal</a></div>
                <div><a href="/bespoke" className={linkHoverClass}>Bespoke</a></div>
              </nav>
              <nav className="space-y-4 text-sm font-light">
                <div><a href="/our-story" className={linkHoverClass}>Our Story</a></div>
                <div><a href="/faqs" className={linkHoverClass}>FAQs</a></div>
                <div><a href="/journal/care-guide" className={linkHoverClass}>Jewelry Care</a></div>
                <div><a href="/contact" className={linkHoverClass}>Contact</a></div>
              </nav>
            </div>
          </div>
          
          {/* Column 3: Contact Us */}
          <div>
            <h3 className="mb-6 text-sm uppercase tracking-widest text-[#C9A86A]">Contact Us</h3>
            <address className="space-y-4 text-sm font-light not-italic text-gray-600">
              <p>New Delhi, Delhi</p>
              <p>India</p>
              <div className="pt-2 flex flex-col gap-2">
                <a href="mailto:muhuratindia@gmail.com" className={linkHoverClass}>
                  muhuratindia@gmail.com
                </a>
              </div>
            </address>
          </div>
          
          {/* Column 4: Follow Us */}
          <div className="relative">
            <h3 className="mb-6 text-sm uppercase tracking-widest text-[#B8913F]">Follow Us</h3>
            <div className="flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="https://www.instagram.com/muhuratindia?igsh" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="rounded-full border-[#B8913F]/20 bg-transparent text-[#B8913F] transition-all duration-300 hover:scale-105 hover:border-[#B8913F] hover:shadow-[0_0_15px_rgba(184,145,63,0.5)]">
                        <InstagramIcon className="h-4 w-4" />
                        <span className="sr-only">Instagram</span>
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="https://www.facebook.com/share/1cJ9e4AwEr/" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="rounded-full border-[#B8913F]/20 bg-transparent text-[#B8913F] transition-all duration-300 hover:scale-105 hover:border-[#B8913F] hover:shadow-[0_0_15px_rgba(184,145,63,0.5)]">
                        <FacebookIcon className="h-4 w-4" />
                        <span className="sr-only">Facebook</span>
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Facebook</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a href="https://wa.me/919540485094" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="icon" className="rounded-full border-[#B8913F]/20 bg-transparent text-[#B8913F] transition-all duration-300 hover:scale-105 hover:border-[#B8913F] hover:shadow-[0_0_15px_rgba(184,145,63,0.5)]">
                        <WhatsAppIcon className="h-4 w-4" />
                        <span className="sr-only">WhatsApp</span>
                      </Button>
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Chat on WhatsApp</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-gray-200 pt-8 md:flex-row">
          <FooterTrustBar />
          
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6 text-xs tracking-widest uppercase text-gray-500">
            <p>© {new Date().getFullYear()} MUHURAT. All rights reserved.</p>
            <nav className="flex gap-6">
              <a href="/privacy-policy" className="transition-colors duration-300 hover:text-[#B8913F] hover:scale-105 inline-block">Privacy</a>
              <a href="/terms" className="transition-colors duration-300 hover:text-[#B8913F] hover:scale-105 inline-block">Terms</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  )
}

export { Footerdemo }
