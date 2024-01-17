import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function loadEvents(client) {
  const __filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(__filename);
  fs.readdirSync(process.cwd() + '/src/events').forEach(async file => {
    if (!file.endsWith('.js')) {
      return;
    }
    const relativePath = path.relative(dirname, process.cwd() + `/src/events/${file}`).replace(/\\/g, '/');
    const module = await import(relativePath);
    const eventName = file.replace(/\.js$/, '');
    client.on(eventName, async arg => {
      try {
        // Access the default export of the module
        await module.default(client, arg);
      } catch (error) {
        console.error(`Error importing ${relativePath}:`, error);
      }
    });
  });
}

export default loadEvents;
