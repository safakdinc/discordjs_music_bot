import { EmbedBuilder } from 'discord.js';
import { TextEmbed } from '../../utils/TextEmbed.js';

const config = {
  name: 'queue',
  aliases: ['q'],
  description: 'Displays queue'
};

async function callBack(client, interaction) {
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('Queue')
    .setAuthor({
      name: interaction.member.user.globalName,
      iconURL: interaction.member.user.displayAvatarURL({ size: 256, dynamic: true })
    })
    .setDescription('Some description here')
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .addFields(
      { name: 'Regular field title', value: 'Some value here' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Inline field title', value: 'Some value here', inline: true },
      { name: 'Inline field title', value: 'Some value here', inline: true }
    )
    .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
    .setImage('https://i.imgur.com/AfFp7pu.png')
    .setTimestamp()
    .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
  const queue = client.distube.getQueue(interaction);
  console.log(queue.songs);
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
  } catch (error) {
    console.log(error);
  }
}

export { callBack, config };
