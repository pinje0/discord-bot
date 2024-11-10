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

  // Send a message to the '#in' channel (if it exists)
  const inChannel = member.guild.channels.cache.find((ch) => ch.name === "in");
  if (inChannel) {
    inChannel.send(`**${member.user.tag}** has joined the server!`); // Make the username and tag bold
  } else {
    console.error("Channel '#in' not found.");
  }
});

// Event for member leaving the server
client.on("guildMemberRemove", (member) => {
  // Fetch the specific channel by name or ID
  const channel = member.guild.channels.cache.find((ch) => ch.name === "out");
  if (channel) {
    channel.send(`**${member.user.tag}** just left the server.`); // Make the username and tag bold
  } else {
    console.error("Channel '#out' not found.");
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
