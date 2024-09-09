// Variáveis para armazenar os gastos totais e a data atual
/*let gastosTotais = parseFloat(localStorage.getItem('gastosTotais')) || 0;
let dataAtual = new Date();

document.getElementById('adicionarGasto').addEventListener('click', function () {
    const meta = parseFloat(document.getElementById('meta').value);
    const receita = parseFloat(document.getElementById('receita').value);
    const gastoDia = parseFloat(document.getElementById('gasto').value);
    const dataInput = new Date(document.getElementById('data').value);

    if (isNaN(meta) || isNaN(receita) || isNaN(gastoDia) || isNaN(dataInput.getTime())) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Adiciona o gasto do dia aos gastos gerais e armazena no localStorage
    gastosTotais += gastoDia;
    localStorage.setItem('gastosTotais', gastosTotais);

    // Calcula o saldo disponível e o saldo disponível real
    const saldoDisponivel = receita - gastosTotais;
    const saldoDisponivelReal = saldoDisponivel - meta;

    // Calcula quantos dias faltam para o fim do mês
    const ultimoDiaMes = new Date(dataInput.getFullYear(), dataInput.getMonth() + 1, 0).getDate();
    const diasRestantes = ultimoDiaMes - dataInput.getDate();

    // Calcula quanto o usuário pode gastar por dia até o fim do mês
    const gastoDiarioMaximo = saldoDisponivelReal / diasRestantes;

    // Atualiza o saldo e o gasto diário máximo na interface
    document.getElementById('saldoReal').textContent = `R$ ${saldoDisponivelReal.toFixed(2)}`;
    document.getElementById('gastoDiario').textContent = `R$ ${gastoDiarioMaximo.toFixed(2)}`;
});*/
//------------------------------------------------------------------------------------



// Função para converter vírgula para ponto e garantir que o valor esteja no formato correto
function formatarValor(valor) {
    return parseFloat(valor.replace(',', '.'));
}

// Função para formatar números no formato de moeda brasileira
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Variáveis para armazenar os gastos totais e a data atual
let gastosTotais = parseFloat(localStorage.getItem('gastosTotais')) || 0;
let dataAtual = new Date();

document.getElementById('adicionarGasto').addEventListener('click', function () {
    const meta = formatarValor(document.getElementById('meta').value);
    const receita = formatarValor(document.getElementById('receita').value);
    const gastoDia = formatarValor(document.getElementById('gasto').value);
    const dataInput = new Date(document.getElementById('data').value);

    if (isNaN(meta) || isNaN(receita) || isNaN(gastoDia) || isNaN(dataInput.getTime())) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Adiciona o gasto do dia aos gastos gerais e armazena no localStorage
    gastosTotais += gastoDia;
    localStorage.setItem('gastosTotais', gastosTotais);

    // Calcula o saldo disponível e o saldo disponível real
    const saldoDisponivel = receita - gastosTotais;
    const saldoDisponivelReal = saldoDisponivel - meta;

    // Calcula quantos dias faltam para o fim do mês
    const ultimoDiaMes = new Date(dataInput.getFullYear(), dataInput.getMonth() + 1, 0).getDate();
    const diasRestantes = ultimoDiaMes - dataInput.getDate();

    // Calcula quanto o usuário pode gastar por dia até o fim do mês
    const gastoDiarioMaximo = saldoDisponivelReal / diasRestantes;

    // Atualiza o saldo e o gasto diário máximo na interface, formatados como moeda brasileira
    document.getElementById('saldoReal').textContent = formatarMoeda(saldoDisponivelReal);
    document.getElementById('gastoDiario').textContent = formatarMoeda(gastoDiarioMaximo);
});
//------------------------------------------------------------------------------



//Código não funcional

