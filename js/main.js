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
linksMenu.forEach( (link) => {
    link.addEventListener('click', fecharMenu);
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

