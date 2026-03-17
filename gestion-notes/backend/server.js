const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/etudiants', require('./routes/etudiants'));
app.use('/api/matieres',  require('./routes/matieres'));
app.use('/api/notes',     require('./routes/notes'));

app.listen(process.env.PORT, () => {
  console.log(`Serveur démarré sur le port ${process.env.PORT}`);
});