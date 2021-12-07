const { MessageActionRow, MessageButton } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
    .setName("buttons")
    .setDescription("Send a message with buttons");

async function buttons(interaction) {
    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId("button_yes")
                .setLabel("Yes")
                .setEmoji("✔")
                .setStyle("SUCCESS")
        )
        .addComponents(
            new MessageButton()
                .setCustomId("button_no")
                .setLabel("No")
                .setEmoji("✖")
                .setStyle("DANGER")
        );

    const link = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setURL("https://google.com")
                .setLabel("test link to google")
                .setStyle("LINK")
        );

    await interaction.reply({
        content: "**Example question**\nAre you sure you wish to continue? (*Yes* or *No*)",
        components: [row, link],
    });

    const filter = i => {
        if (i.user.id === interaction.user.id) return true;
        return i.reply({
            content: "Sorry, you cannot interact with this message because you did not send this command.",
            ephemeral: true,
        });
    };

    const collector = interaction.channel.createMessageComponentCollector({
        filter,
        max: 1,
        time: 1000 * 150,
    });

    collector.on("collect", async i => {

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
    });
}

module.exports = {
    "data": data,
    "execute": buttons,
    "deployAll": true,
    "deployGuilds": [],
    "helpInfo": "Testing buttons"
};