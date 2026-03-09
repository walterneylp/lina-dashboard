# 📤 Como fazer push para o GitHub

## Passo 1: Preparar o repositório local

```bash
# Navegar para a pasta do projeto
cd lina-dashboard

# Inicializar o git
git init

# Adicionar todos os arquivos
git add .

# Commit inicial
git commit -m "feat: initial commit - Lina Dashboard"

# Adicionar o repositório remoto
git remote add origin https://github.com/walterneylp/lina-dashboard.git

# Renomear branch para main
git branch -M main

# Push para o GitHub
git push -u origin main
```

## Passo 2: Configurar no Coolify

1. **New Project** → **Connect GitHub**
2. Importar: `walterneylp/lina-dashboard`
3. **Branch:** `main`
4. **Build Command:** `npm run build`
5. **Start Command:** `npm start`
6. **Docker Image:** `node:20-alpine`

## Passo 3: Variáveis de Ambiente

```env
NEXT_PUBLIC_NOCODB_URL=https://nocodb-lina.apogeuautomacao.cloud
NEXT_PUBLIC_NOCODB_TOKEN=x6CKGkcsXLoDXjEdE0C5SoMvT4OMk6pR9a0kFHMZ
```

## Passo 4: Deploy

Clique em **"Deploy"** e aguarde!

---

*Desenvolvido com ❤️ pela Lina COO*
