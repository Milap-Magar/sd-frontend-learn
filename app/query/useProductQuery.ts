import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductsById, getProductsImages } from "~/services/product.services";

interface responseQuery{
    debouncedValue: string,
    limit?: number,
    skip?: number,
}

export function useProductImagesQuery(){
    const { isPending, isError , data, error,} = useQuery({
        queryKey:['products-images'],
        queryFn: () => getProductsImages(),
    })
    return {isPending, isError, data, error }
}

export function useProductQuery({debouncedValue, limit, skip }: responseQuery){
    // destrucutre the required datasets
    const { isPending, isError, data, error } = useQuery({
        queryKey:['products', debouncedValue, limit, skip],
        queryFn: () => getProducts(debouncedValue, limit, skip),
    })
    return {isPending, isError, data, error }
}


export function useProductQueryById(id: string){
    const { isPending, isError, error, data} = useQuery({
        queryKey:['product-id', id],
        queryFn: () => getProductsById(id),
    })
    return { isPending, isError, error, data } ;
}