/*
  _             _                                 
 | |           | |                                
 | |  _ __ __ _| | ____ _     _   ___  ___   _    
 | | | '__/ _` | |/ / _` |   | | | \ \/ / | | |   
 |_| | | | (_| |   < (_| |_  | |_| |>  <| |_| |_  
 (_) |_|  \__,_|_|\_\__,_( )  \__, /_/\_\\__,_(_) 
                         |/    __/ |              
                              |___/     
    
            ALL CREDITS                              
    *    Credits : ! raka, Yxu     *
    |    Code by : ! raka          |
    *    Api made by : Yxu         |
    *------------------------------*
    |    Discord.js : v14.1.1      |
**/   
const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require('discord.js');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('arceus') // Replace with your desired command name
    .setDescription('Bypass your arceus getkey.') // Replace with your desired command description
    .addStringOption(option =>
      option.setName('link')
        .setDescription('Write your arceus getkey link here!')
        .setRequired(true)
    ),

  async execute(interaction) {
      const link = interaction.options.getString('link');
      let headers = {
        "Authorization": "Bearer XM1TQpgHYJ"
    }

      try {
        await interaction.deferReply({ embeds: [new EmbedBuilder().setTitle("Processing ⏳").setDescription("Bypass operation in progress...").setColor(0xFFFF00)] });

        const response = await fetch(`https://knowing-square-gull.ngrok-free.app/api/v1/arceus?link=${link}`, {
          headers: headers
        });
        const json = await response.json();
        console.log(json);

        if (json.key) {
            const webPageTime = json.Time;
          
            const successEmbed = new EmbedBuilder()
              .setTitle("Multi-Bypass")
              .setDescription(`The Bypass Has Been **Executed**!\n\`\`\`${json.key}\`\`\``) // Removed Key mention from description
              .setColor(0x00FF00)
              .setThumbnail('https://i.imgur.com/ewbSyHv.png') // Yall can change this.
              .addFields(
                { name: 'Time:', value: webPageTime ? webPageTime : 'Time unavailable from webpage' },
              )
              .setTimestamp()
              .setFooter({ text: 'Made by ! raka, and yxu', iconURL: 'https://i.imgur.com/ONHipCl.jpeg' }); // Yall can change it if ya want.
            await interaction.editReply({ embeds: [successEmbed] });
        } else {
          const errorEmbed = new EmbedBuilder()
            .setTitle("Bypass Failed!")
            .setDescription("An error occurred during the bypass operation.")
            .setColor(0xFF0000);
          await interaction.editReply({ embeds: [errorEmbed] });
        }
      } catch (error) {
        if (error.code === 'ERR_INVALID_URL') {
          await interaction.reply("That's wrong. Please provide a valid URL.");
        } else {
          console.error(error);
          await interaction.followUp(`An unexpected error occurred. Please try again later.`)
        }
      }
    }
};
                         
    
