let numeroMarcado;
let numeroAleatorio;
let numeroTentativas;

let botaoChutar = document.getElementById("botaoChutar");
let caixaDeTexto = document.getElementById('caixaDeTexto');


function geraNumeroAleatorio() {
    return Math.floor(Math.random() * numeroMarcado) + 1;
}

function exibeTextos() {
    numeroTentativas = 1;
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMarcado}`);
    caixaDeTexto.disabled = false;
    caixaDeTexto.value = '';
    exibirTextoNaTela('h1', 'Jogo do número secreto');
    numeroAleatorio = geraNumeroAleatorio();
}

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
}

function limpaTextoEdesabilitaBotao() {
    botaoChutar.disabled = true;
    caixaDeTexto.value = '';
}

function verificarChute() {
    verificarTamanhoNumeroEscolhido(document.getElementById('caixaDeTexto').value);
    numeroTentativas = numeroTentativas + 1;
}

function verificarTamanhoNumeroEscolhido(numeroEscolhido) {
    if (numeroAleatorio < numeroEscolhido) {
        exibirTextoNaTela('p', 'O número aleatório é MENOR que o número escolhido!');
        limpaTextoEdesabilitaBotao();
    } else if (numeroAleatorio > numeroEscolhido) {
        exibirTextoNaTela('p', 'O número aleatório é MAIOR que o número escolhido!');
        limpaTextoEdesabilitaBotao();
    } else {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = numeroTentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTextoNaTela('p', `Você descobriu o número secreto com ${numeroTentativas} ${palavraTentativa}`);
        desabilitarBotoes();
    }
}

function habilitarBotao() {
    if (caixaDeTexto.trim() !== "" && parseInt(caixaDeTexto) > 0 && parseInt(caixaDeTexto) <= numeroMarcado) {
        botaoChutar.disabled = false;
    } else {
        botaoChutar.disabled = true;
    }
}

function desabilitarBotoes() {
    caixaDeTexto.disabled = true;
    botaoChutar.disabled = true;
}

document.addEventListener('DOMContentLoaded', () => {
    updateResult();
    document.querySelectorAll('input[name="option"]').forEach(radio => {
        radio.addEventListener('change', updateResult);
    });
});

function updateResult() {
    botaoChutar.disabled = true;
    const selectedRadio = document.querySelector('input[name="option"]:checked');
    numeroMarcado = parseInt(selectedRadio.value);
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroMarcado}`);
    atualizarTamanhoDaCaixa(numeroMarcado);
    exibeTextos();
}

function atualizarTamanhoDaCaixa(valorMaximo) {
    const numberInput = document.getElementById('caixaDeTexto');
    numberInput.max = valorMaximo;
}