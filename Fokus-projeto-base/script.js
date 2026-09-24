// ELEMENTOS HTML
const html = document.querySelector('html');
const displayTempo = document.querySelector('#time');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const musicaFocoInput = document.querySelector('#alternar-musica');
const iconePause = document.querySelector('.app__card-primary-butto-icon')

// BOTÕES 
const focoBt = document.querySelector('.app__card-button--foco'); // o . faz com que TODOS OS METODOS sejam selecionados
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const botaoIniciar = document.querySelector('.app__card-primary-button');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');


// VARIÁVEL DE TEMPO DE DURAÇÃO
const musica = new Audio('/Fokus-projeto-base/sons/luna-rise-part-one.mp3');
const audioPlay = new Audio('/Fokus-projeto-base/sons/play.wav');
const audioPausa = new Audio('/Fokus-projeto-base/sons/pause.mp3');
const audioTempoFinalizado = new Audio('/Fokus-projeto-base/sons/beep.mp3');
musica.loop = true;

let tempoDecorridoEmSegundos = 30; // lembrando que o tempo esta em segundos
let intervaloId = null;

const iniciarOuPausarBt = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer');

const duracaoFoco = 1500;
const duracaoDescansoCurto = 300;
const duracaoDescansoLongo = 900;


musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

// addEventListener -> Cria um evento/ação para o botão
focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');

});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto(contexto) {
    mostrarTempo();
    // este forEach faz com que a active do botao seja removida quando não estiver clicado
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    });

    // setAttribute -> altera o atributo que foi declarado  
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/Fokus-projeto-base/imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `  
            Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        case "descanso-curto":
            titulo.innerHTML = `  
            Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        case "descanso-longa":
            titulo.innerHTML = `  
            Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`;
            break;

        default:
            break;
    }
}

const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        //audioTempoFinalizado.play();        
        alert('Tempo finalizado!');
        const focoAtivo = html.getAttribute('data-contexto')  == 'foco';
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado'); // criar um evento customizado 
            document.dispatchEvent(evento); // despara o evento customizado
        }
        zerar();
        return
    }
    tempoDecorridoEmSegundos -= 1;
    //console.log('Temporizador: ' + tempoDecorridoEmSegundos);
    mostrarTempo();
}

startPauseBt.addEventListener('click', inicarOuPausar);

function inicarOuPausar() {

    if (intervaloId) {
        audioPausa.play();
        zerar();
        return
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    iconePause.setAttribute('src', '/Fokus-projeto-base/imagens/pause.png');
}

function zerar() {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = 'Começar';
    iconePause.setAttribute('src', '/Fokus-projeto-base/imagens/play_arrow.png');
    intervaloId = null;
}

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'}); // formando o texto do tempo 
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();