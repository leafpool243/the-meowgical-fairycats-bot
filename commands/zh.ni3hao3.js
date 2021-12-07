const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
    .setName("你好")
    .setDescription("跟機器人說你好！！ :3");

async function ni3hao3(interaction) {
<<<<<<< HEAD
    await interaction.reply(`${interaction.member.nickname || interaction.user.username}，你好！:3`);
}
=======
        await interaction.reply(`${interaction.member.nickname || interaction.user.username}，你好！:3`);
};
>>>>>>> f6265d4 (Changed format for commands)

module.exports = {
    "data": data,
    "execute": ni3hao3,
    "deployAll": true,
    "deployGuilds": [],
    "helpInfo": "機器人說你"
};