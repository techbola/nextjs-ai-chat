"use client";

import { useCompletion } from "ai/react";

export default function Home() {
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: "/api/completion",
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-xl space-y-4 w-96"
      >
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask a question"
          className="w-full p-3 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={stop}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Stop
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg focus:outline-none ${
              isLoading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
            }`}
          >
            {isLoading ? "Loading..." : "Send"}
          </button>
        </div>
      </form>
      <output className="mt-6 p-4 bg-gray-800 rounded-lg shadow-xl text-center w-96">
        AI Result: {completion}
      </output>
    </div>
  );
}
