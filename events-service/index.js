require('dotenv').config();
const cors = require('cors');
const express = require('express');
const eventsRoutes = require('./src/routes/eventsRoutes'); // Importa as rotas


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cors());
app.use(eventsRoutes);

app.listen(PORT, () => {
    console.log(` API (MVC) rodando na porta ${PORT}`);
});