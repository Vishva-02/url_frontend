import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
    return (
        <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 overflow-hidden relative selection:bg-indigo-500/30">

            {/* Atmospheric Background Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[128px] pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[128px] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[128px] pointer-events-none hidden md:block"></div>

            {/* Grid Pattern Layout */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAzNHYtbGgtaHYtbGgtSHYxbHItSnoiIGZpbGw9IiM5Y2EyZDgiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvZz48L3N2Zz4=')] pointer-events-none opacity-50"></div>

            {/* Content Container */}
            <div className="relative z-10 text-center max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">

                {/* Animated Pill Badge */}
                <div className="animate-fade-in-down mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-300 text-sm font-semibold backdrop-blur-md shadow-2xl">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse"></span>
                    ShortifyPro Premium Platform
                </div>

                {/* Massive Gradient Hero Title */}
                <h1 className="animate-fade-in text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6 relative">
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 via-purple-400 to-pink-400 drop-shadow-[0_0_40px_rgba(168,85,247,0.3)] select-none">
                        ShortifyPro
                    </span>
                    <span className="inline-block transform hover:scale-125 transition-transform duration-500 cursor-default ml-2 sm:ml-4 select-none animate-float">🚀</span>
                </h1>

                {/* Atmospheric Subtitle */}
                <p className="animate-fade-in-up text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                    Shorten. Track. Analyze your links effortlessly.<br className="hidden sm:block" />
                    Transform clunky URLs into powerful brand assets.
                </p>

                {/* SaaS Action Buttons */}
                <div className="animate-slide-up flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto">
                    <Link
                        to="/register"
                        className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.5)] flex items-center justify-center gap-3 text-lg"
                    >
                        Get Started Free
                        <svg className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </Link>

                    <Link
                        to="/login"
                        className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl border border-white/10 transition-all duration-300 transform hover:scale-105 hover:border-white/30 flex items-center justify-center text-lg backdrop-blur-md shadow-lg"
                    >
                        Login to Dashboard
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default LandingPage;
