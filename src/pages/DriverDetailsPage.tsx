import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getDriverDetails } from "../services/api";
import NavBar from "../components/NavBar";

interface Achievement {
  year: number;
  race: string;
  result: string;
  description: string;
}

interface DriverDetails {
  firstName: string;
  lastName: string;
  number: number;
  wins: number;
  podiums: number;
  poles: number;
  team: string;
  age: number;
  headshotUrl: string;
  achievements?: Achievement[];
}

export default function DriverDetailsPage() {
  const { driverName } = useParams<{ driverName: string }>();
  const navigate = useNavigate();
  const [driver, setDriver] = useState<DriverDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (driverName) {
      fetchDriverDetails(driverName);
    }
  }, [driverName]);

  const fetchDriverDetails = async (name: string) => {
    try {
      setIsLoading(true);
      const data = await getDriverDetails(name);
      setDriver(data);
      setError("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erreur lors du chargement"
      );
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
    <div className="min-h-screen px-6 py-4 bg-gradient-to-br from-slate-950 via-slate-900 to-red-950">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <main className="px-6 py-12 mx-auto mt-20 max-w-7xl">
        {isLoading && (
          <div className="py-12 text-center">
            <div className="inline-block w-12 h-12 border-4 border-red-500 rounded-full animate-spin border-t-transparent"></div>
            <p className="mt-4 text-white/60">
              Chargement des données du pilote...
            </p>
          </div>
        )}

        {error && (
          <div className="p-6 text-center border rounded-lg bg-red-500/10 border-red-500/50">
            <p className="text-lg text-red-400">{error}</p>
            <button
              onClick={() => driverName && fetchDriverDetails(driverName)}
              className="px-6 py-2 mt-4 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
            >
              Réessayer
            </button>
          </div>
        )}

        {!isLoading && !error && driver && (
          <div className="space-y-8">
            {/* Driver Header */}
            <div className="flex flex-col items-center space-y-6 md:flex-row md:space-y-0 md:space-x-8">
              <img
                src={driver.headshotUrl}
                alt={`${driver.firstName} ${driver.lastName}`}
                className="object-cover border-4 rounded-full w-36 h-36 border-white/20"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/144";
                }}
              />
              <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center justify-center gap-3 md:justify-start">
                  <span className="text-5xl font-bold text-white/50">
                    #{driver.number}
                  </span>
                  <div>
                    <h1 className="text-5xl font-bold text-white">
                      {driver.firstName} {driver.lastName}
                    </h1>
                    <p className="text-xl text-white/70">{driver.team}</p>
                  </div>
                </div>
                <p className="text-white/60">Âge: {driver.age} ans</p>
              </div>
            </div>

            <div className="w-32 h-1 mx-auto rounded-full bg-gradient-to-r from-red-500 to-orange-500"></div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="p-6 text-center border rounded-lg bg-white/5 backdrop-blur-sm border-white/10">
                <div className="mb-2 text-5xl font-bold text-yellow-400">
                  {driver.wins}
                </div>
                <div className="text-lg text-white/70">Victoires</div>
              </div>
              <div className="p-6 text-center border rounded-lg bg-white/5 backdrop-blur-sm border-white/10">
                <div className="mb-2 text-5xl font-bold text-blue-400">
                  {driver.podiums}
                </div>
                <div className="text-lg text-white/70">Podiums</div>
              </div>
              <div className="p-6 text-center border rounded-lg bg-white/5 backdrop-blur-sm border-white/10">
                <div className="mb-2 text-5xl font-bold text-purple-400">
                  {driver.poles}
                </div>
                <div className="text-lg text-white/70">Pole Positions</div>
              </div>
            </div>

            {/* Achievements */}
            {driver.achievements && (
              <div className="p-6 border rounded-lg bg-white/5 backdrop-blur-sm border-white/10">
                <h2 className="mb-6 text-3xl font-bold text-white">
                  Réalisations
                </h2>

                {driver.achievements.length === 0 ? (
                  <p className="py-8 text-center text-white/60">
                    Aucune réalisation enregistrée
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {driver.achievements.map((achievement, index) => (
                      <div
                        key={index}
                        className="p-4 transition-colors border rounded-lg bg-black/30 border-white/10 hover:bg-white/5"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <span className="text-sm text-white/50">
                            {achievement.year}
                          </span>
                          <span
                            className={`text-xs px-2 py-1 rounded border ${getResultColor(
                              achievement.result
                            )}`}
                          >
                            {achievement.result}
                          </span>
                        </div>
                        <h3 className="mb-1 font-semibold text-white">
                          {achievement.race}
                        </h3>
                        <p className="text-sm text-white/60">
                          {achievement.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Back Button */}
            <div className="text-center">
              <button
                onClick={() => navigate("/drivers")}
                className="px-6 py-3 text-white transition-all border-2 rounded-lg border-white/20 backdrop-blur-sm hover:bg-white/10 hover:border-white/40 hover:scale-105"
              >
                ← Retour à la liste des pilotes
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
