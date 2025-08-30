"use client";
import React, { useEffect, useState } from "react";
import { getTopSkills } from "../lib/api";

interface Skill {
  skill: string;
  count: number;
}

export default function SkillsSection() {
  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    getTopSkills().then(setSkills).catch(console.error);
  }, []);

  return (
    <section className="bg-gradient-to-r from-lime-200 via-teal-100 to-cyan-200 py-20">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          Top Skills
        </h2>

        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {skills.map((s) => (
            <div
              key={s.skill}
              className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 
                         transition-all flex flex-col items-center"
            >
              <span className="text-2xl font-semibold text-teal-700">
                {s.skill}
              </span>
              <span className="mt-2 text-sm text-gray-500">
                {s.count} projects
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
