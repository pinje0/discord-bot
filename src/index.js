require("dotenv").config();
const { Client, IntentsBitField } = require("discord.js");

// Guilds = Server
// Client = User

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);
});

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName == "hey") {
    interaction.reply("hey!");
  }

  if (interaction.commandName == "ping") {
    interaction.reply("Pong!");
  }
});

client.login(process.env.TOKEN);
