"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import BottomNav from "@/components/BottomNav";
import ReportModal from "@/components/ReportModal";
import Leaderboard from "@/components/Leaderboard";
import Profile from "@/components/Profile";
import ProblemList from "@/components/ProblemList";
import AdminDashboard from "@/components/AdminDashboard";
import { Problem } from "@/components/Map";

import { ShieldCheck } from "lucide-react";

// Dynamically import map so it doesn't break SSR
const MapComponent = dynamic(() => import("@/components/Map"), { ssr: false });

const INITIAL_PROBLEMS: Problem[] = [
  {
    id: "1",
    lat: 40.4093,
    lng: 49.8671,
    title: "Broken traffic light",
    status: "approved",
    solverType: "government",
    points: 50,
    author: "Farid K.",
    votes: 12,
  },
  {
    id: "2",
    lat: 40.405,
    lng: 49.865,
    title: "Pothole on 28 May Street",
    status: "resolved",
    solverType: "government",
    points: 30,
    author: "Aysel M.",
    votes: 45,
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("map");
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number} | null>(null);
  
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

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedLocation({ lat, lng });
    setIsReportOpen(true);
  };

  const handleReportSubmit = (title: string, desc: string, category: string, location: { lat: number; lng: number } | null, image?: string, solverType?: "government" | "resident") => {
    // Use real location if provided, else use random offset from Baku center (spread across ~5km)
    const lat = location ? location.lat : 40.4093 + (Math.random() - 0.5) * 0.05;
    const lng = location ? location.lng : 49.8671 + (Math.random() - 0.5) * 0.05;

    // Add new problem to map - Status is ALWAYS pending now
    const newProblem: Problem = {
      id: Date.now().toString(),
      lat,
      lng,
      title: title || "New Issue",
      description: desc,
      image,
      status: "pending",
      solverType: solverType || "government",
      verifyVotes: 0,
      points: 50,
      author: "Me (Hero)",
      votes: 0,
    };
    
    const newProblemsList = [...problems, newProblem];
    setProblems(newProblemsList);
    setSelectedLocation(null); // Reset after submit
    
    // Save to local storage
    localStorage.setItem("cityhero_problems", JSON.stringify(newProblemsList));
  };

  const handleApprove = (id: string) => {
    const problem = problems.find(p => p.id === id);
    if (!problem) return;

    // Approve just publishes to the map. NO points awarded yet.
    const updatedProblems = problems.map(p => 
      p.id === id ? { ...p, status: "approved" as const } : p
    );
    
    setProblems(updatedProblems);
    localStorage.setItem("cityhero_problems", JSON.stringify(updatedProblems));
  };

  const handleMarkSolved = (id: string) => {
    const problem = problems.find(p => p.id === id);
    if (!problem) return;

    let newPoints = points;
    const updatedProblems = problems.map(p => {
      if (p.id === id) {
        if (p.solverType === "government") {
          newPoints += p.points;
          return { ...p, status: "resolved" as const };
        } else {
          return { ...p, status: "verifying" as const, verifyVotes: 0 };
        }
      }
      return p;
    });

    setPoints(newPoints);
    setProblems(updatedProblems);
    localStorage.setItem("cityhero_problems", JSON.stringify(updatedProblems));
    localStorage.setItem("cityhero_points", newPoints.toString());
  };

  const handleVerifyFix = (id: string) => {
    const problem = problems.find(p => p.id === id);
    if (!problem) return;

    let newPoints = points;
    const updatedProblems = problems.map(p => {
      if (p.id === id) {
        const votes = (p.verifyVotes || 0) + 1;
        if (votes >= 3) {
          // Solved after 3 verifications! Give points to author (and potentially solver)
          newPoints += p.points;
          return { ...p, status: "resolved" as const, verifyVotes: votes };
        }
        return { ...p, verifyVotes: votes };
      }
      return p;
    });

    setPoints(newPoints);
    setProblems(updatedProblems);
    localStorage.setItem("cityhero_problems", JSON.stringify(updatedProblems));
    localStorage.setItem("cityhero_points", newPoints.toString());
  };

  const handleReject = (id: string) => {
    const updatedProblems = problems.filter(p => p.id !== id);
    setProblems(updatedProblems);
    localStorage.setItem("cityhero_problems", JSON.stringify(updatedProblems));
  };

  const handleVote = (id: string) => {
    const updatedProblems = problems.map(p => 
      p.id === id ? { ...p, votes: p.votes + 1 } : p
    );
    setProblems(updatedProblems);
    localStorage.setItem("cityhero_problems", JSON.stringify(updatedProblems));
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
      {/* Top Bar (Only on Map and List) */}
      {(activeTab === "map" || activeTab === "home") && (
        <div className="absolute top-0 w-full z-10 glass-panel px-6 py-4 rounded-b-3xl flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              CityHero
            </h1>
            <p className="text-xs text-slate-400">Baku, Azerbaijan</p>
          </div>
          <div className="flex items-center gap-2 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
            <span className="text-yellow-500 font-bold">🪙 {isClient ? points : "..."}</span>
            <button 
              onClick={() => setActiveTab("admin")}
              className="ml-2 text-slate-400 hover:text-white transition-colors flex items-center justify-center p-1 rounded-full hover:bg-slate-700"
              title="Admin Panel"
            >
              <ShieldCheck size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="h-full w-full">
        {activeTab === "map" && (
          <MapComponent 
            problems={problems.filter(p => p.status === "approved" || p.status === "resolved")} 
            onMapClick={handleMapClick}
          />
        )}
        {activeTab === "home" && (
          <ProblemList problems={problems} onVote={handleVote} onVerifyFix={handleVerifyFix} />
        )}
        {activeTab === "leaderboard" && <Leaderboard />}
        {activeTab === "profile" && <Profile points={points} onRedeem={handleRedeem} isClient={isClient} />}
        {activeTab === "admin" && (
          <AdminDashboard 
            problems={problems} 
            onApprove={handleApprove} 
            onReject={handleReject}
            onMarkSolved={handleMarkSolved}
          />
        )}
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
        selectedLocation={selectedLocation}
      />
    </main>
  );
}
