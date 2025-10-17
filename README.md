# F1 Leaderboard Frontend

Application web React TypeScript pour afficher les pilotes de Formule 1.

## 👥 Auteurs

- **Mathis Feltrin**
- **Cyril Pitar**

## 🛠️ Stack Technique

- **Framework** : React 19.1
- **Langage** : TypeScript 5.9
- **Build Tool** : Vite 7.1
- **Styling** : Tailwind CSS 4.1
- **Routing** : React Router DOM 7.9
- **Linting** : ESLint 9

## 📋 Prérequis

- Node.js >= 18.x
- npm >= 9.x

## 🚀 Installation

```bash
# Installer les dépendances
npm install
```

## 💻 Développement

```bash
# Lancer le serveur de développement
npm run dev

# L'application sera accessible sur http://localhost:5173
```

## 🏗️ Build

```bash
# Compiler le projet pour la production
npm run build

# Les fichiers de build seront dans le dossier dist/
```

## 🐳 Docker

### Build de l'image Docker

```bash
docker build -t f1-leaderboard-frontend:main .
```

### Lancer le conteneur

```bash
docker run -p 80:80 f1-leaderboard-frontend:main
```

L'application sera accessible sur http://localhost

## ☸️ Déploiement Kubernetes

### Avec Minikube

```bash
# Démarrer Minikube
minikube start

# Appliquer les configurations Kubernetes
kubectl apply -f ../TP_910_k8s/k8s/front-dep.yaml
kubectl apply -f ../TP_910_k8s/k8s/front-svc.yaml
kubectl apply -f ../TP_910_k8s/k8s/front-ingress.yaml

# Port-forward pour accéder localement
kubectl port-forward service/frontend 80:80
```

L'application sera accessible sur http://localhost:80

## 📁 Structure du Projet

```
frontend/
├── src/                    # Code source
│   ├── components/         # Composants React
│   ├── pages/             # Pages de l'application
│   ├── App.tsx            # Composant principal
│   └── main.tsx           # Point d'entrée
├── public/                # Assets statiques
├── dist/                  # Build de production
├── Dockerfile             # Configuration Docker
├── nginx.conf             # Configuration Nginx
├── vite.config.ts         # Configuration Vite
├── tsconfig.json          # Configuration TypeScript
├── tailwind.config.js     # Configuration Tailwind CSS
└── package.json           # Dépendances npm
```

## 🔧 Configuration

### Variables d'environnement

Créer un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://localhost:8080
```

### Nginx

La configuration Nginx est dans `nginx.conf` et inclut :

- Support SPA (Single Page Application)
- Compression Gzip
- Cache des assets statiques
- Redirection des routes vers `index.html`

## 📦 Scripts disponibles

| Script            | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Lance le serveur de développement    |
| `npm run build`   | Compile le projet pour la production |
| `npm run preview` | Prévisualise le build de production  |
| `npm run lint`    | Vérifie le code avec ESLint          |

## 🔗 Liens Utiles

- [Documentation React](https://react.dev/)
- [Documentation Vite](https://vitejs.dev/)
- [Documentation TypeScript](https://www.typescriptlang.org/)
- [Documentation Tailwind CSS](https://tailwindcss.com/)

## 📝 Notes de développement

- Le projet utilise React 19 avec les dernières fonctionnalités
- TypeScript est configuré en mode strict
- Tailwind CSS est intégré avec Vite pour un HMR optimal
- ESLint est configuré pour React et TypeScript

## 📄 Licence

Projet académique - INFO910 - Année 2025-2026
