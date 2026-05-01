"use client";

import { Home, MapPin, Trophy, User, PlusCircle } from "lucide-react";
import { motion } from "framer-motion";

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onReportClick: () => void;
}

export default function BottomNav({ activeTab, setActiveTab, onReportClick }: BottomNavProps) {
  const tabs = [
    { id: "home", icon: Home, label: "Home" },
    { id: "map", icon: MapPin, label: "Map" },
    { id: "report", icon: PlusCircle, label: "Report", isMain: true },
    { id: "leaderboard", icon: Trophy, label: "Rank" },
    { id: "profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 w-full glass-panel z-50 px-6 py-4 pb-6 rounded-t-3xl flex justify-between items-center text-slate-400">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        if (tab.isMain) {
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onReportClick}
              className="bg-gradient-to-r from-primary to-secondary p-4 rounded-full text-white shadow-lg shadow-primary/30 -mt-8 border-4 border-slate-900 flex items-center justify-center relative"
            >
              <div className="absolute inset-0 rounded-full bg-white opacity-20 animate-ping"></div>
              <Icon size={28} />
            </motion.button>
          );
        }

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              isActive ? "text-primary" : "hover:text-slate-200"
            }`}
          >
            <motion.div
              animate={isActive ? { y: -5, scale: 1.1 } : { y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Icon size={24} className={isActive ? "drop-shadow-md shadow-primary" : ""} />
            </motion.div>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
}
