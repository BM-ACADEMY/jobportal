import React, { useEffect, useState, useRef } from "react";
import { FaCamera, FaSignOutAlt, FaBriefcase, FaHeart, FaUser, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";
import AvatarEditor from "react-avatar-editor";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

// Mock user data (replace with API fetch in production)
const mockUser = {
  id: 1,
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  bio: "Passionate frontend developer with 3+ years of experience building responsive web applications. Skilled in React, TypeScript, and modern CSS frameworks.",
  skills: ["React", "TypeScript", "Node.js", "Tailwind CSS", "Git", "Figma"],
  profilePic: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
};

const mockApplications = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechNova Inc.",
    location: "San Francisco, CA",
    status: "accepted",
    appliedAt: "2024-03-15",
    jobUrl: "/job/1",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "DesignFlow",
    location: "Remote",
    status: "pending",
    appliedAt: "2024-03-10",
    jobUrl: "/job/2",
  },
  {
    id: 3,
    title: "Full Stack Engineer",
    company: "CloudLabs",
    location: "New York, NY",
    status: "rejected",
    appliedAt: "2024-02-28",
    jobUrl: "/job/3",
  },
];

const mockSavedJobs = [
  {
    id: 4,
    title: "Product Manager - AI Platform",
    company: "InnovateAI",
    location: "Seattle, WA",
    jobUrl: "/job/4",
  },
  {
    id: 5,
    title: "React Developer (Contract)",
    company: "StartUpXYZ",
    location: "Remote",
    jobUrl: "/job/5",
  },
];

