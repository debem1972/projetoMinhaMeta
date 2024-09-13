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






//---------------------------------------------------------------
//Realizar estas alterações para remoção do botão e atvar a funcionalidade toggle apenas no icone do olho

//No html, mudar o id do ícone do olho...
/*<div class="input-container">
    <div class="labelDoInput">
        <label for="meta">Meta de Economia (R$):</label><i id="metaHelp" class="bi-question-circle"></i>
        <audio src="./sound/audioConceitoMeta.mp3" id="som7" type="audio/mpeg">Seu navegador não é
            compatível com este tipo de arquivo de audio!</audio>
    </div>
    <div class="input-wrapper">
        <input type="password" id="meta" class="campo-financeiro" placeholder="Informe sua meta" required>
        <i class="bi-eye" id="toggleMeta"></i>
    </div>
</div>
*/

//No javaScript, readaptar o código para o evento de click ser no olho e não mais no botão
/*const toggleMeta = document.getElementById('toggleMeta');
const metaInput = document.getElementById('meta');

toggleMeta.addEventListener('click', function () {
    // Alterna o tipo entre 'password' e 'text'
    if (metaInput.type === 'password') {
        metaInput.type = 'text';
        toggleMeta.classList.remove('bi-eye');
        toggleMeta.classList.add('bi-eye-slash'); // Altera o ícone para 'olho cortado'
    } else {
        metaInput.type = 'password';
        toggleMeta.classList.remove('bi-eye-slash');
        toggleMeta.classList.add('bi-eye'); // Altera o ícone para 'olho'
    }
});
*/

/*observações
O que fizemos:
Colocamos o ícone do "olhinho" dentro do campo input para a meta.
Estilizamos o ícone para ficar à direita dentro do input.
O JavaScript agora alterna entre type="password" e type="text" ao clicar no ícone, além de mudar o ícone para o de "olho cortado" quando o valor está visível*/