const botaoMenu = document.querySelector(".menu-botao");
const menu = document.querySelector(".menu");

const fecharMenu = () => {
    menu.classList.remove('aberto');

    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.setAttribute('aria-label', 'Abrir menu');
}

const alternarMenu = () => {
    const aberto = menu.classList.toggle('aberto');

    if (aberto) {
        botaoMenu.setAttribute('aria-expanded', 'true');
        botaoMenu.setAttribute('aria-label', 'Fechar menu');
    } else {
        botaoMenu.setAttribute('aria-expanded', 'false');
        botaoMenu.setAttribute('aria-label', 'Abrir menu');
    }
    
    
}

botaoMenu.addEventListener('click', alternarMenu);

const linksMenu = document.querySelectorAll('.menu a');
linksMenu.forEach(function (link) {
    link.addEventListener('click', function () {
        fecharMenu();
        marcarLink(link.getAttribute('href').slice(1));
    });
});

document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && menu.classList.contains('aberto') == true) {
        fecharMenu();
        botaoMenu.focus();
    }
});


//Fechar menu ao tocar fora do menu
document.addEventListener('click', (evento) => {
    const clicouNoMenu = menu.contains(evento.target);
    const clicouNoBotao = botaoMenu.contains(evento.target);

    if (menu.classList.contains('aberto') && !clicouNoMenu && !clicouNoBotao) {
        fecharMenu();
    }
});

// Fechar menu ao passar para tela de desktop
const telaDesktop = window.matchMedia('(min-width: 1024px)');

telaDesktop.addEventListener('change', (evento) => {
    if (evento.matches) {
        fecharMenu();
    }
});


// Marcar o link
const secoes = document.querySelectorAll('main section[id]');
const marcarLink = (id) => {
    linksMenu.forEach((link) => {
        const destino = '#' + id;

        if (link.getAttribute('href') === destino) {
            link.classList.add('ativo');
        } else {
            link.classList.remove('ativo');
        }
    });
}

const observador = new IntersectionObserver( (entradas) => {
    entradas.forEach( (entrada) => {
        if (entrada.isIntersecting) {
            marcarLink(entrada.target.id);
        }
    });
}, {
    rootMargin: '-40% 0px -55% 0px'
});

secoes.forEach( (secao) => {
    observador.observe(secao);
});


const numeroWhatsApp = '5586994834007';
const formulario = document.querySelector('#form-orcamento');

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = document.querySelector("#nome").value.trim();
    const telefone = document.querySelector("#telefone-form").value.trim();
    const data = document.querySelector("#data").value;
    const passageiros = document.querySelector("#passageiros").value;
    const mensagem = document.querySelector("#mensagem").value.trim();
    const selectServico = document.querySelector("#servico");
    const servico = selectServico.options[selectServico.selectedIndex].text;
    let dataFormatada = '';

    if (data !== '') {
        dataFormatada = data.split('-').reverse().join('/');
    }

    let texto = 'Olá! Gostaria de pedir um orçamento.';

    texto += '\n\nNome: ' + nome;
    texto += '\nTelefone: ' + telefone;
    texto += '\nServiço: ' + servico;

    if (dataFormatada !== '') {
        texto += '\nData da viagem: ' + dataFormatada;
    }

    if (passageiros !== '') {
        texto += '\nPassageiros: ' + passageiros;
    }

    if (mensagem !== '') {
        texto += '\nDestino/observações: ' + mensagem;
    }

    const textoCodificado = encodeURIComponent(texto);
    const url = 'https://wa.me/' + numeroWhatsApp + '?text=' + textoCodificado;

    window.open(url, '_blank');

    formulario.reset();
});

const campoData = document.querySelector("#data");
const hoje = new Date().toLocaleDateString('en-CA');

campoData.setAttribute('min', hoje);
