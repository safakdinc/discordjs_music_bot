import {
  createAudioPlayer,
  getVoiceConnection,
  joinVoiceChannel,
  entersState,
  VoiceConnectionStatus,
  AudioPlayerStatus,
  createAudioResource,
  NoSubscriberBehavior,
  StreamType
} from '@discordjs/voice';
import { ApplicationCommandOptionType } from 'discord.js';
import ytdl from 'ytdl-core';

const obj = {
  name: 'play',
  description: 'Plays a song',
  options: [
    {
      name: 'query',
      description: 'Enter a YouTube or Spotify link',
      type: ApplicationCommandOptionType.String,
      required: true
    }
    // Add more options as needed
  ],
  callback: async (client, interaction) => {
    const query = interaction.options.getString('query');
    const member = interaction.guild.members.cache.get(interaction.user.id);
    const voiceChannel = member?.voice.channel;

    if (!voiceChannel) {
      interaction.reply('You need to be in a voice channel to use this command.');
      return;
    }

    try {
      const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator
      });

      const stream = ytdl(query, { filter: 'audioonly', quality: 'highestaudio' });
      const audioResource = createAudioResource(stream, {
        inputType: StreamType.Arbitrary
      });
      const audioPlayer = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause
        }
      });
      audioPlayer.play(audioResource);
      connection.subscribe(audioPlayer);

      interaction.reply(`Now playing: ${query}`);
    } catch (error) {
      console.error(`Error joining or playing in the voice channel: ${error}`);
      interaction.reply('An error occurred while processing your request.');
    }
  }
};

export default obj;
