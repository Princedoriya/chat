"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div
      style={{
        backgroundImage: "url('http://www.pixelstalk.net/wp-content/uploads/2016/05/Black-Abstract-HD-Wallpaper.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
      }}
      className="relative"
    >
      {/* Hero Section */}
      <div className="relative flex items-center justify-center text-center min-h-screen">
        

        {/* Content */}
        <div className="relative z-10 max-w-3xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg">
            Welcome to <span className="text-lime-400">Form Builder</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Build, explore, and create amazing experiences with our platform.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            
            <Link
              href="/form-builder"
              className="px-6 py-3 bg-lime-500 font-medium text-black rounded-lg shadow hover:bg-lime-600 transition"
            >
              Go to Form Builder
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
