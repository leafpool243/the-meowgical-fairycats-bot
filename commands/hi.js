const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
    .setName("hi")
    .setDescription("Say hi to the bot!! :3");

async function hi(interaction) {
    await interaction.reply(`Hi there, ${interaction.member.nickname || interaction.user.username}! :3`);
}

module.exports = {
    "data": data,
    "execute": hi,
    "deployAll": true,
    "deployGuilds": [],
    "helpInfo": "bot say hi"
};