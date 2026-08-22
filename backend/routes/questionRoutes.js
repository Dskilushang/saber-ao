const express = require('express');
const router = express.Router();
const axios = require('axios');

// Clé API Google Gemini (définie dans le fichier .env)
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'VOTRE_CLE_GEMINI';

router.get('/', async (req, res) => {
  // Récupération de la langue demandée par l'application (ex: fr, pt, kg, ln...)
  const langue = req.query.lang || 'pt';

  try {
    const prompt = `Tu es le moteur du jeu télévisé SABER AO sur la culture générale de l'Angola.
Génère 5 questions dans la langue correspondant au code "${langue}" (ex: fr=Français, pt=Português, kg=Kikongo, ln=Lingála, kj=Kimbundu, umb=Umbundu).

Consignes :
1. Varie les sujets : histoire de l'Angola, géographie, musique, traditions, sport, héros nationaux.
2. Génère au moins 1 question de type 'image' (avec 2 choix d'URLs d'images valides sur l'Angola) et les autres de type 'text' (avec 4 choix textes).
3. Renvoie UNIQUEMENT un tableau JSON strict, sans texte autour, sans balises markdown.

Format JSON obligatoire :
[
  {
    "type": "text",
    "text": "Question texte ?",
    "answers": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctAnswerIndex": 0
  },
  {
    "type": "image",
    "text": "Question sur une image ?",
    "answers": [
      "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Angola.svg/320px-Flag_of_Angola.svg.png",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_Zambia.svg/320px-Flag_of_Zambia.svg.png"
    ],
    "correctAnswerIndex": 0
  }
]`;

    // Appel à l'IA Google Gemini
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    let aiText = response.data.candidates[0].content.parts[0].text;
    
    // Nettoyage des balises markdown si l'IA en ajoute
    aiText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();

    const questions = JSON.parse(aiText);
    res.json(questions);

  } catch (error) {
    console.error("Erreur IA Gemini :", error.message);
    
    // Questions de secours (Fallback) si l'IA ou la connexion échoue
    res.json([
      {
        type: 'text',
        text: "Qual é a capital de Angola?",
        answers: ["Luanda", "Huambo", "Benguela", "Lubango"],
        correctAnswerIndex: 0
      },
      {
        type: 'image',
        text: "Qual é a bandeira oficial de Angola?",
        answers: [
          "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Flag_of_Angola.svg/320px-Flag_of_Angola.svg.png",
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_Zambia.svg/320px-Flag_of_Zambia.svg.png"
        ],
        correctAnswerIndex: 0
      }
    ]);
  }
});

module.exports = router;
