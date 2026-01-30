require('dotenv').config();
const express = require('express');
const eventsRoutes = require('./src/routes/eventsRoutes'); // Importa as rotas


const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(eventsRoutes);

app.listen(PORT, () => {
    console.log(` API (MVC) rodando na porta ${PORT}`);
});