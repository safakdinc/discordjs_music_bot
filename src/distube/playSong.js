import distubeEmbedMessage from '../utils/DistubeMessageEmbed.js';

function play(client, interaction) {
  const song = client.distube.getQueue(interaction).songs[0];
  const songs = {
    title: 'Now Playing',
    desc: song.name,
    link: song.url,
    thumbnail: song.thumbnail,
    duration: song.formattedDuration
  };
  try {
    distubeEmbedMessage(client, interaction, songs);
  } catch (error) {
    console.log('Distube Error', error);
  }
}

export default play;
