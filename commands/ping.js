const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
    .setName("ping")
<<<<<<< HEAD
    .setDescription("Replies with pong!");

async function ping(interaction) {
    await interaction.reply("Pong!");
}
=======
    .setDescription("Replies with pong!")

async function ping(interaction) {
        await interaction.reply("Pong!");
    }
>>>>>>> f6265d4 (Changed format for commands)

module.exports = {
    "data": data,
    "execute": ping,
    "deployAll": true,
    "deployGuilds": [],
    "helpInfo": "Replies with pong"
};