require("dotenv").config();
const { Client, IntentsBitField, ActivityType } = require("discord.js");

// Initialize the bot with required intents
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

// Event when the bot is ready
client.on("ready", (c) => {
  console.log(`✅ ${c.user.tag} is online.`);

  // Set the bot's custom activity
  client.user.setActivity({
    name: "Coded by pinje",
    type: ActivityType.Custom,
  });
});

// Event when a new member joins the server
client.on("guildMemberAdd", async (member) => {
  // Find the role with the name 'Kōshū - 公衆'
  const role = member.guild.roles.cache.find((r) => r.name === "Kōshū - 公衆");
  if (role) {
    try {
      await member.roles.add(role);
      console.log(`Assigned the role '${role.name}' to ${member.user.tag}`);
    } catch (error) {
      console.error(`Could not assign role to ${member.user.tag}:`, error);
    }
  } else {
    console.error("Role 'Kōshū - 公衆' not found.");
  }
});

// Event for command interactions
client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "today") {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are 0-indexed
    const day = today.getDate();

    const dateMessage = `今日は ${year}年${month}月${day}日です`;
    interaction.reply(dateMessage);
  }
});

client.login(process.env.TOKEN);
