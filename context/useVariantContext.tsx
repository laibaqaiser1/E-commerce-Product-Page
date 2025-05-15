'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Product, type ProductVariant } from '@/lib/product';

type VariantContextType = {
  selectedVariant: ProductVariant | null;
  setSelectedVariant: (variant: ProductVariant) => void;
};

const VariantContext = createContext<VariantContextType | undefined>(undefined);

export const VariantProvider = ({ children }: { children: ReactNode }) => {
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(Product.variants[0]);

  return (
    <VariantContext.Provider value={{ selectedVariant, setSelectedVariant }}>
      {children}
    </VariantContext.Provider>
  );
};

export const useVariantContext = () => {
  const context = useContext(VariantContext);
  if (!context) {
    throw new Error('useVariantContext must be used within VariantProvider');
  }
  return context;
};
