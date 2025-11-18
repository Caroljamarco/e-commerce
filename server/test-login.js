const fetch = require('node-fetch');

async function testLogin() {
  try {
    console.log('🔐 Testando login...\n');
    
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'root',
        password: 'admin'
      })
    });

    console.log('Status:', response.status);
    const data = await response.json();
    console.log('Resposta:', JSON.stringify(data, null, 2));

  } catch (error) {
    console.error('❌ Erro:', error.message);
  }
}

testLogin();
