"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150]"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-surface border-l border-border shadow-2xl z-[160] flex flex-col text-text-primary"
          >
            <div className="p-6 border-b border-border flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-gold-primary" />
                <h2 className="font-serif text-xl tracking-wide">Your Cart</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:text-gold-primary transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center">
              <div className="w-20 h-20 rounded-full border border-dashed border-border flex items-center justify-center mb-6 text-border">
                <ShoppingBag size={32} />
              </div>
              <h3 className="font-serif text-2xl mb-2 text-text-primary">Your cart is empty</h3>
              <p className="text-sm font-light text-text-secondary mb-8">
                Discover our curated collections and add heirloom pieces to your cart.
              </p>
              <button 
                onClick={onClose}
                className="bg-gold-primary text-background px-8 py-3 text-sm uppercase tracking-widest hover:bg-gold-hover transition-all duration-300 hover:scale-105"
              >
                Continue Shopping
              </button>
            </div>

            <div className="border-t border-border p-6 bg-background">
              <div className="flex justify-between items-center mb-4 text-sm tracking-wider">
                <span className="text-text-secondary uppercase">Subtotal</span>
                <span className="font-medium text-gold-primary">₹0.00</span>
              </div>
              <p className="text-xs text-text-secondary mb-6 font-light">
                Shipping and taxes calculated at checkout.
              </p>
              <button disabled className="w-full bg-surface text-text-secondary border border-border py-4 text-sm uppercase tracking-widest cursor-not-allowed">
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
