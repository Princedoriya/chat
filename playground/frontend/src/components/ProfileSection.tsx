"use client";
import React, { useEffect, useState } from "react";
import { getProfile } from "../lib/api";

interface Profile {
  name: string;
  email: string;
  education: { institute: string; degree: string; start: string; end: string }[];
  links: { github: string; linkedin: string; portfolio: string };
}

export default function ProfileSection({ email }: { email: string }) {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile(email).then((data) => {
      if (Array.isArray(data)) setProfile(data[0]);
      else setProfile(data);
    });
  }, [email]);

  if (!profile) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <section className="bg-white pb-40 pt-2 relative">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">About {profile.name}</h2>
        <p className="text-lg text-gray-600 mb-6">{profile.email}</p>

        <div className="flex justify-center space-x-6">
          <a href={profile.links.github} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-800 transition">
            GitHub
          </a>
          <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-800 transition">
            LinkedIn
          </a>
          <a href={profile.links.portfolio} target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:text-teal-800 transition">
            Portfolio
          </a>
        </div>

        <div className="mt-8 text-left max-w-2xl mx-auto">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Education</h3>
          {profile.education.map((edu, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-800">{edu.institute}</p>
              <p className="text-gray-600">{edu.degree}</p>
              <p className="text-sm text-gray-500">{edu.start} - {edu.end}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220">
          <path
            fill="url(#grad)"
            d="M0,64L48,74.7C96,85,192,107,288,128C384,149,480,171,576,176C672,181,768,171,864,149.3C960,128,1056,96,1152,85.3C1248,75,1344,85,1392,90.7L1440,96V320H0Z"
          ></path>
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#99f6e4" />
              <stop offset="100%" stopColor="#bef264" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
