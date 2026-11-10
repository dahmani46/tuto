# Vidéo : comment fonctionnent les agents IA

Animation de 52 secondes (1920×1080, 30 fps) : un homme debout explique le fonctionnement
des agents IA et désigne trois panneaux d'affichage suspendus au-dessus de lui.

- **01 Pipeline d'un agent** : objectif → plan → outils → contrôle → résultat
- **02 Boucle d'exécution** : observer → décider → agir, avec une mémoire au centre
- **03 Statistiques d'usage** : compteur, barres et anneau de réussite
- **Architecture multi-agents** : plusieurs agents coordonnés par un orchestrateur
- **Journal d'exécution** : écran au sol qui défile avec les événements de l'agent

Les chiffres affichés sont **illustratifs** (le panneau le signale à l'écran).
Remplacez les valeurs de `statsBoard` et les lignes de `LOG` par vos propres données.

## Fichiers

- `index.html` : la scène entière, dessinée sur un canvas. Ouvrable directement dans un navigateur (lecture en boucle).
- `render.js` : rend chaque image avec Playwright puis encode le MP4 avec ffmpeg.

## Générer la vidéo

```bash
npm install playwright   # si besoin ; Chromium doit être installé (npx playwright install chromium)
node render.js ./frames agents-ia.mp4
```

Prérequis : Node.js, `ffmpeg` dans le PATH.
