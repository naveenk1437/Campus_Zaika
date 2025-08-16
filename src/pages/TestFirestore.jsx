// src/pages/TestFirestore.jsx
import React, { useEffect } from "react";
import { db } from "../firebase"; // make sure firebase.js is configured
import { collection, getDocs } from "firebase/firestore";

export default function TestFirestore() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "menu"));
        querySnapshot.forEach((doc) => {
          console.log(doc.id, "=>", doc.data());
        });
        console.log("✅ Firestore read successful!");
      } catch (err) {
        console.error("❌ Firestore error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1 className="text-lg font-bold">Check console for Firestore Data</h1>
    </div>
  );
}
