import { EmbedBuilder } from 'discord.js';
import { readdirSync } from 'fs';

const getCommandsName = folders => {
  const files = readdirSync(`${process.cwd()}/commands/${folders}`);
  return files.map(val => val.split('.')[0]);
};

const createEmbed = (client, folder) => {
  const commands = getCommandsName(folder);
  return new EmbedBuilder()
    .setTitle(`${folder} Commands ${commands.length}`)
    .setAuthor({
      name: client.user.username,
      iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })
    })
    .setDescription(commands.join(', '))
    .setColor('DarkButNotBlack');
};

const Music = client => createEmbed(client, 'Music');
const clientInfo = client => createEmbed(client, 'clientInfo');
const Other = client => createEmbed(client, 'Other');

export { Music, clientInfo, Other };
