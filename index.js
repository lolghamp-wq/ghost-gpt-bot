import OpenAI from "openai";
import { Client, GatewayIntentBits } from "discord.js";
import "dotenv/config";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

bot.on("ready", () => {
  console.log("BOT ONLINE!");
});

bot.on("messageCreate", async (msg) => {
  if (msg.author.bot) return;

  try {
    const response = await openai.responses.create({
      model: "gpt-5.1",
      input: msg.content
    });

    msg.reply(response.output_text);

  } catch (e) {
    console.error(e);
    msg.reply("Erro ao responder.");
  }
});

bot.login(process.env.DISCORD_TOKEN);
