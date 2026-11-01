<div align="center">

# 💵 Bot Cotação

**Função Lambda em TypeScript que busca a cotação do dólar e envia o resumo no Telegram.**

![Node.js](https://img.shields.io/badge/Node.js-20%2B-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![AWS Lambda](https://img.shields.io/badge/AWS-Lambda-FF9900?style=for-the-badge&logo=awslambda&logoColor=white)
![Telegram](https://img.shields.io/badge/Telegram-Bot-26A5E4?style=for-the-badge&logo=telegram&logoColor=white)

</div>

---

## 📖 Sobre o projeto

O **Bot Cotação** é um microsserviço simples, pensado para rodar como uma **AWS Lambda** disparada por agendamento. A cada execução ele:

1. 🔎 **Busca** a cotação atual do dólar (USD → BRL) em uma API pública;
2. ✍️ **Monta** uma mensagem formatada com valores em reais e data/hora;
3. 📲 **Envia** a mensagem para um chat do Telegram.

O projeto foi estruturado para que a lógica fique em funções pequenas e independentes, separadas do _handler_ da Lambda. Isso permite rodar e testar tudo localmente, sem depender da AWS.

---

## ✨ Funcionalidades

- ✅ Consulta de cotação em tempo real (valor de compra e máxima do dia)
- ✅ Formatação em moeda brasileira (`R$`) e data no padrão `dd/mm/aaaa`
- ✅ Envio automático via Telegram Bot API
- ✅ Validação de resposta da API (erros HTTP geram falha explícita)
- ✅ Credenciais fora do código, via variáveis de ambiente
- ✅ Código 100% tipado com TypeScript

---

## 🧱 Arquitetura

```
EventBridge (agendamento)
        │
        ▼
   ┌──────────┐     ┌───────────────────┐     ┌──────────────────┐     ┌──────────────────┐
   │ handler  │ ──▶ │ buscarCotacaoDolar│ ──▶ │montarMensagem    │ ──▶ │ enviarTelegram   │
   └──────────┘     └───────────────────┘     └──────────────────┘     └──────────────────┘
                              │                                                  │
                              ▼                                                  ▼
                       API de cotação                                    Telegram Bot API
```

O `handler` não tem regra de negócio: apenas **orquestra** os três serviços na ordem certa.

---

## 📁 Estrutura de pastas

```
bot-cotacao/
├── src/
│   ├── handler.ts                    # Ponto de entrada da Lambda
│   ├── index.ts                      # Execução local (testes manuais)
│   ├── interface/
│   │   └── cotacao.interface.ts      # Tipos da cotação
│   └── service/
│       ├── cotacao.service.ts        # Busca a cotação na API
│       ├── mensagem.service.ts       # Monta o texto da mensagem
│       └── telegram.service.ts       # Envia a mensagem no Telegram
├── .env                              # Variáveis locais (NÃO versionado)
├── .env.example                      # Modelo das variáveis
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🛠️ Tecnologias

| Tecnologia            | Uso                                             |
| --------------------- | ----------------------------------------------- |
| **Node.js 20+**       | Runtime (fetch nativo e suporte a `--env-file`) |
| **TypeScript**        | Tipagem e organização do código                 |
| **tsx**               | Execução de arquivos `.ts` em desenvolvimento   |
| **@types/aws-lambda** | Tipos dos eventos da Lambda                     |
| **Telegram Bot API**  | Envio das mensagens                             |
| **AwesomeAPI**        | Fonte da cotação do dólar                       |

---

## 🚀 Como rodar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/) **20.6 ou superior**
- Um **bot do Telegram** criado pelo [@BotFather](https://t.me/BotFather)
- O **chat id** da conversa que vai receber as mensagens

### Passo a passo

**1. Clone o repositório**

```bash
git clone <url-do-repositorio>
cd bot-cotacao
```

**2. Instale as dependências**

```bash
npm install
```

**3. Configure as variáveis de ambiente**

Copie o arquivo de exemplo e preencha com os seus valores:

```bash
cp .env.example .env
```

**4. Execute**

```bash
npm run dev
```

Se tudo estiver certo, a mensagem chega no seu Telegram. 🎉

---

## 🔐 Variáveis de ambiente

| Variável           | Descrição                              |
| ------------------ | -------------------------------------- |
| `TELEGRAM_TOKEN`   | Token do bot, fornecido pelo BotFather |
| `TELEGRAM_CHAT_ID` | ID do chat que receberá as mensagens   |

Exemplo de `.env.example`:

```env
TELEGRAM_TOKEN=seu_token_aqui
TELEGRAM_CHAT_ID=seu_chat_id_aqui
```

> ⚠️ **Nunca** faça commit do arquivo `.env`. Ele já está listado no `.gitignore`. Se um token for exposto por engano, revogue-o imediatamente no BotFather (`/revoke`).

---

## 🤖 Como obter o token e o chat id

1. No Telegram, abra o **@BotFather** e envie `/newbot`.
2. Escolha um nome e um _username_ (terminado em `bot`). O BotFather devolve o **token**.
3. Abra a conversa com o **seu bot** e envie qualquer mensagem (ou toque em _Start_).
4. Acesse no navegador `https://api.telegram.org/bot<SEU_TOKEN>/getUpdates`.
5. No JSON, localize `chat` → `id`. Esse é o seu **chat id**.

---

## 📨 Exemplo de mensagem

```
Olá! Informações sobre a cotação do dólar abaixo:
Data: 30/10/2026
Hora: 19:00

COTAÇÃO:
Valor de compra: R$ 5,44
Valor mais alto do dia: R$ 5,46
```

---

## ☁️ Deploy

O deploy e a infraestrutura (agendamento, permissões, variáveis do ambiente) ficam a cargo da **equipe de infraestrutura**. Para configurar a Lambda, as informações relevantes são:

- **Handler:** `handler` exportado em `src/handler.ts`
- **Runtime:** Node.js 20 ou superior
- **Gatilho:** evento agendado (`ScheduledEvent`)
- **Variáveis necessárias:** `TELEGRAM_TOKEN` e `TELEGRAM_CHAT_ID`

> 🕐 **Atenção ao fuso horário:** a Lambda costuma rodar em UTC, então a hora exibida na mensagem pode divergir do horário de Brasília.

---

## 🗺️ Roadmap

- [ ] Testes automatizados para as funções de formatação
- [ ] Tratamento do fuso horário (America/Sao_Paulo)
- [ ] Suporte a múltiplas moedas (EUR, BTC...)
- [ ] Fila SQS para desacoplar o envio (microsserviço de notificações)

---

## 👤 Autor

Desenvolvido por **Alan**

---

<div align="center">

Feito com TypeScript e muito café ☕

</div>
