import { type RouteConfig, index, route } from "@react-router/dev/routes"

export default [
    index("pages/Home.tsx"),
    route("/winners", "pages/Winners.tsx"),
] satisfies RouteConfig
