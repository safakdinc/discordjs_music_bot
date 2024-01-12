import { Client, IntentsBitField, ActivityType, Collection } from 'discord.js';
import eventHandler from './handlers/eventHandler.js';
import dotenv from 'dotenv';
dotenv.config();
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
    IntentsBitField.Flags.GuildVoiceStates
  ]
});

eventHandler(client);

client.login(process.env.TOKEN);
