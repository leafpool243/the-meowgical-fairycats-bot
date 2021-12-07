const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
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
        const returnView = (column) => {
            db.get("SELECT ? FROM users WHERE userid = ?", column, interaction.user.id, (row) => {
                return (!row ? "Not set" : row.column)
            })
        }

        if (interaction.options.getSubcommand() === "view") {
            const embed = new MessageEmbed()
                .setColor("#9C59B6")
                .setTitle("Current config")
                .setDescription(`
Test: ${returnView("test")}
                `);
            interaction.reply({ embeds: [embed] });
        } else if (interaction.options.getSubcommand() === "test") {
            db.run("UPDATE users SET test = ? WHERE userid = ?", [(interaction.options.getString("value") === "unset" ? undefined : interaction.options.getString("value")), interaction.user.id])
            interaction.reply(`Option \`${interaction.options.getSubcommand()}\` has been set to \`${interaction.options.getString("value")}\``);
        }
    },
};