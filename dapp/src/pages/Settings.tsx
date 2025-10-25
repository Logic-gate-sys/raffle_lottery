// src/pages/Settings.tsx
import React, { useState } from "react";
import { Bell, Lock, Moon, ShieldCheck, Save } from "lucide-react";

const Settings = () => {
  const [theme, setTheme] = useState("dark");
  const [notifications, setNotifications] = useState(true);
  const [twoFA, setTwoFA] = useState(false);

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="flex flex-col flex-1 p-6 bg-[#0F172A] text-white h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="space-y-8">
        {/* Account Settings */}
        <section className="bg-[#1E293B] rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Lock size={18} /> Account Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Username
              </label>
              <input
                type="text"
                placeholder="Enter username"
                className="w-full bg-[#0F172A] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                className="w-full bg-[#0F172A] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">
                Change Password
              </label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full bg-[#0F172A] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Preferences */}
        <section className="bg-[#1E293B] rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bell size={18} /> Preferences
          </h2>

          <div className="space-y-6">
            {/* Notifications */}
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Enable Notifications</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={() => setNotifications(!notifications)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-all"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
              </label>
            </div>

            {/* Theme */}
            <div className="flex items-center justify-between">
              <span className="text-gray-300 flex items-center gap-2">
                <Moon size={16} /> Theme
              </span>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="bg-[#0F172A] border border-gray-600 text-white rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              >
                <option value="dark">Dark</option>
                <option value="light">Light</option>
              </select>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="bg-[#1E293B] rounded-xl p-6 shadow-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ShieldCheck size={18} /> Security
          </h2>

          <div className="space-y-6">
            {/* Two-Factor Auth */}
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Enable 2FA (Two-Factor Auth)</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFA}
                  onChange={() => setTwoFA(!twoFA)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-green-600 transition-all"></div>
                <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all peer-checked:translate-x-5"></div>
              </label>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <div>
                <p className="text-sm text-gray-400">Connected Wallet</p>
                <p className="font-mono text-lg">0x12A4...8D93</p>
              </div>
              <button className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700">
                Disconnect Wallet
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
