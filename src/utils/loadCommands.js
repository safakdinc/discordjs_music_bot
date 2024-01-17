import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import registerSlash from '../utils/RegisterSlash.js';

async function loadCommands(client) {
  const __filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(__filename);
  let commands = [];
  let folders = fs.readdirSync(process.cwd() + '/src/commands');

  for (const folder of folders) {
    const files = fs.readdirSync(path.join(process.cwd(), 'src', 'commands', folder)).filter(file => file.endsWith('.js'));

    for (const file of files) {
      const relativePath = path.relative(dirname, path.join(process.cwd(), 'src', 'commands', folder, file)).replace(/\\/g, '/');
      const command = await import(relativePath);

      if (!command) {
        console.error(`Error importing command from file ${file}`);
        continue;
      }

      client.commands.set(command.config.name, command);
      commands.push(command);
    }
  }

  client.command = commands;
  registerSlash(client);
}

export default loadCommands;
