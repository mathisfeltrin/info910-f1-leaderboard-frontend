import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDriverDetails } from "../services/api";

interface Achievement {
  year: number;
  race: string;
  result: string;
  description: string;
}

interface DriverDetails {
  name: string;
  wins: number;
  podiums: number;
  poles: number;
  achievements: Achievement[];
}

export default function DriverDetailsPage() {
  const [driver, setDriver] = useState<DriverDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // Pour l'instant, Lewis Hamilton en dur
  const driverName = "Lewis Hamilton";

  useEffect(() => {
    fetchDriverDetails();
  }, []);

  const fetchDriverDetails = async () => {
    try {
      setIsLoading(true);
      const data = await getDriverDetails(driverName);
      setDriver(data);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur lors du chargement");
    } finally {
      setIsLoading(false);
    }
  };

  const getResultColor = (result: string) => {
    switch (result.toLowerCase()) {
      case "win":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "podium":
        return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "pole":
        return "bg-purple-500/20 text-purple-400 border-purple-500/50";
      case "fastest lap":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-red-950">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-white hover:text-red-500 transition-colors">
            F1 <span className="text-red-500">Stats</span>
          </Link>
          <nav className="flex gap-4">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">
              Accueil
            </Link>
            <Link to="/leaderboard" className="text-white/70 hover:text-white transition-colors">
              Classement
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
            <p className="text-white/60 mt-4">Chargement des données du pilote...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-6 text-center">
            <p className="text-red-400 text-lg">{error}</p>
            <button
              onClick={fetchDriverDetails}
              className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        )}

        {!isLoading && !error && driver && (
          <div className="space-y-8">
            {/* Driver Header */}
            <div className="text-center space-y-4">
              <h1 className="text-6xl font-bold text-white">{driver.name}</h1>
              <div className="h-1 w-32 bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full"></div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center">
                <div className="text-5xl font-bold text-yellow-400 mb-2">{driver.wins}</div>
                <div className="text-white/70 text-lg">Victoires</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center">
                <div className="text-5xl font-bold text-blue-400 mb-2">{driver.podiums}</div>
                <div className="text-white/70 text-lg">Podiums</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 text-center">
                <div className="text-5xl font-bold text-purple-400 mb-2">{driver.poles}</div>
                <div className="text-white/70 text-lg">Pole Positions</div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6">
              <h2 className="text-3xl font-bold text-white mb-6">Réalisations</h2>

              {driver.achievements.length === 0 ? (
                <p className="text-white/60 text-center py-8">Aucune réalisation enregistrée</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {driver.achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className="bg-black/30 border border-white/10 rounded-lg p-4 hover:bg-white/5 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-white/50 text-sm">{achievement.year}</span>
                        <span className={`text-xs px-2 py-1 rounded border ${getResultColor(achievement.result)}`}>
                          {achievement.result}
                        </span>
                      </div>
                      <h3 className="text-white font-semibold mb-1">{achievement.race}</h3>
                      <p className="text-white/60 text-sm">{achievement.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
