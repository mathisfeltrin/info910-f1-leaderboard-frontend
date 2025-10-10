import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div>
      <h1>Erreur 404 : Page not found</h1>
      <Link to="/">Retour à l'accueil</Link>
    </div>
  );
}
