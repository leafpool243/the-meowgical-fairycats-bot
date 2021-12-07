const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong!")

async function ping(interaction) {
        await interaction.reply("Pong!");
    }

module.exports = {
    "data": data,
    "execute": ping,
    "deployAll": true,
    "deployGuilds": [],
    "helpInfo": "Replies with pong"
};