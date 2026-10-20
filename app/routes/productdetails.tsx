import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useProductQueryById } from "~/query/useProductQuery";

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    // 1. Call hooks unconditionally (moved `if (!id)` down or handled via `enabled` in query)
    const { isPending, isError, error, data } = useProductQueryById(id ?? "");

    if (!id) {
        return <div className="p-6 text-center text-red-500">Invalid Product ID</div>;
    }

    if (isPending) {
        return <div className="h-screen flex items-center justify-center font-medium">Loading product details...</div>;
    }

    if (isError) {
        return <div className="p-6 text-center text-red-500">Error: {error?.message || "Failed to load product"}</div>;
    }

    if (!data) return null;

    function handleRedirectBack(){
        navigate("/products/all");
    }

    return (
        <div className="h-full max-w-7xl mx-auto px-4 py-8">
            <div className="flex items-start text-start">
                <h5 onClick={handleRedirectBack} className="text-black flex cursor-pointer items-center">
                <ArrowLeft className="p-3" color={'black'} size={44}/> 
                <span>Go back</span>
                </h5>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                
                {/* Left Column: Image Gallery / Thumbnail */}
                <div className="space-y-4">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                        <img 
                            src={data.images?.[0] || data.thumbnail} 
                            alt={data.title}
                            className="w-full h-full object-cover" 
                        />
                    </div>
                </div>

                {/* Right Column: Product Information */}
                <div className="flex flex-col space-y-4">
                    {/* Category & Brand */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span className="uppercase tracking-wider font-semibold bg-gray-100 px-2.5 py-1 rounded">
                            {data.category}
                        </span>
                        <span className="font-medium text-indigo-600">{data.brand}</span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-gray-900">{data.title}</h1>

                    {/* Rating & Stock Status */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center text-amber-500 font-semibold">
                            ★ {data.rating} <span className="text-gray-400 text-sm ml-1">({data.reviews?.length || 0} reviews)</span>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                            data.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                            {data.availabilityStatus} ({data.stock} left)
                        </span>
                    </div>

                    {/* Price & Discount */}
                    <div className="flex items-baseline space-x-3 pt-2">
                        <span className="text-3xl font-extrabold text-gray-900">${data.price.toFixed(2)}</span>
                        {data.discountPercentage > 0 && (
                            <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                                {data.discountPercentage}% OFF
                            </span>
                        )}
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed border-t border-b border-gray-100 py-4">
                        {data.description}
                    </p>

                    {/* Extra Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 pt-2">
                        <div><strong className="text-gray-900">Warranty:</strong> {data.warrantyInformation}</div>
                        <div><strong className="text-gray-900">Shipping:</strong> {data.shippingInformation}</div>
                        <div><strong className="text-gray-900">Return Policy:</strong> {data.returnPolicy}</div>
                        <div><strong className="text-gray-900">Min Order:</strong> {data.minimumOrderQuantity} units</div>
                    </div>

                    {/* Action Button */}
                    <div className="pt-4">
                        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-6 rounded-lg transition-colors shadow-sm">
                            Add to Cart
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}