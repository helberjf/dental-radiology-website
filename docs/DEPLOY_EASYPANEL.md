# Deploy em VPS Limpa com EasyPanel - Website DPI Planning Center

Este guia mostra como configurar uma VPS limpa com Ubuntu, firewall, Docker, EasyPanel, domínio, HTTPS e deploy do website **DPI Planning Center**.

---

## 1) Requisitos

Antes de começar, você precisa de:

- VPS limpa com Ubuntu Server 24.04 LTS
- Acesso root via SSH
- Domínio próprio
- Repositório GitHub do projeto

Portas necessárias:

| Porta | Uso |
|---|---|
| 22 | SSH |
| 80 | HTTP |
| 443 | HTTPS |
| 3000 | Acesso inicial ao EasyPanel |

A porta `3000` será usada apenas no primeiro acesso ao EasyPanel. Depois que o painel estiver funcionando com domínio e HTTPS, ela poderá ser fechada.

---

## 2) Apontar o domínio para a VPS

No painel onde o domínio foi comprado, crie os registros DNS:

| Tipo | Nome | Valor |
|---|---|---|
| A | @ | IP_DA_VPS |
| A | www | IP_DA_VPS |
| A | painel | IP_DA_VPS |

Exemplo:

    seudominio.com          -> IP_DA_VPS
    www.seudominio.com      -> IP_DA_VPS
    painel.seudominio.com   -> IP_DA_VPS

Se estiver usando Cloudflare, no início deixe o proxy como **DNS only**, sem nuvem laranja, para evitar problemas na emissão do SSL.

---

## 3) Acessar a VPS

Entre na VPS:

    ssh root@IP_DA_VPS

Atualize o servidor:

    apt update && apt upgrade -y

Instale pacotes básicos:

    apt install -y curl git ufw ca-certificates gnupg

---

## 4) Configurar firewall com UFW

Configure as regras básicas:

    ufw default deny incoming
    ufw default allow outgoing

    ufw allow OpenSSH
    ufw allow 80/tcp
    ufw allow 443/tcp
    ufw allow 3000/tcp

Ative o firewall:

    ufw enable

Quando aparecer esta pergunta:

    Command may disrupt existing ssh connections. Proceed with operation (y|n)?

Digite:

    y

Verifique o status:

    ufw status verbose

Resultado esperado:

    Status: active

    22/tcp     ALLOW
    80/tcp     ALLOW
    443/tcp    ALLOW
    3000/tcp   ALLOW

---

## 5) Instalar Docker

O EasyPanel precisa do Docker.

Instale com:

    curl -sSL https://get.docker.com | sh

Verifique se o Docker foi instalado:

    docker --version
    docker ps

Se aparecer uma lista vazia de containers, está correto.

---

## 6) Instalar EasyPanel

Execute o comando abaixo:

    docker run --rm -it \
      -v /etc/easypanel:/etc/easypanel \
      -v /var/run/docker.sock:/var/run/docker.sock:ro \
      easypanel/easypanel setup

Após finalizar, acesse no navegador:

    http://IP_DA_VPS:3000

Crie o usuário administrador do EasyPanel.

---

## 7) Configurar domínio do painel

No EasyPanel, configure o domínio do painel:

    painel.seudominio.com

Depois acesse:

    https://painel.seudominio.com

Quando o painel estiver funcionando pelo domínio com HTTPS, remova a porta `3000` do firewall:

    ufw delete allow 3000/tcp
    ufw status verbose

A partir daqui, acesse o painel somente por:

    https://painel.seudominio.com

---

## 8) Preparar o projeto React/Vite para EasyPanel

Este projeto é um website React/Vite. Para publicar no EasyPanel, vamos usar Docker.

Na raiz do projeto, crie um arquivo chamado:

    Dockerfile

Conteúdo do `Dockerfile`:

    FROM node:22-alpine AS builder

    WORKDIR /app

    COPY package*.json ./
    RUN npm ci

    COPY . .
    RUN npm run build

    FROM nginx:alpine

    COPY --from=builder /app/dist /usr/share/nginx/html

    COPY nginx.conf /etc/nginx/conf.d/default.conf

    EXPOSE 80

    CMD ["nginx", "-g", "daemon off;"]

Agora crie outro arquivo na raiz do projeto chamado:

    nginx.conf

Conteúdo do `nginx.conf`:

    server {
        listen 80;
        server_name _;

        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        location ~* \.(js|css|png|jpg|jpeg|gif|svg|ico|webp|woff2?)$ {
            expires 30d;
            add_header Cache-Control "public, immutable";
        }
    }

Esse arquivo é importante para SPA React/Vite.

Sem isso, rotas internas podem dar erro `404` ao recarregar a página.

---

