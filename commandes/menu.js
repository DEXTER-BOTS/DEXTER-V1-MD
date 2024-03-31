const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    
 cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Africa/Nairobi');

// Create a date and time in EAT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╭────✧𝐃𝐄𝐗𝐓𝐄𝐑-𝐌𝐃✧────◆
│♨ *Préfix* : ${s.PREFIXE}
│♨ *User* : ${s.OWNER_NAME}
│♨ *Mode* : ${mode}
│♨ *Commands* : ${cm.length} 
│♨ *Date* : ${date}
│♨ *Time* : ${temps} 
│♨ *Ram* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│♨ *Platform* : ${os.platform()}
│♨ *Developer* : 𝐃𝐄𝐗𝐓𝐄𝐑
│♨ *Version* : 𝐯7.5.25
╰─────✧The-GOAT✧─────◆ \n\n`;

  let menuMsg=`  

*DEXTER-MD COMMANDS :*
◇                             ◇
`;

    for (const cat in coms) {
        menuMsg += `*╭────☢️* *${cat}* *☢️⊷*`;
        for (const cmd of coms[cat]) {
            menuMsg += `
 *|♦️* ${cmd}`;
        }
        menuMsg += `
*╰═════════════⊷* \n`
    }

    menuMsg += `
◇            ◇
*————— ★ —————*

  *📌DEXTER©🐐²0²⁴*                                         
*╰═════════════⊷*
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Zokou-MD*, développé par Djalega++" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "*📌Dexter*" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
