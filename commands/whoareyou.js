const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
    .setName("whoareyou")
    .setDescription("Did I forget to introduce myself?");

async function whoareyou(interaction) {
    await interaction.reply({
        content: "I was created by <@758741446638567434> so that he could test things.",
        allowedMentions: { "users" : []}});
}

module.exports = {
    "data": data,
    "execute": whoareyou,
    "deployAll": true,
    "deployGuilds": [],
    "helpInfo": "Shows some bot information"
};