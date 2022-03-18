const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { JsonDatabase, YamlDatabase } = require("wio.db");
const db = new JsonDatabase({
databasePath: "./data/db.json"
});

module.exports = {
    name: "abone-rol",
    description: "Etiketlenen kullanıcıya abone rolü verir.Rol zaten varsa alır.",
  options: [{ type: "USER", name: "kullanici", description: "Abone rolü verilecek kişi.", required: true}],
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        
if (!interaction.member.roles.cache.has(client.config.yetkilirol)) {

await interaction.followUp({ content:"**Bu komutu kullanmak için gerekli role sahip değilsiniz!**", ephemeral: true });
  return
}

if (!interaction.options.getMember("kullanici").roles.cache.has(client.config.abonerol)) {

const embed1 = new MessageEmbed()
.setAuthor({ name: "Başarılı", iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`})
.setDescription(`**${interaction.options.getUser("kullanici")} kullanıcısına başarıyla Abone Rolü verildi!** ✅`)
.setFooter({ text: "Abone Rol Sistemi", iconURL: `${interaction.options.getUser("kullanici").displayAvatarURL({ dynamic: true })}`}) 
.setTimestamp()
.setColor("GREEN")
interaction.followUp({ embeds: [embed1]})  

  const embed3 = new MessageEmbed()
.setAuthor({ name: "Abone Rol LOG", iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`})
.setDescription(`**Bir kullanıcıya abone rolü verildi;** \n Abone Rolünü Veren Yetkili: ${interaction.user} \n Abone Rolü Verilen Kulllanıcı: ${interaction.options.getUser("kullanici")}`)
.setFooter({ text: "Abone Rol Sistemi", iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`}) 
.setTimestamp()
.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
    .setColor("GREEN")
client.channels.cache.get(client.config.log).send({embeds: [embed3]})  

  interaction.options.getMember("kullanici").roles.add(client.config.abonerol)

  db.add(`abones_${interaction.user.id}`, +1)

  db.add("toplamabone", +1)
  return}



      if (interaction.options.getMember("kullanici").roles.cache.has(client.config.abonerol)) {

const embed2 = new MessageEmbed()
.setAuthor({ name: "Başarılı", iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`})
.setDescription(`**${interaction.options.getUser("kullanici")} kullanıcısından başarıyla Abone Rolü alındı!** ✅`)
.setFooter({ text: "Abone Rol Sistemi", iconURL: `${interaction.options.getUser("kullanici").displayAvatarURL({ dynamic: true })}`}) 
.setTimestamp()
.setColor("GREEN")
interaction.followUp({ embeds: [embed2]})  

  const embed4 = new MessageEmbed()
.setAuthor({ name: "Abone Rol LOG", iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`})
.setDescription(`**Bir kullanıcıdan abone rolü alındı;** \n Abone Rolünü Alan Yetkili: ${interaction.user} \n Abone Rolü Alınan Kulllanıcı: ${interaction.options.getUser("kullanici")}`)
.setFooter({ text: "Abone Rol Sistemi", iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`}) 
.setTimestamp()
.setThumbnail(interaction.guild.iconURL({ dynamic: true }))
.setColor("RED")
client.channels.cache.get(client.config.log).send({ embeds: [embed4]})  
        interaction.options.getMember("kullanici").roles.remove(client.config.abonerol)

        return
      }    },
};
