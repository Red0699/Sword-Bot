const {Client, GatewayIntentBits, Partials, Collection} = require('discord.js');
const config = require('../config.json');

const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)],
});

client.setMaxListeners(0);

//Comando prueba
client.on('messageCreate', async (message) => {
    if(message.content === 'Jose'){
        return message.reply({content: 'es manco >:)'});
    }
});

client.login(config.TOKEN_BOT).then((result) => {
    console.log(`${client.user.username} is online`);
}).catch((error) => {
    console.log(error);
});