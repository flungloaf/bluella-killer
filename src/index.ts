import jimp from "jimp";
import Discord from "discord.js";
import "dotenv/config";
import looksSame from  "looks-same";

const client = new Discord.Client();

client.on("ready", () => {
  console.log("Ready!");
})

client.on("message", message => {
  if (message.author.id === process.env.ID) {
    message.attachments.forEach(async a => {
      const imageExt = /.*(.bmp|.jpg|.jpeg|.png|.gif|.tiff)/
      if (a.name && a.name.match(imageExt)) {
        const image = await jimp.read(a.url);
        const mime = image.getMIME();
        const original = await image.getBufferAsync(mime);
        image.normalize();
        const buffer = await image.getBufferAsync(mime);
        looksSame(original, buffer, (err, res) => {
          if (err) {
            console.error(err);
            return;
          }
          if (!res.equal) {
            const attachment = new Discord.MessageAttachment(buffer);
            message.channel.send(attachment);
          }
        })
      }
    });
  }
})

client.login(process.env.TOKEN);
