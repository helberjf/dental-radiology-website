# Deploy em VPS Limpa com EasyPanel - Website DPI Planning Center

Este guia mostra como configurar uma VPS limpa com Ubuntu, firewall, Docker, EasyPanel, domínio, HTTPS e deploy do website **DPI Planning Center**.

---

## 1) Requisitos

Antes de começar, você precisa de:

```txt
VPS limpa com Ubuntu Server 24.04 LTS
Acesso root via SSH
Domínio próprio
Repositório GitHub do projeto
```

Portas necessárias:

```txt
22    SSH
80    HTTP
443   HTTPS
3000  Acesso inicial ao EasyPanel
```

---

## 2) Apontar o domínio para a VPS

No painel onde o domínio foi comprado, crie os registros DNS:

```txt
Tipo A    @        IP_DA_VPS
Tipo A    www      IP_DA_VPS
Tipo A    painel   IP_DA_VPS
```

Exemplo:

```txt
seudominio.com          -> IP_DA_VPS
www.seudominio.com      -> IP_DA_VPS
painel.seudominio.com   -> IP_DA_VPS
```

Se estiver usando Cloudflare, no início deixe o proxy como **DNS only**, sem nuvem laranja, para evitar problemas na emissão do SSL.

---

## 3) Acessar a VPS

Entre na VPS:

```bash
ssh root@IP_DA_VPS
```

Atualize o servidor:

```bash
apt update && apt upgrade -y
```

Instale pacotes básicos:

```bash
apt install -y curl git ufw ca-certificates gnupg
```

---

## 4) Configurar firewall com UFW

Configure as regras básicas:

```bash
ufw default deny incoming
ufw default allow outgoing

ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 3000/tcp
```

Ative o firewall:

```bash
ufw enable
```

Quando aparecer:

```txt
Command may disrupt existing ssh connections. Proceed with operation (y|n)?
```

Digite:

```txt
y
```

Verifique o status:

```bash
ufw status verbose
```

Resultado esperado:

```txt
Status: active

22/tcp     ALLOW
80/tcp     ALLOW
443/tcp    ALLOW
3000/tcp   ALLOW
```

A porta `3000` será usada apenas para acessar o EasyPanel no começo.

Depois que o painel estiver funcionando com domínio e HTTPS, essa porta poderá ser fechada.

---

## 5) Instalar Docker

O EasyPanel precisa do Docker.

Instale com:

```bash
curl -sSL https://get.docker.com | sh
```

Verifique se o Docker foi instalado:

```bash
docker --version
docker ps
```

Se aparecer uma lista vazia de containers, está correto.

---

## 6) Instalar EasyPanel

Execute o comando abaixo:

```bash
docker run --rm -it \
  -v /etc/easypanel:/etc/easypanel \
  -v /var/run/docker.sock:/var/run/docker.sock:ro \
  easypanel/easypanel setup
```

Após finalizar, acesse no navegador:

```txt
http://IP_DA_VPS:3000
```

Crie o usuário administrador do EasyPanel.

---

## 7) Configurar domínio do painel

No EasyPanel, configure o domínio do painel:

```txt
painel.seudominio.com
```

Depois acesse:

```txt
https://painel.seudominio.com
```

Quando o painel estiver funcionando pelo domínio com HTTPS, remova a porta `3000` do firewall:

```bash
ufw delete allow 3000/tcp
ufw status verbose
```

A partir daqui, acesse o painel somente por:

```txt
https://painel.seudominio.com
```

---

## 8) Preparar o projeto React/Vite para EasyPanel

Este projeto é um website React/Vite. Para publicar no EasyPanel, vamos usar Docker.

Na raiz do projeto, crie um arquivo chamado:

```txt
Dockerfile
```

Conteúdo do `Dockerfile`:

```dockerfile
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
```

Agora crie outro arquivo na raiz do projeto chamado:

```txt
nginx.conf
```

Conteúdo do `nginx.conf`:

```nginx
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
```

Esse arquivo é importante para SPA React/Vite.

Sem isso, rotas internas podem dar erro `404` ao recarregar a página.

---

## 9) Testar o build antes do deploy

No projeto, rode:

```bash
npm ci
npm run build
```

Verifique se a pasta `dist` foi criada:

```bash
ls dist
```

Se a pasta existir, o build está correto.

Agora envie as alterações para o GitHub:

```bash
git add .
git commit -m "add easypanel docker deploy"
git push origin main
```

---

## 10) Criar projeto no EasyPanel

