import React from 'react';

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
  totalCount
}) => {
  if (!hasMore) {
    return (
      <div className="text-center py-8">
        <div className="text-sm text-gray-500">
          Menampilkan semua {totalCount} produk
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <button
        onClick={onLoadMore}
        disabled={isLoading}
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Memuat...
          </>
        ) : (
          <>
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Muat Lebih Banyak
          </>
        )}
      </button>
      <div className="mt-2 text-sm text-gray-500">
        Menampilkan {currentCount} dari {totalCount} produk
      </div>
    </div>
  );
}; 