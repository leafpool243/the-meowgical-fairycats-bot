const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const sqlite = require("sqlite3").verbose();
let db = new sqlite.Database("database.db", sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);

const statuses = [
    "your existence",
    "with my code",
    "DIE, BUG, DIE",
    "meeowwww!!",
    "*hiss* a bug. yuck.",
    "OwO! :3"
];

const fancy = [
    "♡",
    "✧"
];

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);

const client = new Client({ intents: myIntents });

client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

const messageFeatures = fs.readdirSync("./messages").filter(file => file.endsWith(".js"));

client.once("ready", () => {
    db.run("CREATE TABLE IF NOT EXISTS users(userid INTEGER NOT NULL, test STRING)");
    console.log(`Logged in as ${client.user.username}`);
    
    var chosenSymbol = fancy[Math.floor(Math.random() * fancy.length)];
    var chosenStatus = `${chosenSymbol} ${statuses[Math.floor(Math.random() * statuses.length)]} ${chosenSymbol}`;
    client.user.setActivity(chosenStatus, { type: "PLAYING" });

    setInterval(() => {
        var chosenSymbol = fancy[Math.floor(Math.random() * fancy.length)];
        var chosenStatus = `${chosenSymbol} ${statuses[Math.floor(Math.random() * statuses.length)]} ${chosenSymbol}`;
        client.user.setActivity(chosenStatus, { type: "PLAYING" });
    }, 10 * 1000);
});

client.on("interactionCreate", async interaction => {
    if (!interaction.isCommand()) return;

    db.get("SELECT * FROM users WHERE userid = ?", [interaction.user.id], (err, row) => {
        if (err) {
            console.log(err);
            return;
        }
        if (row === undefined) {
            let insert = db.prepare("INSERT INTO users VALUES(?,?)");
            insert.run(interaction.user.id, null);
            insert.finalize();
            return;
        }
    });

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        return interaction.reply({ content: "There was an error executing this command!", ephemeral: true });
    }
});

client.on("messageCreate", async message => {
    if (message.author.bot || message.webhookId) return;

    if (message.channel.id == process.env.RATING_CHANNEL_ID) {
        await message.react("1️⃣");
        await message.react("2️⃣");
        await message.react("3️⃣");
        await message.react("4️⃣");
        await message.react("5️⃣");
    }

    for (const messageFeature of messageFeatures) {
        const feature = require(`./messages/${messageFeature}`);
        feature.execute(message);
    }
});

client.login(process.env.TOKEN);