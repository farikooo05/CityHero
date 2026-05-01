"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Star } from "lucide-react";

export default function Leaderboard() {
  const leaders = [
    { id: 1, name: "Aysel M.", points: 1250, district: "Nasimi", avatar: "A" },
    { id: 2, name: "Tariq V.", points: 980, district: "Sabail", avatar: "T" },
    { id: 3, name: "Farid K.", points: 840, district: "Yasamal", avatar: "F", isMe: true },
    { id: 4, name: "Leyla O.", points: 720, district: "Narimanov", avatar: "L" },
    { id: 5, name: "Orkhan B.", points: 650, district: "Khatai", avatar: "O" },
  ];

  return (
    <div className="w-full h-full p-6 pt-12 overflow-y-auto pb-32">
      <div className="flex items-center gap-3 mb-8">
        <Trophy className="text-yellow-500" size={32} />
        <h1 className="text-3xl font-bold text-white">City Heroes</h1>
      </div>

      <div className="flex gap-2 mb-6 bg-slate-800 p-1 rounded-xl">
        <button className="flex-1 bg-slate-700 text-white font-medium py-2 rounded-lg shadow">
          Global
        </button>
        <button className="flex-1 text-slate-400 font-medium py-2 rounded-lg">
          District
        </button>
        <button className="flex-1 text-slate-400 font-medium py-2 rounded-lg">
          Friends
        </button>
      </div>

      <div className="flex items-end justify-center gap-4 mb-10 h-48">
        {/* Rank 2 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="w-14 h-14 rounded-full bg-slate-700 border-4 border-slate-400 flex items-center justify-center text-xl font-bold mb-2 shadow-lg">
            {leaders[1].avatar}
          </div>
          <div className="w-20 h-24 bg-slate-800/80 rounded-t-lg border-t-4 border-slate-400 flex flex-col items-center justify-end pb-3">
            <span className="font-bold text-slate-300">#2</span>
            <span className="text-xs text-yellow-500 font-bold">{leaders[1].points}</span>
          </div>
        </motion.div>

        {/* Rank 1 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col items-center z-10"
        >
          <div className="relative">
            <Medal className="absolute -top-6 -right-2 text-yellow-500 z-20" size={28} />
            <div className="w-20 h-20 rounded-full bg-primary border-4 border-yellow-500 flex items-center justify-center text-3xl font-bold mb-2 shadow-xl shadow-primary/30 text-white">
              {leaders[0].avatar}
            </div>
          </div>
          <div className="w-24 h-32 bg-gradient-to-t from-slate-800/80 to-primary/20 rounded-t-lg border-t-4 border-yellow-500 flex flex-col items-center justify-end pb-4 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <span className="font-bold text-yellow-500 text-lg">#1</span>
            <span className="text-sm text-yellow-500 font-bold">{leaders[0].points} 🪙</span>
          </div>
        </motion.div>

        {/* Rank 3 */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <div className="w-14 h-14 rounded-full bg-slate-700 border-4 border-amber-700 flex items-center justify-center text-xl font-bold mb-2 shadow-lg">
            {leaders[2].avatar}
          </div>
          <div className="w-20 h-20 bg-slate-800/80 rounded-t-lg border-t-4 border-amber-700 flex flex-col items-center justify-end pb-3">
            <span className="font-bold text-amber-600">#3</span>
            <span className="text-xs text-yellow-500 font-bold">{leaders[2].points}</span>
          </div>
        </motion.div>
      </div>

      <div className="space-y-3">
        {leaders.slice(3).map((leader, index) => (
          <motion.div
            key={leader.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className={`flex items-center gap-4 p-4 rounded-2xl ${
              leader.isMe ? "bg-primary/20 border border-primary/50" : "bg-slate-800/50"
            }`}
          >
            <div className="font-bold text-slate-500 w-6">#{index + 4}</div>
            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center font-bold">
              {leader.avatar}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-white flex items-center gap-2">
                {leader.name} {leader.isMe && <Star size={14} className="text-primary fill-primary" />}
              </h4>
              <p className="text-xs text-slate-400">{leader.district}</p>
            </div>
            <div className="font-bold text-yellow-500">{leader.points} 🪙</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
