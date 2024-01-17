import { EmbedBuilder } from 'discord.js';
import { TextEmbed } from '../../utils/TextEmbed.js';

const config = {
  name: 'pause',
  aliases: ['ps'],
  description: 'Pauses player'
};

async function callBack(client, interaction) {
  const queue = client.distube.getQueue(interaction);
  console.log(interaction.member);
  let voice = interaction.member.voice.channel;
  try {
    if (!voice) {
      interaction.reply('You must in a voice channel');
      return;
    }
    if (!queue) {
      TextEmbed(interaction, { title: 'Queue is empty!', desc: '' });
      return;
    }
    if (queue.playing) {
      queue.pause(interaction);
      TextEmbed(interaction, { title: 'You paused song!', desc: '' });
    } else {
      TextEmbed(interaction, { title: 'Nothing is playing!', desc: '' });
    }
  } catch (error) {
    console.log(error);
  }
}

export { callBack, config };
