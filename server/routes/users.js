const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../db');

// Middleware para verificar autenticação
const requireAuth = (req, res, next) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ error: 'Não autenticado' });
  }
  next();
};

// Middleware para verificar se é admin
const requireAdmin = (req, res, next) => {
  if (!req.session || req.session.role !== 'admin') {
    return res.status(403).json({ error: 'Acesso negado. Apenas administradores.' });
  }
  next();
};

// Listar todos os usuários (apenas admin)
router.get('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT id, username, name, role, active, created_at, updated_at FROM users ORDER BY created_at DESC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
});

// Buscar usuário por ID (apenas admin)
router.get('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      'SELECT id, username, name, role, active, created_at, updated_at FROM users WHERE id = ?',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

// Criar novo usuário (apenas admin)
router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { username, password, name, role = 'manager' } = req.body;

    // Validações
    if (!username || !password || !name) {
      return res.status(400).json({ error: 'Usuário, senha e nome são obrigatórios' });
    }

    if (username.length < 3) {
      return res.status(400).json({ error: 'Usuário deve ter no mínimo 3 caracteres' });
    }

    if (password.length < 4) {
      return res.status(400).json({ error: 'Senha deve ter no mínimo 4 caracteres' });
    }

    // Verificar se usuário já existe
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE username = ?',
      [username]
    );

    if (existing.length > 0) {
      return res.status(409).json({ error: 'Usuário já existe' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir usuário
    const [result] = await pool.query(
      'INSERT INTO users (username, password, name, role, active) VALUES (?, ?, ?, ?, true)',
      [username, hashedPassword, name, role]
    );

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: {
        id: result.insertId,
        username,
        name,
        role
      }
    });

  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// Atualizar usuário (apenas admin)
router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, name, role, active } = req.body;

    // Verificar se usuário existe
    const [existing] = await pool.query(
      'SELECT id FROM users WHERE id = ?',
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Construir query de atualização
    const updates = [];
    const values = [];

    if (username) {
      updates.push('username = ?');
      values.push(username);
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updates.push('password = ?');
      values.push(hashedPassword);
    }

    if (name) {
      updates.push('name = ?');
      values.push(name);
    }

    if (role) {
      updates.push('role = ?');
      values.push(role);
    }

    if (typeof active === 'boolean') {
      updates.push('active = ?');
      values.push(active);
    }

    if (updates.length === 0) {
      return res.status(400).json({ error: 'Nenhum campo para atualizar' });
    }

    values.push(id);

    await pool.query(
      `UPDATE users SET ${updates.join(', ')} WHERE id = ?`,
      values
    );

    res.json({ message: 'Usuário atualizado com sucesso' });

  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// Deletar usuário (apenas admin)
router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Impedir que o root seja deletado
    const [user] = await pool.query(
      'SELECT username FROM users WHERE id = ?',
      [id]
    );

    if (user.length === 0) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    if (user[0].username === 'root') {
      return res.status(403).json({ error: 'Não é possível deletar o usuário root' });
    }

    // Impedir que o usuário delete a si mesmo
    if (parseInt(id) === req.session.userId) {
      return res.status(403).json({ error: 'Não é possível deletar seu próprio usuário' });
    }

    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ message: 'Usuário deletado com sucesso' });

  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    res.status(500).json({ error: 'Erro ao deletar usuário' });
  }
});

module.exports = router;
