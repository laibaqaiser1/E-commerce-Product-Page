"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import type { ProductVariant } from "@/lib/product";
import { useVariantContext } from "@/context/useVariantContext";
import LazyImage from "./lazyImage";
import toast from "react-hot-toast";

type Props = {
  variants: ProductVariant[];
  selectedColor: string;
};

export default function ProductGallery({ variants, selectedColor }: Props) {
  const { setSelectedVariant, selectedVariant } = useVariantContext();

  if (!selectedVariant) return null;
  const [selectedImage, setSelectedImage] = useState(
    selectedVariant?.images[0]
  );
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    if (selectedImage) {
      setIsLoading(true);
    }
  }, [selectedImage]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    toast.error("Failed to load image");
  };

  useEffect(() => {
    if (selectedVariant) {
      setSelectedImage(selectedVariant?.images[0]);
      setIsLoading(true);
    }
  }, [selectedColor, selectedVariant]);

  if (!selectedVariant || !selectedImage) {
    return (
      <div className="w-full h-[600px] bg-gray-100 flex items-center justify-center rounded animate-pulse">
        <div className="w-12 h-12 border-4 border-blue-300 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-full h-[600px] border rounded overflow-hidden group">
        <LazyImage
          //key={selectedImage}
          src={selectedImage}
          alt={`${selectedColor} shoe`}
          fit="contain"
          className={`object-contain transition-transform duration-300 ease-in-out group-hover:scale-150 `}
          blurSrc={selectedVariant.blurrImage}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </div>

      <div className="flex gap-2 overflow-x-auto">
        {selectedVariant.images.map((img, i) => (
          <button
            key={i}
            onClick={() => {
              setSelectedImage(img);
              setIsLoading(true);
            }}
            className={`relative w-20 h-20 border rounded overflow-hidden ${
              selectedImage === img
                ? "border-3 border-black-700"
                : "border-black-300"
            }`}
          >
            <LazyImage
              src={img}
              alt={`${selectedVariant.color} thumbnail ${i + 1}`}
              fit="contain"
              blurSrc={selectedVariant.blurrImage}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
