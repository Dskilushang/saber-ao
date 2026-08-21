# SABER AO - Mascotte 3D Pixar | Dossier Assets

> Mascotte officielle du jeu télévisé **SABER AO ?** - Version Smoking / Lunettes / Micro oreillette

---

## 📦 Contenu du dossier `asset/`

Toutes les images sont **détourées en PNG transparent** (RGBA), prêtes pour intégration Web / Mobile / Unity / React.

### 1. Logo & Références (3 fichiers)

| Fichier | Description | Dimensions | Usage |
|---------|-------------|------------|-------|
| `00_logo_saber_ao.png` | Logo officiel SABER AO détouré (fond transparent) | ~500×400 | Header, favicon, iPad |
| `00_reference_personnage_isole.png` | Personnage original (tenue noire) - détouré | 1024×1024 | Référence avant restyling |
| `00_planche_originale_8_expressions.png` | Planche originale 8 expressions (design complet) | 2000×1300 | Archive / comparaison |

### 2. Mascottes 3D Pixar - 10 Expressions (10 fichiers individuels)

Modèle 3D style **Pixar / Disney** - Homme angolais charismatique, peau brune, barbe courte, **Smoking noir à revers satinés, nœud papillon, chemise blanche, lunettes transparentes à monture claire, micro oreillette beige avec perche**, tient un **iPad / questionnaire noir avec logo SABER AO**.

Chaque fichier est **isolé, centré, côte à côte non collé** - espacement garanti pour découpage automatique via Copilot.

| # | Fichier | Expression PT | Expression FR | Émotion / Usage jeu télé | Dimensions |
|---|---------|---------------|---------------|--------------------------|------------|
| 1 | `mascotte_bienvenue.png` | BOAS-VINDAS | Bienvenue | Sourire chaleureux, main levée ouverte, accueil public | 596×824 |
| 2 | `mascotte_pergunta.png` | PERGUNTA | Question | Doigt pointé vers caméra, engageante, pose question | 416×810 |
| 3 | `mascotte_convite_resposta.png` | CONVITE À RESPOSTA | Invitation à répondre | Paume ouverte vers joueur, invite à répondre | 388×824 |
| 4 | `mascotte_a_penser.png` | A PENSAR | En réflexion | Main sur menton, regard en coin, pense / hésite | 415×814 |
| 5 | `mascotte_bonne_reponse.png` | RESPOSTA CORRETA | Bonne réponse | Poing levé victorieux, grand sourire, célèbre | 430×826 |
| 6 | `mascotte_mauvaise_reponse.png` | RESPOSTA INCORRETA | Mauvaise réponse | Geste d'empathie, main ouverte rassurante, encourage | 519×971 |
| 7 | `mascotte_surpris.png` | SURPRESO | Surpris | Yeux écarquillés, bouche ouverte, effet choc | 559×824 |
| 8 | `mascotte_suspense.png` | SUSPENSE | Suspense | Doigt sur lèvres, regard intense, tension dramatique | 457×823 |
| 9 | `mascotte_celebration.png` | COMEMORAÇÃO | Célébration | Bras ouverts, iPad en l'air, confettis, joie extrême | 841×838 |
| 10 | `mascotte_encerramento.png` | ENCERRAMENTO | Clôture / Au revoir | Salut chaleureux, iPad sous bras, au revoir | 486×818 |

**Tous les fichiers sont en PNG transparent 32-bit (RGBA), détourés, isolation parfaite pour animation via code.**

### 3. Planches complètes (2 fichiers)

| Fichier | Description | Dimensions | Usage |
|---------|-------------|------------|-------|
| `mascotte_planche_complete_10_expressions.png` | **Planche 5×2 avec étiquettes** - Tous les personnages côte à côte, bien séparés (spacing 50px), fond transparent, labels PT/FR | 2800×2070 | Référence visuelle, impression, présentation |
| `mascotte_planche_sprites_transparent.png` | **Sprite-sheet pur** - Même grille 5×2 sans étiquettes, uniquement mascottes espacées, fond transparent | 2800×1950 | Découpage automatique sprites (Copilot / CSS sprites) |

