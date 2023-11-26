const {GuildMember, EmbedBuilder} = require('discord.js');
const welcomeSchema = require('../../Models/welcomeSchema');

module.exports = {
    name: 'guildMemberAdd',
    once: false,

    /**
     * 
     * @param {GuildMember} member
     */

    async execute(member){
        const data = await welcomeSchema.findOne({guildId: member.guild.id});

        if(!data) return;

        const mensaje = data.message;
        const imagen = data.imageUrl;
        const canal = await member.guild.channels.cache.get(data.channelId);

        const embed = new EmbedBuilder()
            .setTitle(`${member.user.username} acaba de unirse`)
            .setDescription(mensaje)
            .setImage(imagen)
            .setColor('Random')
            .setFooter({ text: `${member.user.id}`})

        return canal?.send({embeds: [embed]})
    }

}