const { MessageActionRow, MessageButton } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
    .setName("buttons")
    .setDescription("Send a message with buttons")

async function buttons(interaction) {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("button_yes")
                .setLabel("Yes")
                .setEmoji("✔")
                .setStyle("SUCCESS")
                .setDisabled(true)
        )
        .addComponents(
            new MessageButton()
                .setCustomId("button_no")
                .setLabel("No")
                .setEmoji("✖")
                .setStyle("DANGER")
                .setDisabled(true)
        );

    interaction.editReply({
        components: [row, link],
    });

    if (i.customId === "button_yes") {
        i.reply({
            content: "You selected “yes”.",
        });
    } else if (i.customId === "button_no") {
        i.reply({
            content: "You selected “no”.",
        });
    }
}

module.exports = {
    "data": data,
    "execute": buttons,
    "deployAll": true,
    "deployGuilds": [],
    "helpInfo": "Testing buttons"
};