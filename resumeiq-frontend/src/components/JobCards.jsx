import React from "react";

export default function JobCards({ jobs }) {
  if (!jobs || jobs.length === 0) return null;

  return (
    <div>
      <div className="text-lg font-bold mb-3 text-blue-900">Matching Jobs:</div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {jobs.map((job, idx) => (
          <div key={idx} className="border rounded p-3 bg-blue-50 flex flex-col">
            <div className="font-semibold mb-1">{job.title}</div>
            <div className="text-sm text-gray-600 mb-1">
              {job.company_name} • {job.location}
            </div>
            <div className="text-xs text-gray-400 mb-2">
              {job.posted_at ? `Posted: ${job.posted_at}` : ""}
              {job.schedule_type && ` • ${job.schedule_type}`}
            </div>
            <a
              href={job.link}
              className="mt-auto text-blue-700 hover:underline text-sm font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
