import React, { useState } from 'react';
import { AnimatePresence, motion } from "motion/react";
import { FiBookOpen, FiChevronDown, FiChevronUp, FiClock, FiYoutube, FiX, FiExternalLink, FiCheckCircle } from 'react-icons/fi';

const difficultyColor = { Easy: "#34d399", Medium: "#a78bfa", Hard: "#f87171" };

function ModuleCard({ mod, index }) {
  const [open, setOpen] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);

  const youtubeUrl = mod.youtube || `https://www.youtube.com/results?search_query=${encodeURIComponent(mod.title)}`;
  const articleUrl = mod.article || mod.resource || 'https://roadmap.sh';

  const defaultContent = mod.articleContent || `${mod.description} This comprehensive guide provides step-by-step principles, architectural best practices, and code patterns to help you master ${mod.title}. Practice applying these concepts through real-world system design and algorithm problems.`;

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06, duration: 0.35 }}
        whileHover={{ y: -2 }}
        onClick={() => setOpen(!open)}
        className='relative overflow-hidden bg-[#000000]/90 backdrop-blur-2xl border border-white/10 rounded-xl cursor-pointer select-none shadow-[0_4px_18px_rgba(0,0,0,0.2)] hover:border-white/20 transition-all'
      >
        <div className='absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent pointer-events-none'/>

        <div className='relative flex items-center gap-3 p-4'>
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold bg-white/5 border border-white/10"
            style={{ color: difficultyColor[mod.difficulty] || "#a78bfa" }}
          >
            {index + 1}
          </div>

          <div className='flex-1 min-w-0'>
            <p className='text-sm font-medium text-white truncate'>{mod.title}</p>
            <div className='flex items-center gap-1.5 mt-0.5'>
              <FiClock size={10} className="text-white/30"/>
              <span className='text-xs text-white/35'>{mod.duration}</span>
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <span className="text-xs font-medium hidden sm:block" style={{ color: difficultyColor[mod.difficulty] || "#a78bfa" }}>
              {mod.difficulty || "Medium"}
            </span>
            {open
              ? <FiChevronUp size={14} className="text-white/30" />
              : <FiChevronDown size={14} className="text-white/30" />
            }
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className='overflow-hidden'
            >
              <div className='relative px-4 pb-4 pt-0 border-t border-white/8'>
                <p className='text-xs text-white/55 mt-3 mb-3 leading-relaxed'>{mod.description}</p>
                <div className='flex gap-2 flex-wrap'>
                  <a 
                    href={youtubeUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    onClick={(e) => e.stopPropagation()}
                  >
                    <motion.button 
                      whileHover={{ scale: 1.03 }} 
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-red-500/25 text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors cursor-pointer"
                    >
                      <FiYoutube size={12}/> Watch Tutorial
                    </motion.button>
                  </a>

                  <motion.button 
                    whileHover={{ scale: 1.03 }} 
                    whileTap={{ scale: 0.97 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowArticleModal(true);
                    }}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-indigo-500/30 text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 transition-colors cursor-pointer font-medium"
                  >
                    <FiBookOpen size={12}/> Read Article
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* In-App Study Article Reader Modal */}
      <AnimatePresence>
        {showArticleModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl text-slate-100 max-h-[85vh] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/80">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                    <FiBookOpen size={20} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                        Phase {index + 1} Article
                      </span>
                      <span className="text-xs text-slate-400">({mod.duration})</span>
                    </div>
                    <h3 className="text-base font-bold text-white mt-0.5">{mod.title}</h3>
                  </div>
                </div>
                <button
                  onClick={() => setShowArticleModal(false)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  <FiX size={18} />
                </button>
              </div>

              {/* Article Content Body */}
              <div className="p-6 overflow-y-auto space-y-4 text-xs text-slate-300 leading-relaxed">
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2">
                  <h4 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                    <FiCheckCircle className="text-emerald-400" size={16} /> Key Learning Objectives
                  </h4>
                  <p className="text-slate-400 leading-normal">{mod.description}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="font-bold text-white text-sm">Deep-Dive Study Notes</h4>
                  <p className="text-slate-300 leading-relaxed text-xs whitespace-pre-line">{defaultContent}</p>
                </div>

                <div className="p-4 bg-indigo-950/30 border border-indigo-500/20 rounded-xl space-y-2">
                  <h5 className="font-bold text-indigo-300 text-xs">💡 Practice Recommendation</h5>
                  <p className="text-slate-300 text-[11px]">
                    Dedicate focused time during this phase to write clean code, trace memory allocations, and review interview system design diagrams.
                  </p>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between gap-3">
                <a
                  href={articleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition-all shadow-md cursor-pointer"
                >
                  <span>Open Full Reference Link</span>
                  <FiExternalLink size={13} />
                </a>

                <button
                  onClick={() => setShowArticleModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Close Article
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ModuleCard;
