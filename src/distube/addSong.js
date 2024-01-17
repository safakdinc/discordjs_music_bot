import distubeEmbedMessage from '../utils/DistubeMessageEmbed.js';

function addSong(client, interaction) {
  const song = client.distube.getQueue(interaction).songs.at(-1);
  const songs = {
    title: 'Added to Queue',
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

export default addSong;
