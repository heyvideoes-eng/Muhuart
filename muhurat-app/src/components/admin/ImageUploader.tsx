"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { UploadCloud, Loader2, X } from "lucide-react";
import Image from "next/image";

interface ImageUploaderProps {
  productId: string;
  currentImageUrl?: string | null;
  onUploadComplete: (url: string) => void;
}

export default function ImageUploader({ productId, currentImageUrl, onUploadComplete }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setError(null);
      setUploading(true);

      const file = e.target.files?.[0];
      if (!file) return;

      // Validate size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        throw new Error("File size exceeds 10MB limit.");
      }

      // Generate unique file path
      const fileExt = file.name.split('.').pop();
      const fileName = `${productId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `products/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      // Update product record
      const { error: updateError } = await supabase
        .from('products')
        .update({ image_url: publicUrl })
        .eq('id', productId);

      if (updateError) throw updateError;

      onUploadComplete(publicUrl);
    } catch (err: any) {
      console.error("Upload error:", err.message);
      setError(err.message || "Failed to upload image.");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = async () => {
    try {
      setUploading(true);
      const { error } = await supabase
        .from('products')
        .update({ image_url: null })
        .eq('id', productId);
      
      if (error) throw error;
      onUploadComplete("");
    } catch (err: any) {
      setError("Failed to remove image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      {currentImageUrl ? (
        <div className="relative group w-full aspect-square bg-surface border border-border rounded-md overflow-hidden">
          <Image 
            src={currentImageUrl} 
            alt="Product Image" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 backdrop-blur-sm">
            <label className="cursor-pointer bg-gold-primary text-background px-4 py-2 text-xs uppercase tracking-widest hover:scale-105 transition-transform">
              Replace
              <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleUpload} disabled={uploading} />
            </label>
            <button onClick={removeImage} disabled={uploading} className="bg-red-500 text-white px-4 py-2 text-xs uppercase tracking-widest hover:scale-105 transition-transform">
              Delete
            </button>
          </div>
          {uploading && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
              <Loader2 className="animate-spin text-gold-primary" size={24} />
            </div>
          )}
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full aspect-square border-2 border-dashed border-border rounded-md cursor-pointer bg-surface/50 hover:bg-surface transition-colors relative">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <UploadCloud className="w-8 h-8 text-text-secondary mb-3" />
            <p className="mb-2 text-sm text-text-secondary">
              <span className="font-semibold text-gold-primary">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-text-secondary/50">PNG, JPG, WEBP (MAX. 10MB)</p>
          </div>
          <input type="file" accept="image/png, image/jpeg, image/webp" className="hidden" onChange={handleUpload} disabled={uploading} />
          {uploading && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
              <Loader2 className="animate-spin text-gold-primary" size={24} />
            </div>
          )}
        </label>
      )}
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
    </div>
  );
}
