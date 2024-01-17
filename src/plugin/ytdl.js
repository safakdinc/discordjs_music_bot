// MyCustomPlugin.js
import { CustomPlugin, DisTubeError, Song } from 'distube';
import ytdl from 'ytdl-core';

class MyCustomPlugin extends CustomPlugin {
  // Override the validate method to check if the input is a URL or a search term
  async validate(url) {
    // Check if the input is a URL
    if (url.startsWith('http') || url.includes('youtube')) {
      return true;
    }
    // For simplicity, assume any other input is a search term
    return false;
  }

  // Override the play method to handle play command based on the validation result
  async play(voiceChannel, url, options) {
    const interaction = options.interaction;
    console.log(interaction.member.guild.id);
    const DT = this.distube;

    // Check if the input is a URL
    if (await this.validate(url)) {
      // Handle play command for URL
      const track = await this.search(url);
      if (DT.getQueue(voiceChannel)) {
        const queue = DT.getQueue(voiceChannel);
        // Add the custom track to the queue
        queue.addToQueue(track);
        DT.emit('addSong', interaction);
      } else {
        DT.queues.create(voiceChannel, track);
        DT.emit('playSong', interaction);
      }
      if (!track) throw new DisTubeError('NO_RESULT', `Cannot find "${url}" on YouTube.`);
      // Your custom logic for playing from URL
    }
  }

  // Override the search method to implement custom search logic

  async search(query) {
    try {
      // Use ytdl to get the stream
      const stream = ytdl(query, { filter: 'audioonly', quality: 'highestaudio' });
      // You may want to extract additional information from the video
      const videoId = ytdl.getURLVideoID(query);
      const info = await ytdl.getBasicInfo(videoId);

      const title = info.videoDetails.title;
      // Create a custom track object with the stream
      const track = new Song({
        url: query,
        source: 'youtube',
        name: title,
        id: videoId,
        formats: 'mp4',
        views: parseInt(info.videoDetails.viewCount, 10),
        duration: parseInt(info.videoDetails.lengthSeconds, 10),
        formattedDuration: this.formatDuration(parseInt(info.videoDetails.lengthSeconds, 10)),
        thumbnail: info.videoDetails.thumbnails.at(-1).url,
        stream: stream
      });

      return track;
    } catch (error) {
      console.error('Error searching:', error.message);
      throw new DisTubeError('SEARCH_ERROR', 'Error searching for the track.');
    }
  }
  formatDuration(durationInSeconds) {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;

    // Use padStart to ensure the minutes and seconds have two digits
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }
}

export { MyCustomPlugin };
