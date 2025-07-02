# TripLogs Frontend

> Uma aplicação para registrar e gerenciar suas aventuras de viagem desenvolvido durante a disciplina de **Fundamentos de DevOps** no curso de **Bacharelado em Sistemas de Informação**

## Sobre o Projeto

TripLogs é uma aplicação frontend desenvolvida em Vue.js que permite aos usuários registrar, gerenciar e visualizar suas experiências de viagem. Com uma interface moderna e intuitiva, os usuários podem criar histórias de suas aventuras, adicionar fotos, datas e descrições detalhadas.

## Funcionalidades

- **Autenticação Segura** - Sistema completo de login e registro
- **Gerenciamento de Viagens** - Criar, editar, visualizar e excluir registros
- **Busca Inteligente** - Pesquisar viagens por título ou localização
- **Interface Moderna** - Design limpo usando Vuetify e Material Design

## Tecnologias Utilizadas

### Core

- **[Vue.js 3](https://vuejs.org/)** - Framework JavaScript progressivo
- **[Vite](https://vitejs.dev/)** - Build tool moderna e rápida
- **[Vue Router](https://router.vuejs.org/)** - Roteamento oficial do Vue
- **[Pinia](https://pinia.vuejs.org/)** - Store state management

### UI/UX

- **[Vuetify 3](https://vuetifyjs.com/)** - Framework de componentes Material Design
- **[Material Design Icons](https://materialdesignicons.com/)** - Biblioteca de ícones
- **[FontAwesome](https://fontawesome.com/)** - Ícones adicionais
- **[Roboto Font](https://fonts.google.com/specimen/Roboto)** - Tipografia

### HTTP & APIs

- **[Axios](https://axios-http.com/)** - Cliente HTTP para requisições à API
- **[WebFontLoader](https://github.com/typekit/webfontloader)** - Carregamento otimizado de fontes

## Começando

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

### Instalação

1. **Clone o repositório**

   ```bash
   git clone https://github.com/gabriel04alves/triplogs-frontend.git
   cd triplogs-frontend
   ```

2. **Instale as dependências**

   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Configure as variáveis de ambiente**

   Crie um arquivo `.env` na raiz do projeto:

   ```env
   VITE_API_BASE_URL=http://localhost:8000/api
   ```

4. **Execute o projeto em modo de desenvolvimento**

   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. **Acesse a aplicação**

   Abra seu navegador e acesse: `http://localhost:5173`

## Estrutura do Projeto

```
src/
├── assets/                 # Recursos estáticos (CSS, imagens)
│   ├── css/               # Estilos globais
│   └── images/            # Imagens da aplicação
├── components/            # Componentes Vue reutilizáveis
│   ├── common/           # Componentes genéricos
│   ├── platform/         # Componentes da plataforma
│   └── trip/             # Componentes relacionados a viagens
├── composables/          # Funções composable (lógica reutilizável)
├── plugins/              # Plugins do Vue (Vuetify, WebFontLoader)
├── router/               # Configuração de rotas
├── services/             # Serviços de API
│   ├── auth/            # Serviços de autenticação
│   ├── core/            # Configurações base da API
│   ├── trip/            # Serviços de viagens
│   └── user/            # Serviços de usuários
├── store/                # Gerenciamento de estado (Pinia)
├── utils/                # Utilitários e helpers
├── validators/           # Validações de formulários
└── views/                # Páginas/Views da aplicação
```

## Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Build
npm run build        # Gera build de produção

# Preview
npm run preview      # Visualiza build de produção localmente

# Servidor
npm run serve        # Serve a aplicação (alias para preview)
```

## Configuração de Ambiente

### Variáveis de Ambiente

Crie um arquivo `.env` com as seguintes variáveis:

```env
# URL base da API backend
VITE_API_BASE_URL=http://localhost:8000/api

# Outras configurações opcionais
VITE_APP_TITLE=TripLogs
VITE_APP_VERSION=1.0.0
```

### Endpoints da API

A aplicação consome os seguintes endpoints:

- **Autenticação**

  - `POST /token/` - Login
  - `POST /token/refresh/` - Refresh token
  - `POST /token/verify/` - Verificar token

- **Usuários**

  - `POST /usuarios/` - Registro de usuário
  - `GET /usuarios/me/` - Dados do usuário atual

- **Viagens**
  - `GET /trips/` - Listar viagens do usuário
  - `POST /trips/` - Criar nova viagem
  - `PATCH /trips/{id}/` - Atualizar viagem
  - `DELETE /trips/{id}/` - Excluir viagem

## Autenticação

A aplicação utiliza autenticação baseada em JWT (JSON Web Tokens) com:

- **Access Token** - Token de acesso com duração limitada
- **Refresh Token** - Token para renovação automática
- **Guards de Rota** - Proteção de rotas autenticadas
- **Interceptors HTTP** - Adição automática de tokens nas requisições

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
