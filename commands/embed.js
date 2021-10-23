const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("embed")
        .setDescription("Sends a test embed."),
    async execute(interaction) {
        const embed = new MessageEmbed()
            .setColor("#9C59B6")
            .setTitle("Hello!")
            .setDescription("This is an embed.")
            .setTimestamp();

        interaction.reply({ embeds: [embed] });
    },
};