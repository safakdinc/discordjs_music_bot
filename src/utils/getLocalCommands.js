import path from 'path';
import { fileURLToPath } from 'url';
import getAllFiles from './getAllFiles.js';

export default async function getLocalCommands(exceptions) {
  const __filename = fileURLToPath(import.meta.url);
  const dirname = path.dirname(__filename);
  let localCommands = [];
  const commandCategories = getAllFiles(path.join(dirname, '..', 'commands'), true);

  // Use Promise.all to wait for all import promises to resolve
  await Promise.all(
    commandCategories.map(async category => {
      const commandFiles = getAllFiles(category);

      await Promise.all(
        commandFiles.map(async file => {
          const relativePath = path.relative(dirname, file).replace(/\\/g, '/');
          try {
            const module = await import(relativePath);
            localCommands.push(module.default);
          } catch (error) {
            console.error(`Error importing ${relativePath}:`, error);
          }
        })
      );
    })
  );

  return localCommands;
}
