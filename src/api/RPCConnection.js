
const Discord = require('discord-game');

 
function authenticate() {
    const isRequireDiscord = true;
    Discord.create('692935883040751697', isRequireDiscord);



    setInterval(function() {
        Discord.runCallback(); // => true
    }, 1000/60)

    return Discord;
}

exports.authenticate = authenticate;