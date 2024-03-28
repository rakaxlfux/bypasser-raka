// © Licensed by ! raka.
// Please credit me if you used this source code, it will be very appreciated.

const { SlashCommandBuilder, EmbedBuilder } = require('@discordjs/builders');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('apistatus')
        .setDescription('Get the API status'),

        async execute(interaction, client) {
            if (interaction.member.roles.cache.some(role => role.id === '1206194384496885861')) {
                 try {
            const response = await fetch('https://stickx.top/api-key/');
            const data = await response.json();

            // Construct the status string with capitalized keys for status_api
            let statusApiString = '';
            for (const [key, value] of Object.entries(data.status_api)) {
                statusApiString += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}\n`; // Capitalize first letter
            }

            // Extract api_key and quota from data
            const { api_key, quota } = data.data[0];

            // Create the embed message
            const embed = new EmbedBuilder()
                .setColor(0x0099FF)
                .setTitle('API Status and Details')
                .addFields(
                    { name: 'Status API', value: statusApiString },
                    { name: 'API Key', value: api_key },
                    { name: 'Quota', value: quota.toString() }
                )
                .setTimestamp();

            // Send the embed message as a reply
            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching API status:', error);
            await interaction.reply('Failed to fetch API status.');
        }
        } else {
            await interaction.reply({ content: 'You do not have permission to use this command.\nOnly bypassers can use it.', ephemeral: true });
        }
        }
    };