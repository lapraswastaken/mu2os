
const fs = require("node:fs");
const { Client, Intents, Collection } = require("discord.js");
const { token, testGuild } = require("./config.json");
const { Routes } = require('discord-api-types/v9');
const { REST } = require("@discordjs/rest");

class CommandsClient extends Client {
    constructor (...args) {
        super(...args)
        /** @type {Collection} */
        this.commands = new Collection();
    }
}

const client = new CommandsClient({
    intents: [Intents.FLAGS.GUILDS]
})
const rest = new REST({ version: "9" })
    .setToken(token)

const commandFiles = fs.readdirSync("./commands")
    .filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.once("ready", () => {
    rest.put(Routes.applicationGuildCommands(client.user.id, testGuild), {
        body: client.commands.mapValues(cmd => cmd.toJSON())
    })
    console.log("Ready");
})

client.login(token);