// Função para formatar o valor em moeda brasileira durante a digitação
/*function formatarParaMoeda(elemento) {
    let valor = elemento.value;

    // Remove qualquer caractere que não seja número
    valor = valor.replace(/\D/g, "");

    // Adiciona vírgula e transforma em valor monetário
    valor = (valor / 100).toFixed(2) + '';
    valor = valor.replace('.', ',');
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    // Atualiza o campo com o valor formatado
    elemento.value = `R$ ${valor}`;
}

// Função para desformatar o valor, removendo o "R$" e os separadores de milhar antes de salvar no localStorage
function desformatarValor(valor) {
    return parseFloat(valor.replace(/\D/g, "")) / 100;
}

// Adiciona o evento de formatação automática nos campos financeiros
document.querySelectorAll('.campo-financeiro').forEach(campo => {
    campo.addEventListener('input', function (e) {
        formatarParaMoeda(e.target);
    });
});

document.getElementById('adicionarGasto').addEventListener('click', function () {
    const meta = desformatarValor(document.getElementById('meta').value);
    const receita = desformatarValor(document.getElementById('receita').value);
    const gastoDia = desformatarValor(document.getElementById('gasto').value);
    const dataInput = new Date(document.getElementById('data').value);

    if (isNaN(meta) || isNaN(receita) || isNaN(gastoDia) || isNaN(dataInput.getTime())) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Aqui segue a lógica do cálculo e exibição dos valores formatados, como antes
    let gastosTotais = parseFloat(localStorage.getItem('gastosTotais')) || 0;
    gastosTotais += gastoDia;
    localStorage.setItem('gastosTotais', gastosTotais);

    const saldoDisponivel = receita - gastosTotais;
    const saldoDisponivelReal = saldoDisponivel - meta;

    const ultimoDiaMes = new Date(dataInput.getFullYear(), dataInput.getMonth() + 1, 0).getDate();
    const diasRestantes = ultimoDiaMes - dataInput.getDate();

    const gastoDiarioMaximo = saldoDisponivelReal / diasRestantes;

    // Exibe os valores formatados na interface
    document.getElementById('saldoReal').textContent = formatarMoeda(saldoDisponivelReal);
    document.getElementById('gastoDiario').textContent = formatarMoeda(gastoDiarioMaximo);
});*/
//--------------------------------------------------------------------------------


//Código não funcional

// Função para formatar o valor em moeda brasileira durante a digitação
/*function formatarParaMoeda(elemento) {
    let valor = elemento.value.replace(/\D/g, ""); // Remove caracteres não numéricos

    // Adiciona vírgula e transforma em valor monetário
    valor = (valor / 100).toFixed(2) + '';
    valor = valor.replace('.', ',');
    valor = valor.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');

    // Atualiza o campo com o valor formatado
    elemento.value = `R$ ${valor}`;
}

// Função para desformatar o valor, removendo o "R$" e os separadores de milhar
function desformatarValor(valor) {
    return parseFloat(valor.replace(/[^\d,]/g, '').replace(',', '.'));
}

// Adiciona o evento de formatação automática nos campos financeiros
document.querySelectorAll('.campo-financeiro').forEach(campo => {
    campo.addEventListener('input', function (e) {
        // Remove temporariamente o evento para evitar loop infinito de eventos
        e.target.removeEventListener('input', arguments.callee);

        // Formata o valor
        formatarParaMoeda(e.target);

        // Adiciona o evento de volta
        e.target.addEventListener('input', arguments.callee);
    });
});

document.getElementById('adicionarGasto').addEventListener('click', function () {
    const meta = desformatarValor(document.getElementById('meta').value);
    const receita = desformatarValor(document.getElementById('receita').value);
    const gastoDia = desformatarValor(document.getElementById('gasto').value);
    const dataInput = new Date(document.getElementById('data').value);

    if (isNaN(meta) || isNaN(receita) || isNaN(gastoDia) || isNaN(dataInput.getTime())) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    let gastosTotais = parseFloat(localStorage.getItem('gastosTotais')) || 0;
    gastosTotais += gastoDia;
    localStorage.setItem('gastosTotais', gastosTotais);

    const saldoDisponivel = receita - gastosTotais;
    const saldoDisponivelReal = saldoDisponivel - meta;

    const ultimoDiaMes = new Date(dataInput.getFullYear(), dataInput.getMonth() + 1, 0).getDate();
    const diasRestantes = ultimoDiaMes - dataInput.getDate();

    const gastoDiarioMaximo = saldoDisponivelReal / diasRestantes;

    // Exibe os valores formatados na interface
    document.getElementById('saldoReal').textContent = formatarMoeda(saldoDisponivelReal);
    document.getElementById('gastoDiario').textContent = formatarMoeda(gastoDiarioMaximo);
});*/





