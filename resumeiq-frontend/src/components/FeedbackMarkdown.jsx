import React from "react";
import ReactMarkdown from "react-markdown";

export default function FeedbackMarkdown({ feedback }) {
  if (!feedback) return null;
  return (
    <div className="flex justify-center my-8">
      <div className="prose prose-lg max-w-2xl bg-white border border-gray-200 shadow-lg rounded-xl p-6">
        <ReactMarkdown>{feedback}</ReactMarkdown>
      </div>
    </div>
  );
}
