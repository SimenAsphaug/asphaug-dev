// ExperienceSection.tsx
'use client';

import React, { useState } from 'react';

type Job = {
  title: string;
  company: string;
  duration: string;
  location?: string;
  tags: string[];
};

type ExperienceSectionProps = {
  jobs: Job[];
};

export default function ExperienceSection({ jobs }: ExperienceSectionProps) {
  const [showTags, setShowTags] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="uppercase text-sm tracking-widest text-slate-500 font-medium">
          Experience
        </h3>
        <button
          onClick={() => setShowTags((prev) => !prev)}
          className="bg-[#1e293b] text-sky-400 text-xs px-2 py-1 rounded-md font-medium transition-colors duration-300 hover:bg-sky-500 hover:text-white"
        >
          {showTags ? 'Hide Tags' : 'Show Tags'}
        </button>
      </div>
      {jobs.map((job, index) => (
        <div
          key={index}
          className="transition-transform duration-300 ease-out transform hover:scale-105"
        >
          <p className="text-sm text-slate-400">{job.duration}</p>
          <h4 className="font-semibold text-white">
            {job.title} · {job.company}
          </h4>
          {job.location && <p className="text-xs text-slate-500">{job.location}</p>}
          {showTags && (
            <div className="flex flex-wrap mt-2 gap-2">
              {job.tags.map((tag, tagIndex) => (
                <span
                  key={tagIndex}
                  className="bg-[#1e293b] text-sky-400 text-xs px-2 py-1 rounded-md font-medium transition-opacity duration-300 hover:opacity-80"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
