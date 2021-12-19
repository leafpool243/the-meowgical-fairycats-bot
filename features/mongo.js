const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

module.exports = async (client) => {
    try {
        await mongoose.connect(process.env.MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        return mongoose;
    } catch(e) {
        console.log("Unable to connect to Mongo database."); 
        const sendChannel = client.channels.cache.get(process.env.LOGCHANNEL);
        await sendChannel.send(`Unable to connect to database:
\`\`\`
${e}
\`\`\`
        `);
        process.exit(1);
    }
};