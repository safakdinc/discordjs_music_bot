import ytdl from 'ytdl-core';

async function getData(url) {
  try {
    // Fetch video info using ytdl.getInfo
    const info = await ytdl.getInfo(url);

    // Log or use the retrieved video information
    console.log('Video Title:', info.videoDetails.title);
    console.log('Video Duration:', info.videoDetails.lengthSeconds + ' seconds');
    console.log('Video Author:', info.videoDetails.author.name);
    console.log('Video Views:', info.videoDetails.viewCount.toLocaleString());
    console.log('Video Description:', info.videoDetails.description);

    // You can access more properties of `info.videoDetails` as needed

    return info; // You can return the entire info object if needed
  } catch (error) {
    console.error('Error getting video data:', error.message);
    return null;
  }
}

export default getData;
