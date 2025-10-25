// src/pages/Profile.tsx
import React, { useState } from "react";
import { Pencil, Wallet, Save } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    username: "raffle_user",
    email: "raffleuser@example.com",
    bio: "Blockchain enthusiast and raffle lover.",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (
    <div className="flex flex-col flex-1 p-6 bg-[#0F172A] text-white min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Profile</h1>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            <Pencil size={16} /> Edit
          </button>
        ) : (
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <Save size={16} /> Save
          </button>
        )}
      </div>

      {/* Profile Info Section */}
      <div className="bg-[#1E293B] rounded-xl p-6 shadow-lg mb-8">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src="https://api.dicebear.com/8.x/identicon/svg?seed=userprofile"
            alt="User Avatar"
            className="w-24 h-24 rounded-full"
          />

          <div className="flex-1">
            {/* Username */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Username</label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={profile.username}
                  onChange={handleChange}
                  className="w-full bg-[#0F172A] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-lg font-semibold">{profile.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full bg-[#0F172A] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-300">{profile.email}</p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm text-gray-400 mb-1">Bio</label>
              {isEditing ? (
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="w-full bg-[#0F172A] border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  rows={3}
                />
              ) : (
                <p className="text-gray-300">{profile.bio}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Wallet & Account Section */}
      <div className="bg-[#1E293B] rounded-xl p-6 shadow-lg">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Wallet size={18} /> Wallet Information
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-gray-400">Connected Wallet</p>
            <p className="font-mono text-lg mt-1">0x12A4...8D93</p>
          </div>

          <button className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700">
            Disconnect
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
