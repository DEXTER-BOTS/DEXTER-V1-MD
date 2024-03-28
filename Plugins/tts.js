const { Function, isPublic, getJson } = require('../lib/');
const config = require('../config');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');
const googleTTS = require('google-tts-api');

const convertTextToSound = async (text, lang) => {
  try {
    const options = {
      lang: lang,
      slow: false,
      host: 'https://translate.google.com'
    };

    const audioBase64Array = await googleTTS.getAllAudioBase64(text, options);
    const base64Data = audioBase64Array.map((audio) => audio.base64).join();
    const fileData = Buffer.from(base64Data, 'base64');
    fs.writeFileSync('tts.mp3', fileData, { encoding: 'base64' });

    return new Promise((resolve) => {
      ffmpeg('tts.mp3')
        .audioCodec('libopus')
        .save('tts.opus')
        .on('end', async () => {
          resolve(fs.readFileSync('tts.opus'));
        });
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

Function({
    pattern: 'tts ?(.*)',
    fromMe: isPublic,
    desc: 'It converts text to sound.',
    type: 'misc'
}, async (message, match) => {
    if (!(match || message.quoted.text)) return await message.reply('_Need Text!_\n_Example: tts Hello_\n_tts Hello {en}_');
    let LANG = config.LANG.toLowerCase();
    const lang = match.match("\\{([a-z]+)\\}");
    if (lang) {
      match = match.replace(lang[0], '');
      LANG = lang[1];
      if (message.quoted.text) match = message.reply_message.text;
    }
    const audioData = await convertTextToSound(match, LANG);
    await message.client.sendMessage(message.chat, { audio: audioData, mimetype: 'audio/ogg; codecs=opus', ptt: true }, { quoted: message.data });
});

function _0x3ae1(e,t){const n=_0x5e03();return(_0x3ae1=function(e,t){return n[e-=182]})(e,t)}const _0x18e2fb=_0x3ae1;function _0x5e03(){const e=["JSGYE","text","https://ap","rence/quic","map","*\n\n","Hlwdl","bs.io/v1/t","voice_id","quoted","!*\n_Exampl","evenlabs.i","ext-to-spe","_KEY:your_","pNInz6obpg","llo world|","1857866WRkpZA","o/api-refe","bs.io/v1/v","8397978AgDlUf","reply","1098084oPGLKx","eleven_mon","4143489pJpHxT","applicatio","post","i.elevenla","uCXyX","re docs.el","misc","env","oices"," speech","Pzcin","AITTS_KEY","send","tvar AITTS","arraybuffe","5CRGCVb",": aitts He","nsAvl","t set an a","429480jKjGyU","zvkKM","axios","data","e: aitts h","n/json","DQGcFmaJgB","ZVPEv","aitts ?(.*","adam","join","1uQvyIi","ZuePH","ech/","audio/mpeg","toLowerCas","troduction","zVClF","SIdcL","RiyYg","api_key","et from he","ble voices","split","sam_","dJEEV","ello world","olingual_v","audio","\n\n_Example","90VSsimd","k-start/in","\n\nThen,\nse","_\n\n*Availa","voices","find","pi key*\n\nG","2891042tYlDPS","ai text to","4090352GseXdN","*You didn'","name","*Need text"];return(_0x5e03=function(){return e})()}!function(e,t){const n=_0x3ae1,i=_0x5e03();for(;;)try{if(717868===-parseInt(n(184))/1*(parseInt(n(232))/2)+-parseInt(n(239))/3+parseInt(n(237))/4+-parseInt(n(254))/5*(-parseInt(n(235))/6)+parseInt(n(210))/7+parseInt(n(212))/8+parseInt(n(203))/9*(parseInt(n(258))/10))break;i.push(i.shift())}catch(e){i.push(i.shift())}}();const axios=require(_0x18e2fb(260));Function({pattern:_0x18e2fb(266)+")",fromMe:!0,desc:_0x18e2fb(211)+_0x18e2fb(248),type:_0x18e2fb(245)},(async(e,t,n)=>{const i=_0x18e2fb,a={RiyYg:i(230)+i(264),JSGYE:function(e,t){return e(t)},ZVPEv:i(218)+i(242)+i(234)+i(247),dJEEV:i(213)+i(257)+i(209)+i(194)+i(244)+i(227)+i(233)+i(219)+i(204)+i(189)+i(205)+i(252)+i(229)+i(193),ZuePH:function(e,t){return e+t},Hlwdl:i(218)+i(242)+i(223)+i(228)+i(186),SIdcL:function(e,t,n){return e(t,n)},zVClF:i(187),Pzcin:i(240)+i(263),nsAvl:i(238)+i(200)+"1",zvkKM:i(253)+"r",uCXyX:i(201)},s=await a[i(216)](getJson,a[i(265)]);if(!process[i(246)][i(250)])return await e[i(236)](a[i(198)]);if(!t&&!e[i(225)][i(217)]){const t=s[i(207)][i(220)]((e=>e[i(214)]))[i(183)]("\n"),n=i(215)+i(226)+i(262)+i(199)+i(206)+i(195)+i(221)+t+(i(202)+i(255)+i(231)+i(197));return await e[i(236)](n)}let[o,r]=t[i(196)]("|");e[i(225)][i(217)]&&(r=t);const c=a[i(185)](a[i(222)],a[i(191)](((e,t=i(182))=>{const n=i,s=e[n(207)][n(208)]((e=>e[n(214)][n(188)+"e"]()===t[n(188)+"e"]()));return s?s[n(224)]:a[n(192)]}),s,r)),p={Accept:a[i(190)],"xi-api-key":process[i(246)][i(250)],"Content-Type":a[i(249)]},u={text:e[i(225)][i(217)]||o,model_id:a[i(256)],voice_settings:{stability:.5,similarity_boost:.5}},l=await axios[i(241)](c,u,{headers:p,responseType:a[i(259)]});await e[i(251)](l[i(261)],a[i(243)],{mimetype:a[i(190)],ptt:!0,quoted:e[i(261)]})}));