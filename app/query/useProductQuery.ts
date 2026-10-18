import { useQuery } from "@tanstack/react-query";
import { getProducts } from "~/services/product.services";

export function useProductQuery(debouncedValue: string){
    // destrucutre the required datasets
    const { isPending, isError, data, error } = useQuery({
        queryKey:['products', debouncedValue],
        queryFn: () => getProducts(debouncedValue),
    })
    // console.log("🚀 ~ useProductQuery ~ data:", data)
    return {isPending, isError, data, error }
}