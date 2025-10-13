import { Link } from "react-router-dom";
import { useState } from "react";
import { checkHealth } from "../services/api";
import backgroundImage from "../assets/background.jpg";

export default function HomePage() {
  const [healthStatus, setHealthStatus] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleHealthCheck = async () => {
    setIsLoading(true);
    setHealthStatus("Appel en cours...");

    const result = await checkHealth();

    if (result.success) {
      setHealthStatus(`✅ Backend OK: ${JSON.stringify(result.data)}`);
    } else {
      setHealthStatus(`❌ Erreur: ${result.error}`);
    }

    setIsLoading(false);
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Main content */}
      <main className="relative z-10 max-w-5xl px-6 py-12 mx-auto space-y-8 text-center animate-fade-in-up">
        {/* Logo/Title */}
        <div className="space-y-4">
          <h1 className="font-black tracking-tighter text-7xl md:text-9xl">
            <span className="text-transparent bg-gradient-to-r from-red-500 via-red-400 to-orange-500 bg-clip-text animate-pulse-slow">
              F1
            </span>
          </h1>
          <h2 className="text-2xl font-light tracking-wide md:text-4xl text-white/90">
            Live Leaderboard
          </h2>
        </div>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-lg font-light leading-relaxed delay-200 md:text-xl text-white/70 animate-fade-in">
          Suivez en temps réel les performances des pilotes et des écuries de
          Formule 1
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row animate-fade-in delay-400">
          <Link
            to="/leaderboard"
            className="relative px-8 py-4 overflow-hidden font-semibold text-white transition-all bg-red-600 rounded-lg group hover:scale-105 hover:shadow-2xl hover:shadow-red-500/50"
          >
            <span className="relative z-10">Voir le classement</span>
            <div className="absolute inset-0 transition-opacity opacity-0 bg-gradient-to-r from-red-600 to-orange-600 group-hover:opacity-100" />
          </Link>

          <Link
            to="/drivers"
            className="px-8 py-4 font-semibold text-white transition-all border-2 rounded-lg border-white/20 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 hover:scale-105"
          >
            Découvrir les pilotes
          </Link>
        </div>

        {/* Health Check Test Section */}
        <div className="pt-8 space-y-4 animate-fade-in delay-600">
          <button
            onClick={handleHealthCheck}
            disabled={isLoading}
            className="px-6 py-3 font-semibold text-white transition-all bg-green-600 rounded-lg hover:bg-green-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Test en cours..." : "Tester l'API Backend"}
          </button>

          {healthStatus && (
            <div className="max-w-2xl px-6 py-4 mx-auto rounded-lg bg-white/10 backdrop-blur-sm text-white/90">
              <p className="break-words">{healthStatus}</p>
            </div>
          )}
        </div>
      </main>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />
    </div>
  );
}
