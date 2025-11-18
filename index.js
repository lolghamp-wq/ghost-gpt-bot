const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const PORT = process.env.PORT || 3000;

// Mini servidor HTTP para Render
app.get('/', (req, res) => res.send('Bot online!'));
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Bot Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const CHANNEL_NAME = '👾・ghost-gpt'; // Canal específico onde o bot vai responder

// Configuração da OpenAI
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Adicione sua chave da OpenAI como variável de ambiente
});
const openai = new OpenAIApi(configuration);

client.on('ready', () => {
    console.log(`${client.user.tag} está online!`);
});

client.on('messageCreate', async message => {
    if (message.channel.name !== CHANNEL_NAME) return;
    if (message.author.bot) return;

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message.content }],
        });

        const reply = response.data.choices[0].message.content;
        message.reply(reply);

    } catch (error) {
        console.error(error);
        message.reply("Desculpe, ocorreu um erro ao tentar responder.");
    }
});

// Login do bot
client.login(process.env.DISCORD_TOKEN);
