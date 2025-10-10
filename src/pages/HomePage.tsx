import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-red-950 animate-gradient" />

      {/* Animated lines decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-slide-right" />
        <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-slide-right delay-300" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent animate-slide-right delay-500" />
      </div>

      {/* Main content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 text-center space-y-8 animate-fade-in-up">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter">
            <span className="bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text text-transparent animate-pulse-slow">
              F1
            </span>
          </h1>
          <h2 className="text-2xl md:text-4xl font-light text-white/90 tracking-wide">
            Live Leaderboard
          </h2>
        </div>

        {/* Description */}
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed animate-fade-in delay-200">
          Suivez en temps réel les performances des pilotes et des écuries de
          Formule 1
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-fade-in delay-400">
          <Link
            to="/leaderboard"
            className="group relative px-8 py-4 bg-red-600 text-white font-semibold rounded-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50"
          >
            <span className="relative z-10">Voir le classement</span>
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            to="/drivers"
            className="px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-lg backdrop-blur-sm hover:bg-white/10 hover:border-white/40 transition-all hover:scale-105"
          >
            Découvrir les pilotes
          </Link>
        </div>
      </main>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}
