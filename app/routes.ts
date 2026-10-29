import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/products/all", "./pages/product/product.tsx"),
    route("/products/all/:id", "./pages/product/productdetails.tsx"),

    // routes for image gallery / carousel
    route("/image-gallery", "./pages/image-preview.tsx")
] satisfies RouteConfig;