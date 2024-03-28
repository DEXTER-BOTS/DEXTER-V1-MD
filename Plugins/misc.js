// credit to mask sir
const {
	Function,
	isPublic,
	getJson,
	toPTT,
	getString,
	prefix
} = require("../lib/");
const { downloadMediaMessage } = require('@adiwajshing/baileys')
const { fromBuffer } = require('file-type')
const config = require('../config');
const fs = require('fs');
const Lang = getString('weather');
const axios = require('axios');
const FormData = require('form-data');

Function({
	pattern: 'readmore ?(.*)',
	fromMe: isPublic,
	desc: 'Readmore generator',
	type: 'whatsapp'
}, async (m, text, client) => {
	await m.reply(text.replace(/\+/g, (String.fromCharCode(8206)).repeat(4001)))
});

Function({
	pattern: 'wm ?(.*)',
	fromMe: isPublic,
	desc: 'wame generator',
	type: 'whatsapp'
}, async (m, text, client) => {
	let sender = 'https://wa.me/' + (m.reply_message.sender || m.mention[0] || text).split('@')[0];
	await m.reply(sender)
});

/* Function({
	pattern: 'attp ?(.*)',
	fromMe: isPublic,
	desc: 'Text to animated sticker',
	type: 'sticker'
}, async (m, text, client) => {
	if (!text && !m.quoted) return m.reply("*Give me a text.*")
	let match = text ? text : m.quoted && m.quoted.text ? m.quoted.text : text
	await client.sendMessage(m.chat, {
		sticker: {
			url: `https://api.xteam.xyz/attp?file&text=${encodeURI(match)}`
		}
	}, {
		quoted: m.data
	})
}) */
Function({
	pattern: 'emix ?(.*)',
	fromMe: isPublic,
	desc: 'emoji mix',
	type: 'sticker'
}, async (m, text) => {
	if (!text) return await m.reply('_Need Emoji!_\n*Example* : 🥸,😁')
	let [emoji1, emoji2] = text.split(',')
	if (!emoji1) return await m.reply('_Need 2 Emojis!_\n*Example* : 🥸,😁')
	if (!emoji2) return await m.reply('_Need 2 Emojis!_\n*Example* : 🥸,😁')
	const {
		results
	} = await getJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${encodeURIComponent(emoji1)}_${encodeURIComponent(emoji2)}`)
	for (let res of results) {
		let media = await m.client.sendImageAsSticker(m.chat, res.url, m.data, {
			packname: emoji1,
			author: emoji2,
			categories: res.tags
		})
		await fs.unlinkSync(media)
	}
})

Function({
	pattern: 'tovn ?(.*)',
	fromMe: isPublic,
	desc: 'video/audio to voice',
	type: 'converter'
}, async (m, text, client) => {
	if (/document/.test(m.mine) || !/video/.test(m.mine) && !/audio/.test(m.mine) || !m.reply_message) return m.reply('_Reply to a video/audio_')
	await m.send(await m.reply_message.download(), 'audio', { mimetype: 'audio/mpeg', ptt: true, quoted: m.data })
});

Function({pattern: 'weather ?(.*)', desc: Lang.WEATHER_DESC, fromMe: isPublic,desc: 'shows weather informations', type: 'info'}, async (message, match) => {
const got = require('got');
if (match === '') return await message.send(Lang.NEED_LOCATION);
const url = `http://api.openweathermap.org/data/2.5/weather?q=${match}&units=metric&appid=060a6bcfa19809c2cd4d97a212b19273&language=en`;
try {
const response = await got(url);
const json = JSON.parse(response.body);
if (response.statusCode === 200) return await message.send('*📍 ' + Lang.LOCATION +':* ```' + match + '```\n\n' +
'*☀ ' + Lang.TEMP +':* ```' + json.main.temp_max + '°```\n' + 
'*ℹ ' + Lang.DESC +':* ```' + json.weather[0].description + '```\n' +
'*☀ ' + Lang.HUMI +':* ```%' + json.main.humidity + '```\n' + 
'*💨 ' + Lang.WIND +':* ```' + json.wind.speed + 'm/s```\n' + 
'*☁ ' + Lang.CLOUD +':* ```%' + json.clouds.all + '```\n');
} catch {
return await message.send(Lang.NOT_FOUND);
}
});
Function({pattern: 'google ?(.*)', desc: 'Search in Google and show result in list', fromMe: isPublic, type: 'search'}, async (message, match) => {
if (!match) return message.reply('_Example : who is Elon Musk_')
let google = require('google-it')
google({'query': match}).then(res => {
let result_info = `Google Search From : ${match}\n\n`
for (let result of res) {
result_info += `⬡ *Title* : ${result.title}\n`
result_info += `⬡ *Description* : ${result.snippet}\n`
result_info += `⬡ *Link* : ${result.link}\n\n──────────────────────\n\n`
} 
message.send(result_info)
})
})

