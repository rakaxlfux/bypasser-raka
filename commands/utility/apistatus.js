/** 
    ___                                                      
 .'/   \                                                     
/ /     \                                .                   
| |     |                              .'|                   
| |     |          .-,.--.           .'  |                   
|/`.   .'          |  .-. |    __   <    |            __     
 `.|   |           | |  | | .:--.'.  |   | ____    .:--.'.   
  ||___|           | |  | |/ |   \ | |   | \ .'   / |   \ |  
  |/___/           | |  '- `" __ | | |   |/  .    `" __ | |  
  .'.--.           | |      .'.''| | |    /\  \    .'.''| |  
 | |    |          | |     / /   | |_|   |  \  \  / /   | |_ 
 \_\    /          |_|     \ \._,\ '/'    \  \  \ \ \._,\ '/ 
  `''--'                    `--'  `"'------'  '---'`--'  `"  

 * @INFO
 *  Source Code By | ! raka
 * @INFO
 * Warning!       | Do not remove credits and watermarks!
 * @INFO
*/        
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
        }
    };
