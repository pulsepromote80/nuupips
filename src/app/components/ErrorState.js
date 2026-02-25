"use client";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="bg-red-100 text-red-600 p-4 rounded-full text-3xl">
        ⚠️
      </div>

      <h2 className="mt-4 text-xl font-semibold text-gray-800">
        Something went wrong
      </h2>

      <p className="mt-2 text-gray-500 max-w-md">
        {message || "We couldn't fetch the data. Please try again."}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          🔄 Retry
        </button>
      )}
    </div>
  );
}
