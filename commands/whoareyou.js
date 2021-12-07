const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
    .setName("whoareyou")
<<<<<<< HEAD
    .setDescription("Did I forget to introduce myself?");
=======
    .setDescription("Did I forget to introduce myself?")
>>>>>>> f6265d4 (Changed format for commands)

async function whoareyou(interaction) {
    await interaction.reply({
        content: "I was created by <@758741446638567434> so that he could test things.",
        allowedMentions: { "users" : []}});
}

<<<<<<< HEAD
module.exports = {
=======
    module.exports = {
>>>>>>> f6265d4 (Changed format for commands)
    "data": data,
    "execute": whoareyou,
    "deployAll": true,
    "deployGuilds": [],
    "helpInfo": "Shows some bot information"
};