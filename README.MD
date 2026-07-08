# DPI Planning Center

Website institucional e comercial desenvolvido para a **DPI Planning Center**, um laboratório digital especializado em serviços e soluções para odontologia digital.

O site tem como objetivo apresentar os principais serviços da empresa, facilitar o contato com clientes, permitir solicitação de orçamento via WhatsApp e oferecer uma experiência simples de carrinho para serviços odontológicos digitais.

---

## Sobre o projeto

A DPI Planning Center atua com soluções digitais voltadas para odontologia, oferecendo serviços como conversão de arquivos, fusão DICOM e integração DICOM/STL.

O website foi criado com foco em:

- Apresentação profissional da empresa
- Divulgação dos serviços digitais
- Conversão de visitantes em contatos pelo WhatsApp
- Exibição de preços e descrições dos serviços
- Experiência simples de carrinho
- Layout responsivo para desktop e celular

A proposta visual segue uma linha moderna, limpa e tecnológica, com seções escuras, áreas claras, botões de ação em verde e elementos visuais relacionados ao universo odontológico.

---

## Tecnologias utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- Wouter para rotas
- Lucide React para ícones
- Sonner para notificações
- LocalStorage para persistência simples do carrinho
- Componentes reutilizáveis

---

## Funcionalidades principais

### Página inicial

A página inicial apresenta a empresa e seus principais serviços.

Ela contém:

- Topbar com e-mail, endereço e WhatsApp
- Header com logo, menu e botão de orçamento
- Hero section com chamada principal
- Botões de ação para contato e serviços
- Acesso rápido aos serviços principais
- Cards de serviços
- Seção institucional
- Diferenciais da empresa
- Horários de funcionamento
- Chamada final para contato
- Rodapé com informações institucionais

---

### Página de serviços

A página de serviços exibe os serviços digitais cadastrados no projeto.

Cada serviço possui:

- Ícone
- Nome
- Descrição curta
- Descrição completa
- Preço
- Botão para solicitar serviço
- Botão para ver detalhes
- Botão para adicionar ao carrinho
- Área de avaliação com estrelas

Serviços cadastrados inicialmente:

- Conversão Dental Slice
- Fusão Arquivo DICOM
- Conversão DICOM/STL

---

### Carrinho

O projeto possui um carrinho simples no frontend.

Funcionalidades do carrinho:

- Adicionar serviços
- Remover serviços
- Alterar quantidade
- Calcular subtotal
- Calcular total do pedido
- Salvar os itens no navegador com LocalStorage
- Enviar pedido pelo WhatsApp com mensagem automática

O carrinho não depende de backend nesta versão.

---

### WhatsApp

O site possui integração com WhatsApp em diferentes pontos:

- Botão no topo do site
- Botões de orçamento
- Botões nos cards de serviço
- Botão flutuante
- Finalização do carrinho

Ao finalizar um pedido, o sistema monta uma mensagem automática com os dados do carrinho e direciona o cliente para o WhatsApp da empresa.

---

### Página de contato

A página de contato permite que o visitante visualize os dados comerciais da empresa e envie uma mensagem.

Ela contém:

- E-mail
- WhatsApp
- Endereço
- Formulário de contato
- Botão de envio
- Chamada para atendimento

---

## Visão geral da interface

O website foi estruturado como uma landing page comercial com foco em conversão.

### 1. Topbar de contato

No topo da página há uma barra escura com informações rápidas da empresa:

- E-mail comercial
- Endereço físico
- Botão de WhatsApp

Essa área facilita o contato imediato e transmite mais credibilidade para o visitante.

---

### 2. Header principal

O header contém:

- Logo da DPI Planning Center
- Menu de navegação
- Links para Home, Serviços e Contato
- Botão destacado de orçamento

O botão de orçamento fica visível no topo para incentivar a ação do usuário desde o primeiro contato com o site.

---

### 3. Hero section

A primeira dobra do site apresenta a chamada principal:

> Explore Serviços Digitais Inovadores para Odontologia!

Essa seção comunica rapidamente a proposta da empresa e direciona o visitante para duas ações principais:

- Entrar em contato
- Ver serviços

Também há um elemento visual odontológico, reforçando o segmento do negócio.

---

### 4. Acesso rápido aos serviços

Logo abaixo do hero, o site apresenta botões de acesso rápido para os principais serviços:

- Conversão Dental Slice
- Fusão Arquivo DICOM
- Conversão DICOM/STL

Essa área funciona como uma navegação rápida para os serviços mais importantes.

---

### 5. Seção de serviços

A seção “Nossos Serviços” exibe cards individuais para cada serviço.

Cada card possui:

- Ícone representativo
- Nome do serviço
- Descrição curta
- Preço
- Botão para solicitar serviço
- Botão para ver detalhes
- Botão para adicionar ao carrinho
- Avaliação com estrelas

Essa seção é o núcleo comercial do projeto, funcionando como uma vitrine de serviços digitais odontológicos.

---

### 6. Seção institucional

A seção “Bem-vindo à DPI Planning Center!” apresenta a empresa, seu posicionamento e sua especialização em soluções digitais para odontologia.

Essa área tem como objetivo gerar confiança e explicar melhor a proposta da marca para dentistas, clínicas e consultórios.

---

### 7. Diferenciais

O site possui cards de diferenciais com os principais pontos fortes da empresa:

- Tecnologia de Ponta
- Especialização
- Qualidade & Comprometimento

Esses blocos reforçam autoridade, qualidade técnica e confiança no serviço prestado.

---

### 8. Horários de funcionamento

A seção de atendimento apresenta os horários comerciais da empresa durante a semana.

