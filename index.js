const fs = require("fs");
const { Client, Collection, Intents } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const sqlite = require("sqlite3").verbose();
let db = new sqlite.Database("database.db", sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE);

const myIntents = new Intents();
myIntents.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES);

const client = new Client({ intents: myIntents });

client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once("ready", () => {
    db.run("CREATE TABLE IF NOT EXISTS users(userid INTEGER NOT NULL, test STRING)");
<<<<<<< HEAD
    console.log(`Logged in as ${client.user.username}`);
    // client.user.setActivity("with your existence. . . .", { type: "PLAYING"});
    client.user.setActivity("with my code (testing right now). . . .", { type: "PLAYING"});
=======
	console.log(`Logged in as ${client.user.username}`);
    // client.user.setActivity("with your existence. . . .", { type: "PLAYING"})
    client.user.setActivity("with my code (testing right now). . . .", { type: "PLAYING"})
>>>>>>> f6265d4 (Changed format for commands)
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
    if (message.channel.id == process.env.RATING_CHANNEL_ID) {
        await message.react("1️⃣");
        await message.react("2️⃣");
        await message.react("3️⃣");
        await message.react("4️⃣");
        await message.react("5️⃣");
    }
});

client.login(process.env.TOKEN);