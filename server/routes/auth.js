const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../db');

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    }

    // Buscar usuário
    const [rows] = await pool.promise().query(
      'SELECT * FROM users WHERE username = ? AND active = true',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const user = rows[0];

    // Verificar senha
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Criar sessão
    req.session = req.session || {};
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.role = user.role;

    // Retornar dados do usuário (sem senha)
    const { password: _, ...userWithoutPassword } = user;
    res.json({
      message: 'Login realizado com sucesso',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro ao realizar login' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  req.session = null;
  res.json({ message: 'Logout realizado com sucesso' });
});

// Verificar sessão
router.get('/session', (req, res) => {
  if (req.session && req.session.userId) {
    res.json({
      authenticated: true,
      user: {
        id: req.session.userId,
        username: req.session.username,
        role: req.session.role
      }
    });
  } else {
    res.json({ authenticated: false });
  }
});

module.exports = router;
