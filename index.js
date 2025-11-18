// index.js atualizado para Render

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const CHANNEL_NAME = '👾・ghost-gpt'; // Canal específico onde o bot vai responder

client.on('ready', () => {
    console.log(`${client.user.tag} está online!`);
});

client.on('messageCreate', message => {
    if(message.channel.name !== CHANNEL_NAME) return; // Ignora mensagens de outros canais
    if(message.author.bot) return; // Ignora mensagens de bots

    // Sistema Pokémon e respostas casuais
    if(message.content.toLowerCase().includes('pokemon')) {
        message.reply('🎮 Sistema Pokémon ativado!');
    } else {
        message.reply('Olá! Eu sou o GHOST GPT 👻');
    }
});

// Login usando variável de ambiente
client.login(process.env.DISCORD_TOKEN);
