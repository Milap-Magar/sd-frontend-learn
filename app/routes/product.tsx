import { useState } from "react"
import { useNavigate } from "react-router";
import { useDebounce } from "~/hooks/useDebounce";
import { useProductQuery } from "~/query/useProductQuery";

export interface Products {
    id: string,
    title: string,
    description: string,
    category: string,
    price: number,
    stock: number,
    discountPercentage: number,
    images: string[],
}

export default function product(){
    const [value, setValue] = useState<string>("");
    const navigate = useNavigate();

    // handle search datasets without having a search button or click to api search rather than letting then hit
    const debouncedValue = useDebounce(value, 1000);

    // search the values datasets
    const { isPending, isError, data, error }= useProductQuery(debouncedValue);

    if(isPending) return <>LOADINGGG....</>

    if(isError) return <>ERROOOORRR</>

    const products: Products[] = data;

    function handleRedirectToDetails(id : string){
        navigate(`${id}`)
    }

    return(
    <section className="max-w-7xl w-full h-screen mx-auto">
        <div className="flex flex-col items-center mt-24">
            {/* input section */}
            <input 
                id="search-bar" 
                type="text" 
                value={value} 
                onChange={(e)=> setValue(e.target.value)} 
                className="w-96 p-4 border border-gray-400 rounded" 
                placeholder="Search Products..." />
                
            {isError && <p>{error?.message}</p>}
        </div>

        {/* display the datasetts */}
        <div className="flex flex-col justify-start items-start">
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg-grid-cols-6 gap-4">
                {products.map((product) => (
                    <li key={product.id} className="h-full mt-4 cursor-pointer" onClick={()=>handleRedirectToDetails(product.id)}>
                        <div className="bg-gray-200 rounded-2xl flex h-full flex-col p-2">
                            {/* Image */}
                              <figure>
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="w-full h-48 object-contain"
                                />
                            </figure>
                            <article className="flex-1 font-mono  pb-2 text-black">
                                {/* title && description */}
                                <h2 className="text-lg font-bold">{product.title}</h2>
                                <p><span className="line-clamp-2 overflow-hidden text-md font-semi-bold">Description: </span>{product.description}</p>
                            </article>
                            <div className="mt-auto"></div>
                        </div>
                    </li>
                ))
                }
            </ul>
       </div>
    </section>
    )};