require('dotenv').config();
const express = require('express');
const db = require('./db');
const app = express();

app.use(express.json());

// Middleware simples para simular proteção (Em produção, validaria o JWT do auth-service)
const checkAuth = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).json({ message: 'Token não fornecido' });
    next();
};

app.get('/health', (req, res) => res.json({ status: 'Events Service OK' }));

// 1. CRIAR EVENTO (CREATE)
app.post('/events', checkAuth, async (req, res) => {
    const { title, description, date, location } = req.body;
    try {
        const [result] = await db.execute(
            'INSERT INTO events (title, description, event_date, location) VALUES (?, ?, ?, ?)',
            [title, description, date, location]
        );
        res.status(201).json({ message: 'Evento criado!', eventId: result.insertId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. LISTAR EVENTOS (READ)
app.get('/events', async (req, res) => {
    try {
        const [rows] = await db.execute('SELECT * FROM events');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. ATUALIZAR EVENTO (UPDATE)
app.put('/events/:id', checkAuth, async (req, res) => {
    const { title, description, date, location } = req.body;
    try {
        await db.execute(
            'UPDATE events SET title = ?, description = ?, event_date = ?, location = ? WHERE id = ?',
            [title, description, date, location, req.params.id]
        );
        res.json({ message: 'Evento atualizado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. DELETAR EVENTO (DELETE)
app.delete('/events/:id', checkAuth, async (req, res) => {
    try {
        await db.execute('DELETE FROM events WHERE id = ?', [req.params.id]);
        res.json({ message: 'Evento cancelado/removido' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Events Service rodando na porta ${PORT}`));