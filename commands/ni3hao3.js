const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("你好")
        .setDescription("跟機器人說你好！！ :3"),
    async execute(interaction) {
        await interaction.reply(`${interaction.member.nickname || interaction.user.username} 你好！:3`);
    },
};