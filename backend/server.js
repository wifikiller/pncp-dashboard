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

 const url = new URL(`https://pncp.gov.br/api/pncp/v1/orgaos/${cnpj}/compras/${ano}/${sequencial}`);

const resp = await fetch(url.toString(), {
  method: 'GET',
  redirect: 'follow',  // <- isso segue o redirecionamento
  headers: {
    'Accept': 'application/json'
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor backend rodando na porta ${PORT}`));
