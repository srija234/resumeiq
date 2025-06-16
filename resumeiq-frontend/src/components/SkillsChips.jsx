import React from "react";

const gradientClasses = [
  'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-800',
  'bg-gradient-to-r from-green-50 to-green-100 text-green-800',
  'bg-gradient-to-r from-purple-50 to-purple-100 text-purple-800',
  'bg-gradient-to-r from-yellow-50 to-yellow-100 text-yellow-800',
  'bg-gradient-to-r from-pink-50 to-pink-100 text-pink-800',
  'bg-gradient-to-r from-indigo-50 to-indigo-100 text-indigo-800',
  'bg-gradient-to-r from-teal-50 to-teal-100 text-teal-800',
  'bg-gradient-to-r from-orange-50 to-orange-100 text-orange-800',
  'bg-gradient-to-r from-cyan-50 to-cyan-100 text-cyan-800',
  'bg-gradient-to-r from-amber-50 to-amber-100 text-amber-800',
];

export default function SkillsChips({ skills, showHeading = true }) {
  if (!skills || skills.length === 0) return null;

  const getGradientClass = (skill) => {
    const hash = Array.from(skill).reduce(
      (hash, char) => char.charCodeAt(0) + (hash << 6) + (hash << 16) - hash,
      0
    );
    return gradientClasses[Math.abs(hash) % gradientClasses.length];
  };

  return (
    <div className="mb-8">
      
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            key={skill}
            className={`px-4 py-2 rounded-xl text-sm font-medium ${getGradientClass(skill)} 
                       shadow-sm hover:shadow-md transition-shadow duration-200`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}