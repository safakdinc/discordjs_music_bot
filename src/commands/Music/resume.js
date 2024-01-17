import { EmbedBuilder } from 'discord.js';
import { TextEmbed } from '../../utils/TextEmbed.js';

const config = {
  name: 'resume',
  aliases: ['rs'],
  description: 'Resumes player'
};

async function callBack(client, interaction) {
  const embed = new EmbedBuilder().setTitle('Reading Your request').setColor('DarkButNotBlack');
  const queue = client.distube.getQueue(interaction);
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

    if (!queue.playing) {
      queue.resume(interaction);
      TextEmbed(interaction, { title: 'You resumed song!', desc: '' });
    } else {
      TextEmbed(interaction, { title: 'Already playing!', desc: '' });
    }
  } catch (error) {
    console.log(error);
  }
}

export { callBack, config };
