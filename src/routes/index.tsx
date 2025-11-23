import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";
import { RouteErrorBoundary } from "@/components/ErrorBoundary";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const HomePage = lazy(() =>
  import("./home").then((m) => ({ default: m.HomePage }))
);

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner size="md" className="h-screen" />}>
        <HomePage />
      </Suspense>
    ),
    errorElement: <RouteErrorBoundary />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
