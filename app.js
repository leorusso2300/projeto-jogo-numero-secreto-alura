let numeroMarcado;
let numeroAleatorio;
let numeroTentativas;
const textoOriginalH1 = document.getElementById('tituloJogo').innerHTML;

function geraNumeroAleatorio() {
    return Math.floor(Math.random() * numeroMarcado) + 1;
}

function iniciarJogo() {
    numeroTentativas = 1;
    document.getElementById('tituloJogo').innerHTML = textoOriginalH1;
    atualizarTextoNaTela('p', `Escolha um número entre 1 e ${numeroMarcado}`);
    document.getElementById("caixaDeTexto").disabled = false;
    document.getElementById('caixaDeTexto').value = '';
    numeroAleatorio = geraNumeroAleatorio();
    console.log(numeroAleatorio);
    habilitarBotaoChutar();
}

function atualizarTextoNaTela(tag, texto, delay = 3) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if (window.responsiveVoice) {
        setTimeout(() => {
            responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
        }, delay);
    }
}
function processarChute() {
    const chute = document.getElementById('caixaDeTexto').value;
    if (chute.trim() !== "" && parseInt(chute) > 0 && parseInt(chute) <= numeroMarcado) {
        verificarNumero(parseInt(chute));
        numeroTentativas += 1;
    }
}

function verificarNumero(numeroEscolhido) {
    if (numeroAleatorio < numeroEscolhido) {
        atualizarTextoNaTela('p', 'O número aleatório é menor que o número escolhido!');
        document.getElementById('caixaDeTexto').value = '';
        habilitarBotaoChutar();
    } else if (numeroAleatorio > numeroEscolhido) {
        atualizarTextoNaTela('p', 'O número aleatório é maior que o número escolhido!');
        document.getElementById('caixaDeTexto').value = '';
        habilitarBotaoChutar();
    } else {
        let palavraTentativa = numeroTentativas > 1 ? 'tentativas' : 'tentativa';
        atualizarTextoNaTela('h1', 'Acertou!');
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
    numeroMarcado = parseInt(document.querySelector('input[name="option"]:checked').value);
    ajustarMaximoInput(numeroMarcado);
    iniciarJogo();
}

function ajustarMaximoInput(valorMaximo) {
    document.getElementById('caixaDeTexto').max = valorMaximo;
}
