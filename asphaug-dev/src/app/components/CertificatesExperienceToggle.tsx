"use client";

import { useState } from "react";
import Image from "next/image";

interface Certificate {
  src: string;
  alt: string;
  href: string;
}

interface Job {
  title: string;
  company: string;
  duration: string;
  location?: string;
  tags: string[];
}

interface Props {
  certificates: Certificate[];
  jobs: Job[];
}

export default function CertificatesExperienceToggle({
  certificates,
  jobs,
}: Props) {
  const [activeTab, setActiveTab] = useState<"certificates" | "experience">(
    "certificates"
  );
  const [showTags, setShowTags] = useState(false);

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex gap-6 border-b border-slate-700 justify-center">
        <button
          onClick={() => setActiveTab("certificates")}
          className={`uppercase text-sm tracking-widest font-medium pb-3 transition-colors relative ${
            activeTab === "certificates"
              ? "text-sky-400"
              : "text-slate-400 hover:text-slate-300"
          }`}
        >
          Certificates
          {activeTab === "certificates" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400"></div>
          )}
        </button>
        <button
          onClick={() => setActiveTab("experience")}
          className={`uppercase text-sm tracking-widest font-medium pb-3 transition-colors relative ${
            activeTab === "experience"
              ? "text-sky-400"
              : "text-slate-400 hover:text-slate-300"
          }`}
        >
          Experience
          {activeTab === "experience" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400"></div>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === "certificates" ? (
          <div className="space-y-3">
            {certificates.map((cert, idx) => (
              <a
                key={idx}
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-transform duration-300 ease-out hover:translate-x-1"
              >
                <Image
                  src={cert.src}
                  alt={cert.alt}
                  width={57}
                  height={57}
                  className="rounded-md flex-shrink-0"
                  unoptimized
                />
                <span className="text-sm text-slate-300 hover:text-sky-400 transition-colors">
                  {cert.alt}
                </span>
              </a>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-end">
              <button
                onClick={() => setShowTags((prev) => !prev)}
                className="bg-[#1e293b] text-sky-400 text-xs px-2 py-1 rounded-md font-medium transition-colors duration-300 hover:bg-sky-500 hover:text-white"
              >
                {showTags ? "Hide Tags" : "Show Tags"}
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
                {job.location && (
                  <p className="text-xs text-slate-500">{job.location}</p>
                )}
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
        )}
      </div>
    </div>
  );
}