No painel do EasyPanel, vá em:

```txt
Projects
New Project
```

Nome do projeto:

```txt
dpi-planning-center
```

Depois crie um novo serviço:

```txt
New Service
App
```

Configure o app:

```txt
Name: website
Source: GitHub Repository
Repository: helberjf/dental-radiology-website
Branch: main
Build: Dockerfile
```

---

## 11) Configurar domínio do site no EasyPanel

Dentro do serviço `website`, vá em:

```txt
Domains & Proxy
```

Adicione os domínios:

```txt
seudominio.com
www.seudominio.com
```

Configure a porta interna do app como:

```txt
80
```

Isso é necessário porque o container usa Nginx escutando na porta `80`.

Depois ative o HTTPS/SSL pela interface do EasyPanel.

---

## 12) Fazer deploy

Clique em:

```txt
Deploy
```

Acompanhe os logs.

Se tudo estiver certo, o site abrirá em:

```txt
https://seudominio.com
https://www.seudominio.com
```

---

## 13) Atualizar o site depois

Sempre que fizer alterações no código:

```bash
git add .
git commit -m "update website"
git push origin main
```

Depois, no EasyPanel, clique em:

```txt
Deploy
```

Também é possível ativar o **Auto Deploy** para o EasyPanel publicar automaticamente sempre que houver `push` no GitHub.

---

## 14) Comandos úteis na VPS

Ver status do firewall:

```bash
ufw status verbose
```

Ver containers rodando:

```bash
docker ps
```

Ver serviços Docker Swarm:

```bash
docker service ls
```

Ver uso de disco:

```bash
df -h
```

Ver uso de memória:

```bash
free -h
```

Reiniciar Docker:

```bash
systemctl restart docker
```

---

## 15) Atualizar EasyPanel manualmente

Para atualizar o EasyPanel manualmente:

```bash
docker image pull easypanel/easypanel && docker service update easypanel --force
```

---

## 16) Backup básico

Faça backup da configuração do EasyPanel:

```bash
tar -czvf easypanel-backup.tar.gz /etc/easypanel
```

Se a VPS tiver opção de snapshot no provedor, também é recomendado criar snapshots antes de grandes alterações.

---

## 17) Checklist final

Antes de considerar o deploy finalizado, confira:

```txt
[ ] VPS limpa com Ubuntu 24.04
[ ] Firewall ativo
[ ] Porta 22 liberada
[ ] Porta 80 liberada
[ ] Porta 443 liberada
[ ] Porta 3000 fechada depois do painel configurado
[ ] Docker instalado
[ ] EasyPanel instalado
[ ] painel.seudominio.com abrindo com HTTPS
[ ] seudominio.com apontando para a VPS
[ ] www.seudominio.com apontando para a VPS
[ ] App criado no EasyPanel
[ ] Dockerfile criado no projeto
[ ] nginx.conf criado no projeto
[ ] Build gerando pasta dist
[ ] Porta interna do app configurada como 80
[ ] Site abrindo com HTTPS
[ ] Rotas internas funcionando ao recarregar a página
```

---

## 18) Observação importante

Com EasyPanel, você não precisa instalar manualmente na VPS:

```txt
Nginx
Certbot
Node.js
PM2
```

O deploy será feito via Docker.

O fluxo correto é:

```txt
VPS limpa
Docker
EasyPanel
GitHub
Dockerfile
Deploy pelo painel
SSL pelo EasyPanel
```

---

## 19) Estrutura final esperada no projeto

O projeto deve ficar com estes arquivos na raiz:

```txt
dental-radiology-website/
├── Dockerfile
├── nginx.conf
├── package.json
├── package-lock.json
├── src/
├── public/
├── index.html
└── vite.config.ts
```

Após o build, será criada a pasta:

```txt
dist/
```

Essa pasta será servida pelo Nginx dentro do container Docker.

---

## 20) Resumo do deploy

```txt
1. Configurar DNS do domínio
2. Acessar VPS via SSH
3. Atualizar Ubuntu
4. Configurar firewall
5. Instalar Docker
6. Instalar EasyPanel
7. Acessar EasyPanel na porta 3000
8. Configurar domínio do painel
9. Fechar porta 3000
10. Criar Dockerfile no projeto
11. Criar nginx.conf no projeto
12. Enviar alterações para GitHub
13. Criar app no EasyPanel
14. Conectar repositório GitHub
15. Configurar domínio do site
16. Ativar HTTPS
17. Fazer deploy
```