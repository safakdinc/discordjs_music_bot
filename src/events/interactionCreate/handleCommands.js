import getLocalCommands from '../../utils/getLocalCommands.js';
import { readFile } from 'fs/promises';

const json = JSON.parse(await readFile(new URL('../../../config.json', import.meta.url)));

export default async function deneme(client, interaction) {
  console.log('deneme');
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const localCommands = await getLocalCommands();
  try {
    const commandObject = localCommands.find(c => c.name === interaction.commandName);
    if (!commandObject) return;
    if (commandObject.devOnly) {
      if (!json.devs.includes(interaction.member.id)) {
        interaction.reply({ content: 'You are not allowed to use this command!', ephemeral: true });
        return;
      }
    }

    if (commandObject.testOnly) {
      if (!interaction.guild.id === json.testServer) {
        interaction.reply({ content: 'This command cannot be ran here', ephemeral: true });
        return;
      }
    }
    await commandObject.callback(client, interaction);
  } catch (error) {
    console.log(error);
  }
}
