import {MessageCircle, PlusIcon } from "lucide-react";

export default function LeftPanel() {
  return (
    <div className="w-64 bg-white p-6 border-r border-gray-200">
      <h2 className="flex items-center font-semibold text-lg mb-4 gap-2">
        <span>Conversations</span>
        
      </h2>

      <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md mb-4 hover:bg-blue-600 flex items-center justify-center space-x-2">
        <PlusIcon className="w-4 h-4"/>
        <span>New Chat</span>
      </button>

      <div className="flex flex-col items-center justify-center text-gray-400 text-center">
        <MessageCircle className="w-8 h-8 mb-2"/>
        <div>No conversations yet</div>
      </div>
    </div>
  );
}

