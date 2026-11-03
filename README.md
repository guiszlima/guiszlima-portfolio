# ⚡ Portfolio HUD-01 | Guilherme Souza Lima

<div align="center">

[![Status](https://img.shields.io/badge/STATUS-ONLINE-success?style=for-the-badge&logo=none)](https://github.com/guilhermesouzalima)
[![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-App_Router-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-Animations-orange?style=for-the-badge&logo=greensock)](https://gsap.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

Um portfólio interativo desenvolvido com inspiração em interfaces **HUD (Heads-Up Display)** de sistemas sci-fi, focado em alta performance, microinterações fluidas e tipografia marcante.

[Ver Tecnologias](#-tecnologias) • [Arquitetura](#-arquitetura-do-componente) • [Como Executar](#-como-executar-o-projeto)

</div>

---

## 🎨 Sobre o Projeto

O **Portfolio HUD-01** foge do modelo tradicional de portfólios estáticos. Ele simula um painel de controle de alta tecnologia (*Command & Control Interface*), integrando:

- **Navegação modular:** alternância entre seções como Overview, Projetos, Experiência, Habilidades, Sobre, Currículo e Contato.
- **Animações com GSAP:** uso de `useGSAP`, transições animadas, cursores personalizados com rastreamento inercial (`quickTo`) e efeitos dinâmicos de grade no plano de fundo.
- **Internacionalização (i18n):** suporte a Português (PT) e Inglês (EN), com indicador deslizante animado.
- **Acessibilidade e modais:** diálogos acessíveis por teclado (`Esc` e gerenciamento de foco) e layout responsivo.

## 🛠 Tecnologias

Este projeto utiliza tecnologias modernas do ecossistema web:

- **Framework:** [Next.js](https://nextjs.org/) com App Router
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Animações:** [GSAP](https://gsap.com/) e `@gsap/react`
- **Estilização:** CSS Modules com escopo local
- **Estado:** React Hooks (`useCallback`, `useMemo`, `useRef` e `useState`)

## 📂 Arquitetura do Componente

O núcleo do portfólio (`PortfolioHud`) gerencia a navegação, o idioma, os modais e os efeitos visuais do HUD.

```text
src/
┣ components/
┃ ┣ PortfolioHud.tsx         # Componente principal do HUD (lógica e GSAP)
┃ ┣ PortfolioHud.module.css  # Estilos e variáveis visuais do HUD
┃ ┣ HudNavigation.tsx        # Barra de navegação lateral por módulos
┃ ┗ ProjectList.tsx          # Listagem interativa de projetos
┣ data/
┃ ┗ portfolio.types.ts       # Tipagens TypeScript (idiomas, projetos e perfil)
┗ lib/
  ┣ portfolio.ts             # Dados centralizados do portfólio
  ┗ hud.ts                   # Rótulos, traduções de status e módulos
```

> A estrutura acima é uma referência; ajuste os caminhos caso a organização atual do repositório seja diferente.

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js compatível com a versão do Next.js utilizada no projeto
- npm, yarn ou pnpm

### 1. Clone o repositório

Substitua `seu-repositorio` pelo nome real do repositório:

```bash
git clone https://github.com/guilhermesouzalima/seu-repositorio.git
cd seu-repositorio
```

### 2. Instale as dependências

```bash
npm install
```

Ou, se preferir:

```bash
yarn install
# ou
pnpm install
```

### 3. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Ou utilize o gerenciador de pacotes escolhido:

```bash
yarn dev
# ou
pnpm dev
```

### 4. Abra no navegador

Acesse [http://localhost:3000](http://localhost:3000).

## 📞 Contato

- **GitHub:** [guilhermesouzalima](https://github.com/guilhermesouzalima)
- **LinkedIn:** [guilhermesouzalima](https://www.linkedin.com/in/guilhermesouzalima/)
- **WhatsApp:** [Enviar mensagem](https://wa.me/5511991993229?text=Ol%C3%A1%2C%20Guilherme!%20Vim%20pelo%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar%20com%20voc%C3%AA.)

---

Desenvolvido por **Guilherme Souza Lima**.