## 9) Testar o build antes do deploy

No projeto, rode:

    npm ci
    npm run build

Verifique se a pasta `dist` foi criada:

    ls dist

Se a pasta existir, o build está correto.

Agora envie as alterações para o GitHub:

    git add .
    git commit -m "add easypanel docker deploy"
    git push origin main

---

## 10) Criar projeto no EasyPanel

No painel do EasyPanel, vá em:

    Projects
    New Project

Nome do projeto:

    dpi-planning-center

Depois crie um novo serviço:

    New Service
    App

Configure o app:

| Campo | Valor |
|---|---|
| Name | website |
| Source | GitHub Repository |
| Repository | helberjf/dental-radiology-website |
| Branch | main |
| Build | Dockerfile |

---

## 11) Configurar domínio do site no EasyPanel

Dentro do serviço `website`, vá em:

    Domains & Proxy

Adicione os domínios:

    seudominio.com
    www.seudominio.com

Configure a porta interna do app como:

    80

Isso é necessário porque o container usa Nginx escutando na porta `80`.

Depois ative o HTTPS/SSL pela interface do EasyPanel.

---

## 12) Fazer deploy

Clique em:

    Deploy

Acompanhe os logs.

Se tudo estiver certo, o site abrirá em:

    https://seudominio.com
    https://www.seudominio.com

---

## 13) Atualizar o site depois

Sempre que fizer alterações no código:

    git add .
    git commit -m "update website"
    git push origin main

Depois, no EasyPanel, clique em:

    Deploy

Também é possível ativar o **Auto Deploy** para o EasyPanel publicar automaticamente sempre que houver `push` no GitHub.

---

## 14) Comandos úteis na VPS

Ver status do firewall:

    ufw status verbose

Ver containers rodando:

    docker ps

Ver serviços Docker Swarm:

    docker service ls

Ver uso de disco:

    df -h

Ver uso de memória:

    free -h

Reiniciar Docker:

    systemctl restart docker

---

## 15) Atualizar EasyPanel manualmente

Para atualizar o EasyPanel manualmente:

    docker image pull easypanel/easypanel && docker service update easypanel --force

---

## 16) Backup básico

Faça backup da configuração do EasyPanel:

    tar -czvf easypanel-backup.tar.gz /etc/easypanel

Se a VPS tiver opção de snapshot no provedor, também é recomendado criar snapshots antes de grandes alterações.

---

## 17) Checklist final

Antes de considerar o deploy finalizado, confira:

- [ ] VPS limpa com Ubuntu 24.04
- [ ] Firewall ativo
- [ ] Porta 22 liberada
- [ ] Porta 80 liberada
- [ ] Porta 443 liberada
- [ ] Porta 3000 fechada depois do painel configurado
- [ ] Docker instalado
- [ ] EasyPanel instalado
- [ ] `painel.seudominio.com` abrindo com HTTPS
- [ ] `seudominio.com` apontando para a VPS
- [ ] `www.seudominio.com` apontando para a VPS
- [ ] App criado no EasyPanel
- [ ] `Dockerfile` criado no projeto
- [ ] `nginx.conf` criado no projeto
- [ ] Build gerando pasta `dist`
- [ ] Porta interna do app configurada como `80`
- [ ] Site abrindo com HTTPS
- [ ] Rotas internas funcionando ao recarregar a página

---

## 18) Observação importante

Com EasyPanel, você não precisa instalar manualmente na VPS:

- Nginx
- Certbot
- Node.js
- PM2

O deploy será feito via Docker.

Fluxo correto:

    VPS limpa
    Docker
    EasyPanel
    GitHub
    Dockerfile
    Deploy pelo painel
    SSL pelo EasyPanel

---

## 19) Estrutura final esperada no projeto

O projeto deve ficar com estes arquivos na raiz:

    dental-radiology-website/
    ├── Dockerfile
    ├── nginx.conf
    ├── package.json
    ├── package-lock.json
    ├── src/
    ├── public/
    ├── index.html
    └── vite.config.ts

Após o build, será criada a pasta:

    dist/

Essa pasta será servida pelo Nginx dentro do container Docker.

---

## 20) Resumo do deploy

1. Configurar DNS do domínio
2. Acessar VPS via SSH
3. Atualizar Ubuntu
4. Configurar firewall
5. Instalar Docker
6. Instalar EasyPanel
7. Acessar EasyPanel na porta `3000`
8. Configurar domínio do painel
9. Fechar porta `3000`
10. Criar `Dockerfile` no projeto
11. Criar `nginx.conf` no projeto
12. Enviar alterações para GitHub
13. Criar app no EasyPanel
14. Conectar repositório GitHub
15. Configurar domínio do site
16. Ativar HTTPS
17. Fazer deploy
