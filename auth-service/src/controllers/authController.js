const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const SECRET_KEY = process.env.JWT_SECRET || 'segredo_do_casi';

const AuthController = {
  // --- AÇÕES PÚBLICAS ---

  // Registrar Usuário
  register: async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 8);
      const userId = await UserModel.create(name, email, hashedPassword, role);
      res.status(201).json({ message: 'Usuário criado!', userId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Login
  login: async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findByEmail(email);
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(401).json({ message: 'Senha inválida' });

      const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // --- CRUD DE USUÁRIOS ---

  // Listar Todos
  getAllUsers: async (req, res) => {
    try {
      const users = await UserModel.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Buscar UM Usuário por ID (Passado na URL: /users/1)
  getUserById: async (req, res) => {
    const { id } = req.params; // Pega o ID da URL
    try {
      const user = await UserModel.findById(id);
      if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Atualizar (Passando ID no JSON, conforme seu pedido)
  updateUser: async (req, res) => {
    const { id, name, email, role } = req.body;
    if (!id) return res.status(400).json({ error: 'ID obrigatório no JSON' });

    try {
      await UserModel.update(id, name, email, role);
      res.json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Deletar (Passado na URL: /users/1)
  deleteUser: async (req, res) => {
    const { id } = req.params; // Pega o ID da URL
    try {
      await UserModel.delete(id);
      res.json({ message: 'Usuário removido com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = AuthController;