const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId } = require("./config.json");
const dotenv = require("dotenv");
dotenv.config()

const commands = [];
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (command.deployAll) {
        commands.push(command.data.toJSON());
    }
}

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

rest.put(Routes.applicationCommands(clientId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .then(() => console.log(commands))
    .catch(console.error);