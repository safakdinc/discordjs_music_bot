import { readFile } from 'fs/promises';
import getLocalCommands from '../../utils/getLocalCommands.js';
import getApplicationCommands from '../../utils/getApplicationCommands.js';
import areCommandsDifferent from '../../utils/areCommnadsDifferent.js';

const json = JSON.parse(await readFile(new URL('../../../config.json', import.meta.url)));

export default async function register(client) {
  try {
    const localCommands = await getLocalCommands();
    const applicationCommands = await getApplicationCommands(client, json.testServer);

    localCommands.forEach(async command => {
      const { name, description, options } = command;
      const existingCommand = await applicationCommands.cache.find(c => c.name === name);

      if (existingCommand) {
        if (command.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`Command ${name} deleted`);
        }

        if (areCommandsDifferent(existingCommand, command)) {
          await applicationCommands.edit(existingCommand.id, { name, description, options });
          console.log(`Command ${name} updated`);
        }
      } else {
        if (command.deleted) {
          console.log(`Skipping registering command ${name} as it's set to delete`);
        } else {
          await applicationCommands.create({ name, description, options });
          console.log(`Command ${name} registered`);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}
