/* =========================================================
   REAL TURISMO — main.js
   ========================================================= */

/* ===== ELEMENTOS ===== */
const header = document.querySelector(".header");
const botaoMenu = document.querySelector(".menu-botao");
const menu = document.querySelector(".menu");
const linksMenu = document.querySelectorAll(".menu a");
const secoes = document.querySelectorAll("main section[id]");
const botaoWhatsApp = document.querySelector(".whatsapp-fixo");
const secaoContato = document.querySelector("#contato");
const formulario = document.querySelector("#form-orcamento");
const selectServico = document.querySelector("#servico");
const campoTelefone = document.querySelector("#telefone-form");
const campoPassageiros = document.querySelector("#passageiros");
const campoData = document.querySelector("#data");
const statusForm = document.querySelector("#form-status");
const numeroWhatsApp = "5586994834007";

/* ===== HEADER: encolhe ao rolar ===== */
const atualizarHeader = () => {
  if (window.scrollY > 10) {
    header.classList.add("rolado");
  } else {
    header.classList.remove("rolado");
  }
};

window.addEventListener("scroll", atualizarHeader, { passive: true });
atualizarHeader();

/* ===== MENU DO CELULAR ===== */
const fecharMenu = () => {
  menu.classList.remove("aberto");

  botaoMenu.setAttribute("aria-expanded", "false");
  botaoMenu.setAttribute("aria-label", "Abrir menu");
};

const alternarMenu = () => {
  const aberto = menu.classList.toggle("aberto");

  if (aberto) {
    botaoMenu.setAttribute("aria-expanded", "true");
    botaoMenu.setAttribute("aria-label", "Fechar menu");
  } else {
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.setAttribute("aria-label", "Abrir menu");
  }
};

botaoMenu.addEventListener("click", alternarMenu);

// Esc fecha o menu e devolve o foco ao botão
document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && menu.classList.contains("aberto")) {
    fecharMenu();
    botaoMenu.focus();
  }
});

// Tocar fora do menu fecha
document.addEventListener("click", (evento) => {
  const clicouNoMenu = menu.contains(evento.target);
  const clicouNoBotao = botaoMenu.contains(evento.target);

  if (menu.classList.contains("aberto") && !clicouNoMenu && !clicouNoBotao) {
    fecharMenu();
  }
});

// Passar para a tela de desktop fecha
const telaDesktop = window.matchMedia("(min-width: 1024px)");

telaDesktop.addEventListener("change", (evento) => {
  if (evento.matches) {
    fecharMenu();
  }
});

/* ===== LINK DA SEÇÃO ATUAL ===== */
const marcarLink = (id) => {
  const destino = "#" + id;

  linksMenu.forEach((link) => {
    if (link.getAttribute("href") === destino) {
      link.classList.add("ativo");
    } else {
      link.classList.remove("ativo");
    }
  });
};

linksMenu.forEach((link) => {
  link.addEventListener("click", () => {
    fecharMenu();
    marcarLink(link.getAttribute("href").slice(1));
  });
});

const observadorSecoes = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        marcarLink(entrada.target.id);
      }
    });
  },
  {
    rootMargin: "-40% 0px -55% 0px",
  },
);

secoes.forEach((secao) => {
  observadorSecoes.observe(secao);
});

/* ===== ANIMAÇÃO AO ROLAR ===== */
const animados = document.querySelectorAll("[data-animar]");
const reduzirMovimento = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if ("IntersectionObserver" in window && !reduzirMovimento) {
  const observadorAnimacao = new IntersectionObserver(
    (entradas, observador) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visivel");
          observador.unobserve(entrada.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -8% 0px",
    },
  );

  animados.forEach((elemento) => {
    observadorAnimacao.observe(elemento);
  });
} else {
  animados.forEach((elemento) => {
    elemento.classList.add("visivel");
  });
}

/* ===== BOTÃO FIXO DE WHATSAPP: some na seção de contato ===== */
const observadorContato = new IntersectionObserver(
  (entradas) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        botaoWhatsApp.classList.add("oculto");
      } else {
        botaoWhatsApp.classList.remove("oculto");
      }
    });
  },
  {
    threshold: 0.2,
  },
);

observadorContato.observe(secaoContato);

/* ===== SERVIÇO PRÉ-SELECIONADO ===== */
document.querySelectorAll("[data-servico]").forEach((link) => {
  link.addEventListener("click", () => {
    selectServico.value = link.dataset.servico;
  });
});

/* ===== MÁSCARAS DO FORMULÁRIO ===== */
campoTelefone.addEventListener("input", () => {
  const digitos = campoTelefone.value.replace(/\D/g, "").slice(0, 11);
  let formatado = "";

  if (digitos.length > 0) {
    formatado = "(" + digitos.slice(0, 2);
  }

  if (digitos.length >= 3) {
    formatado += ") " + digitos.slice(2, 7);
  }

  if (digitos.length >= 8) {
    formatado += "-" + digitos.slice(7);
  }

  campoTelefone.value = formatado;
});

campoPassageiros.addEventListener("input", () => {
  campoPassageiros.value = campoPassageiros.value.replace(/\D/g, "");
});

// Calendário bloqueia datas passadas
const hoje = new Date().toLocaleDateString("en-CA");
campoData.setAttribute("min", hoje);

/* ===== FORMULÁRIO: ENVIA PELO WHATSAPP ===== */
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome = document.querySelector("#nome").value.trim();
  const telefone = campoTelefone.value.trim();
  const data = campoData.value;
  const passageiros = campoPassageiros.value;
  const mensagem = document.querySelector("#mensagem").value.trim();
  const servico = selectServico.options[selectServico.selectedIndex].text;
  let dataFormatada = "";

  if (data !== "") {
    dataFormatada = data.split("-").reverse().join("/");
  }

  let texto = "Olá! Gostaria de pedir um orçamento.";

  texto += "\n\nNome: " + nome;
  texto += "\nTelefone: " + telefone;
  texto += "\nServiço: " + servico;

  if (dataFormatada !== "") {
    texto += "\nData da viagem: " + dataFormatada;
  }

  if (passageiros !== "") {
    texto += "\nPassageiros: " + passageiros;
  }

  if (mensagem !== "") {
    texto += "\nDestino/observações: " + mensagem;
  }

  const textoCodificado = encodeURIComponent(texto);
  const url = "https://wa.me/" + numeroWhatsApp + "?text=" + textoCodificado;

  window.open(url, "_blank", "noopener");

  formulario.reset();

  statusForm.textContent =
    "Abrimos o WhatsApp com a sua mensagem. É só tocar em enviar.";

  setTimeout(() => {
    statusForm.textContent = "";
  }, 8000);
});
