import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getDriversList } from "../services/api";
import NavBar from "../components/NavBar";

interface Driver {
  wins: number;
  firstName: string;
  lastName: string;
  number: number;
  podiums: number;
  poles: number;
  headshotUrl: string;
  team: string;
  age: number;
}

export default function DriversListPage() {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchDriversList();
  }, []);

  const fetchDriversList = async () => {
    try {
      setIsLoading(true);
      const data = await getDriversList();
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

  const handleDriverClick = (driverLastName: string) => {
    navigate(`/drivers/${driverLastName}`);
  };

  return (
    <div className="min-h-screen px-6 py-4 bg-gradient-to-br from-slate-950 via-slate-900 to-red-950">
      {/* Navigation Bar */}
      <NavBar />

      {/* Main Content */}
      <main className="px-6 py-12 mx-auto mt-20 max-w-7xl">
        <div className="mb-8">
          <h1 className="mb-2 text-5xl font-bold text-white">
            Liste des Pilotes
          </h1>
          <p className="text-white/60">Championnat du monde de Formule 1</p>
        </div>

        {isLoading && (
          <div className="py-12 text-center">
            <div className="inline-block w-12 h-12 border-4 border-red-500 rounded-full animate-spin border-t-transparent"></div>
            <p className="mt-4 text-white/60">Chargement des pilotes...</p>
          </div>
        )}

        {error && (
          <div className="p-6 text-center border rounded-lg bg-red-500/10 border-red-500/50">
            <p className="text-lg text-red-400">{error}</p>
            <button
              onClick={fetchDriversList}
              className="px-6 py-2 mt-4 text-white transition-colors bg-red-600 rounded-lg hover:bg-red-700"
            >
              Réessayer
            </button>
          </div>
        )}

        {!isLoading && !error && drivers.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-white/60">Aucun pilote dans la liste</p>
          </div>
        )}

        {!isLoading && !error && drivers.length > 0 && (
          <div className="overflow-hidden border rounded-lg bg-white/5 backdrop-blur-sm border-white/10">
            <table className="w-full">
              <thead className="bg-black/30">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-white/90">
                    Numéro
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-white/90">
                    Nom
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-left text-white/90">
                    Écurie
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-center text-white/90">
                    Âge
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-center text-white/90">
                    Victoires
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-center text-white/90">
                    Podiums
                  </th>
                  <th className="px-6 py-4 text-sm font-semibold text-center text-white/90">
                    Poles
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {drivers.map((driver) => (
                  <tr
                    key={driver.number}
                    onClick={() => handleDriverClick(driver.lastName)}
                    className="transition-colors cursor-pointer hover:bg-white/10"
                  >
                    <td className="px-6 py-4">
                      <span className="text-lg font-bold text-white/70">
                        {driver.number}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* <img
                          src={driver.headshotUrl}
                          alt={`${driver.firstName} ${driver.lastName}`}
                          className="object-cover w-12 h-12 border-2 rounded-full border-white/20"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://via.placeholder.com/48";
                          }}
                        /> */}
                        <span className="font-medium text-white">
                          {driver.firstName} {driver.lastName}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white/70">{driver.team}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-white/70">{driver.age}</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold text-yellow-400">
                        {driver.wins}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold text-blue-400">
                        {driver.podiums}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="font-semibold text-purple-400">
                        {driver.poles}
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
