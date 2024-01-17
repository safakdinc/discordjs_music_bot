import { EmbedBuilder, time } from 'discord.js';
const embed = new EmbedBuilder();

function distubeEmbedMessage(client, interaction, object) {
  if (object.title) {
    embed.setTitle(object.title);
  }
  if (object.desc) {
    embed.setDescription(object.desc).setURL(object.link);
  }

  if (object.thumbnail) {
    embed.setImage(object.thumbnail);
  }
  embed.addFields({ name: 'Duration', value: object.duration, inline: true });
  /* object.author && embed.setAuthor();
  object.thumbnail && embed.setThumbnail();
  object.url && embed.setURL(); */
  embed.setColor('DarkButNotBlack');
  interaction.textChannel.send({ embeds: [embed] });
}

export default distubeEmbedMessage;
