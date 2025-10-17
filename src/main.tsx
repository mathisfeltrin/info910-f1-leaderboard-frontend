import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// Console personnalisée stylée
// console.clear();

// const styles = {
//   title: 'color: #ef4444; font-size: 40px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);',
//   subtitle: 'color: #f97316; font-size: 18px; font-weight: bold;',
//   info: 'color: #3b82f6; font-size: 14px;',
//   success: 'color: #22c55e; font-size: 14px;',
//   tech: 'color: #a855f7; font-size: 12px; font-weight: bold;',
//   separator: 'color: #6b7280; font-size: 12px;',
// };

// console.log('%c🏎️ F1 Driver Stats', styles.title);
// console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.separator);
// console.log('%c✨ Application de Statistiques F1', styles.subtitle);
// console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.separator);

// console.log('%c📊 Fonctionnalités:', styles.info);
// console.log('%c  ✓ Liste complète des pilotes', styles.success);
// console.log('%c  ✓ Statistiques détaillées (victoires, podiums, poles)', styles.success);
// console.log('%c  ✓ Historique des réalisations', styles.success);
// console.log('%c  ✓ Navigation fluide avec React Router', styles.success);

// console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.separator);
// console.log('%c🛠️ Stack Technique:', styles.tech);
// console.log('%c  • React 19 + TypeScript', styles.info);
// console.log('%c  • Vite (Build Tool)', styles.info);
// console.log('%c  • Tailwind CSS v4', styles.info);
// console.log('%c  • React Router v7', styles.info);

// console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.separator);
// console.log('%c🎯 API Backend:', styles.tech);
// console.log('%c  • /api/drivers/list - Liste des pilotes', styles.info);
// console.log('%c  • /api/drivers/{name} - Détails d\'un pilote', styles.info);
// console.log('%c  • /api/drivers/health - Health check', styles.info);

// console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', styles.separator);
// console.log('%c🚀 Application démarrée avec succès!', styles.success);
// console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n', styles.separator);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
