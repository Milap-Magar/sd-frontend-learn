import { useProductImagesQuery } from "~/query/useProductQuery"
import type { Products } from "./product/product";
import { Link } from "react-router";

export default function ImagePreview() {
    const { data, isPending, isError, error } = useProductImagesQuery(); 
    console.log("🚀 ~ ImagePreview ~ data:", data)

    // 1. Handle loading state
    if (isPending) {
        return <div className="text-sm text-gray-500 p-4">Loading images...</div>;
    }

    // 2. Handle error state
    if (isError) {
        return <div className="text-sm text-red-500 p-4">Error loading images: {error?.message}</div>;
    }

    // Safely extract product information

    // implementing useMemo()
    
    const products = Array.isArray(data) ? data : data?.products ?? [];

    return (
        <div className="flex flex-col gap-4 p-4 rounded-lg">
            <h2 className="text-lg font-bold text-gray-800">Product Showcase</h2>

            {/* Masonry Feed Container */}
            {products.length > 0 ? (
                <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-6 gap-3 space-y-3">
                    {products.map((item: Products, index: number) => {
                        // Safely resolve the image URL
                        const imageUrl = (item as any)?.images?.[0] ?? (item as any)?.thumbnail ?? products.thumbnail;

                        return (
                            <Link to={`/products/all/${item.id}`}>
                                <figure 
                                    key={index} 
                                    className="break-inside-avoid bg-white border border-gray-100 rounded-lg overflow-hidden shadow-xs"
                                >
                                    <img
                                        src={imageUrl}
                                        alt={(item as any)?.title || "Product thumbnail"}
                                        // w-full and h-auto let images keep their natural proportions for masonry staggering
                                        className="w-full h-auto object-cover block"
                                    />
                                    {(item as any)?.title && (
                                        <figcaption className="p-2 text-xs font-medium text-gray-700 truncate">
                                            {(item as any).title}
                                        </figcaption>
                                    )}
                                </figure>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div className="text-gray-500 p-4">NO DATA</div>
            )}
        </div>
    );
}