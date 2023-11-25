const { Client, GatewayIntentBits, Partials, Collection } = require('discord.js');
const { DisTube } = require('distube');
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { DeezerPlugin } = require("@distube/deezer");
const { YtDlpPlugin } = require("@distube/yt-dlp");

const config = require('../config.json');

const { loadEvents } = require('./Handlers/event');
const { loadCommands } = require('./Handlers/command');

const client = new Client({
    intents: [[GatewayIntentBits.Guilds]],
    partials: [Object.keys(Partials)],
});

client.commands = new Collection();
client.events = new Collection();

client.setMaxListeners(0);

client.login(config.TOKEN_BOT).then(() => {
   loadEvents(client);
   loadCommands(client);
});