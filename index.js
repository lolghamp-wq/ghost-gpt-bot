// index.js atualizado para Render com mini servidor HTTP

const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// Mini servidor HTTP só para o Render aceitar o deploy
app.get('/', (req, res) => res.send('Bot online!'));
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

// Bot Discord
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const CHANNEL_NAME = '👾・ghost-gpt'; // Canal específico onde o bot vai responder

client.on('ready', () => {
    console.log(`${client.user.tag} está online!`);
});

client.on('messageCreate', message => {
    if (message.channel.name !== CHANNEL_NAME) return; // Ignora outros canais
    if (message.author.bot) return; // Ignora bots

    // Sistema Pokémon e respostas casuais
    if (message.content.toLowerCase().includes('pokemon')) {
        message.reply('🎮 Sistema Pokémon ativado!');
    } else {
        message.reply('Olá! Eu sou o GHOST GPT 👻');
    }
});

// Login usando variável de ambiente
client.login(process.env.DISCORD_TOKEN);
