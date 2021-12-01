const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("hi")
        .setDescription("Say hi to the bot!! :3"),
    async execute(interaction) {
        await interaction.reply(`Hi there, ${interaction.member.nickname || interaction.user.username}! :3`);
    },
};