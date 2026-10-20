import { api } from "~/services/api/api";

// fetching the products
export async function getProducts(debouncedValue: string, limit: number = 30 , skip: number = 0) {
    const response = await api(`/products/search?q=${debouncedValue}&limit=${limit}&skip=${skip}`);
    return response.products;
}

//fetching the images 
export async function getProductsImages(){
    const response = await api(`/products`);
    return response.products;
}

// fetching the products using Id
export async function getProductsById(id: string) {
    const data = await api(`/products/${id}`);
    return data;
}