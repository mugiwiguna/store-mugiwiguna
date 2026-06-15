export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  images: string[];
  variants?: { name: string; options: string[] }[];
  colors?: { name: string; hex: string }[];
  rating: number;
  reviewCount: number;
  stock: number;
  badge?: "new" | "sale" | "hot";
  tags?: string[];
}

export const products: Product[] = [
  {
    id: "wh-headphones-pro",
    name: "Wireless Bluetooth Headphones Pro Max",
    description:
      "Premium wireless headphones with active noise cancellation, 40-hour battery life, and crystal-clear sound quality. Perfect for music lovers and professionals.",
    price: 899000,
    originalPrice: 1299000,
    category: "Electronics",
    images: ["/products/headphones.jpg"],
    colors: [
      { name: "Midnight Black", hex: "#1a1a1a" },
      { name: "Pearl White", hex: "#f5f5f5" },
      { name: "Space Gray", hex: "#4a5568" },
      { name: "Navy Blue", hex: "#1e3a5f" },
    ],
    variants: [
      {
        name: "Size",
        options: ["S", "M", "L", "XL"],
      },
    ],
    rating: 4.9,
    reviewCount: 128,
    stock: 45,
    badge: "sale",
    tags: ["bestseller", "noise-cancelling"],
  },
  {
    id: "cotton-tshirt",
    name: "Premium Cotton T-Shirt - Minimalist Design",
    description:
      "Soft, breathable 100% organic cotton t-shirt with a clean minimalist design. Available in multiple colors.",
    price: 259000,
    category: "Fashion",
    images: ["/products/tshirt.jpg"],
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Gray", hex: "#9ca3af" },
      { name: "Navy", hex: "#1e3a5f" },
    ],
    variants: [
      {
        name: "Size",
        options: ["S", "M", "L", "XL", "XXL"],
      },
    ],
    rating: 4.7,
    reviewCount: 89,
    stock: 120,
    badge: "new",
    tags: ["organic", "sustainable"],
  },
  {
    id: "desk-lamp",
    name: "Minimalist Desk Lamp with LED Light",
    description:
      "Elegant desk lamp with adjustable LED brightness, USB charging port, and modern design that fits any workspace.",
    price: 459000,
    category: "Home & Living",
    images: ["/products/lamp.jpg"],
    colors: [
      { name: "White", hex: "#ffffff" },
      { name: "Black", hex: "#1a1a1a" },
    ],
    rating: 4.5,
    reviewCount: 56,
    stock: 3,
    tags: ["led", "adjustable"],
  },
  {
    id: "skincare-set",
    name: "Natural Skincare Set - Daily Routine",
    description:
      "Complete daily skincare routine with cleanser, toner, serum, and moisturizer. Made with natural ingredients.",
    price: 389000,
    category: "Beauty",
    images: ["/products/skincare.jpg"],
    rating: 4.8,
    reviewCount: 203,
    stock: 67,
    badge: "hot",
    tags: ["natural", "cruelty-free"],
  },
  {
    id: "water-bottle",
    name: "Insulated Water Bottle - 750ml",
    description:
      "Double-wall vacuum insulated stainless steel bottle. Keeps drinks cold for 24h or hot for 12h.",
    price: 189000,
    originalPrice: 249000,
    category: "Sports",
    images: ["/products/bottle.jpg"],
    colors: [
      { name: "Matte Black", hex: "#1a1a1a" },
      { name: "White", hex: "#ffffff" },
      { name: "Ocean Blue", hex: "#0077b6" },
      { name: "Rose Gold", hex: "#b76e79" },
    ],
    rating: 4.6,
    reviewCount: 312,
    stock: 89,
    badge: "sale",
    tags: ["eco-friendly", "insulated"],
  },
  {
    id: "notebook-set",
    name: "Premium Notebook Set - A5",
    description:
      "Set of 3 premium dotted grid notebooks with lay-flat binding. Perfect for journaling and planning.",
    price: 159000,
    category: "Stationery",
    images: ["/products/notebook.jpg"],
    colors: [
      { name: "Classic Black", hex: "#1a1a1a" },
      { name: "Warm Beige", hex: "#d4c4a8" },
      { name: "Forest Green", hex: "#2d5a27" },
    ],
    rating: 4.9,
    reviewCount: 178,
    stock: 200,
    badge: "new",
    tags: ["journaling", "premium"],
  },
  {
    id: "wireless-mouse",
    name: "Ergonomic Wireless Mouse",
    description:
      "Bluetooth + USB receiver wireless mouse with ergonomic design. Silent clicks and adjustable DPI.",
    price: 329000,
    category: "Electronics",
    images: ["/products/mouse.jpg"],
    colors: [
      { name: "Black", hex: "#1a1a1a" },
      { name: "White", hex: "#ffffff" },
    ],
    rating: 4.4,
    reviewCount: 94,
    stock: 56,
    tags: ["ergonomic", "bluetooth"],
  },
  {
    id: "canvas-tote",
    name: "Organic Canvas Tote Bag",
    description:
      "Durable organic canvas tote bag with reinforced handles. Perfect for shopping or daily use.",
    price: 179000,
    category: "Fashion",
    images: ["/products/tote.jpg"],
    colors: [
      { name: "Natural", hex: "#e8dcc8" },
      { name: "Black", hex: "#1a1a1a" },
      { name: "Olive", hex: "#556b2f" },
    ],
    rating: 4.7,
    reviewCount: 67,
    stock: 145,
    tags: ["eco-friendly", "organic"],
  },
];

export const categories = [
  "All Products",
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports",
  "Stationery",
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "All Products") return products;
  return products.filter((p) => p.category === category);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}
