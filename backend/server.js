const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
app.use(cors());

app.get('/api/pncp/:tipoConsulta', async (req, res) => {
  const { tipoConsulta } = req.params;
  const { modalidade, mes, ano } = req.query;
  const UF = 'PA', ORGAO = 'COMANDO DO EXERCITO';
  const url = new URL(`https://pncp.gov.br/api/consulta/${tipoConsulta}`);
  url.searchParams.append('uf', UF);
  url.searchParams.append('orgao', ORGAO);
  if (modalidade) url.searchParams.append('modalidade', modalidade);
  if (mes) url.searchParams.append('mes', mes);
  if (ano) url.searchParams.append('ano', ano);

  try {
    const resp = await fetch(url);
    const data = await resp.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar PNCP' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));
