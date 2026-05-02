"use client";

import { Problem } from "./Map";
import { ChevronUp, Clock, User, CheckCircle, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProblemListProps {
  problems: Problem[];
  onVote: (id: string) => void;
  onVerifyFix: (id: string) => void;
  onProblemSelect: (lat: number, lng: number) => void;
}

export default function ProblemList({ problems, onVote, onVerifyFix, onProblemSelect }: ProblemListProps) {
  // Sort problems by votes (descending)
  const sortedProblems = [...problems].sort((a, b) => b.votes - a.votes);

  return (
    <div className="flex flex-col h-full bg-slate-900 pt-20 pb-24 px-4 overflow-y-auto">
      <div className="mb-6 px-2">
        <h2 className="text-2xl font-bold text-white mb-1">Community Issues</h2>
        <p className="text-slate-400 text-sm">Vote for issues or verify community fixes.</p>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {sortedProblems.map((problem) => (
            <motion.div
              key={problem.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={`glass-panel p-4 rounded-2xl flex items-center gap-4 border ${problem.status === "verifying" ? "border-[#8b5cf6]/50 shadow-[0_0_15px_rgba(139,92,246,0.2)]" : "border-slate-700/50"}`}
            >
              {/* Vote Side */}
              <div className="flex flex-col items-center gap-1 w-12">
                {problem.status === "verifying" ? (
                  <>
                    <button
                      onClick={() => onVerifyFix(problem.id)}
                      className="w-12 h-12 rounded-xl bg-[#8b5cf6]/20 hover:bg-[#8b5cf6]/40 text-[#8b5cf6] flex items-center justify-center transition-all active:scale-90"
                      title="Verify this is fixed"
                    >
                      <CheckCircle size={24} />
                    </button>
                    <span className="font-bold text-[#8b5cf6] text-xs text-center">{problem.verifyVotes || 0}/3</span>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => onVote(problem.id)}
                      className="w-12 h-12 rounded-xl bg-slate-800 hover:bg-primary/20 text-slate-400 hover:text-primary flex items-center justify-center transition-all active:scale-90"
                    >
                      <ChevronUp size={24} />
                    </button>
                    <span className="font-bold text-white text-lg">{problem.votes}</span>
                  </>
                )}
              </div>

              {/* Content Side */}
              <div 
                className="flex-1 min-w-0 cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => onProblemSelect(problem.lat, problem.lng)}
              >
                <div className="flex items-center gap-2 mb-1">
                  {problem.status === "resolved" ? (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/20 text-accent text-[10px] font-bold uppercase tracking-wider">
                      <CheckCircle size={10} /> Fixed
                    </span>
                  ) : problem.status === "verifying" ? (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#8b5cf6]/20 text-[#8b5cf6] text-[10px] font-bold uppercase tracking-wider">
                      <CheckCircle size={10} /> Verifying
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-500 text-[10px] font-bold uppercase tracking-wider">
                      <AlertCircle size={10} /> {problem.status}
                    </span>
                  )}
                </div>
                <h3 className="text-white font-bold truncate pr-2">{problem.title}</h3>
                
                <div className="flex items-center gap-4 mt-2 text-slate-500 text-xs">
                  <div className="flex items-center gap-1">
                    <User size={12} />
                    <span className="truncate max-w-[80px]">{problem.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>Just now</span>
                  </div>
                </div>
              </div>

              {/* Reward Badge */}
              <div className="text-right">
                <div className="text-yellow-500 font-bold text-sm">🪙 {problem.points}</div>
                <div className="text-[10px] text-slate-500 uppercase font-medium">Bounty</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {problems.length === 0 && (
          <div className="py-20 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-white font-bold">No issues reported yet</h3>
            <p className="text-slate-400 text-sm mt-1">Be the first hero to report a problem!</p>
          </div>
        )}
      </div>
    </div>
  );
}
