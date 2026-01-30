const db = require('../../db');

const UserModel = {
  // 1. CRIAR (Create)
  create: async (name, email, password, role) => {
    const [result] = await db.execute(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, role || 'student']
    );
    return result.insertId;
  },

  // 2. LISTAR TODOS (Read - All) -> Sem retornar a senha!
  findAll: async () => {
    const [rows] = await db.execute('SELECT id, name, email, role FROM users');
    return rows;
  },

  // 3. BUSCAR POR ID (Read - By ID) -> Sem retornar a senha!
  findById: async (id) => {
    const [rows] = await db.execute('SELECT id, name, email, role FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  // 4. BUSCAR POR EMAIL (Usado no Login para checar senha)
  findByEmail: async (email) => {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  // 5. ATUALIZAR (Update)
  update: async (id, name, email, role) => {
    await db.execute(
      'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?',
      [name, email, role, id]
    );
  },

  // 6. DELETAR (Delete)
  delete: async (id) => {
    await db.execute('DELETE FROM users WHERE id = ?', [id]);
  }
};

module.exports = UserModel;