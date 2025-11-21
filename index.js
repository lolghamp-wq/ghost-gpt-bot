const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const Groq = require("groq-sdk");

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Bot online!'));
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Nome do canal onde o bot deve responder
const CHANNEL_NAME = '👾・ghost-gpt';

// Groq (API grátis)
const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

client.on('ready', () => {
    console.log(`${client.user.tag} está online!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.channel.name !== CHANNEL_NAME) return;

    try {
        const response = await groq.chat.completions.create({
            model: "llama3-70b-8192",
            messages: [
                { role: "user", content: message.content }
            ],
        });

        const reply = response.choices[0].message.content;
        message.reply(reply);

    } catch (error) {
        console.error("ERRO GROQ:", error.response?.data || error.message || error);
        message.reply("Erro ao responder (GROQ). Verifique sua chave.");
    }
});

// Login do bot do Discord
client.login(process.env.DISCORD_TOKEN);
