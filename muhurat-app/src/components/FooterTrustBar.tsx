"use client";

import { useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export default function FooterTrustBar() {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const hoverClass = "flex items-center gap-2 hover:text-[#B8913F] hover:scale-105 transition-all duration-300";

  return (
    <>
      <div className="flex flex-col md:flex-row gap-6 mb-4 md:mb-0 text-[#0D0D0D]">
        <button 
          onClick={() => setIsPaymentModalOpen(true)}
          className={hoverClass}
        >
          <span className="text-[#B8913F]">✔</span> Secure Payments
        </button>
        <Link 
          href="/shipping-policy"
          className={hoverClass}
        >
          <span className="text-[#B8913F]">✔</span> Worldwide Shipping
        </Link>
        <Link 
          href="/authenticity-policy"
          className={hoverClass}
        >
          <span className="text-[#B8913F]">✔</span> Authenticity Guarantee
        </Link>
      </div>

      {/* Payment Information Modal */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-white border border-[#eaeaea] max-w-lg w-full p-8 relative flex flex-col shadow-2xl text-[#28251d]">
            <button 
              onClick={() => setIsPaymentModalOpen(false)}
              className="absolute top-4 right-4 text-[#0D0D0D]/50 hover:text-[#B8913F] transition-all duration-300 hover:scale-110"
            >
              <X size={20} />
            </button>
            <h3 className="text-2xl font-serif text-[#28251d] mb-4">Secure Payments</h3>
            <p className="text-sm font-light text-[#28251d]/80 leading-relaxed mb-6">
              At MUHURAT Essentials, we guarantee the highest level of security for your transactions. We utilize industry-standard 256-bit encryption to ensure your payment information is kept strictly confidential.
            </p>
            <div className="flex flex-col gap-3 text-sm text-[#0D0D0D] font-medium mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B8913F]" />
                SSL Encrypted Checkout
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B8913F]" />
                Major Credit Cards Accepted (Visa, Mastercard, Amex)
              </div>
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#B8913F]" />
                Zero Fraud Liability
              </div>
            </div>
            <button 
              onClick={() => setIsPaymentModalOpen(false)}
              className="w-full bg-[#28251d] text-white py-3 uppercase tracking-widest text-xs hover:bg-[#B8913F] transition-all duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
