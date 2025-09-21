"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserMessage } from "@/store/chatSlice";

export default function ChatWindow() {
  const dispatch = useDispatch();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    dispatch(addUserMessage(input));
    setInput("");
  };

  const suggestedPrompts = [
    "Explain quantum computing in simple terms",
    "Write a Python function to sort a list",
    "What are the benefits of meditation?",
    "Help me plan a weekend trip to Paris",
  ];

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg shadow p-6">
      {/* Top welcome section */}
      <div className="text-center mb-6">
        <div className="text-6xl text-blue-500 pt-20 mb-2">✦</div>
        <h1 className="text-2xl font-semibold mb-1">Welcome to AI Chat</h1>
        <p className="text-gray-600 text-md">
          Start a conversation with our AI assistant. Ask questions, get help with tasks, or explore ideas together.
        </p>
      </div>

      {/* Prompt buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 px-48">
        {suggestedPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => dispatch(addUserMessage(prompt))}
            className="bg-white shadow-sm text-center text-sm font-semibold rounded-2xl px-4 py-3 hover:shadow-lg transition"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Spacer to push input to bottom if needed */}
      <div className="flex-1" />

      {/* Input bar */}
      <div className="flex items-center border rounded-full px-4 py-2 shadow-sm">
        <input
          type="text"
          className="flex-1 outline-none text-sm text-gray-800"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="text-blue-500 hover:text-blue-700 transition ml-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="w-5 h-5"
            viewBox="0 0 16 16"
          >
            <path d="M15.854 7.646l-15-6a.5.5 0 0 0-.632.632l6 15a.5.5 0 0 0 .948-.158l1.68-5.04 5.04-1.68a.5.5 0 0 0 .158-.948l-15-6zM6.43 9.57l-.78 2.34L2.06 2.06l9.85 4.59-5.04 1.68z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
