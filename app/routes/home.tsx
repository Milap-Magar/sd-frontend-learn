import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SD: Frontend System Design" },
    { name: "description", content: "Welcome to SD also known as system design learning" },
  ];
}

export default function Home() {
  return (
  <div className="w-full min-h-screen">
    HOME PAGE
  </div>
)};
