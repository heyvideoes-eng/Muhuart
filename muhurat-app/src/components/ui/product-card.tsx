"use client";

import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface ProductHighlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  categoryIcon?: React.ReactNode;
  category: string;
  title: string;
  description: string;
  price: number;
  imageSrc: string;
  imageAlt: string;
  slug: string;
}

export const ProductHighlightCard = React.forwardRef<HTMLDivElement, ProductHighlightCardProps>(
  ({ className, categoryIcon, category, title, description, price, imageSrc, imageAlt, slug, ...props }, ref) => {
    
    // --- Animation Logic for 3D Tilt Effect ---
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    };

    // Transform mouse position into a rotation value
    const rotateX = useTransform(mouseY, [0, 350], [10, -10]);
    const rotateY = useTransform(mouseX, [0, 350], [-10, 10]);
    
    // Apply spring physics for a smoother animation
    const springConfig = { stiffness: 300, damping: 20 };
    const springRotateX = useSpring(rotateX, springConfig);
    const springRotateY = useSpring(rotateY, springConfig);
    
    // --- Animation Logic for Glow Effect ---
    const glowX = useTransform(mouseX, [0, 350], [0, 100]);
    const glowY = useTransform(mouseY, [0, 350], [0, 100]);
    const glowOpacity = useTransform(mouseX, [0, 350], [0, 0.4]);

    return (
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => {
          mouseX.set(0);
          mouseY.set(0);
        }}
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d",
        }}
        className={cn(
          "relative h-[400px] w-full max-w-[320px] rounded-2xl bg-white shadow-md transition-shadow duration-300 hover:shadow-xl",
          className
        )}
        {...props}
      >
        <Link href={`/product/${slug}`} className="block h-full w-full">
          <div style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }} className="absolute inset-2 rounded-xl bg-white border border-gray-200 overflow-hidden group">
            
            {/* Subtle luxury light radial gradient texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#f3f4f6_0%,transparent_70%)] opacity-50"></div>

            {/* Glow effect that follows the mouse */}
            <motion.div
              className="pointer-events-none absolute -inset-px rounded-xl opacity-0"
              style={{
                opacity: glowOpacity,
                background: `radial-gradient(120px at ${glowX}% ${glowY}%, rgba(201,168,106,0.15), transparent 50%)`,
              }}
            />

            <div className="relative z-10 flex h-full flex-col p-6 pt-8">
              
              {/* Top: Text content */}
              <div className="text-black text-center">
                <h2 className="text-2xl font-serif tracking-wide mb-2 group-hover:text-[#C9A86A] transition-colors">{title}</h2>
                <p className="text-xs font-light text-gray-500 leading-relaxed mb-4 line-clamp-2">
                  {description}
                </p>
              </div>

              {/* Middle: 3D Image */}
              <div className="flex-1 flex items-center justify-center relative my-4">
                <motion.img
                  src={imageSrc}
                  alt={imageAlt}
                  style={{ transform: "translateZ(60px)" }}
                  whileHover={{ scale: 1.15, y: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-40 w-40 object-cover drop-shadow-2xl rounded-lg opacity-90 group-hover:opacity-100"
                />
              </div>

              {/* Bottom: Pricing below image */}
              <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-200">
                <span className="text-[#C9A86A] text-sm tracking-widest block">
                  ₹{price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs tracking-[0.2em] uppercase text-black relative overflow-hidden pb-1 inline-block">
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#C9A86A]">Explore &rarr;</span>
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#C9A86A] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>
                </span>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }
);

ProductHighlightCard.displayName = "ProductHighlightCard";
