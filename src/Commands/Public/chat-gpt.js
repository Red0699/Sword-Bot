const { SlashCommandBuilder, EmbedBuilder, ChatInputCommandInteraction } = require('discord.js');

const puppeteer = require('puppeteer');

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

    /**
     * 
     * @param {Client} client
     * @param {ChatInputCommandInteraction} interaction 
     * @returns 
     */

    async execute(interaction, client) {
        await interaction.reply({ content: `🧠 Cargando su respuesta... Esto puede tomar un tiempo`, ephemeral: true });

        const mensaje = interaction.options.getString('mensaje');
        try {
            const browser = await puppeteer.launch({ headless: true });

            const page = await browser.newPage();

            await page.goto('https://chat-app-f2d296.zapier.app/')

            const textBoxSelector = 'textarea[aria-label="chatbot-user-prompt"]'
            await page.waitForSelector(textBoxSelector)
            await page.type(textBoxSelector, mensaje);

            await page.keyboard.press('Enter');

            await page.waitForSelector('[data-testid="final-bot-response] p');

            var value = await page.$$eval('[data-testid="final-bot-response"]', async (e) => {
                return e.map((e) => e.textContent)
            })

            setTimeout(async () => {
                if (value.length == 0) return await interaction.editReply({ content: `Hubo un error al obtener la respuesta, intentelo mas tarde` });
            }, 30000);

            await browser.close();

            value.shift();

            const embed = new EmbedBuilder()
                .setTitle('Mensaje de ChatGPT')
                .setAuthor({
                    name: `${interaction.user.tag} hizo una pregunta a ChatGPT`,
                    iconURL: interaction.user.avatarURL({ dynamic: true })
                })
                .setColor('Random')
                .setDescription(`Pregunta: \`\`\`${mensaje}\`\`\`\n\n Respuesta: \`\`\`${value.join(`\n\n\n\n`)}\`\`\``)
                .setFooter({text: `🤖 Generado por Sword Bot. | Basado en ChatGPT`})

            return await interaction.reply({ embeds: [embed] })
        } catch (error) {
            console.log(error);
            interaction.editReply({ content: `Hubo un error al obtener la respuesta, intentelo mas tarde` });
        }

        /*
        try {
            const res = await configuration.chat.completions.create({
                model: 'text-davinci-003',
                prompt: mensaje,
                max_tokens:2048,
                temperature: 0.5,
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
        */
    }
}
