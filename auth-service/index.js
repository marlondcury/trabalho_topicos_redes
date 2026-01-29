require('dotenv').config();
const express = require('express');
const db = require('./db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());

const SECRET_KEY = process.env.JWT_SECRET || 'segredo_do_casi';

// Rota de Health Check (Importante para o AWS ECS saber que o app está vivo)
app.get('/health', (req, res) => res.json({ status: 'Auth Service OK' }));

// 1. REGISTRO (CREATE)
app.post('/auth/register', async (req, res) => {
    const { name, email, password, role } = req.body;
    
    // Criptografar senha antes de salvar
    const hashedPassword = await bcrypt.hash(password, 8);

    try {
        const [result] = await db.execute(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role || 'student']
        );
        res.status(201).json({ message: 'Usuário criado!', userId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. LOGIN (Autenticação JWT)
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        if (rows.length === 0) return res.status(404).json({ message: 'Usuário não encontrado' });

        const user = rows[0];
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ message: 'Senha inválida' });

        // Gera o Token JWT
        const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. LISTAR USUÁRIOS (READ)
app.get('/users', async (req, res) => {
    try {
        // Retorna apenas dados seguros (sem senha)
        const [rows] = await db.execute('SELECT id, name, email, role FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. ATUALIZAR USUÁRIO (UPDATE)
app.put('/users/:id', async (req, res) => {
    const { name, email, role  } = req.body;
    try {
        await db.execute('UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?', [name, email, role, req.params.id]);
        res.json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 5. DELETAR USUÁRIO (DELETE)
app.delete('/users/:id', async (req, res) => {
    try {
        await db.execute('DELETE FROM users WHERE id = ?', [req.params.id]);
        res.json({ message: 'Usuário removido' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Auth Service rodando na porta ${PORT}`));