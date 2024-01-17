import { REST, Routes } from 'discord.js';
import dotenv from 'dotenv';
dotenv.config();

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

async function registerSlash(client) {
  try {
    const commands = await client.command;
    const obj = commands.map(command => command.config);

    if (!commands || commands === undefined) return;
    console.log('Started refreshing application (/) commands.');
    await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID), { body: obj });
    console.log(`Successfully reloaded ${commands.length} application (/) commands.`);
  } catch (error) {
    console.log(error);
  }
}

export default registerSlash;
