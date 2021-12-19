const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const mongo = require("../features/mongo.js");
const userSchema = require("../mongo-schemas/user-schema.js");

const data = new SlashCommandBuilder()
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
            .addStringOption(option => option
                .setName("value")
                .setDescription("The setting you want to view the value for")
                .addChoices([
                    [
                        "Test",
                        "test"
                    ]
                ])
                .setRequired(true)));

async function config(interaction) {
    if (interaction.options.getSubcommand() === "view") {
        let result;
        const setting = interaction.options.getString("value");
        
        await mongo().then(async (mongoose) => {
            try {
                const ID = interaction.user.id;
                result = await userSchema.findOne({
                    ID,
                    setting
                });
            } finally {
                mongoose.connection.close();
            }
        });

        let embed = new MessageEmbed()
            .setColor("#9C59B6")
            .setTitle(`Current value of ${setting}`)
            .setDescription(`
\`${setting}\` is currently set to \`${result[setting]}\`.
                `);
        interaction.reply({ embeds: [embed] });
    } else if (interaction.options.getSubcommand() === "test") {
        await mongo().then(async (mongoose) => {
            try {
                await userSchema.findOneAndUpdate({
                    _id: interaction.user.id
                }, {
                    _id: interaction.user.id,
                    test: interaction.options.getString("value") === "unset" ? undefined : interaction.options.getString("value")
                }, {
                    upsert: true
                }).exec();
            
                interaction.reply(`Option \`${interaction.options.getSubcommand()}\` has been set to \`${interaction.options.getString("value")}\``);
            } finally {
                mongoose.connection.close();
            }
        });
    }
}

module.exports = {
    "data": data,
    "execute": config,
    "deployAll": true,
    "deployGuilds": [],
    "helpInfo": "Update or view config"
};