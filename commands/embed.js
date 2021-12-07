const { MessageEmbed } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Sends a test embed.");
<<<<<<< HEAD

async function embed(interaction) {
    const embed = new MessageEmbed()
        .setColor("#9C59B6")
        .setTitle("Hello!")
        .setDescription("This is an embed.")
        .setTimestamp();

    interaction.reply({ embeds: [embed] });
}
=======

async function embed(interaction) {
        const embed = new MessageEmbed()
            .setColor("#9C59B6")
            .setTitle("Hello!")
            .setDescription("This is an embed.")
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    }
>>>>>>> f6265d4 (Changed format for commands)

module.exports = {
    "data": data,
    "execute": embed,
    "deployAll": true,
    "deployGuilds": [],
    "helpInfo": "Sends test embed"
};