document.getElementById('variant-select').addEventListener('change', function() {
    var selectedVariant = this.value;
    var selectedLink = '';

    switch(selectedVariant) {
        case 'variante1':
            selectedLink = 'https://checkout.avizz.com.br/l/e379c68a-74e9-4904-9ef4-2cc4fb949d2e?_h=YXZpenouY29tLmJy';
            break;
        case 'variante2':
            selectedLink = 'https://checkout.avizz.com.br/l/e379c68a-74e9-4904-9ef4-2cc4fb949d2e?_h=YXZpenouY29tLmJy';
            break;
        default:
            selectedLink = '#'; 
    }

    document.getElementById('variant-link').href = selectedLink;
});


var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '100%', // Define a altura como 100% para ajustar ao contêiner pai
        width: '100%', // Define a largura como 100% para ajustar ao contêiner pai
        videoId: getYoutubeVideoIdFromUrl('https://www.youtube.com/watch?v=95G69zA0RNA'), // Obtém o ID do vídeo a partir da URL do YouTube
        playerVars: {
            'autoplay': 0, // O vídeo será reproduzido automaticamente quando o player estiver pronto
            'controls': 1, // Exibir controles do player
            'rel': 0, // Desativar vídeos relacionados ao final do vídeo
            'showinfo': 0 // Ocultar informações do vídeo
        },
        events: {
            'onReady': onPlayerReady
        }
    });
}

function onPlayerReady(event) {
    resizeVideo();
    window.addEventListener('resize', resizeVideo); // Redimensionar o vídeo quando o tamanho da janela for alterado
}

// Função para extrair o ID do vídeo do URL do YouTube
function getYoutubeVideoIdFromUrl(url) {
    var videoId = '';
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        var regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        var match = url.match(regex);
        if (match && match[1]) {
            videoId = match[1];
        }
    }
    return videoId;
}

function resizeVideo() {
    var playerWidth = document.getElementById('player').offsetWidth;
    var playerHeight = playerWidth * 9 / 16; // Proporção de 16:9 para o vídeo
    player.setSize(playerWidth, playerHeight);
}



//imagens

const imagens = ["./assets/wap1.webp", "./assets/wap2.webp", "./assets/wap3.webp", "./assets/wap4.webp"];
let imagemAtual = 0;
let touchStartX = 0;
let touchEndX = 0;

function atualizarImagem() {
    document.getElementById("minha-imagem").src = imagens[imagemAtual];
}

function trocarImagem(indice) {
    imagemAtual = indice;
    atualizarImagem();
    atualizarIndicadores();
}

function atualizarIndicadores() {
    const indicadores = document.querySelectorAll(".indicador");
    indicadores.forEach((indicador, indice) => {
        if (indice === imagemAtual) {
            indicador.classList.add("ativo");
        } else {
            indicador.classList.remove("ativo");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const imagem = document.getElementById("minha-imagem");
    imagem.addEventListener("click", () => proximaImagem());

    const indicadoresContainer = document.querySelector(".indicadores");
    imagens.forEach((imagem, indice) => {
        const indicador = document.createElement("div");
        indicador.className = "indicador";
        indicador.addEventListener("click", () => trocarImagem(indice));
        indicadoresContainer.appendChild(indicador);
    });

    atualizarImagem();
});

function proximaImagem() {
    imagemAtual = (imagemAtual + 1) % imagens.length;
    atualizarImagem();
    atualizarIndicadores();
}

function imagemAnterior() {
    imagemAtual = (imagemAtual - 1 + imagens.length) % imagens.length;
    atualizarImagem();
    atualizarIndicadores();
}

function touchStart(event) {
    touchStartX = event.changedTouches[0].clientX;
}

function touchMove(event) {
    touchEndX = event.changedTouches[0].clientX;
}

function touchEnd() {
    const touchDiff = touchStartX - touchEndX;
    if (touchDiff > 50) {
        // Arrastou da direita para a esquerda (avançar)
        proximaImagem();
    } else if (touchDiff < -50) {
        // Arrastou da esquerda para a direita (voltar)
        imagemAnterior();
    }
}

const imagemElement = document.getElementById("minha-imagem");
imagemElement.addEventListener("touchstart", touchStart);
imagemElement.addEventListener("touchmove", touchMove);
imagemElement.addEventListener("touchend", touchEnd);

// contagem regressiva

function atualizarContagemRegressiva() {
    var spanContagemRegressiva = document.querySelector(".timer");
    var tempoTotalSegundos = 2200;

    var tempoRestanteArmazenado = localStorage.getItem("tempoRestante");

    if (tempoRestanteArmazenado !== null) {
        tempoTotalSegundos = parseInt(tempoRestanteArmazenado, 10);
    }

    var atualizar = function () {
        var minutos = Math.floor(tempoTotalSegundos / 60);
        var segundos = tempoTotalSegundos % 60;
        spanContagemRegressiva.textContent = minutos.toString().padStart(2, '0') + 'm:' + segundos.toString().padStart(2, '0') + 's';

        if (tempoTotalSegundos === 0) {
            clearInterval(intervalId);
        } else {
            tempoTotalSegundos--;
            localStorage.setItem("tempoRestante", tempoTotalSegundos.toString());
        }
    };

    var intervalId = setInterval(atualizar, 1000);
    atualizar();
}