Horário exibido:

- Segunda: 08:00 - 18:00
- Terça: 08:00 - 18:00
- Quarta: 08:00 - 18:00
- Quinta: 08:00 - 18:00
- Sexta: 08:00 - 18:00

Também há um botão de contato para facilitar o atendimento imediato.

---

### 9. CTA final

Antes do rodapé, existe uma seção escura com uma chamada forte para conversão:

> Onde a Inovação Encontra o Cuidado Odontológico.

Essa área possui botões para:

- Conversar no WhatsApp
- Enviar mensagem

O objetivo é reforçar a ação final do usuário antes de sair da página.

---

### 10. Rodapé

O rodapé contém:

- Logo da empresa
- Texto institucional curto
- Links de navegação
- Área legal
- Dados de contato
- Copyright

Essa seção fecha o site com informações essenciais e organização institucional.

---

### 11. Botões flutuantes

O site possui elementos flutuantes para melhorar a experiência do usuário:

- Botão flutuante de WhatsApp
- Botão flutuante de carrinho

Esses botões permitem que o visitante entre em contato ou acesse o carrinho rapidamente, mesmo durante a rolagem da página.

---

## Estrutura principal do projeto

A estrutura principal do projeto segue uma organização baseada em componentes, páginas e arquivos de dados.

```bash
Website Design for DPI Planning Center/
├── 📁 src/
│   ├── App.tsx
│   ├── index.css
│   ├── 📁 components/
│   │   ├── Cart.tsx
│   │   ├── FloatingWhatsApp.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── TopBar.tsx
│   │   └── WhatsAppIcon.tsx
│   ├── 📁 data/
│   │   ├── company.ts
│   │   └── services.ts
│   └── 📁 pages/
│       ├── Contact.tsx
│       ├── Home.tsx
│       └── Services.tsx
├── 📁 docs/
│   ├── ideas.md
│   ├── odontoimagemlab.com.br_.md
│   ├── Pasted_content.txt
│   ├── screencapture-*.png
│   └── Website Design for DPI Planning Center.zip
├── index.html
└── README.MD

---

## Como rodar o projeto localmente

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn instalado
- Git instalado

### Passos para instalação

1. **Clone o repositório** (ou extraia os arquivos)

```bash
cd "Website Design for DPI Planning Center"
```

2. **Instale as dependências**

```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

4. **Abra no navegador**

O projeto estará disponível em `http://localhost:5173` (ou a porta que o Vite indicar no terminal)

### Scripts disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Faz o build para produção
- `npm run preview` - Visualiza o build de produção localmente

---

## Deploy em VPS

### Pré-requisitos na VPS

- Sistema operacional: Ubuntu/Debian (ou compatível com Linux)
- Node.js instalado (versão 16 ou superior)
- npm ou yarn
- Git instalado
- Acesso SSH à VPS
- Nginx ou Apache (para servir os arquivos)

### Passo a passo para colocar em produção

#### 1. Conectar à VPS via SSH

```bash
ssh usuario@seu-dominio-ou-ip
```

#### 2. Criar um diretório para o projeto

```bash
mkdir -p /var/www/dpi-planning-center
cd /var/www/dpi-planning-center
```

#### 3. Clonar o repositório

Se o projeto está em um repositório Git:

```bash
git clone seu-repositorio-url .
```

Ou transferir os arquivos via SCP/SFTP:

```bash
scp -r "Website Design for DPI Planning Center" usuario@seu-ip:/var/www/dpi-planning-center/
```

#### 4. Instalar dependências

```bash
cd /var/www/dpi-planning-center
npm install
```

#### 5. Fazer o build para produção

```bash
npm run build
```

Isso vai gerar uma pasta `dist/` com os arquivos otimizados para produção.

#### 6. Configurar o Nginx

Criar um arquivo de configuração do Nginx:

```bash
sudo nano /etc/nginx/sites-available/dpi-planning-center
```

Cole o seguinte conteúdo:

```nginx
server {
    listen 80;
    server_name seu-dominio.com.br www.seu-dominio.com.br;

    root /var/www/dpi-planning-center/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    error_page 404 /index.html;
}
```

#### 7. Ativar o site no Nginx

```bash
sudo ln -s /etc/nginx/sites-available/dpi-planning-center /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
```

#### 8. Verificar a configuração do Nginx

```bash
sudo nginx -t
```

Se estiver correto, reiniciar o Nginx:

```bash
sudo systemctl restart nginx
```

#### 9. Configurar SSL (HTTPS com Let's Encrypt)

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d seu-dominio.com.br -d www.seu-dominio.com.br
```

#### 10. Verificar se o site está online

Abra seu navegador e acesse:
- `https://seu-dominio.com.br`
- `https://www.seu-dominio.com.br`

### Atualizações futuras

Para atualizar o site em produção:

```bash
cd /var/www/dpi-planning-center
git pull origin main  # ou a branch que você usa
npm install
npm run build
sudo systemctl restart nginx
```

### Monitoramento e logs

Ver logs do Nginx:

```bash
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

### Troubleshooting

**Problema: Site retorna erro 404**
- Verifique se o `try_files $uri $uri/ /index.html;` está configurado no Nginx
- Reinicie o Nginx: `sudo systemctl restart nginx`

**Problema: Certificado SSL não renova**
- Configure renovação automática: `sudo systemctl enable certbot.timer`

**Problema: Mudanças não aparecem após atualizar**
- Limpe o cache do navegador (Ctrl+Shift+Delete)
- Verifique se o build foi recompilado corretamente
- Reinicie o Nginx