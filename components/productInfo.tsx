"use client";

import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import type { Product, ProductVariant } from "@/lib/product";
import { useVariantContext } from "@/context/useVariantContext";
import { HeartIcon } from "@heroicons/react/24/outline";

type Props = {
  product: Product;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
};

export default function ProductInfo({
  product,
  selectedColor,
  setSelectedColor,
}: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const { setSelectedVariant, selectedVariant } = useVariantContext();

  const handleColorChange = (variant: ProductVariant, color: string) => {
    setLoading(true);
    setSelectedVariant(variant);
    setSelectedColor(color);
  };

  useEffect(() => {
    if (selectedVariant) {
      setLoading(false); 
    }
  }, [selectedVariant]);

  if (!selectedVariant) return null;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-3xl font-semibold">{product.name}</h1>
      <p className="text-xl font-medium text-blue-600">
        price: ${product.price.toFixed(2)}
      </p>

      <div>
        <h3 className="font-medium mb-1">
          Color: &nbsp;
          <label
            className={`font-semibold text-${selectedColor}-600`}
            style={{ color: `${selectedColor}` }}
          >{`${selectedColor}`}</label>
        </h3>
        <div className="flex gap-2">
          {product.variants.map((variant) => (
            <button
              key={variant.color}
              onClick={() => handleColorChange(variant, variant.color)}
              className={`rounded-full w-8 h-8 border-2 ${
                selectedColor === variant.color
                  ? "border-black"
                  : "border-gray-300"
              }`}
              style={{ backgroundColor: variant.color.toLowerCase() }}
              aria-label={variant.color}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-1">Size</h3>
        <div className="flex gap-2 flex-wrap">
          {selectedVariant?.availableSizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 border rounded ${
                selectedSize === size
                  ? "border-black bg-black text-white"
                  : "border-gray-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label className="font-medium">Quantity:</label>
        <input
          id="quantity"
          type="number"
          min={1}
          max={10}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-16 border px-2 py-1 rounded"
        />
        {selectedVariant?.stock === 0 ? (
          <span className="text-red-600 font-semibold text-sm">
            Out of Stock
          </span>
        ) : selectedVariant.stock <= 5 ? (
          <span
            className={`text-sm font-semibold ${
              selectedVariant.stock === 2 ? "text-red-600" : "text-orange-500"
            }`}
          >
            {selectedVariant.stock === 2
              ? "Only 2 left in stock!"
              : `Low stock: ${selectedVariant.stock} left`}
          </span>
        ) : null}
      </div>

      <button
        onClick={() =>
          toast.success(
            `Added ${quantity} ${selectedColor} ${product.name} to cart.`
          )
        }
        className="mt-4 bg-black text-white py-3 rounded-xl hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed"
        disabled={!selectedSize}
      >
        Add to Cart
      </button>
      <button
        onClick={() => {
          toast.success(
            `Added ${quantity} ${selectedColor} ${product.name} to favourites.`
          );
        }}
        className="mt-4 bg-white text-black border border-black px-6 py-3 rounded-xl hover:bg-black hover:text-white flex items-center justify-center gap-2 transition"
      >
        <HeartIcon className="h-5 w-5" />
        Favourite
      </button>

      <details className="mt-6">
        <summary className="cursor-pointer font-semibold text-lg">
          Product Description
        </summary>
        <p className="mt-2 text-gray-700 text-sm leading-relaxed">
          {product.description}
        </p>
      </details>

      <details className="mt-4">
        <summary className="text-lg font-semibold mb-2">
          Product Details
        </summary>
        <ul className="list-disc ml-6 text-sm text-gray-600">
          {Object.entries(product.details).map(([key, value]) => (
            <li key={key}>
              <strong className="font-semibold">{key}: &nbsp;</strong> {value}
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}
