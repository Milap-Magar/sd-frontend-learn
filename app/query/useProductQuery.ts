import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductsById } from "~/services/product.services";

export function useProductQuery(debouncedValue: string){
    // destrucutre the required datasets
    const { isPending, isError, data, error } = useQuery({
        queryKey:['products', debouncedValue],
        queryFn: () => getProducts(debouncedValue),
    })
    // console.log("🚀 ~ useProductQuery ~ data:", data)
    return {isPending, isError, data, error }
}


export function useProductQueryById(id: string){
    const { isPending, isError, error, data} = useQuery({
        queryKey:['product-id', id],
        queryFn: () => getProductsById(id),
    })

    return { isPending, isError, error, data } ;
}