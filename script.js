function calcularImpostos(valorVenda, impostos) {
  let valores = {};
  for (let imposto in impostos) {
    valores[imposto] = (valorVenda * impostos[imposto]) / 100;
  }
  return valores;
}

function gerarNotaFiscal() {
  const valorVenda = parseFloat(document.getElementById('valor-venda').value);
  const itens = document.getElementById('itens').value;
  const irpf = parseFloat(document.getElementById('irpf').value);
  const pis = parseFloat(document.getElementById('pis').value);
  const cofins = parseFloat(document.getElementById('cofins').value);
  const inss = parseFloat(document.getElementById('inss').value);
  const issqn = parseFloat(document.getElementById('issqn').value);

  if (isNaN(valorVenda) || valorVenda <= 0 || !itens.trim()) {
    alert('Por favor, insira valores válidos e itens vendidos.');
    return;
  }

  const impostos = {
    IRPF: irpf,
    PIS: pis,
    COFINS: cofins,
    INSS: inss,
    ISSQN: issqn,
  };
  const valoresImpostos = calcularImpostos(valorVenda, impostos);
  const totalImpostos = Object.values(valoresImpostos).reduce(
    (acc, val) => acc + val,
    0,
  );
  const valorLiquido = valorVenda - totalImpostos;

  const notaDetalhes = document.getElementById('nota-detalhes');
  notaDetalhes.innerHTML = `
    <p><strong>Valor da Venda:</strong> R$ ${valorVenda.toFixed(2)}</p>
    <p><strong>Itens Vendidos:</strong> ${itens}</p>
    <p><strong>Impostos Calculados:</strong></p>
    <ul>
      ${Object.entries(valoresImpostos)
        .map(
          ([imposto, valor]) => `<li>${imposto}: R$ ${valor.toFixed(2)}</li>`,
        )
        .join('')}
    </ul>
    <p><strong>Total de Impostos:</strong> R$ ${totalImpostos.toFixed(2)}</p>
    <p><strong>Valor Líquido:</strong> R$ ${valorLiquido.toFixed(2)}</p>
  `;
}