export default function UserDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const fileInputRef = useRef();
  const editorRef = useRef(null);

  const [activeTab, setActiveTab] = useState("applications");
  const [user, setUser] = useState(mockUser);
  const [applications, setApplications] = useState(mockApplications);
  const [savedJobs, setSavedJobs] = useState(mockSavedJobs);
  const [profilePic, setProfilePic] = useState(mockUser.profilePic);

  const [editorOpen, setEditorOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scale, setScale] = useState(1.2);

  // Simulate fetching user data from API on mount
  useEffect(() => {
    // In production: fetch('/api/user') → setUser(data)
    // For now, we're using mock data
  }, []);

  const avatarLetter = user?.name ? user.name[0].toUpperCase() : "G";

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setEditorOpen(true);
    }
  };

  const handleSaveCroppedImage = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const dataUrl = canvas.toDataURL();
      setProfilePic(dataUrl);
      setUser({ ...user, profilePic: dataUrl });
      setEditorOpen(false);
      setSelectedImage(null);

      // In production: call API to update profile pic
      // fetch('/api/user/profile-pic', { method: 'POST', body: JSON.stringify({ profilePic: dataUrl }) })
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getStatusIcon = (status) => {
    if (status === "accepted") return <FaCheckCircle className="text-green-500" />;
    if (status === "rejected") return <FaTimesCircle className="text-red-500" />;
    return <FaClock className="text-yellow-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50">
      {/* Top Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-30 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold text-indigo-700 tracking-tight">
            CareerHub
          </h1>
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg font-medium shadow-md hover:bg-red-600 transition-all duration-200"
          >
            <FaSignOutAlt size={18} />
            Logout
          </motion.button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto mt-8 px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Profile Card */}
          <aside className="lg:col-span-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-6 text-center border border-slate-100"
            >
              {/* Profile Picture */}
              <div className="relative inline-block mb-4">
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg overflow-hidden border-4 ${
                    profilePic ? "" : "bg-gradient-to-r from-indigo-500 to-purple-600"
                  }`}
                >
                  {profilePic ? (
                    <img src={profilePic} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    avatarLetter
                  )}
                </div>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer hover:bg-indigo-50 transition-colors"
                  onClick={() => fileInputRef.current.click()}
                  title="Update Profile Photo"
                >
                  <FaCamera size={16} className="text-indigo-600" />
                </motion.div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleProfilePicUpload}
                  className="hidden"
                />
              </div>

              {/* Name & Email */}
              <h2 className="text-lg font-bold text-slate-800 mb-1">{user.name}</h2>
              <p className="text-sm text-gray-500 mb-4">{user.email}</p>

              {/* Bio */}
              {user.bio && (
                <p className="text-sm text-slate-600 italic mb-4 line-clamp-3">
                  "{user.bio}"
                </p>
              )}

              {/* Skills Chips */}
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {user.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs rounded-full font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Quick Stats */}
              <div className="mt-6 pt-6 border-t border-slate-100">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Applications</span>
                    <span className="font-semibold text-indigo-600">{applications.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Saved Jobs</span>
                    <span className="font-semibold text-indigo-600">{savedJobs.length}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3 space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-lg p-4 border border-slate-100">
              <div className="flex flex-wrap gap-2">
                {[
                  { name: "My Applications", icon: <FaBriefcase size={18} />, tab: "applications" },
                  { name: "Saved Jobs", icon: <FaHeart size={18} />, tab: "saved" },
                  { name: "Profile", icon: <FaUser size={18} />, tab: "profile" },
                ].map((item) => (
                  <motion.button
                    key={item.tab}
                    onClick={() => setActiveTab(item.tab)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium transition-all duration-200 ${
                      activeTab === item.tab
                        ? "bg-indigo-600 text-white shadow-lg transform scale-102"
                        : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    {item.icon}
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === "applications" && (
                <motion.div
                  key="applications"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100"
                >
                  <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <FaBriefcase size={26} className="text-indigo-600" />
                    My Applications
                  </h2>

                  {applications.length === 0 ? (
                    <div className="text-center py-16 bg-slate-50 rounded-xl">
                      <p className="text-gray-500 text-lg mb-4">You haven't applied to any jobs yet.</p>
                      <button
                        onClick={() => navigate("/search-jobs")}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
                      >
                        Browse Open Positions →
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {applications.map((app, idx) => (
                        <motion.div
                          key={app.id}
                          whileHover={{ x: 5, boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }}
                          className="p-6 border border-slate-200 rounded-xl hover:border-indigo-200 transition-all duration-200 bg-slate-50 cursor-pointer"
                          onClick={() => navigate(app.jobUrl)}
                        >
                          <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold text-slate-800 mb-1">
                                {app.title}
                              </h3>
                              <p className="text-slate-600 mb-3">
                                {app.company} • {app.location}
                              </p>
                              <div className="flex items-center gap-2 text-sm text-slate-500">
                                {getStatusIcon(app.status)}
                                <span className="capitalize">{app.status.replace("_", " ")}</span>
                                <span>•</span>
                                <span>Applied {formatDate(app.appliedAt)}</span>
                              </div>
                            </div>
                            <span className="inline-flex items-center px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                              View Details
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "saved" && (
                <motion.div
                  key="saved"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100"
                >
                  <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <FaHeart size={26} className="text-pink-600" />
                    Saved Jobs
                  </h2>

                  {savedJobs.length === 0 ? (
                    <div className="text-center py-16 bg-slate-50 rounded-xl">
                      <p className="text-gray-500 text-lg mb-4">You haven't saved any jobs yet.</p>
                      <button
                        onClick={() => navigate("/search-jobs")}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
                      >
                        Start Saving Jobs →
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {savedJobs.map((job, idx) => (
                        <motion.div
                          key={job.id}
                          whileHover={{ scale: 1.02, boxShadow: "0 12px 20px rgba(0,0,0,0.08)" }}
                          className="p-5 border border-slate-200 rounded-xl hover:border-indigo-200 transition-all duration-200 bg-slate-50 cursor-pointer"
                          onClick={() => navigate(job.jobUrl)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                              {job.company.charAt(0)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-slate-800 mb-1 truncate">
                                {job.title}
                              </h3>
                              <p className="text-slate-600 text-sm mb-2 truncate">
                                {job.company}
                              </p>
                              <div className="flex items-center gap-1 text-xs text-slate-500">
                                <span>📍</span>
                                <span>{job.location}</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {activeTab === "profile" && (
                <motion.div
                  key="profile"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100"
                >
                  <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                    <FaUser size={26} className="text-indigo-600" />
                    Profile Overview
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Full Name
                        </label>
                        <p className="text-lg text-slate-800 font-medium">{user.name}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address
                        </label>
                        <p className="text-lg text-slate-800 font-medium">{user.email}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Bio / Summary
                        </label>
                        <p className="text-slate-700 leading-relaxed">{user.bio || "No bio added."}</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Skills
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {user.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-4 py-2 bg-indigo-100 text-indigo-700 text-sm rounded-full font-medium"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Last Updated
                        </label>
                        <p className="text-slate-700">
                          {new Date().toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-200">
                        <button
                          onClick={() => navigate("/edit-profile")}
                          className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition font-medium w-full"
                        >
                          Edit Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      {/* Avatar Crop Modal */}
      {editorOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-8"
          >
            <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">
              Adjust Your Profile Picture
            </h2>
            <div className="flex justify-center mb-6">
              <AvatarEditor
                ref={editorRef}
                image={selectedImage}
                width={180}
                height={180}
                border={50}
                borderRadius={100}
                scale={scale}
                className="rounded-full shadow-lg border-2 border-slate-200"
              />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-slate-700 mb-2 text-center">
                Zoom: {Math.round(scale * 100)}%
              </label>
              <input
                type="range"
                min="1"
                max="2"
                step="0.1"
                value={scale}
                onChange={(e) => setScale(parseFloat(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setEditorOpen(false)}
                className="flex-1 py-3 px-6 bg-gray-100 text-slate-700 rounded-xl font-medium hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCroppedImage}
                className="flex-1 py-3 px-6 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
              >
                Save & Update
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}