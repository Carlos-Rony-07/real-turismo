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

