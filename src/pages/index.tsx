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
import { ResultsModal } from '@/components/modals/ResultsModal';

export default function LandingPage() {
   const [language, setLanguage] = React.useState<'EN' | 'ML'>('EN');
   const [isModalOpen, setIsModalOpen] = React.useState(false);

   const content = {
      EN: {
         title: "60 Years of",
         accent: "Kerala Assemply ELection ",
         sub: "A comprehensive data archive of every assembly election from 1957 to the 2026 projections. Explore the trends that shaped the cradle of Indian literacy.",
         start: "Start Exploring",
         results: "View 2026 Results"
      },
      ML: {
         title: "60 വർഷത്തെ",
         accent: "കേരള രാഷ്ട്രീയം",
         sub: "1957 മുതൽ 2026 വരെയുള്ള എല്ലാ നിയമസഭാ തിരഞ്ഞെടുപ്പുകളുടെയും സമഗ്രമായ വിവരശേഖരം. കേരളത്തിന്റെ രാഷ്ട്രീയ ചരിത്രം പര്യവേക്ഷണം ചെയ്യുക.",
         start: "പര്യവേക്ഷണം തുടങ്ങുക",
         results: "2026 ഫലങ്ങൾ"
      }
   };

   const t = content[language];

   return (
      <div className="min-h-screen bg-[#08090a] text-white selection:bg-[#4ae176]/30">
         <Head>
            <title>Kerala Election Comparison — 60 Years of History</title>
            <meta name="description" content="Explore seven decades of legislative evolution in Kerala." />
         </Head>

         {/* Navbar */}
         <nav className="h-16 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-50 bg-[#08090a]/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-white/10 rounded flex items-center justify-center border border-white/10">
                  <div className="w-4 h-4 border-2 border-white/40 rounded-sm" />
               </div>
               <span className="font-bold text-sm tracking-tight">Kerala Election Comparison</span>
            </div>
            <div className="flex items-center gap-6">
               <button
                  onClick={() => setLanguage(language === 'EN' ? 'ML' : 'EN')}
                  className="flex items-center gap-2 text-xs font-bold text-[#4ae176] hover:text-white transition-all bg-[#4ae176]/10 px-3 py-1.5 rounded-lg border border-[#4ae176]/20"
               >
                  <Globe className="w-3.5 h-3.5" /> {language === 'EN' ? 'മലയാളം' : 'ENGLISH'}
               </button>
            </div>
         </nav>

         {/* Hero Section */}
         <section className="relative pt-32 pb-24 px-6 overflow-hidden min-h-[80vh] flex items-center justify-center">
            {/* Background Map Overlay */}
            <div
               className="absolute inset-0 opacity-[0.8] pointer-events-none"
               style={{
                  backgroundImage: 'url("/kerala-map-bg.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center 20%',
                  backgroundRepeat: 'no-repeat'
               }}
            />
            {/* Dark Radial Mask for Text Readability */}
            <div className="absolute inset-0 bg-[#08090a]/40 backdrop-blur-[2px] pointer-events-none" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#08090a_70%)] pointer-events-none" />

            <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4ae176]/10 border border-[#4ae176]/20 text-[#4ae176] text-[9px] font-bold uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#4ae176] animate-pulse" />
                  Historical Data Explorer
               </div>

               <h1 className="text-[64px] font-extrabold leading-[1.05] tracking-tight">
                  {t.title} <br />
                  <span className="text-[#4ae176]">{t.accent}</span>
               </h1>

               <p className="text-white/40 text-lg max-w-2xl mx-auto leading-relaxed">
                  {t.sub}
               </p>

               <div className="flex items-center justify-center gap-4 pt-4">
                  <Link href="/overview">
                     <button className="px-8 py-3.5 bg-white text-black font-bold rounded-lg text-sm flex items-center gap-2 hover:bg-white/90 transition-all shadow-xl shadow-white/5">
                        {t.start} <ArrowUpRight className="w-4 h-4" />
                     </button>
                  </Link>
                  <button
                     onClick={() => setIsModalOpen(true)}
                     className="px-8 py-3.5 bg-white/5 border border-white/10 text-white font-bold rounded-lg text-sm flex items-center gap-2 hover:bg-white/10 transition-all"
                  >
                     {t.results} <MapIcon className="w-4 h-4 opacity-40" />
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

               <div className="flex-1 max-w-2xl h-14 bg-black/40 border border-white/5 rounded-2xl px-6 flex items-center justify-between shadow-inner">
                  <div className="flex items-center gap-3 text-xs font-bold text-white/40 uppercase tracking-[0.2em]">
                     <History className="w-4 h-4" /> Timeline
                  </div>
                  <div className="flex items-center gap-8">
                     {[1957, 1980, 2001, 2016, 2021, 2026].map(year => (
                        <span key={year} className={`text-xs font-bold transition-all duration-500 ${year === 2026 ? 'text-[#4ae176] scale-125' : 'text-white/20 hover:text-white/40'}`}>{year}</span>
                     ))}
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-[#4ae176]/10 border border-[#4ae176]/20 flex items-center justify-center">
                     <Play className="w-3 h-3 text-[#4ae176] fill-current" />
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
         <footer className="w-full px-8 pb-20 pt-10 border-t border-white/5 bg-black/20">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12 max-w-7xl mx-auto">
               <div className="space-y-6 max-w-sm">
                  <div className="flex items-center gap-3">
                     <div className="w-6 h-6 border-2 border-[#4ae176] rounded flex items-center justify-center">
                        <div className="w-2 h-2 bg-[#4ae176]" />
                     </div>
                     <span className="font-bold text-sm">Kerala Election Comparison</span>
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
                  </div>
                  <div className="space-y-1">
                     <p className="text-[10px] font-bold text-white/60 uppercase tracking-tighter">
                        Curated and Maintained by <span className="text-white">Sajad Yoosuf</span>
                     </p>
                  </div>
               </div>
            </div>
         </footer>

         <ResultsModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            year={2026}
         />
      </div>
   );
}
