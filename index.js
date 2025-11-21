const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const OpenAI = require('openai');

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

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

client.on('ready', () => {
    console.log(`${client.user.tag} está online!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.channel.name !== CHANNEL_NAME) return;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [{ role: "user", content: message.content }],
        });

        const reply = response.choices[0].message.content;
        message.reply(reply);

    } catch (error) {
        console.error(error);
        message.reply("Erro ao responder. Verifique sua API KEY ou modelo.");
    }
});

client.login(process.env.DISCORD_TOKEN);
