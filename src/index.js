const {Client, GatewayIntentBits, Partials, Collection} = require('discord.js');
const config = require('../config.json');

const {loadEvents} = require('./Handlers/event');
const {loadCommands} = require('./Handlers/command');

const client = new Client({
    intents: [ [GatewayIntentBits.Guilds]],
    partials: [Object.keys(Partials)],
});

client.commands = new Collection();
client.events = new Collection();

client.setMaxListeners(0);

client.login(config.TOKEN_BOT).then(async () => {
    await loadEvents(client);
    await loadCommands(client);
}).catch((err) => {
    console.error(err);
});