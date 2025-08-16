import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState({ name: "", photoURL: "" });
  const [loading, setLoading] = useState(true);

  // Load user from Firebase Auth
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        await loadProfile(currentUser.uid);
      } else {
        window.location.href = "/login"; // Redirect if not logged in
      }
    });
    return unsubscribe;
  }, []);

  // Load profile from Firestore
  const loadProfile = async (uid) => {
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProfileData(docSnap.data());
      } else {
        // Create empty profile if not found
        await setDoc(docRef, { name: "", photoURL: "" });
        setProfileData({ name: "", photoURL: "" });
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  // Save profile updates
  const handleSave = async () => {
    if (!user) return;
    try {
      await setDoc(doc(db, "users", user.uid), profileData, { merge: true });
      alert("✅ Profile updated successfully!");
    } catch (error) {
      alert("❌ Failed to update profile: " + error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  if (loading) return <div className="text-center mt-10">Loading profile...</div>;

  return (
    <div className="bg-yellow-100 dark:bg-gray-900 text-black dark:text-white min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">User Dashboard</h2>

        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={profileData.photoURL || "https://via.placeholder.com/150"}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500"
          />
        </div>

        {/* Email (read-only) */}
        <p className="text-center text-gray-600 dark:text-gray-400 mb-4">
          {user?.email}
        </p>

        {/* Editable Name */}
        <input
          type="text"
          placeholder="Your Name"
          value={profileData.name}
          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
          className="w-full px-4 py-2 border mb-3 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />

        {/* Editable Photo URL */}
        <input
          type="text"
          placeholder="Profile Photo URL"
          value={profileData.photoURL}
          onChange={(e) => setProfileData({ ...profileData, photoURL: e.target.value })}
          className="w-full px-4 py-2 border mb-4 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleSave}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Save Changes
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
