const express = require('express');
const router = express.Router();
const Question = require('../models/questionModel');

// 1. Récupérer toutes les questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Erreur', error: error.message });
  }
});

// 2. Ajouter une question
router.post('/', async (req, res) => {
  try {
    const question = new Question({
      text: req.body.text,
      answers: req.body.answers,
      correctAnswerIndex: req.body.correctAnswerIndex
    });
    const nouvelleQuestion = await question.save();
    res.status(201).json(nouvelleQuestion);
  } catch (error) {
    res.status(400).json({ message: 'Erreur', error: error.message });
  }
});

module.exports = router;
