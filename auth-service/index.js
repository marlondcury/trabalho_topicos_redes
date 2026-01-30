require('dotenv').config();
const express = require('express');
const authRoutes = require('./src/routes/authRoutes'); // Importa as rotas

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Diz ao Express para usar as rotas que definimos
app.use(authRoutes);

app.listen(PORT, () => {
    console.log(`Auth Service (MVC) rodando na porta ${PORT}`);
});