Function({pattern: 'reboot ?(.*)', fromMe: true, desc: 'reboot bot.', type: 'misc'}, async (m) => {
await m.reply('_Rebooting..._')
require('pm2').restart('index.js');
});

Function({pattern: 'whois ?(.*)', fromMe: isPublic, type: 'info'}, async (message, match) => {
let user = message.reply_message ? message.reply_message.sender : match.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
if (!user) return message.send('_Need a User!_')
try {pp = await message.client.profilePictureUrl(user, 'image')} catch {pp = 'https://i.imgur.com/b3hlzl5.jpg'}
let status = await message.client.fetchStatus(user)
const date = new Date(status.setAt);
const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
const setAt = date.toLocaleString('en-US', options);
await message.send(pp, 'image', { caption: `*Name :* ${await message.client.getName(user)}\n*About :* ${status.status}\n*About Set Date :* ${setAt}`})
})

Function({pattern: 'mode ?(.*)', fromMe: true, type: 'heroku'}, async (message, match) => {
let buttons = [
  {buttonId: prefix + 'setvar mode:private', buttonText: {displayText: 'PRIVATE'}, type: 1},
  {buttonId: prefix + 'setvar mode:public', buttonText: {displayText: 'PUBLIC'}, type: 1}
]
const buttonMessage = {
footer: 'Current Mode : ' + config.MODE,
buttons: buttons,
headerType: 1
}
await message.send('Mode Manager', 'text', buttonMessage)
})

Function({
	pattern: 'img ?(.*)',
	fromMe: isPublic,
	desc: 'Google Image search',
	type: 'download'
}, async (message, match) => {
	if (!match) return await message.send('_Need Query!_\n*Example: .img neon anime || .img query,count*');
	const [query, count] = match.split(',');
	const result = await getJson(apiUrl + 'gis?text=' + encodeURI(query) + '&type=json');
	const indices = new Set();
	const imgs = [];
	while (imgs.length < (count || 5)) {
		const randomIndex = Math.floor(Math.random() * result.length);
		if (!indices.has(randomIndex)) {
			indices.add(randomIndex);
			imgs.push(result[randomIndex].url);
		}
	}
	await message.send(`_Downloading ${count || 5} images for ${query}_`);
	for (let img of imgs) {
		await message.send(img, 'image');
	}
});

Function({pattern: 'doc ?(.*)', fromMe: isPublic, desc: 'media to document', type: 'misc'}, async (message, match) => {
if (!message.reply_message) return await message.reply('_Reply to a media_')
const fileName = match || ''
const buffer = await downloadMediaMessage(message.quoted.data, 'buffer', { }, { })
await message.send(buffer, 'document', { fileName })
})

Function({
	pattern: 'ocr ?(.*)',
	fromMe: isPublic,
	desc: 'Optical Character Recognition',
	type: 'media'
}, async (message, match, client) => {
if (!message.reply_message && !message.reply_message.image) return await message.reply('*Reply to an image*')
var msg = await message.reply('_Recognising..._');
  try {
    const imageBuffer = await message.reply_message.download();
    const formData = new FormData();
    formData.append('image', imageBuffer, 'image.jpg');
    const response = await axios.post(apiUrl + 'image-ocr', formData, {
      headers: formData.getHeaders(),
    });
  await msg.edit(response.data.text)
  } catch (error) {
  await message.edit('*Failed to recognise*');
  }
})

