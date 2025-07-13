import { Suspense } from "react";
import HomeClient from "./HomeClient";

export default function HomePage() {
  return (
    <Suspense fallback={<p className="text-center p-6">Loading...</p>}>
      <HomeClient />
    </Suspense>
  );
}
