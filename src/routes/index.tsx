import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import { RouteErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingFallback } from "@/components/LoadingFallback";

const HomePage = lazy(() => import("./home").then((m) => ({ default: m.HomePage })));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <HomePage />
      </Suspense>
    ),
    errorElement: <RouteErrorBoundary />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}