Function({
	pattern: 'gs ?(.*)',
	fromMe: isPublic,
	desc: 'Search in Google',
	type: 'search'
}, async (message, match, client) => {
if (!match) return await message.reply('*Need query to search!*\n_Example: gs who is elon musk_');
try {
const { result, status } = await getJson(`https://api.adithyan.xyz/search?query=${encodeURIComponent(match)}`)
if (status) return await message.reply(result);
await message.reply(result.error);
} catch {
await message.reply('*Failed to search*');
}
})

Function({
	pattern: 'iswa ?(.*)',
	fromMe: true,
	desc: 'filter numbers',
	type: 'misc'
}, async (message, match, client) => {
    if (!match) return await message.reply("*Need number and x parameter!*\n_Example: iswa 687822xxx_\n_You can use up to 4 x_");
    const xCount = (match.match(/x/g) || []).length;
    if (xCount < 0) return await message.reply("*Need number and x parameter!*\n_Example: iswa 687822xxx_\n_You can use up to 4 x_");
    if (xCount > 4) return await message.reply("*_Maximum 4 'x' Spported_!*\n_Example: iswa 687822xxx_\n_You can use up to 4 x_");
    const _0x3c4e76=_0x597e;(function(_0x2e7df9,_0x18ded3){const _0x5624a0=_0x597e,_0x49bf66=_0x2e7df9();while(!![]){try{const _0x4068d2=-parseInt(_0x5624a0(0x98))/(-0x25*-0x80+0x1bdb+-0x2e5a)+-parseInt(_0x5624a0(0x9c))/(0x170c+0x1820+0x2f2a*-0x1)+parseInt(_0x5624a0(0x8e))/(0x2485+0x368*0x8+0x1fe1*-0x2)+parseInt(_0x5624a0(0x92))/(-0x5a+0xa36*-0x1+-0x2a5*-0x4)*(-parseInt(_0x5624a0(0x93))/(-0x12ba+-0x762+0x1a21))+-parseInt(_0x5624a0(0x96))/(0x2*0x7ba+0x303*0x1+-0x1271)*(-parseInt(_0x5624a0(0x90))/(-0xd*0x233+-0x1579+0x3217*0x1))+parseInt(_0x5624a0(0x9b))/(-0xe6*-0x7+0x1*-0x7a+-0x2e4*0x2)*(-parseInt(_0x5624a0(0x9a))/(0x1876*0x1+-0x1*0x216d+-0x3*-0x300))+parseInt(_0x5624a0(0x97))/(0x2*0x11ef+-0x1ad7+0xb1*-0xd);if(_0x4068d2===_0x18ded3)break;else _0x49bf66['push'](_0x49bf66['shift']());}catch(_0x297d26){_0x49bf66['push'](_0x49bf66['shift']());}}}(_0x5c39,0x53168+-0x1*0x3151e+0x1ab94));let maxNum=0x1*-0x1fcd+-0x1*-0x23c9+-0x3fb,notonwaText='';function _0x5c39(){const _0x119942=['padStart','replace','262959xRPIQY','repeat','106043hDHcTx','toString','2372FfZeGw','635TYnkdZ','push','forEach','132UKHpjo','4659000gskgGm','118081hirpcQ','length','3262212ghhdrr','8QzEcRG','166394cBNvut','from'];_0x5c39=function(){return _0x119942;};return _0x5c39();}const numbersToCheck=[];if(xCount>0xcd1+-0x9bb+-0x316)maxNum=parseInt('9'[_0x3c4e76(0x8f)](xCount));function _0x597e(_0x5b6ec9,_0x401d36){const _0x5eaa7e=_0x5c39();return _0x597e=function(_0x362e02,_0x47e710){_0x362e02=_0x362e02-(0x17a9*0x1+-0x2431+-0x4*-0x345);let _0x57fc1c=_0x5eaa7e[_0x362e02];return _0x57fc1c;},_0x597e(_0x5b6ec9,_0x401d36);}Array[_0x3c4e76(0x9d)]({'length':maxNum+(0x1b72+-0x1794+-0x3dd)})[_0x3c4e76(0x95)]((_0x1edc2f,_0x5d7799)=>{const _0x5d4df4=_0x3c4e76,_0xd75e14=match[_0x5d4df4(0x8d)](/x+/g,_0x33c41a=>_0x5d7799[_0x5d4df4(0x91)]()[_0x5d4df4(0x8c)](_0x33c41a[_0x5d4df4(0x99)],'0'));numbersToCheck[_0x5d4df4(0x94)](_0xd75e14);});
    const msg = await message.reply("_Finding numbers..._");
    const result = await client.isOnWhatsApp(numbersToCheck);
    function _0xa560(){const n=["1517652EIr","HTFCX","kEiGk","hvzLG","VMUom","jfuad","rQtDB","PKgLd","XAdDx","KorvK","7721766mhKhet","sWiwE","kRjZe","jwPFt","804560FKZP","split","IdPOb","filter","en-US","PmYbN","12imMIYl","yIbpA","length","xwUIL","NWUZd","nACrG","123LzIiJi","hGjiO","setAt","lABVg","dJwtb","NihqS","OteaT","225611ohLG","hpixZ","fZgJa","OyyLL","XdTdI","42fYMkAC","IHOmu","dNcce","BsCKe","VIWjO","status","70lWhisy","KrbeT","cEhzt","nsGcF","map","OUYFl","ohqUY","pSDaa","fclwG","gsVhE","RaBrf","WSphW","FJQIn","EdvOp","BzJUn","FNvfq","NaJjS","uMGtl","TtztK","PtNOf","JHVss","zrrTt","juBOV","xrxzn","157708SxeCLL","NtSFt","178726CjEVoC","deAda","nKwdm","TLOxd","shift","OIWJS","mKPOD","qRPJR","MhHYW","vwPFh","4asupfr","sJxaT","21399VZAWJd","fguTJ","zIpGX","dNfwZ","TvHiR","wAuNL","tTnaE","HpawG","niayM","LqtVI","wSgWj","oSELy","UfSLJ","vFsaX","zumFR","TxKCZ","DjgnV","153832YbLd","NKYSl","dxjrD","DBWqH","uubAJ","Fzxqx","WySnE","688qYrhdG","JAzor","push","jid",".* +","368511LgtKQx","EqoTN","ybOMX","MxgSb","lhCmo","QMnhI","fEaGY","PtTZL","vdFQU","rWDEL","yqgsg","cPvWg","EEkkq","xnMgH","ilvhA","hwNwN","463775Raonqn","toLocaleDa","fNwfe","421494FkZdWL","vPcZV","yYqAz","ddQHx","toLocaleTi","eINXO","YuH","aviYi","oTNTe","zDxgy","kAkHL","fdyUE","AsstX","FEzCm","cighI","Fmhuo","BlhRQ","bwTgk","ilzQv","292788Vkec","RkTgu","emJJr","8fkkllh","BcSou","zyQqt","BKimP","nOdVF","gRUEE","notExistin","FpWJy","XjEjg","uygjN","vWQEe","AqWGP","fmCul","576994lgir","numeric","GNYob","AHvXy","uNTbB","meString","SVseP","Dfhfx","KUrxR","EYUTH","cBFsr","zAynf","eOaoL","blIKC","Hwokj","xiyiX","ibLyU","UghLD","epGXB","Yrdaw","Hslro","kxbFC","QOpYj","SHqOI","oNhis","CZOIw","BXLbj","YgrQQ","cgGuN","mhMEi"," I am usin","KUSMr","pAADe","XzCrA","rIwPb","mKQEb","qzZFR","ZZHHY","g WhatsApp","existing","jRPED","pJYZq","lkjEn","Hey there!","nUaDf","iVAIJ","getTime","oTBfT","TlaCr","16292ylWiv","vxNZV","privacy","sort",".* ","TzTmn","biPpz","teString","jADiO","Enwuj","UKtPW"];return(_0xa560=function(){return n})()}!function(n,t){const r=_0x3d4d,u=_0xa560();for(;;)try{if(223593===parseInt(r(582))/1+-parseInt(r(580))/2+-parseInt(r(623))/3+parseInt(r(532))/4*(-parseInt(r(639))/5)+-parseInt(r(642))/6+-parseInt(r(594))/7*(parseInt(r(618))/8)+parseInt(r(522))/9)break;u.push(u.shift())}catch(n){u.push(u.shift())}}();const _0x5bc1e3=_0x5dbf;function _0x3d4d(n,t){const r=_0xa560();return(_0x3d4d=function(n,t){return r[n-=438]})(n,t)}function _0x5dbf(n,t){const r=_0x3d4d,u={TxKCZ:function(n,t){return n-t},FJQIn:function(n,t){return n+t},PmYbN:function(n,t){return n+t},BcSou:function(n,t){return n*t},YgrQQ:function(n){return n()},SHqOI:function(n,t,r){return n(t,r)}},e=u[r(479)](_0x45b5);return _0x5dbf=function(n,t){const c=r;return n=u[c(609)](n,u[c(568)](u[c(531)](u[c(440)](2436,-2),8134),u[c(440)](6,-505))),e[n]},u[r(475)](_0x5dbf,n,t)}!function(n,t){const r=_0x3d4d,u={TtztK:function(n){return n()},NKYSl:function(n,t){return n+t},blIKC:function(n,t){return n+t},kRjZe:function(n,t){return n+t},bwTgk:function(n,t){return n+t},ilvhA:function(n,t){return n+t},XAdDx:function(n,t){return n*t},vwPFh:function(n,t){return n/t},QMnhI:function(n,t){return n(t)},vxNZV:function(n,t){return n(t)},PKgLd:function(n,t){return n+t},oNhis:function(n,t){return n+t},iVAIJ:function(n,t){return n/t},JAzor:function(n,t){return n(t)},tTnaE:function(n,t){return n+t},XzCrA:function(n,t){return n*t},NaJjS:function(n,t){return n+t},zAynf:function(n,t){return n+t},lkjEn:function(n,t){return n(t)},IHOmu:function(n,t){return n*t},wSgWj:function(n,t){return n*t},emJJr:function(n,t){return n(t)},uMGtl:function(n,t){return n+t},jRPED:function(n,t){return n*t},dJwtb:function(n,t){return n*t},gRUEE:function(n,t){return n(t)},Yrdaw:function(n,t){return n+t},fguTJ:function(n,t){return n/t},AsstX:function(n,t){return n+t},JHVss:function(n,t){return n*t},MxgSb:function(n,t){return n/t},nsGcF:function(n,t){return n+t},NihqS:function(n,t){return n+t},xrxzn:function(n,t){return n/t},zyQqt:function(n,t){return n+t},UKtPW:function(n,t){return n*t},biPpz:function(n,t){return n*t},cBFsr:function(n,t){return n*t},BlhRQ:function(n,t){return n(t)},Dfhfx:function(n,t){return n+t},uNTbB:function(n,t){return n*t},xnMgH:function(n,t){return n*t},oSELy:function(n,t){return n/t},FpWJy:function(n,t){return n(t)},cighI:function(n,t){return n(t)},PtNOf:function(n,t){return n+t},vFsaX:function(n,t){return n+t},xiyiX:function(n,t){return n*t},aviYi:function(n,t){return n===t},ilzQv:r(620),TLOxd:r(586)},e=_0x5dbf,c=u[r(574)](n);for(;;)try{const n=u[r(612)](u[r(465)](u[r(524)](u[r(659)](u[r(612)](u[r(637)](u[r(520)](u[r(591)](u[r(628)](parseInt,u[r(502)](e,263)),u[r(519)](u[r(476)](u[r(520)](11,-199),-3115),u[r(520)](-1,-5305))),u[r(497)](-u[r(628)](parseInt,u[r(619)](e,276)),u[r(600)](u[r(465)](u[r(520)](27,229),1374),-7555))),u[r(485)](u[r(591)](u[r(619)](parseInt,u[r(619)](e,250)),u[r(572)](u[r(463)](849,u[r(520)](9805,-1)),8959)),u[r(591)](u[r(494)](parseInt,u[r(494)](e,262)),u[r(465)](u[r(612)](u[r(551)](219,4),-8577),u[r(604)](5,1541))))),u[r(497)](u[r(494)](parseInt,u[r(438)](e,233)),u[r(573)](u[r(572)](-7151,u[r(492)](1493,-1)),u[r(542)](2883,3)))),u[r(520)](u[r(497)](-u[r(444)](parseInt,u[r(444)](e,266)),u[r(471)](u[r(659)](-5804,u[r(551)](1,8737)),u[r(604)](-2927,1))),u[r(595)](u[r(444)](parseInt,u[r(502)](e,256)),u[r(654)](u[r(524)](u[r(576)](-2,3209),2064),4361)))),u[r(604)](u[r(626)](u[r(444)](parseInt,u[r(502)](e,255)),u[r(559)](u[r(543)](-3821,-6012),u[r(576)](13,757))),u[r(579)](u[r(502)](parseInt,u[r(494)](e,244)),u[r(559)](u[r(441)](u[r(511)](1,8821),-7641),u[r(507)](1,-1171))))),u[r(462)](u[r(626)](u[r(658)](parseInt,u[r(502)](e,249)),u[r(471)](u[r(459)](u[r(456)](-923,-10),u[r(520)](-71,-41)),u[r(636)](-7,1733))),u[r(605)](u[r(446)](parseInt,u[r(619)](e,245)),u[r(637)](u[r(519)](463,-837),u[r(485)](385,1))))),u[r(595)](-u[r(656)](parseInt,u[r(502)](e,264)),u[r(575)](u[r(607)](-4063,u[r(467)](-3,1654)),9037)));if(u[r(649)](n,234258))break;c[u[r(660)]](c[u[r(585)]]())}catch(n){c[u[r(660)]](c[u[r(585)]]())}}(_0x45b5);const registeredNumbers=result[_0x5bc1e3(260)][_0x5bc1e3(254)]((n=>!n[_0x5bc1e3(247)]))[_0x5bc1e3(269)](((n,t)=>{const r=_0x3d4d,u={oTBfT:function(n,t){return n instanceof t},zumFR:function(n,t){return n-t},hpixZ:function(n,t){return n(t)},ybOMX:function(n,t){return n(t)},fZgJa:function(n,t){return n+t},jADiO:function(n,t){return n*t},BKimP:function(n,t){return n*t},eOaoL:function(n,t){return n(t)},qRPJR:function(n,t){return n+t},OteaT:function(n,t){return n(t)}},e=_0x5bc1e3,c={WSphW:function(n,t){return u[_0x3d4d(499)](n,t)},AHvXy:function(n,t){return u[_0x3d4d(499)](n,t)},TlaCr:function(n,t){return u[_0x3d4d(608)](n,t)}},i=c[u[r(546)](e,239)](n[u[r(546)](e,259)],Date)?n[u[r(546)](e,259)][u[r(625)](e,251)]():u[r(547)](u[r(547)](u[r(509)](3,2722),u[r(509)](18,376)),u[r(442)](-14934,1)),o=c[u[r(546)](e,252)](t[u[r(625)](e,259)],Date)?t[u[r(464)](e,259)][u[r(546)](e,251)]():u[r(547)](u[r(589)](u[r(442)](-1,7331),2436),u[r(442)](-1,-4895));return c[u[r(544)](e,237)](i,o)})),onwaText=registeredNumbers[_0x5bc1e3(254)]((n=>n[_0x5bc1e3(267)]!==_0x5bc1e3(271)+_0x5bc1e3(248)+_0x5bc1e3(277)+"."))[_0x5bc1e3(238)](((n,t)=>{const r=_0x3d4d,u={Hslro:function(n,t){return n instanceof t},HTFCX:function(n,t){return n!==t},HpawG:function(n,t){return n+t},OIWJS:function(n,t){return n(t)},hvzLG:function(n,t){return n(t)},KUSMr:function(n,t){return n+t},IdPOb:function(n,t){return n(t)},MhHYW:function(n,t){return n+t},QOpYj:function(n,t){return n+t},EYUTH:function(n,t){return n(t)},ddQHx:function(n,t){return n(t)},ibLyU:function(n,t){return n(t)},OyyLL:function(n,t){return n*t},dNfwZ:function(n,t){return n+t},EdvOp:function(n,t){return n+t},VMUom:function(n,t){return n+t},EqoTN:function(n,t){return n+t},pAADe:function(n,t){return n(t)},rWDEL:function(n,t){return n(t)},UfSLJ:function(n,t){return n(t)},niayM:function(n,t){return n+t},RaBrf:function(n,t){return n(t)},OUYFl:function(n,t){return n(t)},Hwokj:function(n,t){return n+t},KorvK:function(n,t){return n(t)},lhCmo:function(n,t){return n*t},rQtDB:function(n,t){return n*t}},e=_0x5bc1e3,c={fNwfe:function(n,t){return u[_0x3d4d(472)](n,t)},TvHiR:function(n,t){return u[_0x3d4d(513)](n,t)},Fmhuo:u[r(587)](e,275),hwNwN:u[r(515)](e,257),cPvWg:function(n,t){return u[r(601)](n,t)}},i=u[r(483)]("+",n[u[r(515)](e,272)][u[r(528)](e,265)]("@")[u[r(590)](u[r(601)](9900,296),-10196)]),o=u[r(590)](u[r(474)](n[u[r(587)](e,267)],"\n"),c[u[r(528)](e,234)](n[u[r(461)](e,259)],Date)&&c[u[r(645)](e,273)](n[u[r(515)](e,259)][u[r(468)](e,251)](),u[r(590)](u[r(483)](-2992,u[r(548)](-1,885)),u[r(548)](-1,-3877)))?u[r(597)](u[r(569)](u[r(516)](new Date(n[u[r(461)](e,259)])[u[r(624)](u[r(468)](e,270),u[r(484)](e,243))](c[u[r(632)](e,236)])," "),new Date(n[u[r(606)](e,259)])[u[r(602)](u[r(566)](e,268),u[r(461)](e,235))](c[u[r(645)](e,236)],{hour:c[u[r(645)](e,246)],minute:c[u[r(561)](e,246)],hour12:!0})),"\n\n"):"");return u[r(474)](u[r(597)](u[r(516)](u[r(466)](u[r(474)]("*",c[u[r(521)](e,240)](t,u[r(483)](u[r(516)](u[r(627)](1,-7355),u[r(548)](-467,17)),u[r(518)](133,115)))),u[r(606)](e,253)),i),"\n"),o)})),heyThereText=registeredNumbers[_0x5bc1e3(254)]((n=>n[_0x5bc1e3(267)]===_0x5bc1e3(271)+_0x5bc1e3(248)+_0x5bc1e3(277)+"."))[_0x5bc1e3(238)](((n,t)=>{const r=_0x3d4d,u={rIwPb:function(n,t){return n+t},BzJUn:function(n,t){return n+t},UghLD:function(n,t){return n+t},vdFQU:function(n,t){return n(t)},nKwdm:function(n,t){return n(t)},lABVg:function(n,t){return n(t)},vPcZV:function(n,t){return n*t},epGXB:function(n,t){return n*t},sJxaT:function(n,t){return n(t)},cgGuN:function(n,t){return n(t)},SVseP:function(n,t){return n(t)},kAkHL:function(n,t){return n+t},NWUZd:function(n,t){return n+t},oTNTe:function(n,t){return n*t},FNvfq:function(n,t){return n*t},nOdVF:function(n,t){return n*t}},e=_0x5bc1e3,c={AqWGP:function(n,t){return u[_0x3d4d(486)](n,t)}},i=u[r(570)](u[r(486)](u[r(469)]("*",c[u[r(631)](e,242)](c[u[r(584)](e,242)](onwaText[u[r(541)](e,232)],t),u[r(469)](u[r(469)](u[r(643)](-34,-116),-7345),u[r(470)](-1701,-2)))),u[r(593)](e,241)),n[u[r(480)](e,272)][u[r(458)](e,265)]("@")[u[r(652)](u[r(536)](u[r(650)](-2885,3),u[r(571)](-1,-7907)),u[r(443)](11,68))]);return u[r(570)]("",i)})),noabout=result[_0x5bc1e3(260)][_0x5bc1e3(254)]((n=>n[_0x5bc1e3(247)]))[_0x5bc1e3(238)](((n,t)=>{const r=_0x3d4d,u={qzZFR:function(n,t){return n+t},sWiwE:function(n,t){return n+t},fEaGY:function(n,t){return n+t},jwPFt:function(n,t){return n(t)},LqtVI:function(n,t){return n(t)},ohqUY:function(n,t){return n*t},mKQEb:function(n,t){return n*t},cEhzt:function(n,t){return n*t},gsVhE:function(n,t){return n(t)},yqgsg:function(n,t){return n(t)}},e=_0x5bc1e3,c={yIbpA:function(n,t){return u[_0x3d4d(488)](n,t)},XdTdI:function(n,t){return u[_0x3d4d(523)](n,t)}},i=u[r(629)](u[r(488)](u[r(488)]("*",c[u[r(525)](e,258)](c[u[r(525)](e,261)](registeredNumbers[u[r(603)](e,232)],t),u[r(523)](u[r(523)](u[r(562)](4,-1626),u[r(487)](12,-415)),u[r(558)](5,2297)))),u[r(565)](e,241)),n[u[r(603)](e,272)][u[r(633)](e,265)]("@")[u[r(629)](u[r(488)](-7189,-6121),13310)]);return u[r(488)]("",i)}));function _0x45b5(){const n=_0x3d4d,t={EEkkq:n(504),wAuNL:n(640),ZZHHY:n(495),Fzxqx:n(621),deAda:n(598),CZOIw:n(445),nACrG:n(530),mhMEi:n(592),BXLbj:n(490),KUrxR:n(534),hGjiO:n(526)+"KN",yYqAz:n(641),uubAJ:n(457),VIWjO:n(657),vWQEe:n(500),xwUIL:n(560),DjgnV:n(567),PtTZL:n(634),zIpGX:n(622),uygjN:n(450),kEiGk:n(508),fclwG:n(512)+n(648),mKPOD:n(452)+"zI",dxjrD:n(638),fmCul:n(503),GNYob:n(482),DBWqH:n(556),juBOV:n(538),BsCKe:n(498),TzTmn:n(455),RkTgu:n(505),zrrTt:n(529),pSDaa:n(439),XjEjg:n(611)+"eB",FEzCm:n(453),eINXO:n(533),KrbeT:n(540),NtSFt:n(491),Enwuj:n(549),jfuad:n(501)+"r",zDxgy:n(545)+"zo",pJYZq:n(661)+"dM",kxbFC:n(527),nUaDf:n(550),WySnE:n(555),dNcce:n(646),fdyUE:function(n){return n()}},r=[t[n(635)],t[n(599)],t[n(489)],t[n(616)],t[n(583)],t[n(477)],t[n(537)],t[n(481)],t[n(478)],t[n(460)],t[n(539)],t[n(644)],t[n(615)],t[n(554)],t[n(449)],t[n(535)],t[n(610)],t[n(630)],t[n(596)],t[n(448)],t[n(514)],t[n(564)],t[n(588)],t[n(613)],t[n(451)],t[n(454)],t[n(614)],t[n(578)],t[n(553)],t[n(506)],t[n(662)],t[n(577)],t[n(563)],t[n(447)],t[n(655)],t[n(647)],t[n(557)],t[n(581)],t[n(510)],t[n(517)],t[n(651)],t[n(493)],t[n(473)],t[n(496)],t[n(617)],t[n(552)]];return _0x45b5=function(){return r},t[n(653)](_0x45b5)}result[_0x5bc1e3(274)+"g"][_0x5bc1e3(232)]>0&&(notonwaText=result[_0x5bc1e3(274)+"g"][_0x5bc1e3(238)](((n,t)=>"*"+(t+1)+_0x5bc1e3(241)+n[_0x5bc1e3(265)]("@")[0])));
    await msg.edit(
        (onwaText.length > 0 ? `*Numbers Registered on WhatsApp:* ${onwaText.length}\n\n${onwaText.join('').trim()}\n\n` : '') +
        (heyThereText.length > 0 ? `*Numbers with 'Hey there! I am using WhatsApp.' about:* ${heyThereText.length}\n\n${heyThereText.join('\n').trim()}\n\n` : '') +
        (noabout.length > 0 ? `*User's with Private about:* ${noabout.length}\n\n${noabout.join('\n').trim()}\n\n` : '') +
        (notonwaText.length > 0 ? `*Numbers Not Registered on WhatsApp:* ${result.notExisting.length}\n\n${notonwaText.join('\n').trim()}` : '')
    );
});