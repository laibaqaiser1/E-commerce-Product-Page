"use client";

import React, { useState } from "react";
import ProductImageGallery from "@/components/productImageGallery";
import ProductInfo from "@/components/productInfo";
import { Product } from "@/lib/product";

export default function ProductPage() {
  const { variants } = Product;

  const [selectedColor, setSelectedColor] = useState(variants[0].color);
  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-7xl w-full grid md:grid-cols-2 gap-8">
        <div>
          <p className="text-xl font-medium text-gray-600 mb-4">
            {`Fashion > Women > Shoes > Sneakers > ${selectedColor}`}
          </p>
          <ProductImageGallery
            variants={Product?.variants}
            selectedColor={selectedColor}
          />
        </div>
        <ProductInfo
          product={Product}
          selectedColor={selectedColor}
          setSelectedColor={setSelectedColor}
        />
      </div>
    </main>
  );
}
