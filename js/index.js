//Código funcional porém os decimais monetários, ainda estão na notação americana
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



//Código funcional porém os decimais monetários, ainda estão na notação americana

// Função para converter vírgula para ponto e garantir que o valor esteja no formato correto
/*function formatarValor(valor) {
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
});*/
//------------------------------------------------------------------------------

//Código funcional até a formatação dos campos sem cálculo ainda(falta ajustar o pulo entre os inputs)
//Selecionar os elementos input de texto
/*const Inputs = document.querySelectorAll('input[type="text"]');

//Adiciona eventos de blur e keypress (para Enter) em todos os campos de input
Inputs.forEach((input, index) => {
    input.addEventListener('blur', formatarMoeda);
    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            formatarMoeda.call(this);
            
            // Mudar o foco para o próximo campo input
            const nextInput = Inputs[index + 1];
            if (nextInput) {
                nextInput.focus();
            }
        }
    });
});

//--------------------------------------------------------
function formatarMoeda() {
    let valor = this.value;
    valor = valor.replace(/\D/g, ''); // Remove caracteres não numéricos e vírgulas

    //Se o campo estiver vazio, não faz nada
    if (valor === '') {
        return;
    }

    //Converte para um número inteiro e formata como moeda brasileira
    valor = (parseInt(valor) / 100).toFixed(2);

    //Aplica a formatação de moeda brasileira
    valor = 'R$' + valor.replace('.', ',');

    //Atualiza o valor do campo com a formatação
    this.value = valor;
}*/

//------------------------------------------------------------------

//Código funcionando para valores formatados nos campos e para pular entre os inputs até o botão id #adicionarGastos

//Selecionar todos os elementos input (texto e data)
const Inputs = document.querySelectorAll('input');
const botaoAdicionarGasto = document.querySelector('#adicionarGasto');

//Adiciona eventos de blur e keypress (para Enter) em todos os campos de input
Inputs.forEach((input, index) => {
    input.addEventListener('blur', function () {
        // Verifica se o campo é de tipo 'text' para formatar como moeda
        if (this.type === 'text') {
            formatarMoeda.call(this);
        }
    });

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            // Se for campo de texto, formata como moeda
            if (this.type === 'text') {
                formatarMoeda.call(this);
            }

            // Se for o último campo, mudar o foco para o botão #adicionarGasto
            if (index === Inputs.length - 1) {
                botaoAdicionarGasto.focus();
            } else {
                // Mudar o foco para o próximo campo input
                const nextInput = Inputs[index + 1];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
    });
});

//--------------------------------------------------------
function formatarMoeda() {
    let valor = this.value;
    valor = valor.replace(/\D/g, ''); // Remove caracteres não numéricos e vírgulas

    //Se o campo estiver vazio, não faz nada
    if (valor === '') {
        return;
    }

    //Converte para um número inteiro e formata como moeda brasileira
    valor = (parseInt(valor) / 100).toFixed(2);

    //Aplica a formatação de moeda brasileira
    valor = 'R$' + valor.replace('.', ',');

    //Atualiza o valor do campo com a formatação
    this.value = valor;
}

//---------------------------------------------------------------------------

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

//Novo código...
// Variáveis para armazenar os gastos totais e a data atual
let gastosTotais = parseFloat(localStorage.getItem('gastosTotais')) || 0;
let dataAtual = new Date();



document.getElementById('adicionarGasto').addEventListener('click', function () {
    const meta = parseFloat(converterParaNumero(document.getElementById('meta').value));
    const receita = parseFloat(converterParaNumero(document.getElementById('receita').value));
    const gastoDia = parseFloat(converterParaNumero(document.getElementById('gasto').value));
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
    const diasRestantes = ultimoDiaMes - dataInput.getDate() - 1;   // Subtrai 1 para não contar o dia atual

    console.log(diasRestantes);

    // Calcula quanto o usuário pode gastar por dia até o fim do mês
    const gastoDiarioMaximo = saldoDisponivelReal / diasRestantes;

    // Atualiza o saldo e o gasto diário máximo na interface
    document.getElementById('saldoReal').textContent = `R$ ${saldoDisponivelReal.toFixed(2)}`;
    document.getElementById('gastoDiario').textContent = `R$ ${gastoDiarioMaximo.toFixed(2)}`;
});

// Função para converter o valor de string de moeda para número
function converterParaNumero(valor) {
    if (typeof valor === 'string') {
        // Remove "R$" e substitui a vírgula por ponto
        return valor.replace('R$', '').replace(',', '.').trim();
    }
    return valor;
}






