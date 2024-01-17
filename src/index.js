import { Client, ActivityType, Collection, GatewayIntentBits, REST, Routes } from 'discord.js';
import { DisTube } from 'distube';
import { SpotifyPlugin } from '@distube/spotify';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { YtDlpPlugin } from '@distube/yt-dlp';
import { MyCustomPlugin } from './plugin/ytdl.js';
import dotenv from 'dotenv';
import loadEvents from './utils/loadEvents.js';
import loadCommands from './utils/loadCommands.js';
import loadDistubeEvens from './utils/loadDistubeEvents.js';

dotenv.config();
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates
  ]
});

client.commands = new Collection(); // creates commands collection
client.aliases = new Collection(); // aliases is a shortcut of commands

client.distube = new DisTube(client, {
  leaveOnEmpty: false,
  leaveOnFinish: false,
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  nsfw: true, // depends on you if you want to play nsfw content or not. if you don't want to play set it to false
  plugins: [
    new MyCustomPlugin(client),
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin({
      update: false
    })
  ]
});

loadEvents(client);
loadCommands(client);
loadDistubeEvens(client);

client.login(process.env.TOKEN);
