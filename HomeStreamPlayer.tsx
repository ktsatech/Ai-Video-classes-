import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ApplicationStatus } from '../types';
import { Play, Lock, Monitor, Tv, Sparkles, ShieldCheck, ArrowRight, Video, Camera } from 'lucide-react';

interface HomeStreamPlayerProps {
  onNavigateToWatch: () => void;
  onScrollToRegister: () => void;
}

export default function HomeStreamPlayer({ onNavigateToWatch, onScrollToRegister }: HomeStreamPlayerProps) {
  const { liveStream, currentStudent } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);

  // Check if current user is approved/enrolled to watch
  const isEnrolled = currentStudent && currentStudent.status === ApplicationStatus.ENROLLED;

  const handlePlayClick = () => {
    if (isEnrolled) {
      setIsPlaying(true);
    } else {
      // Direct them to the verification gate
      onNavigateToWatch();
    }
  };

  return (
    <section id="home-video-watching-area" className="bg-slate-950 py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-900 relative overflow-hidden">
      {/* Decorative gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.06),transparent_60%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-10 max-w-2xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-1.5 bg-blue-900/30 border border-blue-500/20 text-blue-400 rounded-full px-3.5 py-1 text-[10px] font-black uppercase tracking-wider mb-4 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>King Elidex Broadcast Center</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-none">
            Live Stream Room & Replay Player
          </h2>
          
          <p className="text-slate-400 text-xs sm:text-sm font-semibold mt-2 max-w-lg leading-relaxed">
            The ultimate visual theater. All students and guests can monitor stream status from here. Full HD interactive playing follows student cohort verification.
          </p>
        </div>

        {/* Dynamic Studio Monitor / TV Player Frame */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-3 sm:p-5 shadow-2xl relative overflow-hidden">
          
          {/* Top bezel controls bar */}
          <div className="flex items-center justify-between px-3 pb-3 mb-3 border-b border-slate-800 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
              </span>
              <span>STUDIO_MONITOR_CH1</span>
            </div>

            <div className="flex items-center gap-2">
              {liveStream.status !== 'offline' ? (
                <span className="flex items-center gap-1 text-red-500 font-black animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {liveStream.status === 'live' ? 'ONLINE • BROADCAST' : 'REPLAY ARCHIVE'}
                </span>
              ) : (
                <span className="text-slate-500 font-black flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
                  OFFLINE
                </span>
              )}
            </div>
          </div>

          {/* Core Player Aspect Video Frame */}
          <div className="aspect-video bg-black rounded-2xl overflow-hidden relative border border-slate-950 shadow-inner group">
            
            {liveStream.status === 'offline' ? (
              /* CASE 1: STREAM IS OFFLINE */
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-950 text-slate-500 p-6 text-center animate-fadeIn select-none">
                <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center mb-4">
                  <Tv className="w-6 h-6 text-slate-400" />
                </div>
                <h4 className="font-black text-white text-base sm:text-lg tracking-tight">Studio Broadcast is Offline</h4>
                <p className="text-[11px] text-slate-400 max-w-sm mt-1 leading-normal font-semibold">
                  Elijah and King Elidex are currently offline or preparing materials. Live classroom broadcasts start July 20th. Keep checking this spot!
                </p>
                <div className="mt-4 flex items-center gap-1 bg-slate-900 border border-slate-850 px-3 py-1 rounded-full text-[9px] text-blue-400 font-extrabold uppercase">
                  <span className="w-1 h-1 rounded-full bg-blue-500 animate-pulse" />
                  Standby Mode Active
                </div>
              </div>
            ) : isPlaying && isEnrolled ? (
              /* CASE 2: STREAM IS ACTIVE AND USER IS FULLY AUTHORIZED & CLICKED PLAY */
              (!liveStream.sourceType || liveStream.sourceType === 'youtube') ? (
                <iframe
                  src={liveStream.embedUrl + "?autoplay=1"}
                  title={liveStream.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              ) : liveStream.sourceType === 'camera' ? (
                /* CAMERA BROADCAST SIMULATION ON LANDING PAGE */
                <div className="w-full h-full bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 flex flex-col items-center justify-center p-6 text-center relative select-none animate-fadeIn">
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
                  <div className="absolute top-5 left-5 flex items-center gap-1.5">
                    <span className="bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                      LIVE FEED
                    </span>
                    <span className="bg-black/40 border border-white/5 text-[8px] text-slate-300 px-1.5 py-0.5 rounded font-bold uppercase">
                      STUDIO WEBCAM
                    </span>
                  </div>

                  <div className="w-14 h-14 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center justify-center mb-3">
                    <Camera className="w-6 h-6 text-indigo-400 animate-pulse" />
                  </div>
                  <h4 className="font-black text-white text-sm">Direct Workstation Feed Connected</h4>
                  <p className="text-[10px] text-slate-400 max-w-xs mt-1 font-semibold leading-relaxed">
                    Watch and learn. King Elidex is broadcasting directly from PalmPay-sponsored video editing decks.
                  </p>
                </div>
              ) : (
                /* PRISM LIVE EXTERNAL STREAM SIMULATION ON LANDING PAGE */
                <div className="w-full h-full bg-slate-950 flex flex-col items-center justify-center p-6 text-center relative select-none animate-fadeIn">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,170,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,170,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                  <div className="absolute top-5 left-5 flex items-center gap-1.5">
                    <span className="bg-blue-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-white animate-pulse" />
                      OBS STREAM
                    </span>
                    <span className="bg-black/40 border border-white/5 text-[8px] text-blue-400 px-1.5 py-0.5 rounded font-black uppercase">
                      PRISM LIVE
                    </span>
                  </div>

                  <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-3">
                    <Monitor className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="font-black text-white text-sm">PRISM Live Encoder Feed Connected</h4>
                  <p className="text-[10px] text-slate-400 max-w-xs mt-1 font-semibold leading-relaxed">
                    High-definition external RTMP stream connected from local broadcasting deck.
                  </p>
                </div>
              )
            ) : (
              /* CASE 3: STREAM IS ONLINE BUT USER IS EITHER NOT ENROLLED OR HASN'T CLICKED PLAY (THE CONDITIONAL GATE OVERLAY) */
              <div className="w-full h-full absolute inset-0 flex items-center justify-center bg-slate-950/85 backdrop-blur-md transition-all duration-300 z-10">
                <div className="absolute inset-0 bg-cover bg-center opacity-15 filter blur-sm bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80')]" referrerPolicy="no-referrer" />
                
                <div className="text-center p-6 sm:p-12 relative z-20 flex flex-col items-center gap-4 max-w-md">
                  
                  {/* Lock Indicator */}
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-900/50 cursor-pointer hover:scale-105 transition-all duration-300 relative group-hover:bg-blue-500" onClick={handlePlayClick}>
                    <span className="absolute inset-0 rounded-full bg-blue-600/30 animate-ping" />
                    {isEnrolled ? (
                      <Play className="w-6 h-6 text-white fill-current translate-x-0.5" />
                    ) : (
                      <Lock className="w-6 h-6 text-white" />
                    )}
                  </div>

                  <div className="mt-2">
                    <span className="bg-red-950/80 border border-red-500/30 text-red-400 font-extrabold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1">
                      <span className="w-1 h-1 bg-red-400 rounded-full animate-pulse" />
                      {liveStream.status === 'live' ? 'Live Broadcast Available' : 'Lesson Replay Available'}
                    </span>
                    
                    <h3 className="font-black text-white text-lg tracking-tight mt-2.5">
                      {liveStream.title}
                    </h3>
                    
                    <p className="text-[11px] text-slate-400 mt-1 font-semibold leading-relaxed">
                      {isEnrolled 
                        ? "You are fully authenticated! Press Play to start streaming direct from the classroom." 
                        : "Private Studio Stream channel restricted. Enrolled generals or paid Live Pass holders are permitted to watch the stream."}
                    </p>
                  </div>

                  {/* Access Actions Grid */}
                  {!isEnrolled && (
                    <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full mt-2">
                      <button
                        onClick={onNavigateToWatch}
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-blue-950/50"
                      >
                        <span>Verify & Unlock Stream</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={onScrollToRegister}
                        className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 font-bold py-2.5 px-4 rounded-xl text-xs transition-all"
                      >
                        Enroll as New Student
                      </button>
                    </div>
                  )}

                  {isEnrolled && !isPlaying && (
                    <button
                      onClick={handlePlayClick}
                      className="bg-blue-600 hover:bg-blue-500 text-white font-extrabold py-2.5 px-5 rounded-xl text-xs shadow-md animate-bounce mt-2"
                    >
                      Start Secure Player
                    </button>
                  )}

                  <div className="flex items-center gap-1.5 text-[9px] text-slate-500 font-bold uppercase mt-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                    <span>PalmPay Verified Connection</span>
                  </div>

                </div>
              </div>
            )}

          </div>

          {/* Under player metadata section */}
          {liveStream.status !== 'offline' && (
            <div className="mt-4 px-3 py-3 rounded-2xl bg-slate-950 border border-slate-850 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <span className="text-[8px] uppercase font-bold text-slate-500 block">Stream Topic Name</span>
                <span className="text-white text-xs font-black block mt-0.5">{liveStream.title}</span>
              </div>

              <div className="shrink-0 text-slate-400 text-[10px] font-semibold bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                <span>Ticket Pass Value: ₦1,000 Only</span>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
