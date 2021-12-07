const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
    .setName("你好")
    .setDescription("跟機器人說你好！！ :3");

async function ni3hao3(interaction) {
        await interaction.reply(`${interaction.member.nickname || interaction.user.username}，你好！:3`);
};

module.exports = {
    "data": data,
    "execute": ni3hao3,
    "deployAll": true,
    "deployGuilds": [],
    "helpInfo": "機器人說你"
};