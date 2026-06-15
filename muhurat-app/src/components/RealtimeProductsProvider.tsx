"use client";

import { useEffect, useState } from "react";
import { supabase, Product } from "@/lib/supabase";

export function useRealtimeProducts(initialProducts: Product[]) {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  // Sync state if server-side props change (e.g., fast refresh or navigation)
  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'products',
        },
        (payload) => {
          console.log('Realtime Payload received!', payload);
          
          if (payload.eventType === 'INSERT') {
            setProducts(current => [...current, payload.new as Product]);
          }
          if (payload.eventType === 'UPDATE') {
            setProducts(current => 
              current.map(p => (p.id === payload.new.id ? (payload.new as Product) : p))
            );
          }
          if (payload.eventType === 'DELETE') {
            setProducts(current => current.filter(p => p.id !== payload.old.id));
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.log('Successfully subscribed to Supabase Realtime for products');
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return products;
}
