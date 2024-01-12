import getAllFiles from '../utils/getAllFiles.js';
import { fileURLToPath } from 'url';
import path from 'path';

export default function eventHandler(client) {
  const __filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(__filename);

  const eventFolders = getAllFiles(path.join(dirname, '..', 'events'), true);
  eventFolders.forEach(folder => {
    const eventFiles = getAllFiles(folder);
    eventFiles.sort((a, b) => a > b);
    const eventName = folder.replace(/\\/g, '/').split('/').pop();

    client.on(eventName, async arg => {
      eventFiles.forEach(async file => {
        const relativePath = path.relative(dirname, file).replace(/\\/g, '/');
        try {
          // Import the module dynamically
          const module = await import(relativePath);

          // Access the default export of the module
          const event = module.default(client, arg);
        } catch (error) {
          console.error(`Error importing ${relativePath}:`, error);
        }
      });
    });
  });
}
