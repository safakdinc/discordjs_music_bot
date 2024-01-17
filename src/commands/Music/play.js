// play.js
import { EmbedBuilder } from 'discord.js';

const config = {
  name: 'play',
  aliases: ['p'],
  description: "play commmand play's song.",
  options: [
    {
      name: 'song',
      description: 'Enter song name or link',
      type: 3,
      required: true
    }
  ]
};

async function callBack(client, interaction) {
  const embed = new EmbedBuilder().setTitle('Reading Your request').setColor('DarkButNotBlack');

  let voice = interaction.member.voice.channel;
  let message = interaction.options.getString('song');
  if (voice) {
    const result = await client.distube.play(voice, message, {
      textChannel: interaction.channel,
      member: interaction.member,
      interaction
    });
    if (result) {
      await interaction.reply({ embeds: [embed] });
    }

    // Your additional logic or reply if needed
  } else {
    await interaction.reply({ content: 'You are not in a voice channel!', ephemeral: true });
  }
}

export { callBack, config };
