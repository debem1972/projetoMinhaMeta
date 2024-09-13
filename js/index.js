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
//-------------------------------------------------------------------------------------
//Help
//Capturando os elementos do help
const helpMeta = document.querySelector('#metaHelp');
const helpReceita = document.querySelector('#receitaHelp');
const helpGastosDoDia = document.querySelector('#gastoDiaHelp');

//Capturando os elementos de audio do help
const ajudaMeta = document.querySelector('#som7');
const ajudaReceita = document.querySelector('#som8');
const ajudaGastos = document.querySelector('#som9');

//Audio da ajuda do campo meta
helpMeta.addEventListener('click', function () {
    ajudaMeta.play();
});

//Audio da ajuda do campo receita
helpReceita.addEventListener('click', function () {
    ajudaReceita.play();
});


//Audio da ajuda do campo gastos do dia
helpGastosDoDia.addEventListener('click', function () {
    ajudaGastos.play();
})


//-------------------------------------------------------------------------------------
// Preenche os campos e exibe o saldo ao carregar a página
preencherCampos();

document.getElementById('adicionarGasto').addEventListener('click', function () {
    const meta = parseFloat(converterParaNumero(document.getElementById('meta').value));
    const receita = parseFloat(converterParaNumero(document.getElementById('receita').value));
    const gastoDia = parseFloat(converterParaNumero(document.getElementById('gasto').value));
    const dataInput = new Date(document.getElementById('data').value);
    const caixaRegister = document.querySelector('#som4');
    const novoLimiteVoice = document.querySelector('#som5');
    const erroCamposVazios = document.querySelector('#som6');

    if (isNaN(meta) || isNaN(receita) || isNaN(gastoDia) || isNaN(dataInput.getTime())) {
        erroCamposVazios.play();

        setTimeout(function () {
            alert('Por favor, preencha todos os campos corretamente.');
        }, 300);

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

    //Toca o som id #som5 1.7s após o botão Adicionar Gasto ser clicado.
    setTimeout(function () {
        novoLimiteVoice.play();
    }, 1700);

    //Limpar os campos data e gasto do dia após enviar os dados
    document.getElementById('data').value = '';
    document.getElementById('gasto').value = '';
});

// Função para converter valor de string de moeda para número
function converterParaNumero(valor) {
    if (typeof valor === 'string') {
        return valor.replace('R$', '').replace(',', '.').trim();
    }
    return valor;
}


//------------------------------------------------------------------------------

// Função para alternar visibilidade dos campos de texto
function toggleVisibility(inputId, iconId, storageKey) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    if (input.type === "text") {
        input.type = "password";
        icon.classList.replace('bi-eye', 'bi-eye-slash');
        localStorage.setItem(storageKey, "hidden");
    } else {
        input.type = "text";
        icon.classList.replace('bi-eye-slash', 'bi-eye');
        localStorage.setItem(storageKey, "visible");
    }
}

// Função para restaurar a visibilidade com base no localStorage
function restoreVisibility(inputId, iconId, storageKey) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);
    const visibilityState = localStorage.getItem(storageKey);

    if (visibilityState === "hidden") {
        input.type = "password";
        icon.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
        input.type = "text";
        icon.classList.replace('bi-eye-slash', 'bi-eye');
    }
}

// Adiciona eventos de clique para alternar visibilidade
document.getElementById('toggleMeta').addEventListener('click', function () {
    toggleVisibility('meta', 'toggleMeta', 'metaVisibility');
});

document.getElementById('toggleReceita').addEventListener('click', function () {
    toggleVisibility('receita', 'toggleReceita', 'receitaVisibility');
});

// Restaura visibilidade ao carregar a página
restoreVisibility('meta', 'toggleMeta', 'metaVisibility');
restoreVisibility('receita', 'toggleReceita', 'receitaVisibility');


//------------------------------------------------------------------------------

