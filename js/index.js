//Código funcionando para valores formatados nos campos e para pular entre os inputs até o botão id #adicionarGastos

//Selecionar todos os elementos input (texto e data)
/*const Inputs = document.querySelectorAll('input');
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
}*/

//--------------------------------------------------------------------------------

//Nova abordagem do código salvando meta ereceita no localStorage

//Selecionar todos os elementos input (texto e data)
/*const Inputs = document.querySelectorAll('input');
const botaoAdicionarGasto = document.querySelector('#adicionarGasto');

// Carregar os dados persistidos (meta e receita) ao recarregar a página
window.addEventListener('load', function() {
    // Carrega 'meta' e 'receita' do localStorage e atualiza os campos correspondentes
    const metaArmazenada = localStorage.getItem('meta');
    const receitaArmazenada = localStorage.getItem('receita');

    if (metaArmazenada) {
        document.getElementById('meta').value = metaArmazenada;
    }

    if (receitaArmazenada) {
        document.getElementById('receita').value = receitaArmazenada;
    }
});

// Adiciona eventos de blur e keypress (para Enter) em todos os campos de input
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

// Função para converter o valor de string de moeda para número
function converterParaNumero(valor) {
    if (typeof valor === 'string') {
        // Remove "R$" e substitui a vírgula por ponto
        return valor.replace('R$', '').replace(',', '.').trim();
    }
    return valor;
}

// Novo código para persistir meta e receita no localStorage
document.getElementById('adicionarGasto').addEventListener('click', function () {
    const meta = parseFloat(converterParaNumero(document.getElementById('meta').value));
    const receita = parseFloat(converterParaNumero(document.getElementById('receita').value));
    const gastoDia = parseFloat(converterParaNumero(document.getElementById('gasto').value));
    const dataInput = new Date(document.getElementById('data').value);

    if (isNaN(meta) || isNaN(receita) || isNaN(gastoDia) || isNaN(dataInput.getTime())) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Persistir meta e receita no localStorage
    localStorage.setItem('meta', meta);
    localStorage.setItem('receita', receita);

    // Adiciona o gasto do dia aos gastos gerais e armazena no localStorage
    let gastosTotais = parseFloat(localStorage.getItem('gastosTotais')) || 0;
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
});*/

//-----------------------------------------------------------------------------

//Nova abordagem do código salvando saldo real e Gastos diários máximo no localStorage

// Selecionar todos os elementos input (texto e data)
const Inputs = document.querySelectorAll('input');
const botaoAdicionarGasto = document.querySelector('#adicionarGasto');

// Adiciona eventos de blur e keypress (para Enter) em todos os campos de input
Inputs.forEach((input, index) => {
    input.addEventListener('blur', function () {
        if (this.type === 'text') {
            formatarMoeda.call(this);
        }
    });

    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            if (this.type === 'text') {
                formatarMoeda.call(this);
            }
            if (index === Inputs.length - 1) {
                botaoAdicionarGasto.focus();
            } else {
                const nextInput = Inputs[index + 1];
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }
    });
});

function formatarMoeda() {
    let valor = this.value;
    valor = valor.replace(/\D/g, '');

    if (valor === '') {
        return;
    }

    valor = (parseInt(valor) / 100).toFixed(2);
    valor = 'R$' + valor.replace('.', ',');

    this.value = valor;
}

//---------------------------------------------------------------------------
let gastosTotais = parseFloat(localStorage.getItem('gastosTotais')) || 0;
let dataAtual = new Date();

// Função para persistir valores no localStorage e preencher os inputs
function preencherCampos() {
    const meta = localStorage.getItem('meta');
    const receita = localStorage.getItem('receita');
    const saldoReal = localStorage.getItem('saldoReal');
    const gastoDiario = localStorage.getItem('gastoDiario');

    if (meta) {
        document.getElementById('meta').value = `R$${parseFloat(meta).toFixed(2)}`;
    }
    if (receita) {
        document.getElementById('receita').value = `R$${parseFloat(receita).toFixed(2)}`;
    }
    if (saldoReal && gastoDiario) {
        document.getElementById('saldoReal').textContent = `R$ ${parseFloat(saldoReal).toFixed(2)}`;
        document.getElementById('gastoDiario').textContent = `R$ ${parseFloat(gastoDiario).toFixed(2)}`;
    }
}

// Preenche os campos e exibe o saldo ao carregar a página
preencherCampos();

document.getElementById('adicionarGasto').addEventListener('click', function () {
    const meta = parseFloat(converterParaNumero(document.getElementById('meta').value));
    const receita = parseFloat(converterParaNumero(document.getElementById('receita').value));
    const gastoDia = parseFloat(converterParaNumero(document.getElementById('gasto').value));
    const dataInput = new Date(document.getElementById('data').value);
    const caixaRegister = document.querySelector('#som4');
    const novoLimiteVoice = document.querySelector('#som5');

    if (isNaN(meta) || isNaN(receita) || isNaN(gastoDia) || isNaN(dataInput.getTime())) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    gastosTotais += gastoDia;
    localStorage.setItem('gastosTotais', gastosTotais);

    const saldoDisponivel = receita - gastosTotais;
    const saldoDisponivelReal = saldoDisponivel - meta;

    const ultimoDiaMes = new Date(dataInput.getFullYear(), dataInput.getMonth() + 1, 0).getDate();
    const diasRestantes = ultimoDiaMes - dataInput.getDate() - 1;

    const gastoDiarioMaximo = saldoDisponivelReal / diasRestantes;

    // Atualiza os spans com os novos valores
    document.getElementById('saldoReal').textContent = `R$ ${saldoDisponivelReal.toFixed(2)}`;
    document.getElementById('gastoDiario').textContent = `R$ ${gastoDiarioMaximo.toFixed(2)}`;

    // Armazena saldo e gasto diário no localStorage para exibição posterior
    localStorage.setItem('saldoReal', saldoDisponivelReal);
    localStorage.setItem('gastoDiario', gastoDiarioMaximo);

    // Armazena meta e receita no localStorage
    localStorage.setItem('meta', meta);
    localStorage.setItem('receita', receita);

    //Toca o som de caixa registradora ao clicar no botão Adicionar Gasto
    caixaRegister.play();
    //Toca o som id #som5 0.5s após o botão ser clicado
    setTimeout(function () {
        novoLimiteVoice.play();
    }, 1700);
});

// Função para converter valor de string de moeda para número
function converterParaNumero(valor) {
    if (typeof valor === 'string') {
        return valor.replace('R$', '').replace(',', '.').trim();
    }
    return valor;
}







