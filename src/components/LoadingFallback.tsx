export function LoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400"></div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

