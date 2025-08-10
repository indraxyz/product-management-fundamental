import React, { useEffect, useRef, useState } from "react";

interface LoadMoreButtonProps {
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading?: boolean;
  currentCount: number;
  totalCount: number;
}

export const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  onLoadMore,
  hasMore,
  isLoading = false,
  currentCount,
  totalCount,
}) => {
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [hasRequested, setHasRequested] = useState(false);

  // Reset request gate whenever list grows
  useEffect(() => {
    setHasRequested(false);
  }, [currentCount]);

  useEffect(() => {
    if (!hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading && !hasRequested) {
          setHasRequested(true);
          onLoadMore();
        }
      },
      { root: null, rootMargin: "200px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, isLoading, hasRequested, onLoadMore]);

  if (!hasMore) {
    return (
      <div className="text-center py-8">
        <div className="text-sm text-gray-500">
          Showing all {totalCount} products
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <div ref={sentinelRef} className="h-1 w-full" />
      <button
        onClick={onLoadMore}
        disabled={isLoading}
        className="btn btn-primary px-6 py-3 text-base"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
            Load More
          </>
        )}
      </button>
      <div className="mt-2 text-sm text-gray-500">
        Showing {currentCount} of {totalCount} products
      </div>
    </div>
  );
};
