export type ProductVariant = {
    color: string;
    images: string[];
    availableSizes: string[];
    stock: number
    blurrImage: string
  };
  
  export type Product = {
    id: string;
    name: string;
    slug: string;
    price: number;
    description: string;
    variants: ProductVariant[];
    details: Record<string, string>;
  };
  
  export const Product: Product = {
    id: '1',
    name: "Women's Sneaker",
    slug: 'womens-sneaker',
    price: 79.99,
    description:
      'Our Women\'s Sport Sneaker blends comfort, durability, and style. Designed for daily wear with breathable fabric, lightweight cushioning, and modern design. Available in a variety of trendy colors and inclusive sizing.',
    variants: [
      {
        color: 'Pink',
        images: [
          '/products/womens-sneaker/pink/3.jpg',
          '/products/womens-sneaker/pink/4.jpg',
        ],
        availableSizes: ['5', '6', '7', '8'],
        blurrImage: '/products/womens-sneaker/pink/blurr.png',
        stock: 2
      },
      {
        color: 'Black',
        images: [
          '/products/womens-sneaker/black/1.jpg',
          '/products/womens-sneaker/black/3.jpg',
          '/products/womens-sneaker/black/4.jpg',
        ],
        availableSizes: ['5', '6', '7', '8'],
        blurrImage: '/products/womens-sneaker/black/blurr.png',
        stock: 10
      },
      {
        color: 'Red',
        images: [
          '/products/womens-sneaker/red/1.jpg',
          '/products/womens-sneaker/red/2.jpg',
          '/products/womens-sneaker/red/3.jpg',
          '/products/womens-sneaker/red/4.jpg',
        ],
        availableSizes: ['5', '6', '7'],
        blurrImage: '/products/womens-sneaker/red/blurr.png',
        stock: 0
      },
      {
        color: 'Grey',
        images: [
          '/products/womens-sneaker/grey/1.jpg',
          '/products/womens-sneaker/grey/2.jpg',
        ],
        availableSizes: ['5', '7', '8'],
        stock: 5,
        blurrImage: '/products/womens-sneaker/grey/blurr.png',
      },
    ],
    details: {
      Upper: 'Breathable mesh fabric',
      Midsole: 'Lightweight EVA foam',
      Outsole: 'Rubber grip with high traction',
      Fit: 'True to size',
      Care: 'Hand wash recommended'
    }
  };
  