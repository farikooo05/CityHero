"use client";

import { motion } from "framer-motion";
import { Settings, CreditCard, Star, Clock, MapPin } from "lucide-react";

interface ProfileProps {
  points: number;
  onRedeem: (amount: number) => void;
  isClient: boolean;
}

export default function Profile({ points, onRedeem, isClient }: ProfileProps) {
  const reports = [
    { id: 1, title: "Broken traffic light", status: "resolved", points: 50, date: "Today" },
    { id: 2, title: "Pothole on Nizami st", status: "pending", points: 0, date: "Yesterday" },
  ];

  return (
    <div className="w-full h-full p-6 pt-12 overflow-y-auto pb-32">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Profile</h1>
        <button className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white transition-colors">
          <Settings size={24} />
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800 rounded-3xl p-6 mb-8 border border-slate-700 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full blur-2xl"></div>
        
        <div className="flex items-center gap-4 mb-6 relative z-10">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-3xl font-bold text-white shadow-lg shadow-primary/30 border-4 border-slate-900">
            F
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Farid K.</h2>
            <p className="text-slate-400 flex items-center gap-1 text-sm">
              <MapPin size={14} /> Yasamal, Baku
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 relative z-10">
          <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50">
            <p className="text-slate-400 text-sm mb-1">Total Points</p>
            <p className="text-2xl font-bold text-yellow-500 flex items-center gap-2">
              {isClient ? points : "..."} <span className="text-lg">🪙</span>
            </p>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50">
            <p className="text-slate-400 text-sm mb-1">Rank</p>
            <p className="text-2xl font-bold text-white flex items-center gap-2">
              #3 <Star size={20} className="text-primary fill-primary" />
            </p>
          </div>
        </div>
      </motion.div>

      <div className="mb-8">
        <h3 className="text-xl font-bold text-white mb-4">Rewards</h3>
        <motion.div
          onClick={() => onRedeem(100)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-2xl p-5 text-white flex items-center justify-between cursor-pointer shadow-lg shadow-orange-500/20"
        >
          <div className="flex items-center gap-3">
            <CreditCard size={28} />
            <div>
              <p className="font-bold text-lg">Redeem Microtokens</p>
              <p className="text-sm opacity-90">-100 🪙 for 1x Transit Pass</p>
            </div>
          </div>
          <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
            Buy
          </div>
        </motion.div>
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Recent Reports</h3>
        <div className="space-y-3">
          {reports.map((report) => (
            <div key={report.id} className="bg-slate-800 rounded-2xl p-4 flex items-center justify-between border border-slate-700">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${report.status === 'resolved' ? 'bg-accent/20 text-accent' : 'bg-yellow-500/20 text-yellow-500'}`}>
                  {report.status === 'resolved' ? <Star size={20} /> : <Clock size={20} />}
                </div>
                <div>
                  <p className="font-semibold text-white">{report.title}</p>
                  <p className="text-xs text-slate-400">{report.date} • {report.status}</p>
                </div>
              </div>
              {report.points > 0 && (
                <div className="font-bold text-yellow-500 text-sm">+{report.points} 🪙</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
