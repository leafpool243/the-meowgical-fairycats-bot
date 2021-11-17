const { SlashCommandBuilder } = require("@discordjs/builders");
const permissioncheck = require("../permissioncheck.ts")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("spam")
        .setDescription("SPAM >:3")
        .addIntegerOption(option => option
            .setName("num_of_times")
            .setDescription("The amount of times you want it to spam.")
            .setRequired(true))
        .addStringOption(option => option
            .setName("message")
            .setDescription("The message you want it to spam")
            .setRequired(true)),
    async execute(interaction) {
        if (!permissioncheck.execute(interaction)) return;

        await interaction.reply({
            content: "Starting spam now.",
            ephemeral: true
        });

        for(let i = 0; i < interaction.options.getInteger("num_of_times"); i++) {
            interaction.channel.send(interaction.options.getString("message"));
        }
    },
};