//Visibilidade alterado com display
// Função para alternar visibilidade dos spans
/*function toggleVisibilitySpans(iconId, saldoId, gastoId, storageKey) {
    const icon = document.getElementById(iconId);
    const saldoSpan = document.getElementById(saldoId);
    const gastoSpan = document.getElementById(gastoId);

    // Verifica se os valores estão visíveis
    if (saldoSpan.style.display === "none" || gastoSpan.style.display === "none") {
        // Mostra os spans e troca o ícone para 'bi-eye'
        saldoSpan.style.display = "inline";
        gastoSpan.style.display = "inline";
        icon.classList.replace('bi-eye-slash', 'bi-eye');
        localStorage.setItem(storageKey, "visible");
    } else {
        // Oculta os spans e troca o ícone para 'bi-eye-slash'
        saldoSpan.style.display = "none";
        gastoSpan.style.display = "none";
        icon.classList.replace('bi-eye', 'bi-eye-slash');
        localStorage.setItem(storageKey, "hidden");
    }
}

// Função para restaurar visibilidade dos spans com base no localStorage
function restoreVisibilitySpans(iconId, saldoId, gastoId, storageKey) {
    const icon = document.getElementById(iconId);
    const saldoSpan = document.getElementById(saldoId);
    const gastoSpan = document.getElementById(gastoId);
    const visibilityState = localStorage.getItem(storageKey);

    if (visibilityState === "hidden") {
        saldoSpan.style.display = "none";
        gastoSpan.style.display = "none";
        icon.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
        saldoSpan.style.display = "inline";
        gastoSpan.style.display = "inline";
        icon.classList.replace('bi-eye-slash', 'bi-eye');
    }
}

// Adiciona evento de clique para o ícone
document.getElementById('ocultaMostraQsj').addEventListener('click', function () {
    toggleVisibilitySpans('ocultaMostraQsj', 'saldoReal', 'gastoDiario', 'financeVisibility');
});

// Restaura visibilidade ao carregar a página
restoreVisibilitySpans('ocultaMostraQsj', 'saldoReal', 'gastoDiario', 'financeVisibility');
*/

/*-----------------------------------------------------------------*/

//Abordagem com aplicação de uma class
// Função para alternar visibilidade dos spans
function toggleVisibilitySpans(iconId, saldoId, gastoId, storageKey) {
    const icon = document.getElementById(iconId);
    const saldoSpan = document.getElementById(saldoId);
    const gastoSpan = document.getElementById(gastoId);

    // Verifica se os valores estão ocultos (se têm a classe 'hidden-text')
    if (saldoSpan.classList.contains('hidden-text') || gastoSpan.classList.contains('hidden-text')) {
        // Remove a classe de ocultação e troca o ícone para 'bi-eye'
        saldoSpan.classList.remove('hidden-text');
        gastoSpan.classList.remove('hidden-text');
        icon.classList.replace('bi-eye-slash', 'bi-eye');
        localStorage.setItem(storageKey, "visible");
    } else {
        // Adiciona a classe de ocultação e troca o ícone para 'bi-eye-slash'
        saldoSpan.classList.add('hidden-text');
        gastoSpan.classList.add('hidden-text');
        icon.classList.replace('bi-eye', 'bi-eye-slash');
        localStorage.setItem(storageKey, "hidden");
    }
}

// Função para restaurar visibilidade dos spans com base no localStorage
function restoreVisibilitySpans(iconId, saldoId, gastoId, storageKey) {
    const icon = document.getElementById(iconId);
    const saldoSpan = document.getElementById(saldoId);
    const gastoSpan = document.getElementById(gastoId);
    const visibilityState = localStorage.getItem(storageKey);

    if (visibilityState === "hidden") {
        saldoSpan.classList.add('hidden-text');
        gastoSpan.classList.add('hidden-text');
        icon.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
        saldoSpan.classList.remove('hidden-text');
        gastoSpan.classList.remove('hidden-text');
        icon.classList.replace('bi-eye-slash', 'bi-eye');
    }
}

