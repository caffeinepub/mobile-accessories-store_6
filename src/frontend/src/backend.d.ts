import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: bigint;
    name: string;
    description: string;
    category: Category;
    rating: bigint;
    price: bigint;
}
export enum Category {
    audio = "audio",
    cases = "cases",
    protection = "protection",
    power = "power"
}
export interface backendInterface {
    addItemToCart(productId: bigint, quantity: bigint): Promise<void>;
    addToWishlist(productId: bigint): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCart(): Promise<Array<[Product, bigint]>>;
    getProduct(productId: bigint): Promise<Product>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    getWishlist(): Promise<Array<Product>>;
    removeFromCart(productId: bigint): Promise<void>;
}
