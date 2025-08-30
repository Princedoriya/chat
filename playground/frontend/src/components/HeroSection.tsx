"use client";
import React from "react";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-teal-300 via-cyan-300 to-lime-200 overflow-hidden">
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220">
          <path
            fill="#fff"
            d="M0,64L48,90.7C96,117,192,171,288,165.3C384,160,480,96,576,74.7C672,53,768,75,864,96C960,117,1056,139,1152,160C1248,181,1344,203,1392,213.3L1440,224L1440,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-8 py-24 flex flex-col md:flex-row items-center">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
            Welcome to <span className="text-teal-700">My Playground</span>
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Explore my profile, skills, and projects. Built with Next.js, TailwindCSS, and MongoDB.
          </p>
          <button className="bg-gradient-to-r from-teal-500 to-lime-400 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition">
            Get Started
          </button>
        </div>
        <div className="flex-1">
          <img src="/backhero.png" alt="Playground" className="w-full" />
        </div>
      </div>
    </section>
  );
}
