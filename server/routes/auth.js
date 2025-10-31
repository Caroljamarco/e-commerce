const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const pool = require('../db');

// Login
router.post('/login', async (req, res) => {
  try {
    console.log('📥 Recebendo request de login...');
    const { username, password } = req.body;
    console.log('Username:', username);

    if (!username || !password) {
      console.log('❌ Usuário ou senha faltando');
      return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
    }

    console.log('🔍 Buscando usuário no banco...');
    // Buscar usuário
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE username = ? AND active = true',
      [username]
    );

    console.log('Usuários encontrados:', rows.length);

    if (rows.length === 0) {
      console.log('❌ Usuário não encontrado');
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const user = rows[0];
    console.log('✅ Usuário encontrado:', user.username);
    console.log('Hash armazenado:', user.password);

    // Verificar senha
    console.log('🔐 Verificando senha...');
    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Senha válida?', validPassword);
    
    if (!validPassword) {
      console.log('❌ Senha incorreta');
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Criar sessão
    req.session = req.session || {};
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.role = user.role;
    console.log('✅ Sessão criada');

    // Retornar dados do usuário (sem senha)
    const { password: _, ...userWithoutPassword } = user;
    console.log('✅ Login bem-sucedido!');
    res.json({
      message: 'Login realizado com sucesso',
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('❌ Erro no login:', error.message);
    console.error('Stack:', error.stack);
    res.status(500).json({ error: 'Erro ao realizar login', details: error.message });
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
