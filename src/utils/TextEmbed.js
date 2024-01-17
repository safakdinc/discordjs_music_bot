function TextEmbed(interaction, object) {
  const embed = {
    title: object.title || '',
    description: object.desc || '',
    timestamp: object.time,
    color: 15110828
  };

  interaction.reply({ embeds: [embed] });
}

export { TextEmbed };