> **NB :** Chaque personnage est bien séparé (50-60px d'espacement) pour une division facile en sprites. Aucun chevauchement.

---

## 🎨 Spécifications Visuelles

- **Style** : 3D Pixar / Disney, rendu Octane, éclairage studio doux, ultra détaillé 8K
- **Tenue** : Smoking noir (veste + pantalon), revers satinés, chemise blanche, nœud papillon noir, chaussures vernies, pochette blanche
- **Accessoires** : Lunettes à verres transparents (monture claire), oreillette beige avec micro perche, iPad noir avec logo SABER AO (or/rouge lumineux)
- **Fond** : Transparent (alpha 0) - prêt pour overlay sur tout background
- **Résolution** : 400-850px par mascotte, 300 DPI, qualité maximale

---

## 💻 Intégration & Animation via GitHub Copilot

### Option A - HTML / CSS / JS simple (recommandé pour démo)

```html
<!-- Préchargez les 10 mascotttes -->
<div id="mascotte-container">
  <img id="mascotte" src="asset/mascotte_bienvenue.png" alt="Mascotte SABER AO" style="width:320px; height:auto;" />
</div>

<script>
const expressions = [
  'mascotte_bienvenue.png',
  'mascotte_pergunta.png',
  'mascotte_convite_resposta.png',
  'mascotte_a_penser.png',
  'mascotte_bonne_reponse.png',
  'mascotte_mauvaise_reponse.png',
  'mascotte_surpris.png',
  'mascotte_suspense.png',
  'mascotte_celebration.png',
  'mascotte_encerramento.png'
];
let index = 0;
function nextExpression() {
  index = (index + 1) % expressions.length;
  document.getElementById('mascotte').src = `asset/${expressions[index]}`;
}
// Exemple : change toutes les 2 secondes
setInterval(nextExpression, 2000);

// Ou déclenche selon le jeu :
// showExpression('mascotte_bonne_reponse.png') lors d'une bonne réponse
function showExpression(fileName) {
  document.getElementById('mascotte').src = `asset/${fileName}`;
}
</script>
```

### Option B - React / Next.js avec Copilot

Prompt Copilot :
> "Crée un composant React <MascotteSaberAO expression='bonne_reponse' /> qui affiche la mascotte correspondante depuis /asset, avec animation fade-in, fond transparent, et préchargement des images."

```jsx
// components/MascotteSaberAO.jsx
import { useState, useEffect } from 'react';

const MAP = {
  bienvenue: 'mascotte_bienvenue.png',
  pergunta: 'mascotte_pergunta.png',
  convite: 'mascotte_convite_resposta.png',
  pensar: 'mascotte_a_penser.png',
  correta: 'mascotte_bonne_reponse.png',
  incorreta: 'mascotte_mauvaise_reponse.png',
  surpreso: 'mascotte_surpris.png',
  suspense: 'mascotte_suspense.png',
  celebracao: 'mascotte_celebration.png',
  encerramento: 'mascotte_encerramento.png',
};

export default function MascotteSaberAO({ expression = 'bienvenue', size = 380 }) {
  const [src, setSrc] = useState(`/asset/${MAP[expression]}`);
  useEffect(() => setSrc(`/asset/${MAP[expression]}`), [expression]);
  return (
    <img 
      src={src} 
      alt={`Saber AO - ${expression}`} 
      width={size} 
      style={{ filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))', transition: 'all 0.4s ease' }} 
    />
  );
}

// Usage dans le jeu :
// <MascotteSaberAO expression="correta" /> // bonne réponse
// <MascotteSaberAO expression="suspense" /> // moment suspense
```

### Option C - Sprite-sheet (optimisé, 1 seule requête HTTP)

Utilise `mascotte_planche_sprites_transparent.png` (2800×1950) - Grille 5 colonnes × 2 lignes.

```css
.mascotte-sprite {
  width: 480px;
  height: 820px;
  background-image: url('/asset/mascotte_planche_sprites_transparent.png');
  background-repeat: no-repeat;
  background-size: 2800px 1950px; /* taille sheet */
}
/* Coordonnées (x,y) pour chaque expression */
.bienvenue  { background-position: -50px -50px; }
.pergunta   { background-position: -580px -50px; }
.convite    { background-position: -1110px -50px; }
.pensar     { background-position: -1640px -50px; }
.correta    { background-position: -2170px -50px; }
.incorreta  { background-position: -50px -1020px; }
.surpreso   { background-position: -580px -1020px; }
.suspense   { background-position: -1110px -1020px; }
.celebracao { background-position: -1640px -1020px; }
.encerramento { background-position: -2170px -1020px; }
```

**Dimensions cellule** : 480×820, **spacing** 50px, **padding** 50px. Voir `manifest.json` pour coordonnées exactes.

---

## 📐 Découpage automatique pour Copilot

Donnez ce prompt à Copilot Chat / GitHub Copilot Workspace :

> "Dans le dossier asset/, j'ai 10 mascottes PNG transparentes et un sprite-sheet mascotte_planche_sprites_transparent.png (grille 5x2, cellule 480x820, spacing 50, padding 50). Écris un script Node.js qui découpe le sprite-sheet en 10 fichiers individuels nommés selon manifest.json, et génère un composant React qui anime la mascotte selon l'état du jeu (bienvenue, pergunta, convite, pensar, correta, incorreta, surpreso, suspense, celebracao, encerramento). Chaque transition doit être en fade + scale."

---

## 🗂️ Arborescence finale

```
asset/
├── 00_logo_saber_ao.png
├── 00_reference_personnage_isole.png
├── 00_planche_originale_8_expressions.png
├── mascotte_bienvenue.png
├── mascotte_pergunta.png
├── mascotte_convite_resposta.png
├── mascotte_a_penser.png
├── mascotte_bonne_reponse.png
├── mascotte_mauvaise_reponse.png
├── mascotte_surpris.png
├── mascotte_suspense.png
├── mascotte_celebration.png
├── mascotte_encerramento.png
├── mascotte_planche_complete_10_expressions.png
├── mascotte_planche_sprites_transparent.png
├── manifest.json
└── README.md
```

---

## ✅ Checklist Copilot

- [x] 10 expressions distinctes, smoking + lunettes + oreillette + iPad
- [x] PNG transparent détouré, isolation parfaite
- [x] Personnages côte à côte non collés, espacement 50px sur planche
- [x] Nommage clair `mascotte_*` pour mapping automatique
- [x] Assets prêts pour animation codée (fichiers individuels + sprite-sheet)
- [x] Manifest JSON pour découpage programmatique

Créé pour **SABER AO - O JOGO QUE TESTA O QUE VOCÊ SABE!**
*O jogo de perguntas e respostas que une, ensina e diverte!*

