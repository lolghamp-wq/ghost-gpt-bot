const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const { GoogleGenerativeAI } = require("@google/generative-ai");

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

const CHANNEL_NAME = '👾・ghost-gpt';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-pro"  // <-- este funciona 100%
});

client.on('clientReady', () => {
    console.log(`${client.user.tag} está online!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.channel.name !== CHANNEL_NAME) return;

    try {
        const result = await model.generateContent(message.content);
        const reply = result.response.text();
        message.reply(reply);

    } catch (error) {
        console.error("ERRO GEMINI:", error.response?.data || error.message || error);
        message.reply("Erro ao responder (Gemini). Verifique sua API KEY.");
    }
});

client.login(process.env.DISCORD_TOKEN);