// Adiciona evento de clique para o ícone
document.getElementById('ocultaMostraQsj').addEventListener('click', function () {
    toggleVisibilitySpans('ocultaMostraQsj', 'saldoReal', 'gastoDiario', 'financeVisibility');
});

// Restaura visibilidade ao carregar a página
restoreVisibilitySpans('ocultaMostraQsj', 'saldoReal', 'gastoDiario', 'financeVisibility');


//----------------------------------------------------------------------------

//Terceira abordagem
// Função para alternar visibilidade dos spans
/*function toggleVisibilitySpans(iconId, saldoId, gastoId, storageKey) {
    const icon = document.getElementById(iconId);
    const saldoSpan = document.getElementById(saldoId);
    const gastoSpan = document.getElementById(gastoId);

    // Verifica se os spans estão ocultos com bolinhas
    if (localStorage.getItem(storageKey) === "hidden") {
        // Restaura o texto original dos spans
        saldoSpan.textContent = localStorage.getItem(saldoId) || 'R$ 0,00';
        gastoSpan.textContent = localStorage.getItem(gastoId) || 'R$ 0,00';
        icon.classList.replace('bi-eye-slash', 'bi-eye');
        localStorage.setItem(storageKey, "visible");
    } else {
        // Substitui o conteúdo dos spans por bolinhas
        localStorage.setItem(saldoId, saldoSpan.textContent);
        localStorage.setItem(gastoId, gastoSpan.textContent);
        saldoSpan.textContent = '•'.repeat(saldoSpan.textContent.length);
        gastoSpan.textContent = '•'.repeat(gastoSpan.textContent.length);
        icon.classList.replace('bi-eye', 'bi-eye-slash');
        localStorage.setItem(storageKey, "hidden");
    }
}

// Função para restaurar visibilidade dos spans com base no localStorage
function restoreVisibilitySpans(iconId, saldoId, gastoId, storageKey) {
    const icon = document.getElementById(iconId);
    const saldoSpan = document.getElementById(saldoId);
    const gastoSpan = document.getElementById(gastoId);

    if (localStorage.getItem(storageKey) === "hidden") {
        // Substitui o conteúdo dos spans por bolinhas ao restaurar
        saldoSpan.textContent = '•'.repeat(localStorage.getItem(saldoId).length);
        gastoSpan.textContent = '•'.repeat(localStorage.getItem(gastoId).length);
        icon.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
        saldoSpan.textContent = localStorage.getItem(saldoId) || 'R$ 0,00';
        gastoSpan.textContent = localStorage.getItem(gastoId) || 'R$ 0,00';
        icon.classList.replace('bi-eye-slash', 'bi-eye');
    }
}

// Adiciona evento de clique para o ícone
document.getElementById('ocultaMostraQsj').addEventListener('click', function () {
    toggleVisibilitySpans('ocultaMostraQsj', 'saldoReal', 'gastoDiario', 'financeVisibility');
});

// Restaura visibilidade ao carregar a página
restoreVisibilitySpans('ocultaMostraQsj', 'saldoReal', 'gastoDiario', 'financeVisibility');

*/

//-------------------------------------------------------------------------------

