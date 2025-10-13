import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getLeaderboard } from "../services/api";

interface Driver {
  id: number;
  name: string;
  team: string;
  points: number;
  position: number;
}

export default function LeaderboardPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true);
      const response1 = await fetch("/api/drivers");
      const response = await getLeaderboard();

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setDrivers(data);
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors du chargement"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-red-950">
      {/* Header */}
      <header className="border-b bg-black/30 backdrop-blur-sm border-white/10">
        <div className="flex items-center justify-between px-6 py-4 mx-auto max-w-7xl">
          <Link
            to="/"
            className="text-2xl font-bold text-white transition-colors hover:text-red-500"
          >
            F1 <span className="text-red-500">Leaderboard</span>
          </Link>
          <nav className="flex gap-4">
            <Link
              to="/"
              className="transition-colors text-white/70 hover:text-white"
            >
              Accueil
            </Link>
            <Link
              to="/drivers"
              className="transition-colors text-white/70 hover:text-white"
            >
              Pilotes
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-12 mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-2 text-5xl font-bold text-white">
            Classement des Pilotes
          </h1>
          <p className="text-white/60">Championnat du monde de Formule 1</p>
        </div>

        {isLoading && (
          <div className="py-12 text-center">
            <div className="inline-block w-12 h-12 border-4 border-red-500 rounded-full animate-spin border-t-transparent"></div>
            <p className="mt-4 text-white/60">Chargement du classement...</p>
          </div>
        )}

        {error && (
          <div className="p-6 text-center border rounded-lg bg-red-500/10 border-red-500/50">
            <p className="text-lg text-red-400">{error}</p>
            <button
              onClick={fetchLeaderboard}
              className="px-6 py-2 mt-4 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
            >
              Réessayer
            </button>
          </div>
        )}

        {!isLoading && !error && drivers.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-white/60">
              Aucun pilote dans le classement
            </p>
          </div>
        )}

        {!isLoading && !error && drivers.length > 0 && (
          <div className="overflow-hidden border rounded-lg bg-white/5 backdrop-blur-sm border-white/10">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-white/90">
                    Position
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-white/90">
                    Pilote
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-white/90">
                    Écurie
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-right text-white/90">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {drivers.map((driver, index) => (
                  <tr
                    key={driver.id}
                    className="transition-colors hover:bg-white/5"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span
                          className={`
                            text-lg font-bold
                            ${index === 0 ? "text-yellow-400" : ""}
                            ${index === 1 ? "text-gray-300" : ""}
                            ${index === 2 ? "text-orange-400" : ""}
                            ${index > 2 ? "text-white/70" : ""}
                          `}
                        >
                          {driver.position || index + 1}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-white">
                        {driver.name}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white/70">{driver.team}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-white">
                        {driver.points}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
