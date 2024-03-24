"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { zokou } = require("../framework/zokou");
zokou({ nomCom: "tempmail", reaction: "😾", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = '*DEXTER-MD* Temporary emails,Powered by *France King* \n\n ' + "Click the link below to create unlimited TEMPORARY Emails. Powered by *DEXTER-MD.*";
    let d = ' https://email10min.com';
    let varmess = z + d;
    var img = 'https://telegra.ph/file/7a8bf9f622dd6ccb403df.mp4';
    await zk.sendMessage(dest, { image: { url: img }, caption: varmess });
    //console.log("montest")
});
console.log("mon test");
/*module.exports.commande = () => {
  var nomCom = ["test","t"]
  var reaction="📌 "
  return { nomCom, execute,reaction }
};

async function  execute  (origineMessage,zok) {
  console.log("Commande saisie !!!s")
   let z ='Salut je m\'appelle *FLASH-MD* \n\n '+'je suis un bot Whatsapp Multi-appareil '
      let d =' developpé par *France King*'
      let varmess=z+d
      var img='https://telegra.ph/file/13d63c21c1a665bfd8324.jpg'
await  zok.sendMessage(origineMessage,  { image:{url:img},caption:varmess});
}  */ 