//Quarta abordagem
// Função para alternar visibilidade dos spans
/*function toggleVisibilitySpans(iconId, saldoId, gastoId, storageKey) {
    const icon = document.getElementById(iconId);
    const saldoSpan = document.getElementById(saldoId);
    const gastoSpan = document.getElementById(gastoId);

    // Verifica se os spans estão ocultos com bolinhas
    if (localStorage.getItem(storageKey) === "hidden") {
        // Restaura o texto original dos spans com a formatação de moeda brasileira
        saldoSpan.textContent = formatToBRL(localStorage.getItem(saldoId)) || 'R$ 0,00';
        gastoSpan.textContent = formatToBRL(localStorage.getItem(gastoId)) || 'R$ 0,00';
        icon.classList.replace('bi-eye-slash', 'bi-eye');
        localStorage.setItem(storageKey, "visible");
    } else {
        // Substitui o conteúdo dos spans por bolinhas
        localStorage.setItem(saldoId, saldoSpan.textContent);
        localStorage.setItem(gastoId, gastoSpan.textContent);
        saldoSpan.textContent = '•'.repeat(saldoSpan.textContent.length);
        gastoSpan.textContent = '•'.repeat(gastoSpan.textContent.length);
        icon.classList.replace('bi-eye', 'bi-eye-slash');
        localStorage.setItem(storageKey, "hidden");
    }
}

// Função para restaurar visibilidade dos spans com base no localStorage
function restoreVisibilitySpans(iconId, saldoId, gastoId, storageKey) {
    const icon = document.getElementById(iconId);
    const saldoSpan = document.getElementById(saldoId);
    const gastoSpan = document.getElementById(gastoId);

    if (localStorage.getItem(storageKey) === "hidden") {
        // Substitui o conteúdo dos spans por bolinhas ao restaurar
        saldoSpan.textContent = '•'.repeat(localStorage.getItem(saldoId).length);
        gastoSpan.textContent = '•'.repeat(localStorage.getItem(gastoId).length);
        icon.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
        // Restaura o texto original dos spans com formatação de moeda brasileira
        saldoSpan.textContent = formatToBRL(localStorage.getItem(saldoId)) || 'R$ 0,00';
        gastoSpan.textContent = formatToBRL(localStorage.getItem(gastoId)) || 'R$ 0,00';
        icon.classList.replace('bi-eye-slash', 'bi-eye');
    }
}

// Função para formatar valores como moeda brasileira
function formatToBRL(value) {
    return Number(value.replace(/[^0-9,-]+/g, "").replace(",", ".")).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
}

// Adiciona evento de clique para o ícone
document.getElementById('ocultaMostraQsj').addEventListener('click', function () {
    toggleVisibilitySpans('ocultaMostraQsj', 'saldoReal', 'gastoDiario', 'financeVisibility');
});

// Restaura visibilidade ao carregar a página
restoreVisibilitySpans('ocultaMostraQsj', 'saldoReal', 'gastoDiario', 'financeVisibility');
*/

//---------------------------------------------------------------------------
//Quintab abordagem
// Função para alternar visibilidade dos spans
/*function toggleVisibilitySpans(iconId, saldoId, gastoId, storageKey) {
    const icon = document.getElementById(iconId);
    const saldoSpan = document.getElementById(saldoId);
    const gastoSpan = document.getElementById(gastoId);

    // Verifica se os spans estão ocultos com bolinhas
    if (localStorage.getItem(storageKey) === "hidden") {
        // Restaura o texto original dos spans com a formatação de moeda brasileira
        saldoSpan.textContent = formatToBRL(localStorage.getItem(saldoId)) || 'R$ 0,00';
        gastoSpan.textContent = formatToBRL(localStorage.getItem(gastoId)) || 'R$ 0,00';
        icon.classList.replace('bi-eye-slash', 'bi-eye');
        localStorage.setItem(storageKey, "visible");
    } else {
        // Salva os valores originais no localStorage antes de ocultar
        localStorage.setItem(saldoId, saldoSpan.textContent.replace(/[^\d,.-]/g, ''));
        localStorage.setItem(gastoId, gastoSpan.textContent.replace(/[^\d,.-]/g, ''));
        saldoSpan.textContent = '•'.repeat(saldoSpan.textContent.length);
        gastoSpan.textContent = '•'.repeat(gastoSpan.textContent.length);
        icon.classList.replace('bi-eye', 'bi-eye-slash');
        localStorage.setItem(storageKey, "hidden");
    }
}

// Função para restaurar visibilidade dos spans com base no localStorage
function restoreVisibilitySpans(iconId, saldoId, gastoId, storageKey) {
    const icon = document.getElementById(iconId);
    const saldoSpan = document.getElementById(saldoId);
    const gastoSpan = document.getElementById(gastoId);

    if (localStorage.getItem(storageKey) === "hidden") {
        // Oculta os valores dos spans por bolinhas
        saldoSpan.textContent = '•'.repeat(localStorage.getItem(saldoId).length);
        gastoSpan.textContent = '•'.repeat(localStorage.getItem(gastoId).length);
        icon.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
        // Restaura os valores com a formatação de moeda brasileira
        saldoSpan.textContent = formatToBRL(localStorage.getItem(saldoId)) || 'R$ 0,00';
        gastoSpan.textContent = formatToBRL(localStorage.getItem(gastoId)) || 'R$ 0,00';
        icon.classList.replace('bi-eye-slash', 'bi-eye');
    }
}

// Função para formatar valores como moeda brasileira
function formatToBRL(value) {
    if (!value || isNaN(value.replace(',', '.'))) return 'R$ 0,00'; // Valor inválido ou ausente
    let numValue = parseFloat(value.replace(/\./g, '').replace(',', '.'));
    return numValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Adiciona evento de clique para o ícone
document.getElementById('ocultaMostraQsj').addEventListener('click', function () {
    toggleVisibilitySpans('ocultaMostraQsj', 'saldoReal', 'gastoDiario', 'financeVisibility');
});

// Restaura visibilidade ao carregar a página
restoreVisibilitySpans('ocultaMostraQsj', 'saldoReal', 'gastoDiario', 'financeVisibility');
*/

