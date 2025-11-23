import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
}) => {
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-10 w-10 border-4",
    lg: "h-16 w-16 border-4",
  };

  const spinner = (
    <div
      className={`animate-spin rounded-full border-gray-200 dark:border-slate-600 border-t-blue-600 dark:border-t-blue-400 ${sizeClasses[size]}`}
    />
  );

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {spinner}
    </div>
  );
};
