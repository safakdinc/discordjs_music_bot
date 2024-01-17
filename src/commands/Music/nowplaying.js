import { EmbedBuilder } from 'discord.js';

const config = {
  name: 'nowplaying',
  aliases: ['np'],
  description: 'Shows the currently playing music'
};

async function callBack(client, interaction) {
  const embed = new EmbedBuilder();

  let voice = interaction.member.voice.channel;
  const queue = client.distube.getQueue(interaction);
  const songs = queue.songs;
  const song = songs[0];
  if (!voice) {
    await interaction.reply({ content: 'You are not in a voice channel!', ephemeral: true });
    return;
  }
  if (!queue.playing) {
    await interaction.reply({ content: 'There is no song in player', ephemeral: true });
    return;
  }
  embed.setTitle('Now Playing');
  embed.setDescription(song.name).setURL(song.url);
  embed.setImage(song.thumbnail);
  embed.addFields({ name: 'Duration', value: song.formattedDuration, inline: true });
  embed.setColor('DarkButNotBlack');
  /* object.author && embed.setAuthor();
  object.thumbnail && embed.setThumbnail();
  object.url && embed.setURL(); */

  interaction.reply({ embeds: [embed] });
}

export { callBack, config };
