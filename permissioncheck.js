/* Filters out non-testers when commands need testing */
const config = require("./config.json");
const strings = require("./strings.json");

module.exports = {
    async execute(interaction) {
        if (!config.privileged.includes(interaction.user.id)) {
            interaction.reply({
                content: strings._NO_PERMISSION,
                allowedMentions: { "user": [] }
            });

            return true;
        }
    }
};