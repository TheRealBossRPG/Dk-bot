const Discord = require('discord.js');
const bot = new Discord.Client();
const cheerio = require('cheerio');
const request = require('request');
require ('dotenv/config');
const http = require('http');
const port = process.env.PORT || 3000;
http.createServer().listen(port);

const token = process.env.TOKEN;

const PREFIX = ('!');

bot.on('ready', () =>{
    console.log('Bot is on');
})

bot.on('message', message=>{
    let args = message.content.substring(PREFIX.lenght).split(" ");
        switch (args[0]){
            case '!imagine':
                message.channel.sendMessage('Imagine chat....Imagine');
                break;
            case '!youtube':
                message.channel.sendMessage('https://www.youtube.com/channel/UCe1yEAEbnDWM7nVi3y2pjYw');
                break;
            case '!twitter':
                message.channel.sendMessage('https://twitter.com/dkdynamite1');
                break;
            case '!meme':
                image(message);
        }
})

function  image(message){

    var options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + " cod zombies memes",
        method: "GET",
        headers: {
            "Accept": "text/html",
            "User-Agent": "Chrome"
        }
    };

    request(options, function(error, response, responseBody) {
        if (error) {
            return;
        }
 
 
        $ = cheerio.load(responseBody);
 
 
        var links = $(".image a.link");
 
        var urls = new Array(links.length).fill(0).map((v, i) => links.eq(i).attr("href"));
       
        console.log(urls);
 
        if (!urls.length) {
           
            return;
        }
 
        // Send result
        message.channel.send( urls[Math.floor(Math.random() * urls.length)]);
    });
}
bot.on("guildMemberAdd", function(member) {
        member.guild.channels.find("name", "welcome").sendMessage(member.toString() + "Welcome to the server");

        member.addRole(member.guild.roles.find("name","Member"));
})

bot.on('error', err=>{
    console.log(err);
});

bot.login(token);