"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import BottomNav from "@/components/BottomNav";
import ReportModal from "@/components/ReportModal";
import Leaderboard from "@/components/Leaderboard";
import Profile from "@/components/Profile";
import { Problem } from "@/components/Map";

// Dynamically import map so it doesn't break SSR
const MapComponent = dynamic(() => import("@/components/Map"), { ssr: false });

const INITIAL_PROBLEMS: Problem[] = [
  {
    id: "1",
    lat: 40.4093,
    lng: 49.8671,
    title: "Broken traffic light",
    status: "pending",
    points: 50,
    author: "Farid K.",
  },
  {
    id: "2",
    lat: 40.405,
    lng: 49.865,
    title: "Pothole",
    status: "resolved",
    points: 30,
    author: "Aysel M.",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("map");
  const [isReportOpen, setIsReportOpen] = useState(false);
  
  const [points, setPoints] = useState(840);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    setIsClient(true);
    const savedProblems = localStorage.getItem("cityhero_problems");
    const savedPoints = localStorage.getItem("cityhero_points");
    
    if (savedProblems) {
      setProblems(JSON.parse(savedProblems));
    } else {
      setProblems(INITIAL_PROBLEMS);
    }

    if (savedPoints) {
      setPoints(Number(savedPoints));
    }
  }, []);

  const handleReportSubmit = (title: string, desc: string, category: string, location: { lat: number; lng: number } | null) => {
    console.log("Submitting report:", { title, desc, category });

    // Use real location if provided, else use random offset from Baku center
    const lat = location ? location.lat : 40.41 + (Math.random() - 0.5) * 0.01;
    const lng = location ? location.lng : 49.86 + (Math.random() - 0.5) * 0.01;

    // Add new problem to map
    const newProblem: Problem = {
      id: Date.now().toString(),
      lat,
      lng,
      title: title || "New Issue",
      status: "pending",
      points: 50,
      author: "Farid K.",
    };
    
    const newProblemsList = [...problems, newProblem];
    setProblems(newProblemsList);
    
    // Reward points
    const newPoints = points + 50;
    setPoints(newPoints);

    // Save to local storage
    localStorage.setItem("cityhero_problems", JSON.stringify(newProblemsList));
    localStorage.setItem("cityhero_points", newPoints.toString());
  };

  const handleRedeem = (amount: number) => {
    if (points >= amount) {
      const newPoints = points - amount;
      setPoints(newPoints);
      localStorage.setItem("cityhero_points", newPoints.toString());
      alert(`Successfully redeemed! Remaining points: ${newPoints} 🪙`);
    } else {
      alert("Not enough points!");
    }
  };

  return (
    <main className="h-screen w-full bg-slate-900 overflow-hidden relative font-sans">
      {/* Top Bar for Map View */}
      {activeTab === "map" && (
        <div className="absolute top-0 w-full z-10 glass-panel px-6 py-4 rounded-b-3xl flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              CityHero
            </h1>
            <p className="text-xs text-slate-400">Baku, Azerbaijan</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
            <span className="text-yellow-500 font-bold">🪙 {isClient ? points : "..."}</span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="h-full w-full">
        {activeTab === "map" && <MapComponent problems={problems} />}
        {activeTab === "home" && (
          <div className="flex flex-col items-center justify-center h-full p-6 text-center pt-20">
            <div className="w-24 h-24 bg-gradient-to-tr from-primary to-accent rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/30">
              <span className="text-4xl">🦸</span>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">Welcome Hero!</h1>
            <p className="text-slate-400 mb-8 max-w-sm">
              Your city needs you. Report problems, earn microtokens, and climb the leaderboard!
            </p>
            <button
              onClick={() => setIsReportOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-primary/30 transition-transform active:scale-95"
            >
              Report an Issue Now
            </button>
          </div>
        )}
        {activeTab === "leaderboard" && <Leaderboard />}
        {activeTab === "profile" && <Profile points={points} onRedeem={handleRedeem} isClient={isClient} />}
      </div>

      {/* Navigation & Modals */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onReportClick={() => setIsReportOpen(true)}
      />

      <ReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        onSubmit={handleReportSubmit}
      />
    </main>
  );
}
