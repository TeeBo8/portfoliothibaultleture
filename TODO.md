# TODO - Portfolio Thibault Leture

## Ajouter NeuroBlend Marketplace au portfolio

### 1. Image du projet
- [ ] Prendre une capture d'écran propre du hero NeuroBlend (1920x1080 ou ratio 16:9)
- [ ] Placer dans `public/images/projects/neuroblend-marketplace.png`
- [ ] Vérifier que les dimensions matchent les autres images projets

### 2. Fichier MDX
- [ ] Créer `content/projects/neuroblend-marketplace.mdx`
  - title: "NeuroBlend Marketplace"
  - description: "Marketplace de cafés artisanaux adaptés aux profils neurodivergents (HPI, ADHD, Hypersensibles) avec système d'abonnements, quiz de profil et espace torréfacteurs"
  - date: 2025-04-01 (ou date réelle de publication)
  - url: "https://neuro-blend-marketplace.vercel.app/"
  - repository: (lien GitHub ou isPrivateRepo: true)
  - stack: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui", "tRPC", "Drizzle ORM", "Better Auth", "Stripe Connect", "Neon PostgreSQL"]
  - published: true

### 3. Contenu MDX détaillé
- [ ] Rédiger l'intro / pitch du projet
- [ ] Section **Features principales** :
  - Hero avec vidéo de fond (cappuccino)
  - Quiz de profil neurodivergent (HPI / ADHD / Hypersensible)
  - Catalogue produits avec filtres par profil
  - Système d'abonnements 3 tiers (Découverte €9.90, Essentiel €14.90, Premium €24.90)
  - Profils torréfacteurs artisanaux (Antoine Dubois, Marie Chen, Julien Moreau)
  - Espace vendeur avec inscription et dashboard (commission 15%)
  - Panier et checkout Stripe Connect
  - Authentification avancée (Better Auth)
  - Témoignages clients avec notes étoilées
  - Section "Comment ça marche" en 3 étapes
  - Section "Pourquoi NeuroBlend" (4 avantages)
  - Dark mode toggle
  - Design responsive mobile-first
- [ ] Section **Architecture technique** :
  - Frontend : Next.js App Router + Tailwind + shadcn/ui
  - Backend : tRPC pour les API typées end-to-end
  - Base de données : Drizzle ORM + Neon PostgreSQL
  - Paiements : Stripe Connect (marketplace multi-vendeurs)
  - Auth : Better Auth (sessions, OAuth)
- [ ] Ajouter des screenshots supplémentaires si disponibles

### 4. Vérification
- [ ] `pnpm dev` → vérifier le rendu sur `/projects`
- [ ] Vérifier la card NeuroBlend dans la grille projets
- [ ] Vérifier la page détail `/projects/neuroblend-marketplace`
- [ ] Vérifier le compteur de vues Redis
- [ ] `pnpm lint` → aucune erreur
- [ ] `pnpm build` → build propre sans warning
- [ ] Commit + push
