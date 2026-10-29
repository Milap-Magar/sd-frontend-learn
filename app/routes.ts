import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/products/all", "./pages/product/product.tsx"),
    route("/products/all/:id", "./pages/product/productdetails.tsx"),

    // routes for image gallery / carousel
    route("/image-gallery", "./pages/image/image-preview.tsx"),
    
    // routes for dynamic form handling
    route("/form-handler", "./pages/form/form-handler.tsx")
] satisfies RouteConfig;