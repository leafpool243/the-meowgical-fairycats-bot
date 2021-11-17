const { SlashCommandBuilder } = require("@discordjs/builders");
const permissioncheck = require("../permissioncheck.ts")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("spam")
        .setDescription("SPAM >:3"),
    async execute(interaction) {
        if (!tester.execute(interaction)) return;

        await interaction.reply({
            content: "Starting chaos now.",
            ephemeral: true
        });

        interaction.channel.send("meow")
    },
};