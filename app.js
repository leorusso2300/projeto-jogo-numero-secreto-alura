let numeroMarcado;
let numeroAleatorio;
let numeroTentativas;

function geraNumeroAleatorio() {
    return Math.floor(Math.random() * numeroMarcado) + 1;
}

function iniciarJogo() {
    numeroTentativas = 1;
    limparInputEDesabilitarBotao();
    atualizarTextoNaTela('p', `Escolha um número entre 1 e ${numeroMarcado}`);
    document.getElementById("caixaDeTexto").disabled = false;
    document.getElementById('caixaDeTexto').value = '';
    atualizarTextoNaTela('h1', 'Jogo do número secreto');
    numeroAleatorio = geraNumeroAleatorio();
    console.log(numeroAleatorio)
}

function atualizarTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function limparInputEDesabilitarBotao() {
    document.getElementById("botaoChutar").disabled = true;
    document.getElementById('caixaDeTexto').value = '';
}

function processarChute() {
    verificarNumero(document.getElementById('caixaDeTexto').value);
    numeroTentativas = numeroTentativas + 1;
}

function verificarNumero(numeroEscolhido) {
    if (numeroAleatorio < numeroEscolhido) {
        atualizarTextoNaTela('p', 'O número aleatório é MENOR que o número escolhido!');
        limparInputEDesabilitarBotao();
    } else if (numeroAleatorio > numeroEscolhido) {
        atualizarTextoNaTela('p', 'O número aleatório é MAIOR que o número escolhido!');
        limparInputEDesabilitarBotao();
    } else {
        atualizarTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = numeroTentativas > 1 ? 'tentativas' : 'tentativa';
        atualizarTextoNaTela('p', `Você descobriu o número secreto com ${numeroTentativas} ${palavraTentativa}`);
        desabilitarInputEBotao();
    }
}

function habilitarBotaoChutar() {
    var caixaDeTexto = document.getElementById("caixaDeTexto").value;
    var botaoChutar = document.getElementById("botaoChutar");

    if (caixaDeTexto.trim() !== "" && parseInt(caixaDeTexto) > 0 && parseInt(caixaDeTexto) <= numeroMarcado) {
        botaoChutar.disabled = false;
    } else {
        botaoChutar.disabled = true;
    }
}

function desabilitarInputEBotao() {
    document.getElementById("caixaDeTexto").disabled = true;
    document.getElementById("botaoChutar").disabled = true;
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarPaginaInicial();
    document.querySelectorAll('input[name="option"]').forEach(radio => {
        radio.addEventListener('change', atualizarPaginaInicial);
    });
});

function atualizarPaginaInicial() {
    document.getElementById("botaoChutar").disabled = true;
    numeroMarcado = parseInt(document.querySelector('input[name="option"]:checked').value);
    atualizarTextoNaTela('p', `Escolha um número entre 1 e ${numeroMarcado}`);
    ajustarMaximoInput(numeroMarcado);
    iniciarJogo();
}

function ajustarMaximoInput(valorMaximo) {
    document.getElementById('caixaDeTexto').max = valorMaximo;
}
