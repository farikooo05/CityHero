"use client";

import { Problem } from "./Map";
import { CheckCircle, XCircle, MapPin, User, Eye } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminDashboardProps {
  problems: Problem[];
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onMarkSolved: (id: string) => void;
}

export default function AdminDashboard({ problems, onApprove, onReject, onMarkSolved }: AdminDashboardProps) {
  const pendingProblems = problems.filter(p => p.status === "pending");
  const approvedProblems = problems.filter(p => p.status === "approved");

  return (
    <div className="flex flex-col h-full bg-slate-900 pt-20 pb-24 px-4 overflow-y-auto">
      <div className="mb-6 px-2">
        <h2 className="text-2xl font-bold text-white mb-1">Admin Panel</h2>
        <p className="text-slate-400 text-sm">Review, publish, and mark reports as solved.</p>
      </div>

      <div className="space-y-6">
        <AnimatePresence>
          {pendingProblems.map((problem) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, x: -100 }}
              className="glass-panel rounded-3xl overflow-hidden border border-slate-700 shadow-xl"
            >
              {/* Image Preview */}
              <div className="h-48 w-full bg-slate-800 relative">
                {problem.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={problem.image} alt="Evidence" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-600">
                    <Eye size={48} />
                    <span className="text-xs mt-2 uppercase tracking-widest">No photo provided</span>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/10 uppercase">
                  {problem.id}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">{problem.title}</h3>
                <p className="text-slate-400 text-sm mb-4 line-clamp-3">
                  {problem.description || "No description provided."}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-slate-500">
                    <User size={14} className="text-primary" />
                    <span className="text-xs truncate">{problem.author}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500">
                    <MapPin size={14} className="text-accent" />
                    <span className="text-xs truncate">{problem.lat.toFixed(3)}, {problem.lng.toFixed(3)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => onReject(problem.id)}
                    className="flex-1 bg-slate-800 hover:bg-red-500/20 hover:text-red-500 text-slate-300 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-700"
                  >
                    <XCircle size={18} /> Reject
                  </button>
                  <button
                    onClick={() => onApprove(problem.id)}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <CheckCircle size={18} /> Approve
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {pendingProblems.length === 0 && approvedProblems.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4 text-accent">
              <CheckCircle size={40} />
            </div>
            <h3 className="text-white font-bold text-lg">Inbox Zero!</h3>
            <p className="text-slate-400 text-sm mt-1">All reports have been processed.</p>
          </div>
        )}

        {approvedProblems.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-bold text-white mb-4 px-2">Active Issues on Map</h3>
            <div className="space-y-4">
              {approvedProblems.map((problem) => (
                <div key={problem.id} className="bg-slate-800 rounded-2xl p-4 border border-slate-700 flex justify-between items-center">
                  <div>
                    <h4 className="text-white font-bold">{problem.title}</h4>
                    <p className="text-xs text-slate-400">
                      Solver: <span className="text-primary capitalize">{problem.solverType}</span>
                    </p>
                  </div>
                  <button
                    onClick={() => onMarkSolved(problem.id)}
                    className="bg-accent/20 hover:bg-accent/30 text-accent font-bold py-2 px-4 rounded-xl text-sm transition-colors border border-accent/30"
                  >
                    Mark Solved
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
