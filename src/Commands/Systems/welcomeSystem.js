const { SlashCommandBuilder, ChatInputCommandInteraction, ChannelType } = require('discord.js');
const welcomeSchema = require('../../Models/welcomeSchema');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('sistema-bienvenida')
        .setDescription('Crea un sistema de bienvenidas')
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('Elije el canal donde se mostrará el mensaje de bienvenida')
                .addChannelTypes(ChannelType.GuildText)
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('mensaje')
                .setDescription('Ingresa el mensaje de bienvenida')
                .setMinLength(1)
                .setMaxLength(2000)
                .setRequired(true)
        ).addStringOption(option =>
            option.setName('imagen')
                .setDescription('Ingresa la imagén que saldrá en el mensaje')
                .setMinLength(1)
                .setRequired(true)
        ),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */

    async execute(interaction, client) {
        const canal = interaction.options.getChannel('canal');
        const mensaje = interaction.options.getString('mensaje').replace(/,/g, "\n");
        const imagen = interaction.options.getString('imagen');

        try {

            const data = await welcomeSchema.findOne({ guildId: interaction.guild.id });

            if (!data) {
                await welcomeSchema.create({
                    guildId: interaction.guild.id,
                    channelId: canal.id,
                    message: mensaje,
                    imageUrl: imagen
                })
                return interaction.reply({ content: 'Se ha creado correctamente el sistema de bienvenidas', ephemeral: true })
            } else {
                await welcomeSchema.findOneAndUpdate({
                    guildId: interaction.guild.id
                }, {
                    guildId: interaction.guild.id,
                    channelId: canal.id,
                    message: mensaje,
                    imageUrl: imagen
                })
                return interaction.reply({ content: 'Se ha actualizado correctamente el sistema de bienvenidas', ephemeral: true })
            }
        } catch (error) {
            console.log(error);
        }
    }
}