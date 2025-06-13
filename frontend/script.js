const API_BASE_URL = 'https://dashboard-para-consultas.onrender.com/api/pncp';

async function consultarCompra(cnpj, ano, sequencial) {
  const url = `${API_BASE_URL}/compra?cnpj=${cnpj}&ano=${ano}&sequencial=${sequencial}`;
  const resp = await fetch(url);
  if (!resp.ok) throw new Error(`Erro HTTP ${resp.status}`);
  return await resp.json();
}

// Exemplo de uso (após carregar a página)
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const cnpj = '46612032000149';  // Exemplo: CNPJ do Comando do Exército
    const ano = '2024';
    const sequencial = '188';

    const dados = await consultarCompra(cnpj, ano, sequencial);
    document.getElementById('resultado').textContent = JSON.stringify(dados, null, 2);
  } catch (error) {
    document.getElementById('resultado').textContent = `Erro: ${error.message}`;
  }
});
