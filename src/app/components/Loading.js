"use client";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 text-lg font-medium">
        Loading data, please wait...
      </p>
    </div>
  );
}