# 🪷 Lina Dashboard

Dashboard profissional de Mission Control para gestão de projetos e automações.

---

## 🚀 Tecnologias

- **Next.js 14** - Framework React
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide Icons** - Ícones modernos

---

## 📦 Deploy no Coolify

### Passo 1: Criar Projeto no Coolify

1. **New Project**
2. Conectar com **GitHub**
3. Importar: `walterneylp/lina-dashboard`

### Passo 2: Configurar o Serviço

- **Branch:** `main`
- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Docker Image:** `node:20-alpine`

### Passo 3: Variáveis de Ambiente

```env
NEXT_PUBLIC_NOCODB_URL=https://nocodb-lina.apogeuautomacao.cloud
NEXT_PUBLIC_NOCODB_TOKEN=x6CKGkcsXLoDXjEdE0C5SoMvT4OMk6pR9a0kFHMZ
```

### Passo 4: Deploy

Clique em **"Deploy"** e aguarde!

### Passo 5: Direcionar Domínio

1. No Coolify: **Domain** → Adicionar domínio
2. No DNS do provedor:
   - **Tipo:** A
   - **Nome:** seu subdomínio
   - **Valor:** IP do Coolify

---

## 🛠️ Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Criar .env.local
cp .env.production .env.local

# Build
npm run build

# Development
npm run dev
```

---

## 📊 Widgets

- 🚀 **Founder** - Resumo de negócio, OKRs, tarefas críticas
- 🔧 **Dev** - Status técnico dos serviços (Gateway, Telegram)
- 🎬 **Criador** - Pipeline de conteúdo e produção
- 📋 **Produtividade** - Tasks, taxas de conclusão, pendências

---

## 🔧 Variáveis de Ambiente

### .env.production

```env
NEXT_PUBLIC_NOCODB_URL=https://nocodb-lina.apogeuautomacao.cloud
NEXT_PUBLIC_NOCODB_TOKEN=x6CKGkcsXLoDXjEdE0C5SoMvT4OMk6pR9a0kFHMZ
```

---

## ❓ Troubleshooting

**Build falha:**
- Verifique se Node.js é 18.x ou 20.x
- Certifique-se de que copiou `.env.production` para `.env.local`

**Erro de CORS ao acessar NocoDB:**
- Verifique se o token está correto
- Certifique-se de que o NocoDB permite requisições do seu domínio

**Página em branco:**
- Verifique os logs do Coolify
- Certifique-se de que o deployment foi concluído

---

*Desenvolvido com ❤️ pela Lina COO*
