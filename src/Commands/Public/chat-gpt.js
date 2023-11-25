/*
const { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } = require('discord.js');
const { OpenAI } = require('openai');

const config = require('./../../../config.json');

const configuration = new OpenAI({
    apiKey: config.openAiToken,
});

module.exports = {
    data: new SlashCommandBuilder()
        .setName('chat-gpt')
        .setDescription('Puedes mandar una pregunta a ChatGPT')
        .addStringOption(option =>
            option.setName('mensaje')
                .setDescription('Escribe una pregunta')
                .setMaxLength(500)
                .setRequired(true)
        ),

    

    async execute(interaction) {
        const mensaje = interaction.options.getString('mensaje');
        try {
            const res = await configuration.chat.completions.create({
                model: 'gpt-3.5-turbo',
                prompt: mensaje,
                max_tokens:2048,
                temperature: 0.5
            });

            const embed = new EmbedBuilder()
                .setTitle('Mensaje de ChatGPT')
                .setAuthor({
                    name: `${interaction.user.tag} hizo una pregunta a ChatGPT`, 
                    iconURL: interaction.user.avatarURL({dynamic:true})
                })
                .setColor('Random')
                .setDescription(`Pregunta: \`\`\`${mensaje}\`\`\`\n\n Respuesta: \`\`\`${res.data.choices[0].text}\`\`\``)

                return await interaction.reply({embeds: [embed]})
        } catch (error) {
            console.log(error);
        }
    }
}
*/