"use client";

import { useAppSelector } from "@/store/store";
import AuthForm from "@/components/AuthForm";
import ChatWindow from "@/components/ChatWindow";
import TopBar from "@/components/TopBar";
import LeftPanel from "@/components/LeftPanel";

export default function HomePage() {
  const { user, token } = useAppSelector((state) => state.auth);
  const isAuthenticated = user && token;

  if (!isAuthenticated) {
    return <AuthForm mode="signin" />;
  }

  return (
    <div className="flex flex-col h-screen">
      <TopBar />
      <div className="flex flex-1">
        <LeftPanel />
        <div className="flex-1 p-4">
          <ChatWindow />
        </div>
      </div>
    </div>
  );
}
