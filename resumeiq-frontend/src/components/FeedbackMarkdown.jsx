import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const WAVY_HEADERS = [
  "Strengths",
  "Improvements Needed",
  "Quick Tips",
  /^Rating: ?[\d/]+/i
];

function isWavyHeader(text) {
  return WAVY_HEADERS.some(
    (header) =>
      typeof header === "string"
        ? text.trim() === header
        : header.test(text.trim())
  );
}

export default function FeedbackMarkdown({ feedback }) {
  if (!feedback) return null;
  return (
    <div className="w-full">
      <div className="prose prose-lg max-w-none bg-white rounded-xl">
        <ReactMarkdown
          rehypePlugins={[rehypeRaw]}
          components={{
            p: ({ node, children }) => {
              const text = String(children).trim();
              if (isWavyHeader(text)) {
                return (
                  <p>
                    <span className="wavy-underline">{text}</span>
                  </p>
                );
              }
              return <p>{children}</p>;
            },
            u: ({node, ...props}) => <span {...props} className="wavy-underline" />,
          }}
        >
          {feedback}
        </ReactMarkdown>
      </div>
    </div>
  );
}
