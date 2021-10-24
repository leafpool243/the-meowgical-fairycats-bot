const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("whoareyou")
        .setDescription("Did I forget to introduce myself?"),
    async execute(interaction) {
        await interaction.reply({
            content: "I was created by <@758741446638567434> so that he could test things.",
            allowedMentions: { "users" : []}});
    },
};