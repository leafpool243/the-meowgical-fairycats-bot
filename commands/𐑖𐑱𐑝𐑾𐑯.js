const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
    .setName("𐑖𐑱𐑝𐑾𐑯")
    .setDescription("𐑿 𐑯𐑴 𐑞 𐑖𐑱𐑝𐑾𐑯 𐑨𐑤𐑓𐑩𐑚𐑧𐑑?");

async function shavian(interaction) {
    await interaction.reply("𐑴 𐑿 𐑯𐑴 𐑞 [𐑖𐑱𐑝𐑾𐑯 𐑨𐑤𐑓𐑩𐑚𐑧𐑑](https://en.wikipedia.org/wiki/Shavian_alphabet)! 𐑒𐑵𐑤!\n> ||*Oh you know the [Shavian alphabet (https://en.wikipedia.org/wiki/Shavian_alphabet)](https://en.wikipedia.org/wiki/Shavian_alphabet)! Cool!*||");
}

module.exports = {
    "data": data,
    "execute": shavian,
    "deployAll": true,
    "deployGuilds": [],
    "helpInfo": "bot say hi"
};