//-----------------------------------------------------------------------
//Sexta abordagem
// Função para alternar visibilidade dos spans
/*function toggleVisibilitySpans(iconId, saldoId, gastoId, storageKey) {
    const icon = document.getElementById(iconId);
    const saldoSpan = document.getElementById(saldoId);
    const gastoSpan = document.getElementById(gastoId);

    // Verifica se os spans estão ocultos com bolinhas
    if (localStorage.getItem(storageKey) === "hidden") {
        // Restaura o texto original dos spans com a formatação de moeda brasileira
        saldoSpan.textContent = formatToBRL(localStorage.getItem(saldoId)) || 'R$ 0,00';
        gastoSpan.textContent = formatToBRL(localStorage.getItem(gastoId)) || 'R$ 0,00';
        icon.classList.replace('bi-eye-slash', 'bi-eye');
        localStorage.setItem(storageKey, "visible");
    } else {
        // Salva os valores originais no localStorage antes de ocultar
        localStorage.setItem(saldoId, saldoSpan.textContent.replace(/[^\d,.-]/g, ''));
        localStorage.setItem(gastoId, gastoSpan.textContent.replace(/[^\d,.-]/g, ''));
        saldoSpan.textContent = '•'.repeat(saldoSpan.textContent.length);
        gastoSpan.textContent = '•'.repeat(gastoSpan.textContent.length);
        icon.classList.replace('bi-eye', 'bi-eye-slash');
        localStorage.setItem(storageKey, "hidden");
    }
}

// Função para restaurar visibilidade dos spans com base no localStorage
function restoreVisibilitySpans(iconId, saldoId, gastoId, storageKey) {
    const icon = document.getElementById(iconId);
    const saldoSpan = document.getElementById(saldoId);
    const gastoSpan = document.getElementById(gastoId);

    if (localStorage.getItem(storageKey) === "hidden") {
        // Oculta os valores dos spans por bolinhas
        saldoSpan.textContent = '•'.repeat(localStorage.getItem(saldoId).length);
        gastoSpan.textContent = '•'.repeat(localStorage.getItem(gastoId).length);
        icon.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
        // Restaura os valores com a formatação de moeda brasileira
        saldoSpan.textContent = formatToBRL(localStorage.getItem(saldoId)) || 'R$ 0,00';
        gastoSpan.textContent = formatToBRL(localStorage.getItem(gastoId)) || 'R$ 0,00';
        icon.classList.replace('bi-eye-slash', 'bi-eye');
    }
}

// Função para formatar valores como moeda brasileira
function formatToBRL(value) {
    if (!value || isNaN(value.replace(',', '.'))) return 'R$ 0,00'; // Valor inválido ou ausente
    let numValue = parseFloat(value.replace(/\./g, '').replace(',', '.'));
    return numValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Adiciona evento de clique para o ícone
document.getElementById('ocultaMostraQsj').addEventListener('click', function () {
    toggleVisibilitySpans('ocultaMostraQsj', 'saldoReal', 'gastoDiario', 'financeVisibility');
});

// Restaura visibilidade ao carregar a página
restoreVisibilitySpans('ocultaMostraQsj', 'saldoReal', 'gastoDiario', 'financeVisibility');
*/

