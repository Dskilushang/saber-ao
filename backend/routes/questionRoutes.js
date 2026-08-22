const express = require('express');
const router = express.Router();
const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'VOTRE_CLE_GEMINI';

router.get('/', async (req, res) => {
  const langue = req.query.lang || 'fr'; // Langue par défaut : français
  
  try {
    const prompt = `Génère 5 questions de culture générale sur l'Angola (histoire, géographie, musique, sport, traditions) EN ${langue.toUpperCase()}. 
Format OBLIGATOIRE: Un tableau JSON strict, sans texte autour, sans balise markdown.
Exemple de format:
[
  {
    "text": "Question ?",
    "answers": ["Réponse A", "Réponse B", "Réponse C", "Réponse D"],
    "correctAnswerIndex": 0
  }
]`;

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
    res.json([]); // Retourne un tableau vide en cas d'erreur
  }
});

module.exports = router;
