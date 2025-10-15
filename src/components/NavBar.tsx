import { Link, useLocation } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="z-50 w-full border bg-white/10 backdrop-blur-md border-white/20 rounded-2xl">
      <div className="flex items-center justify-between p-8 h-14 max-w-7xl">
        {/* Logo */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold text-white transition-all hover:scale-105"
          >
            <span className="text-transparent bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text">
              F1
            </span>
            <span className="ml-2 text-white/90">Live</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="flex gap-2">
          <Link
            to="/"
            className={`
              px-4 py-2 rounded-lg font-medium transition-all
              ${
                isActive("/")
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }
            `}
          >
            Accueil
          </Link>
          <Link
            to="/drivers"
            className={`
              px-4 py-2 rounded-lg font-medium transition-all
              ${
                location.pathname.startsWith("/drivers")
                  ? "bg-white/20 text-white"
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }
            `}
          >
            Pilotes
          </Link>
        </div>
      </div>
    </nav>
  );
}
