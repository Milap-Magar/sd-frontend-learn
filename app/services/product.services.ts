import { api } from "~/services/api/api";

// fetching the products
export async function getProducts(debouncedValue: string) {
    const response = await api(`/products/search?q=${debouncedValue}`);
    // console.log("🚀 ~ getProducts ~ response:", response)
    return response.products;
}