import { EmbedBuilder } from 'discord.js';

const config = {
  name: 'join',
  aliases: ['j'],
  description: 'Bot will join your voice channel'
};

async function callBack(client, interaction) {
  const embed = new EmbedBuilder().setTitle('Reading Your request').setColor('DarkButNotBlack');

  let voice = interaction.member.voice.channel;
  try {
    if (!voice) {
      interaction.reply('You must be a voice channel');

      return;
    }
    client.distube.voices.join(interaction);
    interaction.reply(client.user.username, 'joined a voice channel');
  } catch (error) {
    console.log(error);
  }
}

export { callBack, config };
