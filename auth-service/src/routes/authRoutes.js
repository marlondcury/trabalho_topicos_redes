const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

// Rotas de Autenticação
router.post('/auth/register', AuthController.register);
router.post('/auth/login', AuthController.login);

// Rotas de CRUD de Usuários
router.get('/users', AuthController.getAllUsers);      // Listar todos
router.get('/users/:id', AuthController.getUserById);  // Buscar por ID
router.put('/users', AuthController.updateUser);       // Atualizar (ID no Body)
router.delete('/users/:id', AuthController.deleteUser);// Deletar (ID na URL)

router.get('/health', (req, res) => res.json({ status: 'APi rodando!' }));

module.exports = router;