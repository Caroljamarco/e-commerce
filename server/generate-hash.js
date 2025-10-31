const bcrypt = require('bcrypt');

async function generateHash() {
  const password = 'admin';
  const hash = await bcrypt.hash(password, 10);
  console.log('\n=== Hash gerado ===');
  console.log('Senha:', password);
  console.log('Hash:', hash);
  console.log('\nUse este hash no schema.sql para o usuário root\n');
}

generateHash();
