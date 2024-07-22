let numeroMarcado;
let numeroAleatorio;
let numeroTentativas;

function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * numeroMarcado) + 1;
}

function iniciarJogo() {
    numeroTentativas = 1;
    atualizarTextoNaTela('p', `Escolha um número entre 1 e ${numeroMarcado}`);
    document.getElementById("caixaDeTexto").disabled = false;
    document.getElementById('caixaDeTexto').value = '';
    atualizarTextoNaTela('h1', 'Jogo do número secreto');
    numeroAleatorio = gerarNumeroAleatorio();
}

function atualizarTextoNaTela(tag, texto) {
    let elemento = document.querySelector(tag);
    elemento.innerHTML = texto;
}

function limparInputEDesabilitarBotao() {
    document.getElementById("botaoChutar").disabled = true;
    document.getElementById('caixaDeTexto').value = '';
}

function processarChute() {
    verificarNumero(document.getElementById('caixaDeTexto').value);
    numeroTentativas++;
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
    var numeroEscolhido = document.getElementById("caixaDeTexto").value;
    var botaoChutar = document.getElementById("botaoChutar");

    if (numeroEscolhido.trim() !== "" && parseInt(numeroEscolhido) > 0 && parseInt(numeroEscolhido) <= numeroMarcado) {
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
    var botaoChutar = document.getElementById("botaoChutar");
    botaoChutar.disabled = true;
    const radioSelecionado = document.querySelector('input[name="option"]:checked');
    numeroMarcado = parseInt(radioSelecionado.value);
    atualizarTextoNaTela('p', `Escolha um número entre 1 e ${numeroMarcado}`);
    ajustarMaximoInput(numeroMarcado);
    iniciarJogo();
}

function ajustarMaximoInput(valorMaximo) {
    const inputNumero = document.getElementById('caixaDeTexto');
    inputNumero.max = valorMaximo;
}
