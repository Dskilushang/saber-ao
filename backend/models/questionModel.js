const mongoose = require('mongoose');

// Structure d'une question dans la base de données MongoDB
const questionSchema = new mongoose.Schema({
    text: { 
        type: String, 
        required: true 
    },
    answers: { 
        type: [String], 
        required: true 
    },
    correctAnswerIndex: { 
        type: Number, 
        required: true 
    }
});

module.exports = mongoose.model('Question', questionSchema);
