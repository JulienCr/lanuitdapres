# lanuitdapres.com - Site vitrine compagnie de danse

## Contexte

Site vitrine landing page pour la compagnie de spectacle/danse "La Nuit d'Après".
Remplace l'app YunoHost "299ko" actuellement sur lanuitdapres.com.
Hébergé sur le serveur dédié Avolo (Debian 12 + YunoHost), déployé via GitHub Actions + SSH.

## Décisions prises

- **Techno** : HTML/CSS/JS pur (zéro build step)
- **Structure** : Landing page unique avec sections scrollables
- **Repo** : GitHub séparé (pas dans avolo-server qui gère l'infra)
- **Déploiement** : Git push sur main → GitHub Action → rsync SSH vers serveur
- **Hébergement** : Nginx via YunoHost sur le serveur Avolo

## Répartition entre les deux projets

| Quoi | Où | Pourquoi |
|------|-----|----------|
| Code du site (HTML/CSS/JS) | **ce repo** (`lanuitdapres`) | Le contenu du site vit avec le site |
| GitHub Actions deploy workflow | **ce repo** (`.github/workflows/deploy.yml`) | Le CI/CD est lié au repo source |
| Préparation serveur (app YunoHost, permissions dossier, user deploy) | **avolo-server** | C'est de l'infra, géré par Ansible |
| Clé SSH deploy (génération + authorized_keys) | **avolo-server** | Gestion des accès = infra |

## TODO - Ce repo (lanuitdapres)

### 1. Initialiser le repo

- [ ] `git init` + premier commit
- [ ] Créer le repo sur GitHub
- [ ] Ajouter `.gitignore`, `README.md`

### 2. Structure du site

```
lanuitdapres/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   └── videos/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── .gitignore
└── README.md
```

### 3. Landing page - Sections

Page unique avec scroll :

1. **Hero** - Nom compagnie, image/vidéo plein écran, baseline
2. **Spectacles** - Visuels + descriptions courtes des créations
3. **La compagnie / Équipe** - Présentation, bios courtes
4. **Agenda / Tournée** - Prochaines dates
5. **Presse / Partenaires** - Logos, citations presse
6. **Contact** - Email, réseaux sociaux

Julien fournira le contenu (textes, images, vidéos).

### 4. GitHub Actions - Deploy workflow

- [ ] Écrire `.github/workflows/deploy.yml` (rsync vers serveur)
- [ ] Configurer les GitHub Secrets : `SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_USER`

## TODO - avolo-server (infra)

> Ces tâches se font dans le projet `~/dev2/avolo-server`.
> Voir aussi `docs/todo-lanuitdapres-infra.md` dans avolo-server.

### 5. Préparer le serveur pour le déploiement

- [ ] Supprimer l'app YunoHost "299ko"
- [ ] Installer "My Webapp" YunoHost sur le domaine lanuitdapres.com (gère SSL + vhost Nginx)
- [ ] Créer le répertoire cible (`/var/www/lanuitdapres.com/`) avec les bonnes permissions
- [ ] Créer un user système dédié au deploy (ou réutiliser un existant)

### 6. Clé SSH deploy

- [ ] Générer une clé SSH deploy (ed25519, sans passphrase)
- [ ] Ajouter la clé publique dans `authorized_keys` du user deploy sur le serveur
- [ ] Fournir la clé privée pour les GitHub Secrets du repo lanuitdapres
