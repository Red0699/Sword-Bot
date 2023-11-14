module.exports = {
    name: 'ready',
    once: true,
    async execute(client){
        console.log(`The ${client.user.username} is online`);
    }
}