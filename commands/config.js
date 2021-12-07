const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const tester = require("../testersonly.js")
const sqlite = require("sqlite3").verbose();
let db = new sqlite.Database("database.db", sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);

module.exports = {
    data: new SlashCommandBuilder()
        .setName("config")
        .setDescription("change some settings")
        .addSubcommand(subcommand =>
            subcommand
                .setName("test")
                .setDescription("test setting")
                .addStringOption(option => option
                    .setName("value")
                    .setDescription("Value A")
                    .addChoices([
                        [
                            "A",
                            "a"
                        ],
                        [
                            "B",
                            "b"
                        ],
                        [
                            "unset",
                            "unset"
                        ]
                    ])
                    .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName("view")
                .setDescription("View current config")
            ),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === "view") {
            const embed = new MessageEmbed()
                .setColor("#9C59B6")
                .setTitle("Current config")
                .setDescription(`
Test: ${JSON.stringify(db.prepare(`SELECT test FROM users WHERE userid=${interaction.user.id}`).get())}
                `);
            interaction.reply({ embeds: [embed] });
        } else if (interaction.options.getSubcommand() === "test") {
            db.run("UPDATE users SET test = ? WHERE userid = ?", [(interaction.options.getString("value") === "unset" ? undefined : interaction.options.getString("value")), interaction.user.id])
            interaction.reply(`Option \`${interaction.options.getSubcommand()}\` has been set to \`${interaction.options.getString("value")}\`\n\nUnfortunately, the \`/config view\` command does not currently work, so currently, there is no way to see what value you currently have set.`);
        }
    },
};