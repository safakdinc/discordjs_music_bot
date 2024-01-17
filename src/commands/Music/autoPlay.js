import { EmbedBuilder } from 'discord.js';

const config = {
  name: 'autoplay',
  aliases: ['ap'],
  description: 'Stops player'
};

async function callBack(client, interaction) {
  const embed = new EmbedBuilder().setTitle('Reading Your request').setColor('DarkButNotBlack');

  let voice = interaction.member.voice.channel;
  try {
    if (voice) {
      client.distube.voice.join(voice);
      interaction.reply(client.user.username, 'Joined voice channel');
    } else {
      interaction.reply('You must be a voice channel');
    }
  } catch (error) {
    console.log(error);
  }
}

export { callBack, config };
