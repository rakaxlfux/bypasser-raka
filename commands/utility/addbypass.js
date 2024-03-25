const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bypass') // Replace with your desired command name
        .setDescription('Bypass your provided link.') // Replace with your desired command description
        .addStringOption(option =>
            option.setName('link')
                .setDescription('Write your getkey link here!')
                .setRequired(true)
            ),

    async execute(interaction) {
        if (interaction.member.roles.cache.some(role => role.id === '1206194384496885861')) {
        const link = interaction.options.getString('link');
        let apiUrl;
        let param;

    try {
            // Attempt to create a new URL object to validate the link
            const parsedUrl = new URL(link);

            // Determine the API URL based on the link provided
            if (link.includes('codex')) {
                apiUrl = "https://stickx.top/api-codex/?token=";
                param = parsedUrl.searchParams.get('token');
            } else if (link.includes('arceusx')) {
                apiUrl = "https://stickx.top/api-arceusx/?hwid=";
                param = parsedUrl.searchParams.get('hwid');
            } else if (link.includes('hydrogen')) {
                apiUrl = "https://stickx.top/api-hydrogen/?hwid=";
                param = parsedUrl.searchParams.get('hwid');
            } else if (link.includes('hohohubv')) {
                apiUrl = "https://stickx.top/api-hohohubv/?hwid=";
                param = parsedUrl.searchParams.get('hwid');
            } else {
                apiUrl = "https://stickx.top/api-fluxus/?hwid=";
                param = parsedUrl.searchParams.get('hwid');
            }

            param += "Put The ApiKey Here";
            const [param1, apiKey] = param.split('&');

        // Send a waiting message
        const waitEmbed = new EmbedBuilder()
            .setTitle("Processing ⏳")
            .setDescription("Bypass operation in progress...")
            .setColor(0xFFFF00);
        await interaction.reply({ embeds: [waitEmbed] });

        // Make the GET request to the API
        const response = await fetch(apiUrl + param);
        const data = await response.json(); // Parse the JSON response

        // Check if the 'key' in the response indicates a successful bypass
        if (data.key) {
            // Handle the success case
            const successEmbed = new EmbedBuilder()
                .setTitle("Multi-Bypass")
                .setDescription(`The Bypass Has Been **Executed**!\nAnd Please Check The Responses.`) // Include the actual key from the response
                .setColor(0x00FF00)
                .setThumbnail('https://i.imgur.com/ewbSyHv.png') // Yall can change this.
                .addFields(
                    { name: '**Responses** (PC):', value: `\`\`\`${data.key}\`\`\`` },
                    { name: '**Responses** (PHONE):', value: `${data.key}` },
                )
                .setTimestamp()
                .setFooter({ text: 'Made by ! raka', iconURL: 'https://i.imgur.com/ONHipCl.jpeg' }); // Yall can change it if ya want.
            await interaction.editReply({ embeds: [successEmbed] });
        } else {
            // Handle the error case
            const errorEmbed = new EmbedBuilder()
                .setTitle("Bypass Failed!")
                .setDescription("An error occurred during the bypass operation.")
                .setColor(0xFF0000);
            await interaction.editReply({ embeds: [errorEmbed] });
        }
    } catch (error) {
        if (error.code === 'ERR_INVALID_URL') {
            // If the URL is invalid, reply with a custom message
            await interaction.reply("That's wrong. Please provide a valid URL.");
        } else {
            // Handle other potential errors
            await interaction.reply(`An error occurred: ${error.message}`);
        }
    }
} else {
    await interaction.reply({ content: 'You do not have permission to use this command.\nOnly bypassers can use it.', ephemeral: true });
}
    }
};
