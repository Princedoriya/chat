"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { signIn, signUp } from "@/store/authSlice";

export default function AuthForm({ mode }: { mode: "signin" | "signup" }) {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields");
      return;
    }

    if (mode === "signup" && !displayName.trim()) {
      setError("Please enter a display name");
      return;
    }

    try {
      if (mode === "signin") {
        await dispatch(signIn({ username, password })).unwrap();
      } else {
        await dispatch(signUp({ username, password, displayName: displayName || username })).unwrap();
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-brand-background">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-96 space-y-4"
      >
        <h1 className="text-xl font-bold text-center">
          {mode === "signin" ? "Sign In" : "Sign Up"}
        </h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {mode === "signup" && (
          <input
            className="w-full border px-3 py-2 rounded"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            disabled={loading}
          />
        )}
        <input
          className="w-full border px-3 py-2 rounded"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={loading}
        />
        <input
          className="w-full border px-3 py-2 rounded"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-primary text-white py-2 rounded hover:bg-brand-secondary transition disabled:opacity-50"
        >
          {loading ? "Loading..." : mode === "signin" ? "Sign In" : "Sign Up"}
        </button>

        <div className="text-center text-sm text-gray-600">
          {mode === "signin" ? (
            <p>
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-brand-primary hover:text-brand-secondary font-medium"
              >
                Sign up
              </a>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-brand-primary hover:text-brand-secondary font-medium"
              >
                Sign in
              </a>
            </p>
          )}
        </div>
      </form>
    </div>
  );
}
