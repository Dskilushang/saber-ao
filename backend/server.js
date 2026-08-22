const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const questionRoutes = require('./routes/questionRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/questions', questionRoutes);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/quizapp';
mongoose.connect(MONGO_URI)
    .then(() => console.log('MongoDB connecté avec succès !'))
    .catch(err => console.error('Erreur MongoDB :', err));

app.listen(PORT, () => {
    console.log(`Serveur exécuté sur http://localhost:${PORT}`);
});
