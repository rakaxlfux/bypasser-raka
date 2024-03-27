const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apistatus')
        .setDescription('Get the API status'),

        async execute(interaction, client) {
            try {
                const response = await fetch('https://stickx.top/api-key/');
                const data = await response.json();
        
                let statusMessage = data.status; // Default message
                if (data.status === 'success') {
                    statusMessage = 'Succeeded.'; // Custom message for 'success'
        
                    const { api_key, quota } = data.data[0];
                    const embed = new EmbedBuilder()
                        .setColor(0x0099FF)
                        .setTitle('API Status')
                        .addFields(
                            { name: 'Status', value: `\`\`${statusMessage}\`\`` },
                            { name: 'API Key', value: `\`\`${api_key}\`\`` },
                            { name: 'Quota', value: `\`\`${quota.toString()}\`\`` }
                        )
                        .setTimestamp()
                        .setFooter({ text: 'Made by ! raka', iconURL: 'https://i.imgur.com/ONHipCl.jpeg' });
        
                    await interaction.reply({ embeds: [embed] });
                } else {
                    await interaction.reply('API returned an unsuccessful status.');
                }
            } catch (error) {
                console.error('Error fetching API status:', error);
                await interaction.reply('Failed to fetch API status.');
            }
        }
    };
