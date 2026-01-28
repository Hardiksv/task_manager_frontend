import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 text-slate-800 font-sans selection:bg-indigo-500 selection:text-white overflow-hidden">
      
      {/* --- NAVBAR --- */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center relative z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg">
            T
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">TaskManager</span>
        </div>
        
        <div className="flex gap-4">
          <Link 
            href="/login" 
            className="px-5 py-2.5 rounded-full text-sm font-semibold text-slate-600 hover:text-indigo-600 hover:bg-white/50 transition-all"
          >
            Log in
          </Link>
          <Link 
            href="/register" 
            className="px-5 py-2.5 rounded-full text-sm font-semibold bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 hover:scale-105 transition-all"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <main className="container mx-auto px-6 pt-20 pb-16 text-center relative z-10">
        
        {/* Animated Background Blobs */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

        <div className="relative">
          <span className="inline-block py-1 px-3 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm">
            Productivity Redefined
          </span>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-slate-900">
            Organize your work, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              unleash your potential.
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            A simple, elegant, and fast task management tool designed to help you stay focused and get things done. 
            No clutter, just clarity.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/register" 
              className="px-8 py-4 rounded-2xl bg-slate-900 text-white text-lg font-semibold hover:bg-slate-800 hover:-translate-y-1 transition-all shadow-xl shadow-slate-900/20"
            >
              Start for free
            </Link>
            <Link 
              href="/login" 
              className="px-8 py-4 rounded-2xl bg-white text-slate-700 text-lg font-semibold hover:bg-slate-50 hover:-translate-y-1 transition-all shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              View Demo
            </Link>
          </div>
        </div>

        {/* --- FEATURES GRID --- */}
        <div className="mt-24 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-left">
          
          {/* Card 1 */}
          <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Lightning Fast</h3>
            <p className="text-slate-500 leading-relaxed">
              Experience zero lag with our optimistic UI updates. Managing tasks has never felt this smooth.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center mb-6 text-purple-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Stay Organized</h3>
            <p className="text-slate-500 leading-relaxed">
              Filter by active or completed tasks. Edit details on the fly. Keep your workspace clean.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/60 backdrop-blur-xl p-8 rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="w-12 h-12 bg-pink-100 rounded-2xl flex items-center justify-center mb-6 text-pink-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Secure & Private</h3>
            <p className="text-slate-500 leading-relaxed">
              Your data is safe with us. We use secure authentication to ensure only you access your tasks.
            </p>
          </div>

        </div>
      </main>

      {/* --- FOOTER --- */}
      <footer className="text-center py-8 text-slate-500 text-sm relative z-10">
        <p>© {new Date().getFullYear()} TaskManager. Built with Next.js & Tailwind.</p>
      </footer>
    </div>
  );
}