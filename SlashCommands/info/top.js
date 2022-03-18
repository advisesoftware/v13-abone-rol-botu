const { Client, CommandInteraction, MessageEmbed } = require("discord.js");
const { JsonDatabase, YamlDatabase } = require("wio.db");
const db = new JsonDatabase({
databasePath: "./data/db.json"
});

module.exports = {
    name: "top",
    description: "Abone rolü veren yetkililerin sıralamasını gösterir.",
    type: 'CHAT_INPUT',
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
        
const Teyit = db.all().filter(data => data.ID.startsWith(`abones_`)).sort((a, b) => b.data - a.data)
        Teyit.length = 10
        let FinalDB = ""
        for (var i in Teyit) {
          FinalDB += `**${Teyit.indexOf(Teyit[i])+1}. ${client.users.cache.get(Teyit[i].ID.slice(7))}** - **${Teyit[i].data}** Kez Abone Rolü Vermiş.\n`
        }

const embed1 = new MessageEmbed()
.setAuthor({ name: "Abone Rolü Liderlik", iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`})
.setDescription(`${FinalDB}`)
.setFooter({ text: "Abone Rol Sistemi", iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`}) 
.setTimestamp()
  .setThumbnail(interaction.guild.iconURL({ dynamic: true }))
.setColor("RANDOM")
interaction.followUp({ embeds: [embed1]})  


    },
};
