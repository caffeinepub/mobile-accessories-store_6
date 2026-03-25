import { Category } from "../backend.d";

export const CATEGORY_IMAGES: Record<string, string> = {
  [Category.cases]: "/assets/generated/product-clear-case.dim_400x400.jpg",
  [Category.power]: "/assets/generated/product-powerbank.dim_400x400.jpg",
  [Category.audio]: "/assets/generated/product-earbuds.dim_400x400.jpg",
  [Category.protection]:
    "/assets/generated/product-screen-protector.dim_400x400.jpg",
};

export function getProductImage(category: Category): string {
  return (
    CATEGORY_IMAGES[category] ??
    "/assets/generated/product-clear-case.dim_400x400.jpg"
  );
}

export function formatPrice(cents: bigint): string {
  return `$${(Number(cents) / 100).toFixed(2)}`;
}

export function renderStars(rating: bigint): { filled: boolean }[] {
  const r = Number(rating);
  return Array.from({ length: 5 }, (_, i) => ({ filled: i < r }));
}
