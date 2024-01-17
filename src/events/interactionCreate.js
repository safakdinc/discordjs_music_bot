import { Music, clientInfo, Other } from '../configuration/help.js';

async function interactioCreate(client, interaction) {
  try {
    if (interaction.isSelectMenu) {
      if (interaction.customId === 'help') {
        switch (interaction.values[0]) {
          case 'music':
            await interaction.reply({ embeds: [Music(client)], ephemeral: true });
            break;
          case 'botInfo':
            await interaction.reply({ embeds: [clientInfo(client)], ephemeral: true });
            break;
          case 'other':
            await interaction.reply({ embeds: [Other(client)], ephemeral: true });
            break;

          default:
            break;
        }
      }
    }
    if (!interaction.isChatInputCommand()) {
      return;
    }
    const commandFile = client.commands.get(interaction.commandName);

    if (!commandFile) {
      await interaction.reply({ content: 'An error has occured!', ephemeral: true });
      return;
    }
    commandFile.callBack(client, interaction);
  } catch (error) {
    console.log(error);
  }
}

export default interactioCreate;
