const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
    .setName("ππ±ππΎπ―")
    .setDescription("πΏ π―π΄ π ππ±ππΎπ― π¨π€ππ©ππ§π?");

async function shavian(interaction) {
    await interaction.reply("π΄ πΏ π―π΄ π [ππ±ππΎπ― π¨π€ππ©ππ§π](https://en.wikipedia.org/wiki/Shavian_alphabet)! ππ΅π€!\n> ||*Oh you know the [Shavian alphabet (https://en.wikipedia.org/wiki/Shavian_alphabet)](https://en.wikipedia.org/wiki/Shavian_alphabet)! Cool!*||");
}

module.exports = {
    "data": data,
    "execute": shavian,
    "deployAll": true,
    "deployGuilds": [],
    "helpInfo": "bot say hi"
};