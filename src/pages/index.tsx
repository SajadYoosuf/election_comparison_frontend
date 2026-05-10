import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import {
   Search,
   ArrowRight,
   Globe,
   Bell,
   User,
   Map as MapIcon,
   History,
   BookOpen,
   Users,
   ArrowUpRight,
   Play,

} from 'lucide-react';

export default function LandingPage() {
   return (
      <div className="min-h-screen bg-[#08090a] text-white selection:bg-[#4ae176]/30">
         <Head>
            <title>Kerala Election Archive — 60 Years of History</title>
            <meta name="description" content="Explore seven decades of legislative evolution in Kerala." />
         </Head>

         {/* Navbar */}
         <nav className="h-16 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-50 bg-[#08090a]/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center border border-white/10">
                  <div className="w-4 h-4 border-2 border-white/40 rounded-sm" />
               </div>
               <span className="font-bold text-sm tracking-tight">Kerala Election Archive</span>
            </div>
            <div className="flex items-center gap-6">
               <button className="flex items-center gap-2 text-xs font-bold text-white/60 hover:text-white transition-colors">
                  <Globe className="w-3.5 h-3.5" /> ENGLISH
               </button>
               <div className="flex items-center gap-4 border-l border-white/10 pl-6">
                  <Bell className="w-4 h-4 text-white/40 cursor-pointer hover:text-white transition-colors" />
                  <div className="w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-colors">
                     <User className="w-3.5 h-3.5 text-white/60" />
                  </div>
               </div>
            </div>
         </nav>

         {/* Hero Section */}
         <section className="relative pt-32 pb-24 px-6 overflow-hidden">
            {/* Background Map Overlay */}
            <div
               className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale invert"
               style={{
                  backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/c/cb/Kerala_locator_map.svg")',
                  backgroundSize: '40%',
                  backgroundPosition: 'center 20%',
                  backgroundRepeat: 'no-repeat'
               }}
            />

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4ae176]/10 border border-[#4ae176]/20 text-[#4ae176] text-[9px] font-bold uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4ae176] animate-pulse" />
                  Historical Data Explorer
               </div>

               <h1 className="text-[64px] font-extrabold leading-[1.05] tracking-tight">
                  60 Years of <br />
                  <span className="text-[#4ae176]">Kerala Politics</span>
               </h1>

               <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
                  A comprehensive data archive of every assembly election from 1957 to the
                  2026 projections. Explore the trends that shaped the cradle of Indian literacy.
               </p>

               <div className="flex items-center justify-center gap-4 pt-4">
                  <Link href="/overview">
                     <button className="px-8 py-3.5 bg-white text-black font-bold rounded-lg text-sm flex items-center gap-2 hover:bg-white/90 transition-all shadow-xl shadow-white/5">
                        Start Exploring <ArrowUpRight className="w-4 h-4" />
                     </button>
                  </Link>
                  <button className="px-8 py-3.5 bg-white/5 border border-white/10 text-white font-bold rounded-lg text-sm flex items-center gap-2 hover:bg-white/10 transition-all">
                     View 2026 Results <MapIcon className="w-4 h-4 opacity-40" />
                  </button>
               </div>
            </div>
         </section>

         {/* Stats Bar */}
         <section className="max-w-6xl mx-auto px-6 mb-32">
            <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex items-center justify-between gap-8">
               <div className="flex flex-col">
                  <span className="text-2xl font-black text-white leading-none">17</span>
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mt-1">Elections</span>
               </div>

               <div className="flex-1 max-w-xl h-10 bg-black/40 border border-white/5 rounded-xl px-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                     <History className="w-3.5 h-3.5" /> Timeline
                  </div>
                  <div className="flex items-center gap-6">
                     {[1957, 1980, 2001, 2016, 2021, 2026].map(year => (
                        <span key={year} className={`text-[10px] font-bold ${year === 2021 ? 'text-[#4ae176]' : 'text-white/20'}`}>{year}</span>
                     ))}
                  </div>
                  <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                     <Play className="w-2.5 h-2.5 text-white/40 fill-current" />
                  </div>
               </div>

               <div className="flex flex-col text-right">
                  <span className="text-2xl font-black text-[#4ae176] leading-none">100%</span>
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mt-1">Data Fidelity</span>
               </div>
            </div>
         </section>

         {/* Features Section */}
         <section className="max-w-6xl mx-auto px-6 mb-40">
            <div className="text-center mb-20 space-y-4">
               <h2 className="text-3xl font-extrabold tracking-tight">Designed for Intelligence</h2>
               <p className="text-white/40 text-sm max-w-xl mx-auto leading-relaxed">
                  Providing granular insights for those who need to understand the heartbeat of the electorate.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-6 hover:bg-white/[0.04] transition-all group">
                     <div className="w-10 h-10 bg-[#4ae176]/10 rounded-xl flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-[#4ae176]" />
                     </div>
                     <div className="space-y-3">
                        <h3 className="text-lg font-bold">Journalists & Analysts</h3>
                        <p className="text-sm text-white/40 leading-relaxed">
                           Extract deep CSV datasets, generate automated swing reports, and cross-reference demographic shifts across six decades with a single click.
                        </p>
                     </div>
                     <button className="flex items-center gap-2 text-[11px] font-bold text-[#4ae176] pt-4 group-hover:gap-3 transition-all">
                        Access Data Tools <ArrowRight className="w-3.5 h-3.5" />
                     </button>
                  </div>

                  <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-6 hover:bg-white/[0.04] transition-all">
                     <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-500" />
                     </div>
                     <div className="space-y-3">
                        <h3 className="text-lg font-bold">Students</h3>
                        <p className="text-sm text-white/40 leading-relaxed">
                           A perfect academic companion for political science research. Understand historical alliance patterns and seat sharing ratios from 1957 onwards.
                        </p>
                     </div>
                  </div>
               </div>

               <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 space-y-6 hover:bg-white/[0.04] transition-all">
                  <div className="w-10 h-10 bg-[#4ae176]/10 rounded-xl flex items-center justify-center">
                     <Search className="w-5 h-5 text-[#4ae176]" />
                  </div>
                  <div className="space-y-3">
                     <h3 className="text-lg font-bold">Curious Citizens</h3>
                     <p className="text-sm text-white/40 leading-relaxed">
                        Find out how your constituency voted 20 years ago. Compare candidate performance across different eras in a clean, visual interface.
                     </p>
                  </div>
               </div>

               <div className="lg:col-span-3 h-64 bg-white/[0.02] border border-white/5 rounded-2xl flex relative overflow-hidden group hover:bg-white/[0.04] transition-all">
                  <div className="w-1/2 p-10 flex flex-col justify-center space-y-4">
                     <h3 className="text-2xl font-extrabold tracking-tight">The Political Map</h3>
                     <p className="text-sm text-white/40 max-w-xs">
                        Live interactive preview of constituency-level shifts over time.
                     </p>
                     <button className="w-fit px-5 py-2.5 border border-[#4ae176]/30 text-[#4ae176] text-[11px] font-bold rounded-lg hover:bg-[#4ae176]/10 transition-all">
                        Launch Interactive Map
                     </button>
                  </div>
                  <div className="w-1/2 bg-gradient-to-l from-[#4ae176]/10 to-transparent flex items-center justify-center">
                     <div className="w-full h-full opacity-20 group-hover:scale-105 transition-transform duration-1000"
                        style={{ backgroundImage: 'url("https://upload.wikimedia.org/wikipedia/commons/c/cb/Kerala_locator_map.svg")', backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
                  </div>
               </div>
            </div>
         </section>

         {/* Bottom CTA */}
         <section className="max-w-6xl mx-auto px-6 mb-40">
            <div className="bg-white/[0.02] border border-white/5 rounded-[32px] p-24 text-center space-y-8 relative overflow-hidden">
               <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
               <h2 className="text-4xl font-extrabold tracking-tight relative z-10">Ready to dive into the data?</h2>
               <p className="text-white/40 text-sm max-w-xl mx-auto relative z-10">
                  Join thousands of researchers and citizens who use ElectionHub Kerala as their primary source for verified historical data.
               </p>
               <Link href="/overview">
                  <button className="px-10 py-4 bg-[#4ae176] text-black font-bold rounded-xl text-sm hover:scale-105 transition-all relative z-10 shadow-2xl shadow-[#4ae176]/20">
                     Explore the Archive
                  </button>
               </Link>
            </div>
         </section>

         {/* Footer */}
         <footer className="max-w-6xl mx-auto px-6 pb-20 pt-10 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
               <div className="space-y-6 max-w-sm">
                  <div className="flex items-center gap-3">
                     <div className="w-6 h-6 border-2 border-[#4ae176] rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#4ae176]" />
                     </div>
                     <span className="font-bold text-sm">ElectionHub Kerala</span>
                  </div>
                  <p className="text-[11px] text-white/40 leading-relaxed">
                     An open-source initiative to preserve and visualize the democratic history of Kerala.
                     Built for clarity and speed.
                  </p>
               </div>

               <div className="flex flex-col items-end gap-6 text-right">
                  <div className="flex items-center gap-6 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                     <a href="#" className="hover:text-white transition-colors">Documentation</a>
                     <a href="#" className="hover:text-white transition-colors">API Access</a>
                     <a href="#" className="hover:text-white transition-colors flex items-center gap-1.5">
                     </a>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-bold text-white/60 uppercase tracking-tighter">
                        Curated and Maintained by <span className="text-white">Sajjad Yoosuf</span>
                     </p>
                     <p className="text-[9px] text-white/20 uppercase tracking-widest">
                        Released under MIT License © 2024
                     </p>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}
