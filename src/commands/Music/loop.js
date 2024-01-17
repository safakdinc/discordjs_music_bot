import { EmbedBuilder } from 'discord.js';
import { TextEmbed } from '../../utils/TextEmbed.js';

const config = {
  name: 'loop',
  aliases: ['lp'],
  description: 'Repeats songs'
};

async function callBack(client, interaction) {
  const embed = new EmbedBuilder().setTitle('Reading Your request').setColor('DarkButNotBlack');
  const queue = client.distube.getQueue(interaction);
  let message = interaction.options.getString('loop');
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
      mode = queue.setRepeatMode(parseInt(message) || 0);
      mode = mode ? (mode === 2 ? 'Repeat queue' : 'Repeat song') : 'Off';
      TextEmbed(interaction, { title: `${mode}`, desc: '' });
    } else {
      TextEmbed(interaction, { title: 'Nothing playing!', desc: '' });
    }
  } catch (error) {
    console.log(error);
  }
}

export { callBack, config };
