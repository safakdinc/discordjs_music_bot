const obj = {
  name: 'ping',
  description: 'he?',
  // devOnly: Boolean,
  // testOnly: Boolean,
  // options: Object[]
  //deleted:Boolean
  callback: (client, interaction) => {
    interaction.reply(`Pong! ${client.ws.ping}ms`);
  }
};

export default obj;
