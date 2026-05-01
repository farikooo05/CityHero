"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, MapPin, UploadCloud, CheckCircle2, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, desc: string, category: string, location: { lat: number; lng: number } | null) => void;
}

export default function ReportModal({ isOpen, onClose, onSubmit }: ReportModalProps) {
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  
  // New State for real features
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch location when modal opens
  useEffect(() => {
    if (isOpen && step === 1 && !location) {
      setIsLocating(true);
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
            setIsLocating(false);
          },
          (error) => {
            console.error("Error getting location", error);
            setIsLocating(false);
          }
        );
      } else {
        setIsLocating(false);
      }
    }
  }, [isOpen, step, location]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      onSubmit(title, desc, category, location);
      setTimeout(() => {
        setStep(1);
        setTitle("");
        setDesc("");
        setCategory("");
        setImagePreview(null);
      }, 500);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl relative"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800 p-2 rounded-full z-10"
            >
              <X size={20} />
            </button>

            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-2 text-white">Report an Issue</h2>
                <p className="text-slate-400 mb-6">Help improve your city and earn microtokens.</p>

                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment"
                  className="hidden" 
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                />

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed ${imagePreview ? 'border-primary' : 'border-slate-600'} rounded-2xl h-48 flex flex-col items-center justify-center bg-slate-800/50 mb-6 cursor-pointer hover:border-primary transition-colors overflow-hidden relative`}
                >
                  {imagePreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <Camera size={48} className="text-primary mb-3" />
                      <p className="font-semibold text-white">Take a Photo</p>
                      <p className="text-sm text-slate-400">or upload from gallery</p>
                    </>
                  )}
                </div>

                <div className="bg-slate-800 rounded-xl p-4 flex items-center gap-3 mb-6">
                  <MapPin className="text-accent min-w-6" />
                  <div>
                    <p className="text-sm font-semibold text-white">Location Detected</p>
                    <p className="text-xs text-slate-400">
                      {isLocating ? (
                        <span className="flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> Locating...</span>
                      ) : location ? (
                        `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}`
                      ) : (
                        "Using default city center"
                      )}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all active:scale-95"
                >
                  Continue
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl font-bold mb-6 text-white">Details</h2>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Issue Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                    >
                      <option value="">Select a category</option>
                      <option value="infrastructure">Infrastructure (Roads, Sidewalks)</option>
                      <option value="utilities">Utilities (Lights, Water)</option>
                      <option value="cleanliness">Cleanliness (Trash, Vandalism)</option>
                      <option value="safety">Safety (Hazards)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Short Title</label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Broken traffic light"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Description</label>
                    <textarea
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                      placeholder="Provide more details..."
                      rows={3}
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary resize-none"
                    ></textarea>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  disabled={!title || !category}
                  className="w-full bg-primary disabled:bg-primary/50 disabled:cursor-not-allowed hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all active:scale-95 flex justify-center items-center gap-2"
                >
                  <UploadCloud size={20} /> Submit Report
                </button>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 flex flex-col items-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                >
                  <CheckCircle2 size={80} className="text-accent mb-4" />
                </motion.div>
                <h2 className="text-3xl font-bold mb-2 text-white">Awesome!</h2>
                <p className="text-slate-400 mb-6">Your report has been submitted. The city thanks you!</p>

                <div className="bg-slate-800 rounded-2xl p-4 w-full flex items-center justify-between mb-8 border border-yellow-500/30">
                  <span className="font-semibold text-white">Reward pending</span>
                  <span className="flex items-center gap-1 text-yellow-500 font-bold text-lg">
                    +50 🪙
                  </span>
                </div>

                <button
                  onClick={onClose}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all"
                >
                  Back to Map
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
