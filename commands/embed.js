const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Sends a test embed.");

async function embed(interaction) {
    const embed = new MessageEmbed()
        .setColor("#9C59B6")
        .setTitle("Hello!")
        .setDescription("This is an embed.")
        .setTimestamp();

    interaction.reply({ embeds: [embed] });
}

module.exports = {
    "data": data,
    "execute": embed,
    "deployAll": true,
    "deployGuilds": [],
    "helpInfo": "Sends test embed"
};