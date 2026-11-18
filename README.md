# Real Turismo

Site institucional responsivo para uma empresa de transporte turístico, com vans executivas e ônibus para **turismo, romarias e eventos**. O objetivo é transmitir confiança e facilitar o contato: o cliente escolhe o serviço, preenche um formulário curto e a solicitação de orçamento segue direto pelo WhatsApp.

🔗 **Site no ar:** https://carlos-rony-07.github.io/real-turismo/

![Prévia do site em computador e celular](img/preview.png)

## Funcionalidades

- Layout **mobile-first** e responsivo (celular, tablet e computador)
- Header fixo com menu em hambúrguer no celular e destaque do link da seção atual
- Botões de WhatsApp e telefone em destaque, com botão fixo flutuante
- Catálogo da frota (vans e ônibus) com capacidade de passageiros
- Cards de serviços e destinos que já pré-selecionam o tipo de serviço no formulário
- Formulário de orçamento que **monta a mensagem e abre o WhatsApp**, sem necessidade de servidor
- Máscara de telefone, validação de campos e bloqueio de datas passadas
- Animações suaves ao rolar a página, respeitando a preferência "reduzir movimento"
- Acessibilidade: HTML semântico, link "pular para o conteúdo", foco visível, rótulos ARIA e bom contraste
- SEO e compartilhamento: meta description e tags Open Graph

## Tecnologias

- HTML5 semântico
- CSS3 (variáveis, Grid, Flexbox, media queries, animações)
- JavaScript puro (IntersectionObserver, manipulação de DOM, eventos)
- Google Fonts (Poppins, Caveat) e Material Symbols
- Git e GitHub Pages

## Estrutura do projeto

```
real-turismo/
├── index.html
├── css/
│   ├── style.css        # base e versão mobile
│   └── responsivo.css   # tablet (768px) e desktop (1024px)
├── js/
│   └── main.js
├── img/
└── README.md
```

## Como executar

1. Clone o repositório:
   ```
   git clone https://github.com/SEU-USUARIO/real-turismo.git
   ```
2. Abra a pasta no VS Code.
3. Abra o `index.html` com a extensão **Live Server** (ou dando dois cliques no arquivo).

Não há dependências nem etapa de build.

## Como personalizar

- **Telefone e WhatsApp:** altere os links `wa.me` e `tel:` no `index.html` e a constante `numeroWhatsApp` no `js/main.js`.
- **Cores:** edite as variáveis no início do `css/style.css`.
- **Frota e destinos:** troque as imagens em `img/` e os textos dos cards no `index.html`.

## Publicação

O site é publicado com o **GitHub Pages**: _Settings → Pages → Deploy from a branch → `main` → `/ (root)`_.
Os nomes de arquivos diferenciam maiúsculas de minúsculas, então mantenha as imagens em minúsculas.

## Próximos passos

- [ ] Fotos reais de toda a frota e dos destinos
- [ ] Domínio próprio
- [ ] Calendário de excursões
- [ ] Depoimentos de clientes
- [ ] Perfil no Google Meu Negócio

## Autor

Desenvolvido por **Carlos Rony** como projeto real para uma empresa de transportes e peça de portfólio.

## Licença

Todos os direitos reservados à Real Turismo. O código pode ser consultado como referência de estudo.
