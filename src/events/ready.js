import { ActivityType } from 'discord.js';

function ready(client) {
  client.user.setPresence({
    activities: [{ name: `he?`, type: ActivityType.Listening }],
    status: 'online'
  });
  console.log(`Logged in as ${client.user.tag}!`);
}

export default ready;
