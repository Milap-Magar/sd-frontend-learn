import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("/products/all", "./routes/product.tsx"),
    route("/products/all/:id", "./routes/productdetails.tsx"),
] satisfies RouteConfig;