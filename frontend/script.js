const API_BASE_URL = 'https://<SEU-APP>.onrender.com/api/pncp';

async function consultarPNCP(tipoConsulta, parametros) {
  const url = new URL(`${API_BASE_URL}/${tipoConsulta}`);
  Object.entries(parametros).forEach(([k,v]) => v && url.searchParams.append(k, v));
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  return await resp.json();
}

(async () => {
  try {
    const dados = await consultarPNCP('licitacoes', { modalidade: 'pregao', mes: '05', ano: '2025' });
    document.getElementById('resultado').textContent = JSON.stringify(dados, null, 2);
  } catch (error) {
    document.getElementById('resultado').textContent = error;
  }
})();