//--------------------------------------------------------------

//Sétima abordagem: aplicação de uma class com uma fonte especial
// Função para alternar visibilidade dos spans
/*function toggleVisibilitySpans(iconId, saldoId, gastoId, storageKey) {
    const icon = document.getElementById(iconId);
    const saldoSpan = document.getElementById(saldoId);
    const gastoSpan = document.getElementById(gastoId);

    if (localStorage.getItem(storageKey) === "hidden") {
        // Restaura o texto original dos spans com a formatação de moeda brasileira
        saldoSpan.textContent = formatToBRL(localStorage.getItem(saldoId)) || 'R$ 0,00';
        gastoSpan.textContent = formatToBRL(localStorage.getItem(gastoId)) || 'R$ 0,00';
        saldoSpan.classList.remove('hidden-text');
        gastoSpan.classList.remove('hidden-text');
        icon.classList.replace('bi-eye-slash', 'bi-eye');
        localStorage.setItem(storageKey, "visible");
    } else {
        // Salva os valores originais no localStorage antes de ocultar
        localStorage.setItem(saldoId, saldoSpan.textContent.replace(/[^\d,.-]/g, ''));
        localStorage.setItem(gastoId, gastoSpan.textContent.replace(/[^\d,.-]/g, ''));
        saldoSpan.classList.add('hidden-text');
        gastoSpan.classList.add('hidden-text');
        icon.classList.replace('bi-eye', 'bi-eye-slash');
        localStorage.setItem(storageKey, "hidden");
    }
}

// Função para restaurar visibilidade dos spans com base no localStorage
function restoreVisibilitySpans(iconId, saldoId, gastoId, storageKey) {
    const icon = document.getElementById(iconId);
    const saldoSpan = document.getElementById(saldoId);
    const gastoSpan = document.getElementById(gastoId);

    if (localStorage.getItem(storageKey) === "hidden") {
        saldoSpan.classList.add('hidden-text');
        gastoSpan.classList.add('hidden-text');
        icon.classList.replace('bi-eye', 'bi-eye-slash');
    } else {
        saldoSpan.textContent = formatToBRL(localStorage.getItem(saldoId)) || 'R$ 0,00';
        gastoSpan.textContent = formatToBRL(localStorage.getItem(gastoId)) || 'R$ 0,00';
        saldoSpan.classList.remove('hidden-text');
        gastoSpan.classList.remove('hidden-text');
        icon.classList.replace('bi-eye-slash', 'bi-eye');
    }
}

// Função para formatar valores como moeda brasileira
function formatToBRL(value) {
    if (!value || isNaN(value.replace(',', '.'))) return 'R$ 0,00'; // Valor inválido ou ausente
    let numValue = parseFloat(value.replace(/\./g, '').replace(',', '.'));
    return numValue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Adiciona evento de clique para o ícone
document.getElementById('ocultaMostraQsj').addEventListener('click', function () {
    toggleVisibilitySpans('ocultaMostraQsj', 'saldoReal', 'gastoDiario', 'financeVisibility');
});

// Restaura visibilidade ao carregar a página
restoreVisibilitySpans('ocultaMostraQsj', 'saldoReal', 'gastoDiario', 'financeVisibility');
*/