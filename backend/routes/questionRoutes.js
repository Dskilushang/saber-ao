const express = require('express');
const router = express.Router();
const axios = require('axios');

// Clé d'API Google Gemini directement intégrée
const GEMINI_API_KEY = 'AIzaSyAp5I9MIH_ihqpNsegcZkkdyXsFryTBwgI';

// Route principale pour générer des questions infinies via IA
router.get('/', async (req, res) => {
  try {
    const prompt = `Génère 5 questions de culture générale sur l'Angola (histoire, géographie, musique, sport, traditions). 
Format OBLIGATOIRE: Renvoie UNIQUEMENT un tableau JSON strict, sans texte autour, sans balise markdown.
Format exact:
[
  {
    "text": "Question ?",
    "answers": ["Choix 1", "Choix 2", "Choix 3", "Choix 4"],
    "correctAnswerIndex": 0
  }
]`;

    // Appel à l'IA Google Gemini (Gratuit)
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );

    let aiText = response.data.candidates[0].content.parts[0].text;
    aiText = aiText.replace(/```json/g, '').replace(/```/g, '').trim();

    const questions = JSON.parse(aiText);
    res.json(questions);

  } catch (error) {
    console.error("Erreur IA Gemini :", error.message);
    // Questions de secours automatiques si besoin
    res.json([
      {
        _id: "sec_1",
        text: "Quelle est la capitale de l'Angola ?",
        answers: ["Luanda", "Huambo", "Benguela", "Lubango"],
        correctAnswerIndex: 0
      },
      {
        _id: "sec_2",
        text: "Quelle est la monnaie officielle de l'Angola ?",
        answers: ["Franc CFA", "Kwanza", "Réel", "Dollar"],
        correctAnswerIndex: 1
      }
    ]);
  }
});

module.exports = router;
