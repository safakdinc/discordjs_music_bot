import { EmbedBuilder } from 'discord.js';

const config = {
  name: 'stop',
  aliases: ['st'],
  description: 'Stops player'
};

async function callBack(client, interaction) {
  const embed = new EmbedBuilder().setTitle('Reading Your request').setColor('DarkButNotBlack');

  let voice = interaction.member.voice.channel;
  let message = interaction.options.getString('query');
  try {
    if (!voice) {
      interaction.reply('You must in a voice channel');
      return;
    }
    const queue = client.distube.getQueue(interaction);
    if (!queue) {
      interaction.reply('Queue is empty');
      return;
    }
    if (queue.playing) {
      queue.stop(interaction);
      interaction.reply('Player stopped');
    } else {
      interaction.reply('Nothing is playing');
    }
  } catch (error) {
    console.log(error);
  }
}

export { callBack, config };
