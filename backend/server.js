require('dotenv').config();

const express = require('express');
const cors = require('cors');
const questionRoutes = require('./routes/questionRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/questions', questionRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API SABER AO opérationnelle' });
});

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
