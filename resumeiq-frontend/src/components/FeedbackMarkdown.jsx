import React from "react";
import ReactMarkdown from "react-markdown";

export default function FeedbackMarkdown({ feedback }) {
  if (!feedback) return null;
  return (
    <div className="w-full">
      <div className="prose prose-lg max-w-none bg-white rounded-xl">
        <ReactMarkdown>{feedback}</ReactMarkdown>
      </div>
    </div>
  );
}
