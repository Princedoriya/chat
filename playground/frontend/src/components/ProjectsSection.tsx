"use client";
import React, { useState } from "react";
import { getProjects } from "../lib/api";

interface Project {
  ownerName: string;
  project: { title: string; description: string; links?: string[] };
}

export default function ProjectsSection() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Project[]>([]);

  const search = async () => {
    const res = await getProjects(q);
    setResults(res);
  };

  return (
    <section className="bg-gradient-to-r from-lime-200 via-teal-100 to-cyan-200 py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          Projects
        </h2>

        {/* Search Bar */}
        <div className="flex justify-center max-w-lg mx-auto space-x-2 mb-12">
          <input
            placeholder="Search by skill..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button
            onClick={search}
            className="bg-gradient-to-r from-teal-500 to-lime-400 text-white px-6 py-3 rounded-xl shadow-md hover:scale-105 transition"
          >
            Search
          </button>
        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((r, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-6 text-left hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col"
            >
              <h3 className="text-xl font-semibold text-teal-700 mb-2">
                {r.project.title}
              </h3>
              <p className="text-gray-600 flex-1">{r.project.description}</p>
              <div className="mt-4 flex space-x-4">
                {r.project.links && r.project.links.map((link: string, i: number) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-800 transition underline"
                  >
                    {link.includes("github.com") ? "GitHub Repo" : "Deployed Link"}
                  </a>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-500 italic">
                By {r.ownerName}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
