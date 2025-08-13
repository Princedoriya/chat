"use client";

import { useState } from "react";
import Pan from "./Pan";

export default function Home() {
  const [aadhaar, setAadhaar] = useState("");
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<{ aadhaar?: string; name?: string }>({});
  const [showPan, setShowPan] = useState(false);

  const validateForm = () => {
    const newErrors: { aadhaar?: string; name?: string } = {};

    // Aadhaar: 12 digits only
    if (!/^\d{12}$/.test(aadhaar)) {
      newErrors.aadhaar = "Aadhaar must be exactly 12 digits.";
    }

    // Name: at least 3 letters, alphabets only
    if (!/^[a-zA-Z\s]{3,}$/.test(name)) {
      newErrors.name = "Name must contain only letters and be at least 3 characters long.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      console.log({ aadhaar, name });
      setShowPan(true);
      alert("Aadhaar validated successfully! PAN verification form is now visible.");
    }
  };

  return (
    <>
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="bg-[#1806B9CC] text-white">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
          <img src="/logo.png" alt="Logo" className="h-15 w-90" />
          <nav className="space-x-6 hidden md:block">
            <a href="#">Home</a>
            <a href="#">NIC Code</a>
            <a href="#">Useful Documents</a>
            <a href="#">Print / Verify</a>
            <a href="#">Update Details</a>
            <a href="#">Login</a>
          </nav>
        </div>
      </header>

      {/* Title */}
      <div className="text-center mt-6 px-4">
        <h2 className="text-2xl text-[#241B63]">
          UDYAM REGISTRATION FORM - For New Enterprise who are not Registered yet as MSME
        </h2>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto mt-6 p-6 border rounded-md shadow-sm">
        <h3 className="bg-[#007BFF] text-white px-4 py-2 font-medium rounded-t-md">
          Aadhaar Verification With OTP
        </h3>

        <form
          onSubmit={handleSubmit}
          className="bg-white border-t-0 border rounded-b-md p-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Aadhaar */}
            <div>
              <label className="block text-black font-semibold mb-1">
                1. Aadhaar Number / आधार संख्या
              </label>
              <input
                type="text"
                placeholder="Your Aadhaar No"
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
                className="w-full border text-gray-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.aadhaar && (
                <p className="text-red-500 text-sm mt-1">{errors.aadhaar}</p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-black font-semibold mb-1">
                2. Name of Entrepreneur / उद्यमी का नाम
              </label>
              <input
                type="text"
                placeholder="Name as per Aadhaar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border text-gray-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>
          </div>

          {/* Notes */}
          <ul className="list-disc list-inside text-sm text-gray-700 mt-4 space-y-1">
            <li>Aadhaar number shall be required for Udyam Registration.</li>
            <li>
              The Aadhaar number shall be of the proprietor in the case of a
              proprietorship firm, of the managing partner in the case of a
              partnership firm and of a karta in the case of a Hindu Undivided
              Family (HUF).
            </li>
            <li>
              In case of a Company or a Limited Liability Partnership or a
              Cooperative Society or a Society or a Trust, the organisation or
              its authorised signatory shall provide its GSTIN (As per
              applicability of CGST Act 2017 and as notified by the ministry of
              MSME) and PAN along with its Aadhaar number.
            </li>
          </ul>

          {/* Consent */}
          <div className="mt-4 flex items-start gap-2">
            <input type="checkbox" defaultChecked className="mt-1" />
            <p className="text-sm text-gray-700">
              I, the holder of the above Aadhaar, hereby give my consent to
              Ministry of MSME, Government of India...
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="mt-6 bg-[#007BFF] hover:bg-blue-700 text-white px-5 py-2 rounded shadow"
          >
            Validate & Generate OTP
          </button>
        </form>
      </div>
      {showPan && <Pan/>}
    </div>
    
    </>
  );
}
