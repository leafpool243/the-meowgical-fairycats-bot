const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders");
const tester = require("../testersonly.js")
const strings = require("../strings.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("[NOT FUNCTIONAL YET] Gets info about the current server or a user")
        .addSubcommand(subcommand =>
            subcommand
                .setName("user")
                .setDescription("[NOT FUNCTIONAL YET] Gets info about a user")
                .addUserOption(option => option
                    .setName("member")
                    .setDescription("The user you want info on")
                    .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName("server")
                .setDescription("[TESTERS ONLY] Gets info about the current server")),
    async execute(interaction) {
        if (!tester.execute(interaction)) return;

        if (interaction.options.getSubcommand() === "user") {
            interaction.reply(strings._NOT_FUNCTIONAL);
        } else if (interaction.options.getSubcommand() === "server") {
            const embed = new MessageEmbed()
                .setColor("#9C59B6")
                .setTitle("Server info")
                .setDescription(`
Server name: ${interaction.guild.name}
Server ID: ${interaction.guild.id}
Server icon: ${interaction.guild.iconURL() || "None"}
Server banner: ${interaction.guild.bannerURL() || "None"}
Total channels & categories: ${await interaction.guild.channels.fetch().then(channels => { return channels.size })}
Total members: ${interaction.guild.memberCount} members
Server preview enabled: ${interaction.guild.features.includes("PREVIEW_ENABLED") ? `Yes` : `No`}
Community enabled: ${interaction.guild.features.includes("COMMUNITY") ? `Yes` : `No`}
Member screening enabled: ${interaction.guild.features.includes("MEMBER_VERIFICATION_GATE_ENABLED") ? `Yes` : `No`}
Welcome screen enabled: ${interaction.guild.features.includes("WELCOME_SCREEN_ENABLED") ? `Yes` : `No`}
                `)
                .setFooter("Please note that some things may not be up to date immediately.")
                .setTimestamp()
                .setAuthor(interaction.user.tag, interaction.user.avatarURL({ "StaticImageURLOptions": { "format": "png" } }))

            interaction.reply({ embeds: [embed] });
        }

    },
};