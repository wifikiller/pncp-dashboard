const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();

app.use(cors());

// Endpoint para obter uma compra específica
app.get('/api/pncp/compra', async (req, res) => {
  const { cnpj, ano, sequencial } = req.query;

  if (!cnpj || !ano || !sequencial) {
    return res.status(400).json({ error: 'Parâmetros obrigatórios: cnpj, ano, sequencial' });
  }

  const url = `https://pncp.gov.br/api/pncp/v1/orgaos/${cnpj}/compras/${ano}/${sequencial}`;

  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      const text = await resp.text();
      console.error('Erro da API PNCP:', text);
      return res.status(resp.status).json({ error: text });
    }
    const data = await resp.json();
    res.json(data);
  } catch (err) {
    console.error('Erro interno:', err);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor backend rodando na porta ${PORT}`));
