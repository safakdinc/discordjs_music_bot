import { EmbedBuilder } from 'discord.js';

const config = {
  name: 'test',
  aliases: ['t'],
  description: 'test'
};

async function callBack(client, interaction) {
  const embed = new EmbedBuilder().setTitle('Reading Your request').setColor('DarkButNotBlack');

  let voice = interaction.member.voice.channel;
  let message = 'kurzgesagt kill the universe soundtrack';
  if (voice) {
    await interaction.reply({ embeds: [embed] });
    await client.distube.play(voice, message, {
      textChannel: interaction.channel,
      member: interaction.member,
      interaction
    });
  } else {
    await interaction.reply({ content: 'You are not in a voice channel!', ephemeral: true });
  }
}
export { callBack, config };
