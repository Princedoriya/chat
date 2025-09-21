"use client";

import { useState } from "react";
import { useAppDispatch } from "@/store/store";
import { signOut } from "@/store/authSlice";
import NotificationsPanel from "@/components/NotificationsPanel";
import { Bell, Coins, LogOut } from "lucide-react";
import { CgProfile } from "react-icons/cg";

export default function TopBar() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center justify-between bg-white px-6 py-3 shadow-md">
      <h1 className="font-semibold text-2xl">AI Chat</h1>
      <div className="flex items-center gap-6">
        <div className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm flex items-center space-x-2">
          <Coins className="w-4 h-4" />
          <span>1,250</span>
        </div>

        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative p-2 rounded-full hover:bg-gray-100"
          >
            <div>
              <Bell className="w-5 h-5" />
            </div>
          </button>
          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-64">
              <NotificationsPanel />
            </div>
          )}
        </div>
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
          >
            <div className="flex items-center space-x-2 font-semibold">
              <CgProfile className="w-7 h-7 text-blue-600" />
              <span>You</span>
            </div>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-caret-down"
              viewBox="0 0 16 16"
            >
              <path d="M4.293 5.293a1 1 0 0 1 1.414 0L8 7.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414z" />
            </svg>
          </button>
          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border">
              <button
                onClick={() => {
                  dispatch(signOut());
                  setProfileOpen(false);
                }}
                className="flex items-center gap-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
