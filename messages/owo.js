const owoify = require("owoify-js").default;
const config = require("../config.json");

async function owo(message) {
    if (config.owoChannels.includes(message.channel.id)) {
        if (!(message.guild.me.permissions.has("MANAGE_WEBHOOKS") || message.guild.me.permissions.has("MANAGE_MESSAGES"))) {
            message.reply("You got lucky. I don't have permission to owoify your message\n\nMake sure I have the following permissions: `Manage Webhooks` and `Manage Messages`.");
            return; 
        }

        const owoified = {
            content: owoify(message.content, "uvu"),
            files: message.attachments,
            username: message.author.nickname || message.author.username,
            avatarURL: message.author.avatarURL({ "StaticImageURLOptions": { "format": "png" } })
        };

        const webhooks = await message.channel.fetchWebhooks();

        var sent = false;

        webhooks.each(webhook => {
            if (webhook.owner.id == config.clientId && webhook.name == "OwOify") {
                try {
                    webhook.send(owoified);
                    message.delete();
                    sent = true;
                } catch (e) {
                    console.log(`Unable to send owoified message. Error:\n${e}`);
                }
            }
        });

        if (!sent) {
            message.channel.createWebhook("OwOify");
            owo(message);
        }
    }
}

module.exports = {
    "execute": owo
};