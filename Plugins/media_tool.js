const { Function, isPublic, addAudioMetaData, toAudio, getBuffer, getRandom, webp2mp4File, pdf } = require('../lib/')
const { STICKER_DATA, AUDIO_DATA } = require ('../config')
const { addExif } = require('../lib/')
const {exec} = require("child_process")
const fs = require('fs')
const c = require ('../config')
const PDFDocument = require('pdfkit');
function _0x31f4(n,t){const r=_0x2fa5();return(_0x31f4=function(n,t){return r[n-=360]})(n,t)}function _0x2fa5(){const n=["rJRCv","client","PtAQD","ijvXv","ZZjyj","ixRfE","hrKqH","vMZgm","XZSeC","XjoCs","zZCFV","dsCAE","HMwYx","lPnWo","248226JdUo","agJND","yrfOI","KNLiV","YFZZN","trim ?(.*)","18263jgstt","xlWEC"," trim 10;3","9081eGWNgO","IygUv","475060YfhqCE","CXVnn","aGaaW","opDdY","BwPoa","xByAd","JTqRZ","942636nBAI","nnrsk","mp3","saHzR","videotrim.","shift","WyaUd","FXaYe","withAudioC","PZkDT","uTGwx","RdpJQ","842vChjTo","TFqPt","BFdoI","ENQve","rBgMg","wqjCt","qNQft","yChOL","Ykoxm","_Example :","cszUL","RCyUt","rkAvV","TNkXR","zXgND","PCoOy","12bfgUee","setDuratio","reply","LfPlo","oVzGH","trim audio","audio","pusyu","wsBUA","SLPWa","reply_mess","ssJUb","Ixyiv","a audio/vi","lSRL","CudBf","QoTVy","XgYFa","lGPlG","UOtFu","ZGxVj","941340tQtNta","ZbZnD","668qCEaAm","audio/mpeg","PEqNB","HIIwy","HvfBA","bHhMH","McEiI","zSNfj","1362MfvdfU","PJZrd","sage","kFSxe","vuNNy","xample : t","dHtoT","FCYNO","zdxEh","mYEFi","PyxIC","dslic","YnLuf","pVfHI","iihpX","withVideoC","HfrLr","xdADG","FYtBX","3893368xIl","split","khBWL","RaJry","nuehD","tPDck","96240tgNtcD","uiXed","tjqgF","sYGQP","mnHeF","TpOcM","VsAAY","NDYnj","DipWn","YwuqB","chat","bLmiA","zdWRk","ljBfO","2792343hEhfaf","GsFKL","xjLxz","age","PiCqX","LOHcK","PndMY","fVTjM","12256389ln","xnfMz","JOPqE","media","epDLJ","bqIMj","mCFJq","aIGvY","kUCCE","paLGt","XBtWz","gWFnn","xgRDc","ormat!*\n_E","pahWE","JJFAu","atABe","wthfE","dSaveMedia","rtDIn","jUPlp","HrkAK","odec","YahjJ","aNvCo","sZCfY","35gWxprg","tVCNV","tsvEE","setStartTi","push","ZLB","npUIM","XYeOb","BkMbQ","whOyX","VaiQp","lkHpv","VRJWw","ivTRE","WGvbt","xlnky","UGGEG","mp4","3685tufXow","*Invalid F","fmvUr","vGCaX","zIrnv","opUjc","vsxCS","end","lcgiC","508930eCFv","QRbpn","yrCbH","trim","xrPdn","zGsgy","585RrZquV","fErSd","video","_Reply to ","ltkdb","BgZeN","jSpTf","ZErEp","mGlnC","UgBYz","dxlnh","HBrZo","ILnyz","audiotrim.","1315692gyTEsu","sendMessag","xzTUv"," or video","NObRn","IawCJ","quoted_mes","deo._","ytHYD","downloadAn","aGlgW","IysEL","copy","bRZEf","IbxML","ttFyC","ZaGZB","aPXXZ","eFvhi","KMPfa","cKMPf","wPnWa","uKbXQ","AWBBk","pElTu","save","rim 0;15_","xEJnS","87744YOKGOd","muRaU","lSdZy","bPlmq","bckIQ","NBTMf","hGQiS","carWV","mkXzZ","fluent-ffm","peg","HPbDM","aboJk","JrcMf","readFileSy","FmmBC"];return(_0x2fa5=function(){return n})()}!function(n,t){const r=_0x31f4,u=_0x2fa5();for(;;)try{if(653182===-parseInt(r(430))/1*(-parseInt(r(391))/2)+-parseInt(r(477))/3+-parseInt(r(558))/4+-parseInt(r(372))/5+parseInt(r(428))/6*(-parseInt(r(511))/7)+-parseInt(r(586))/8*(parseInt(r(544))/9)+-parseInt(r(463))/10*(-parseInt(r(529))/11))break;u.push(u.shift())}catch(n){u.push(u.shift())}}();const _0x1356fd=_0x5afb;function _0x5afb(n,t){const r=_0x31f4,u={RdpJQ:function(n,t){return n-t},IygUv:function(n,t){return n+t},mCFJq:function(n,t){return n*t},xlnky:function(n){return n()},PyxIC:function(n,t,r){return n(t,r)}},e=u[r(526)](_0xc890);return _0x5afb=function(n,t){const f=r;return n=u[f(390)](n,u[f(371)](u[f(371)](-9173,u[f(491)](-1,203)),9759)),e[n]},u[r(448)](_0x5afb,n,t)}function _0xc890(){const n=_0x31f4,t={zZCFV:n(505),dHtoT:n(381),QoTVy:n(370),ZGxVj:n(457)+n(516),sZCfY:n(530),TpOcM:n(458),JJFAu:n(379)+"Uh",lPnWo:n(438),tPDck:n(596),hrKqH:n(400),uiXed:n(490),BwPoa:n(367)+"P",hGQiS:n(583),xzTUv:n(361)+"At",agJND:n(603),bLmiA:n(565),xEJnS:n(567),IbxML:n(419),aPXXZ:n(520),zXgND:n(480),YwuqB:n(602),bRZEf:n(600),FXaYe:n(387),JrcMf:n(509),ttFyC:n(443),rkAvV:n(503),uKbXQ:n(523),McEiI:n(445),NBTMf:n(595),lGPlG:n(383),HPbDM:n(473),lSdZy:n(498),VsAAY:n(541),XjoCs:n(409),qNQft:n(559),saHzR:n(561),uTGwx:n(570),xByAd:n(507),CXVnn:n(415),TFqPt:n(547),aGaaW:n(481),Ykoxm:n(408),pusyu:n(594),UOtFu:n(528),yrfOI:n(536),vGCaX:n(431),QRbpn:n(514),FYtBX:n(564),ssJUb:n(412),ljBfO:n(546),RCyUt:n(420),XBtWz:n(407),cKMPf:n(577),bHhMH:n(413),ZaGZB:n(369),wPnWa:n(488),eFvhi:n(453),HMwYx:n(485)+n(421),nnrsk:n(366),tjqgF:n(584),khBWL:n(538)+"uH",aIGvY:n(440),pElTu:n(417),bckIQ:n(557),ZErEp:function(n){return n()}},r=[t[n(612)],t[n(444)],t[n(423)],t[n(427)],t[n(510)],t[n(468)],t[n(500)],t[n(360)],t[n(462)],t[n(608)],t[n(464)],t[n(376)],t[n(592)],t[n(560)],t[n(362)],t[n(474)],t[n(585)],t[n(572)],t[n(575)],t[n(405)],t[n(472)],t[n(571)],t[n(386)],t[n(599)],t[n(573)],t[n(403)],t[n(580)],t[n(436)],t[n(591)],t[n(425)],t[n(597)],t[n(588)],t[n(469)],t[n(611)],t[n(397)],t[n(382)],t[n(389)],t[n(377)],t[n(373)],t[n(392)],t[n(374)],t[n(399)],t[n(414)],t[n(426)],t[n(363)],t[n(532)],t[n(539)],t[n(456)],t[n(418)],t[n(476)],t[n(402)],t[n(495)],t[n(578)],t[n(435)],t[n(574)],t[n(579)],t[n(576)],t[n(614)],t[n(380)],t[n(465)],t[n(459)],t[n(492)],t[n(582)],t[n(590)]];return _0xc890=function(){return r},t[n(551)](_0xc890)}(function(n,t){const r=_0x31f4,u={yrCbH:function(n){return n()},WyaUd:function(n,t){return n+t},dsCAE:function(n,t){return n+t},RaJry:function(n,t){return n+t},LfPlo:function(n,t){return n+t},PEqNB:function(n,t){return n/t},xrPdn:function(n,t){return n(t)},xgRDc:function(n,t){return n(t)},HrkAK:function(n,t){return n+t},dslic:function(n,t){return n+t},XYeOb:function(n,t){return n*t},tsvEE:function(n,t){return n(t)},ZZjyj:function(n,t){return n+t},pahWE:function(n,t){return n*t},XgYFa:function(n,t){return n*t},zdWRk:function(n,t){return n(t)},TNkXR:function(n,t){return n(t)},JOPqE:function(n,t){return n+t},opUjc:function(n,t){return n+t},HBrZo:function(n,t){return n*t},BkMbQ:function(n,t){return n/t},atABe:function(n,t){return n+t},ixRfE:function(n,t){return n+t},kUCCE:function(n,t){return n/t},npUIM:function(n,t){return n(t)},CudBf:function(n,t){return n+t},kFSxe:function(n,t){return n(t)},HvfBA:function(n,t){return n(t)},NDYnj:function(n,t){return n(t)},vMZgm:function(n,t){return n*t},zGsgy:function(n,t){return n(t)},xnfMz:function(n,t){return n(t)},ZbZnD:function(n,t){return n+t},mGlnC:function(n,t){return n*t},YnLuf:function(n,t){return n*t},LOHcK:function(n,t){return n(t)},fVTjM:function(n,t){return n*t},wqjCt:function(n,t){return n*t},YFZZN:function(n,t){return n===t},ENQve:r(515),PndMY:r(384)},e=_0x5afb,f=u[r(540)](n);for(;;)try{const n=u[r(385)](u[r(385)](u[r(613)](u[r(460)](u[r(410)](u[r(460)](u[r(432)](u[r(542)](parseInt,u[r(497)](e,410)),u[r(506)](u[r(449)](7900,u[r(518)](-233,33)),u[r(518)](35,-6))),u[r(432)](u[r(497)](parseInt,u[r(513)](e,403)),u[r(606)](u[r(410)](u[r(499)](12,17),u[r(499)](-1,4083)),u[r(424)](-3881,-1)))),u[r(499)](u[r(432)](-u[r(475)](parseInt,u[r(404)](e,399)),u[r(487)](u[r(534)](u[r(499)](-4966,2),u[r(555)](2,3331)),u[r(424)](-3,-1091))),u[r(519)](u[r(404)](parseInt,u[r(404)](e,384)),u[r(501)](u[r(607)](-2599,-4471),7074)))),u[r(493)](-u[r(475)](parseInt,u[r(517)](e,393)),u[r(422)](u[r(422)](u[r(424)](-155,11),u[r(555)](-1077,-4)),u[r(555)](-433,6)))),u[r(424)](u[r(493)](u[r(404)](parseInt,u[r(441)](e,404)),u[r(410)](u[r(410)](5720,2572),u[r(518)](-2,4143))),u[r(432)](u[r(434)](parseInt,u[r(470)](e,408)),u[r(607)](u[r(460)](-3740,u[r(609)](-2,661)),5069)))),u[r(519)](u[r(543)](parseInt,u[r(486)](e,400)),u[r(385)](u[r(429)](u[r(424)](9,26),u[r(552)](-1489,1)),u[r(450)](3,421)))),u[r(432)](-u[r(497)](parseInt,u[r(482)](e,390)),u[r(410)](u[r(449)](u[r(484)](-109,-79),u[r(555)](-15,25)),u[r(396)](19,-433))));if(u[r(365)](n,325770))break;f[u[r(394)]](f[u[r(483)]]())}catch(n){f[u[r(394)]](f[u[r(483)]]())}})(_0xc890),Function({pattern:_0x1356fd(391),fromMe:isPublic,desc:_0x1356fd(445)+_0x1356fd(432),type:_0x1356fd(388)},(async(n,t,r)=>{const u=_0x31f4,e={paLGt:function(n,t){return n(t)},PJZrd:function(n,t){return n||t},wthfE:function(n,t){return n(t)},AWBBk:function(n,t){return n+t},IysEL:function(n,t){return n(t)},tVCNV:function(n,t){return n(t)},PtAQD:function(n,t){return n(t)},ivTRE:function(n,t){return n(t)},NObRn:function(n,t){return n+t},vsxCS:function(n,t){return n(t)},xjLxz:function(n,t){return n(t)},GsFKL:function(n,t){return n(t)},IawCJ:function(n,t){return n(t)},carWV:function(n,t){return n+t},ytHYD:function(n,t){return n(t)},pVfHI:function(n,t){return n+t},bPlmq:function(n,t){return n(t)},muRaU:function(n,t){return n(t)},PZkDT:function(n,t){return n+t},aGlgW:function(n,t){return n(t)},fErSd:function(n,t){return n+t},zSNfj:function(n,t){return n(t)},BgZeN:function(n,t){return n+t},dxlnh:function(n,t){return n(t)},ijvXv:function(n,t){return n(t)},ILnyz:function(n,t){return n(t)},UGGEG:function(n,t){return n+t},XZSeC:function(n,t){return n+t},ltkdb:function(n,t){return n(t)},mYEFi:function(n,t){return n+t},oVzGH:function(n,t){return n+t},YahjJ:function(n,t){return n(t)},SLPWa:function(n,t){return n(t)},mnHeF:function(n,t){return n(t)},DipWn:function(n,t){return n(t)},VaiQp:function(n,t){return n+t},HfrLr:function(n,t){return n(t)},vuNNy:function(n,t){return n(t)},iihpX:function(n,t){return n(t)},HIIwy:function(n,t){return n(t)},gWFnn:function(n,t){return n(t)},rBgMg:function(n,t){return n(t)},jSpTf:function(n,t){return n(t)},xdADG:function(n,t){return n(t)},fmvUr:function(n,t){return n(t)},KNLiV:function(n,t){return n+t},lkHpv:function(n,t){return n(t)},sYGQP:function(n,t){return n+t},cszUL:function(n,t){return n(t)},lcgiC:function(n,t){return n(t)},zIrnv:function(n,t){return n(t)},nuehD:function(n,t){return n+t},xlWEC:function(n,t){return n+t},epDLJ:function(n,t){return n(t)},JTqRZ:function(n,t){return n(t)},PCoOy:function(n,t){return n(t)},WGvbt:function(n,t){return n(t)},aboJk:function(n,t){return n(t)},rtDIn:function(n,t){return n(t)},opDdY:function(n,t){return n+t},UgBYz:function(n,t){return n+t},BFdoI:function(n,t){return n(t)},zdxEh:function(n,t){return n(t)},FmmBC:function(n,t){return n(t)},yChOL:function(n,t){return n(t)}},f=_0x1356fd,i={VRJWw:e[u(451)](e[u(524)](f,396),e[u(589)](f,398)),rJRCv:e[u(587)](f,442),PiCqX:e[u(388)](e[u(568)](f,426),e[u(587)](f,440)),FCYNO:function(n,t){return e[u(494)](n,t)},Ixyiv:e[u(545)](e[u(437)](f,425),e[u(569)](f,405)),bqIMj:e[u(549)](e[u(562)](e[u(554)](f,436),e[u(605)](f,383)),e[u(556)](f,412)),mkXzZ:e[u(593)](e[u(527)](e[u(610)](e[u(566)](f,401),e[u(548)](f,428)),e[u(566)](f,421)),e[u(589)](f,392)),aNvCo:function(n,t){return e[u(439)](n,t)},KMPfa:e[u(447)](e[u(411)](e[u(604)](f,406),e[u(563)](f,387)),"0_"),wsBUA:e[u(508)](f,441),jUPlp:function(n,t){return e[u(494)](n,t)},whOyX:e[u(416)](f,433)},o=i[e[u(467)](f,424)](require,i[e[u(471)](f,414)]);if(!n[e[u(521)](e[u(454)](f,395),e[u(442)](f,416))]||!n[e[u(411)](e[u(452)](f,395),e[u(587)](f,416))][e[u(433)](f,386)]&&!n[e[u(388)](e[u(535)](f,395),e[u(604)](f,416))][e[u(416)](f,446)])return await n[e[u(496)](f,430)](i[e[u(395)](f,407)]);if(!t)return await n[e[u(550)](f,430)](i[e[u(524)](f,439)]);const[c,a]=t[e[u(455)](f,402)](";");if(i[e[u(478)](f,420)](!c,!a)||i[e[u(566)](f,424)](isNaN,c)||i[e[u(531)](f,424)](isNaN,a))return await n[e[u(508)](f,430)](i[e[u(548)](f,385)]);let s=await n[e[u(364)](e[u(395)](f,395),e[u(452)](f,416))][e[u(562)](e[u(452)](f,413),e[u(522)](f,422))]();if(n[e[u(466)](e[u(401)](f,395),e[u(537)](f,416))][e[u(589)](f,386)])i[e[u(533)](f,424)](o,s)[e[u(461)](e[u(508)](f,443),"me")](c[e[u(568)](f,429)]())[e[u(368)](e[u(489)](f,438),"n")](a[e[u(401)](f,429)]())[e[u(489)](f,409)](i[e[u(378)](f,423)]).on(i[e[u(454)](f,435)],(async()=>{const t=u,r=f;await n[e[t(502)](r,411)][e[t(581)](e[t(494)](r,431),"e")](n[e[t(569)](r,427)],{audio:await fs[e[t(581)](e[t(512)](r,418),"nc")](i[e[t(604)](r,423)]),mimetype:i[e[t(502)](r,417)]},{quoted:n[e[t(581)](e[t(512)](r,444),e[t(524)](r,394))]})}));else{if(!n[e[u(451)](e[u(406)](f,395),e[u(496)](f,416))][e[u(525)](f,446)])return n[e[u(554)](f,430)](i[e[u(479)](f,407)]);i[e[u(598)](f,397)](o,s)[e[u(447)](e[u(508)](f,443),"me")](c[e[u(504)](f,429)]())[e[u(375)](e[u(416)](f,438),"n")](a[e[u(442)](f,429)]())[e[u(553)](e[u(393)](f,389),e[u(446)](f,434))](i[e[u(478)](f,415)])[e[u(466)](e[u(589)](f,419),e[u(601)](f,434))](i[e[u(604)](f,415)])[e[u(556)](f,409)](i[e[u(398)](f,437)]).on(i[e[u(442)](f,435)],(async()=>{const t=u,r=f;await n[e[t(524)](r,411)][e[t(562)](e[t(535)](r,431),"e")](n[e[t(479)](r,427)],{video:await fs[e[t(562)](e[t(478)](r,418),"nc")](i[e[t(563)](r,437)])},{quoted:n[e[t(593)](e[t(566)](r,444),e[t(524)](r,394))]})}))}}));
Function({pattern: 'sticker ?(.*)', fromMe: isPublic, desc: 'Converts replied media to sticker', type: 'media'}, async (m, text, client) => {
if (!m.reply_message) return m.reply("_Reply to a photo or a short video!_")
if (/image/.test(m.mine)) {
let media = await client.sendImageAsSticker(m.chat, await m.reply_message.download(), m.data, { packname: c.STICKER_DATA.split(';')[0], author: c.STICKER_DATA.split(';')[1] })
await fs.unlinkSync(media)
} else if (/video/.test(m.mine)) {
if ((m.reply_message.msg || m.reply_message).seconds > 11) return m.reply('_Maximum 10 seconds!_')
let media = await client.sendVideoAsSticker(m.chat, await m.reply_message.download(), m.data, { packname: c.STICKER_DATA.split(';')[0], author: c.STICKER_DATA.split(';')[1] })
await fs.unlinkSync(media)
} else {return m.reply("_Reply to a photo or a short video!_")
}})
Function({pattern: 'mp3 ?(.*)', fromMe: isPublic, desc: 'Converts replied media to mp3 format', type: 'media'}, async (m, match, client) => {
if (/document/.test(m.mine) || !/video/.test(m.mine) && !/audio/.test(m.mine) || !m.reply_message) return m.reply('_Reply to a video/audio_')
let media = await m.reply_message.download()
var [name, artist, url] = AUDIO_DATA == 'false' ? [] : AUDIO_DATA.split(/[,;]/)
name = name || ''
artist = artist || ''
url = url || ''
let writer = await addAudioMetaData(await toAudio(media), url, name, artist, 'Hermit Official')
await client.sendMessage(m.chat, { audio: writer, mimetype: 'audio/mpeg' }, { quoted: m.data })
})
Function({pattern: 'take ?(.*)', fromMe: isPublic, desc: 'Change sticker or audio package name', type: 'media'}, async (message, match, client) => {
if (!message.reply_message || (!message.reply_message.sticker && !message.reply_message.audio)) return await message.send('*_Reply to an audio or a sticker!_*')
if (message.reply_message.sticker) {

const media = await message.reply_message.download()
const media_output = await addExif(media, match)
return await message.client.sendMessage(message.chat, { sticker : media_output } )
}
if (message.reply_message.audio) {
const media = await toAudio(await message.reply_message.download(), 'mp4')
var [name, artist, url] = AUDIO_DATA == 'false' ? [] : AUDIO_DATA.split(/[,;]/)
if (match) {
var [name, artist, url] = match.split(/[,;]/)
match = name
artist = artist
url = url || ''
} else {
match = name
}

const media_output = await addAudioMetaData(media, url, name, artist, 'Hermit Official')
return await message.client.sendMessage(message.chat, { audio: media_output, mimetype: 'audio/mpeg' }, { quoted: message.data })
}
})
Function({pattern: 'photo ?(.*)', fromMe: isPublic, desc: 'Converts non animated stickers to photo', type: 'media'}, async (m, text, client) => {
if (!m.reply_message || !/webp/.test(m.mine)) return m.reply("_Reply to a non animated sticker!_")
let media = await m.reply_message.downloadAndSaveMedia()
let ran = await getRandom('.png')
exec(`ffmpeg -i ${media} ${ran}`, (err) => {
fs.unlinkSync(media)
if (err) return console.log(err)
let buffer = fs.readFileSync(ran)
m.send(buffer, 'image', { quoted: m.quoted_message })
fs.unlinkSync(ran)
})})
Function({pattern: 'mp4 ?(.*)', fromMe: isPublic, desc: 'Converts animated stickers to video', type: 'media'}, async (m, text, client) => {
if (!m.reply_message || !/webp/.test(m.mine)) return m.reply("_Reply to a animated sticker!_")
let media = await m.reply_message.downloadAndSaveMedia()
let webpToMp4 = await webp2mp4File(media)
await m.send(webpToMp4.result, 'video', { quoted: m.quoted_message })
await fs.unlinkSync(media)
})

Function({pattern: 'gif ?(.*)', fromMe: isPublic, desc: 'Converts animated stickers to video', type: 'media'}, async (m, text, client) => {
if (!m.reply_message || !/webp/.test(m.mine)) return m.reply("_Reply to a animated sticker!_")
let media = await m.reply_message.downloadAndSaveMedia()
let webpToMp4 = await webp2mp4File(media)
await m.send(webpToMp4.result, 'video', { gifAttribution: 'TENOR', gifPlayback: true, quoted: m.reply_message.data })
await fs.unlinkSync(media)
})
Function({pattern: 'avmix ?(.*)', fromMe: isPublic, desc: 'Merge audio and video', type: 'media'}, async (m, text, client) => {
if (!fs.existsSync("./media/avmix")) {
fs.mkdirSync("./media/avmix")
}
let files = fs.readdirSync("./media/avmix/")
if ((!m.reply_message && files.length < 2) || (m.reply_message && !m.reply_message.audio && !m.reply_message.video)) return await m.reply('_Reply to Audio and Video to Merge!_');
if (m.reply_message.audio) {
let media = await m.reply_message.downloadAndSaveMedia()
await fs.writeFileSync('./media/avmix/audio.mp3', fs.readFileSync(media));
return await m.reply("_Audio Added_")
}
if (m.reply_message.video) {
let media = await m.reply_message.downloadAndSaveMedia()
await fs.writeFileSync('./media/avmix/video.mp4', fs.readFileSync(media));
return await m.reply("_Video Added_")
}
!function(n,r){for(var t=_0x25d8,u=_0x2dca();;)try{if(362143===parseInt(t(440))/1*(parseInt(t(374))/2)+parseInt(t(343))/3+parseInt(t(294))/4*(-parseInt(t(325))/5)+-parseInt(t(368))/6+parseInt(t(371))/7*(-parseInt(t(309))/8)+-parseInt(t(397))/9*(parseInt(t(437))/10)+-parseInt(t(303))/11*(-parseInt(t(304))/12))break;u.push(u.shift())}catch(n){u.push(u.shift())}}();var _0x49c5c8=_0x3ad1;function _0x2dca(){var n=["1073482duO","ANFyG","78582BdEzv","mp4","FBLaP","MBAmj","GSRMd","ELSEH","515GUyIRq","OSSrr","pwdzP","KuIyy","Wwiwz"," -c copy -","KcJxa","dbMhl","FQJTW","kgISg","tUflH","tTmqi","oGDha","eAEdL","mPNGL","WBRHq","vBHWK","MKFMY","mp3","shift","kcoNi","nmRjY","MgLkp","qIbse","nPaEb","CkpUl","2236750HjPXAz","fdfFv","ehfFx","15629rbQjRp","./media/av","69kEMLKy","CWDuB","iXf","pGsFe","gayoW","ffmpeg -i ","-map 1:a:0","reply","sdsYv","data","mix/mixed.","NPGuP","TQWQQ","WiKew","THish","DFZHW","NudiT","EArLs","uEGQR","foIfx","pvnet","komKG"," Merge_","RPqEr","LObqw","aTEns","/audio.mp3","GcTpf","vSbaX","tLnpP","ZrCLS","724GosgWI","IPIkJ","EehiT","xEuS","VRVvB","txjIw","bmugk","xkbJQ","kADGe","2245111ECMPqe","60qVfxvy","vnQLC","138290Xqyk","Remzk","jEJQJ","72HjBHbO"," ./media/a","XiXcb","ZTukS","GkWsJ","map 0:v:0 ","sendMessag","JPQcD","unlinkSync","souTM","vCouf","UUKDm","mPMVE","WXZUm","WCiUf","MHjHQ","16905QTlomR","mp4 -i ./m","YuMcs","ODAsU","vNssp","LCkaD","yzJPL","ZNSoV","nrEsA","JlbOE","zRsVo","IwVlx","SgHDJ","wzPfE","561kXyJPm","aAtMu","zxAuO","RXZwI","1364058nfMGer","fEEBJ","BGBdD","77rwSvZv","FYxjt","oGiof","hHohR","DErjY","YRDBF","ZHLtj","iNnNo","readFileSy","1264208PfO","tNfqS","wVrPi","WVZnr","aQFfR","mix/audio.","chat","client","rTzqm","467690RKuq","KbHKP","ShQTI","nwAte","155754xrHXKk","LcKul","wtJSC","471373BfzAbr","KXcGI","ExSxa","74CLGXkm","push","mix/video.","MSYmW","JtCPw","split","hebzW","HBCLI","edia/avmix","rBdAv","ZtpNG","_Failed to","wbK","0|4|1|2|3","vmix/mixed","UAGCs","Ozdip","pWglH","548936bdZe","BcomS","bUFrO",".mp4","ZDmcE","18eRQzHP","YAxTE","WEkMi","WZVdg","jpNWJ","10313523gm"];return(_0x2dca=function(){return n})()}function _0x3ad1(n,r){var t=_0x25d8,u={vNssp:function(n,r){return n-r},sdsYv:function(n,r){return n+r},foIfx:function(n,r){return n+r},HBCLI:function(n,r){return n*r},JPQcD:function(n,r){return n*r},YAxTE:function(n){return n()},MgLkp:function(n,r,t){return n(r,t)}},e=u[t(398)](_0x3bdf);return _0x3ad1=function(n,r){var c=t;return n=u[c(329)](n,u[c(271)](u[c(282)](u[c(381)](2,1253),u[c(316)](9,-199)),-530)),e[n]},u[t(433)](_0x3ad1,n,r)}function _0x25d8(n,r){var t=_0x2dca();return(_0x25d8=function(n,r){return t[n-=268]})(n,r)}function _0x3bdf(){var n=_0x25d8,r={oGiof:n(376),NPGuP:n(387),dbMhl:n(442),nrEsA:n(310),oGDha:n(306)+"vG",LObqw:n(285),WVZnr:n(429),wzPfE:n(314),hHohR:n(361),SgHDJ:n(402)+n(297),zxAuO:n(403)+n(444),CWDuB:n(388),IwVlx:n(395),ZNSoV:n(354),kgISg:n(326),KbHKP:n(405)+"e",tTmqi:n(364)+"xU",FQJTW:n(311),GSRMd:n(406),MKFMY:n(379),souTM:n(355)+n(386),bmugk:n(269),hebzW:n(385),kcoNi:n(313),ehfFx:n(360),WZVdg:n(435),gayoW:n(392)+"fk",CkpUl:n(270),vnQLC:n(416),WCiUf:n(411),pWglH:n(362),wtJSC:n(390),fdfFv:n(273),THish:n(346),pGsFe:n(363),ODAsU:n(272),RXZwI:n(339),MSYmW:n(268),jEJQJ:n(289),EArLs:n(382),UAGCs:n(441),pwdzP:n(315),IPIkJ:n(317),rBdAv:function(n){return n()}},t=[r[n(348)],r[n(274)],r[n(418)],r[n(333)],r[n(423)],r[n(287)],r[n(358)],r[n(338)],r[n(349)],r[n(337)],r[n(341)],r[n(443)],r[n(336)],r[n(332)],r[n(420)],r[n(365)],r[n(422)],r[n(419)],r[n(409)],r[n(428)],r[n(318)],r[n(300)],r[n(380)],r[n(431)],r[n(439)],r[n(400)],r[n(446)],r[n(436)],r[n(305)],r[n(323)],r[n(391)],r[n(370)],r[n(438)],r[n(277)],r[n(445)],r[n(328)],r[n(342)],r[n(377)],r[n(308)],r[n(280)],r[n(389)],r[n(413)],r[n(295)]];return _0x3bdf=function(){return t},r[n(383)](_0x3bdf)}(function(n,r){for(var t=_0x25d8,u={KXcGI:function(n){return n()},ZTukS:function(n,r){return n+r},vCouf:function(n,r){return n+r},FYxjt:function(n,r){return n+r},KuIyy:function(n,r){return n+r},ZHLtj:function(n,r){return n/r},aAtMu:function(n,r){return n(r)},tUflH:function(n,r){return n*r},qIbse:function(n,r){return n*r},TQWQQ:function(n,r){return n+r},yzJPL:function(n,r){return n+r},DErjY:function(n,r){return n*r},VRVvB:function(n,r){return n/r},MHjHQ:function(n,r){return n+r},vSbaX:function(n,r){return n+r},MBAmj:function(n,r){return n*r},FBLaP:function(n,r){return n*r},mPMVE:function(n,r){return n(r)},nmRjY:function(n,r){return n+r},mPNGL:function(n,r){return n+r},Wwiwz:function(n,r){return n*r},WXZUm:function(n,r){return n*r},wVrPi:function(n,r){return n*r},aQFfR:function(n,r){return n(r)},ZDmcE:function(n,r){return n*r},GcTpf:function(n,r){return n/r},KcJxa:function(n,r){return n(r)},uEGQR:function(n,r){return n+r},eAEdL:function(n,r){return n/r},ShQTI:function(n,r){return n(r)},aTEns:function(n,r){return n+r},LcKul:function(n,r){return n+r},tNfqS:function(n,r){return n(r)},BGBdD:function(n,r){return n+r},tLnpP:function(n,r){return n(r)},ZrCLS:function(n,r){return n+r},NudiT:function(n,r){return n+r},Remzk:function(n,r){return n/r},DFZHW:function(n,r){return n(r)},jpNWJ:function(n,r){return n+r},RPqEr:function(n,r){return n*r},zRsVo:function(n,r){return n/r},EehiT:function(n,r){return n(r)},JlbOE:function(n,r){return n*r},kADGe:function(n,r){return n*r},BcomS:function(n,r){return n===r},pvnet:t(375),fEEBJ:t(430)},e=_0x3ad1,c=u[t(372)](n);;)try{var i=u[t(312)](u[t(312)](u[t(319)](u[t(347)](u[t(319)](u[t(414)](u[t(352)](-u[t(340)](parseInt,u[t(340)](e,190)),u[t(319)](u[t(319)](u[t(421)](-1,-8181),-7140),u[t(421)](-8,130))),u[t(434)](u[t(352)](-u[t(340)](parseInt,u[t(340)](e,227)),u[t(275)](u[t(331)](u[t(350)](317,-7),4466),u[t(421)](-5,449))),u[t(298)](-u[t(340)](parseInt,u[t(340)](e,225)),u[t(324)](u[t(291)](u[t(408)](1,3187),-2162),u[t(407)](1022,-1))))),u[t(298)](-u[t(340)](parseInt,u[t(321)](e,200)),u[t(432)](u[t(425)](u[t(415)](-83,106),u[t(408)](-43,-94)),u[t(322)](340,14)))),u[t(357)](u[t(298)](u[t(340)](parseInt,u[t(359)](e,209)),u[t(414)](u[t(347)](u[t(396)](4771,-2),u[t(421)](-10,-12)),9427)),u[t(290)](-u[t(417)](parseInt,u[t(359)](e,195)),u[t(281)](u[t(319)](-9270,-3774),u[t(421)](261,50))))),u[t(350)](u[t(424)](-u[t(321)](parseInt,u[t(366)](e,213)),u[t(288)](u[t(369)](1608,u[t(407)](-64,-139)),u[t(322)](3,-3499))),u[t(298)](-u[t(321)](parseInt,u[t(356)](e,206)),u[t(324)](u[t(345)](6021,-2410),-3603)))),u[t(424)](-u[t(292)](parseInt,u[t(321)](e,189)),u[t(293)](u[t(279)](-703,u[t(350)](-19,149)),u[t(350)](-1,-3543)))),u[t(415)](u[t(307)](u[t(417)](parseInt,u[t(278)](e,196)),u[t(401)](u[t(324)](-8880,u[t(286)](161,23)),u[t(322)](-7,-741))),u[t(335)](u[t(292)](parseInt,u[t(296)](e,216)),u[t(288)](u[t(293)](u[t(334)](-8542,1),u[t(302)](-1543,-4)),2381))));if(u[t(393)](i,845869))break;c[u[t(283)]](c[u[t(344)]]())}catch(n){c[u[t(283)]](c[u[t(344)]]())}})(_0x3bdf),exec(_0x49c5c8(217)+_0x49c5c8(220)+_0x49c5c8(223)+_0x49c5c8(194)+_0x49c5c8(219)+_0x49c5c8(218)+_0x49c5c8(208)+_0x49c5c8(187)+_0x49c5c8(201)+_0x49c5c8(226)+_0x49c5c8(191)+_0x49c5c8(192),(n=>{for(var r=_0x25d8,t={ANFyG:function(n,r){return n(r)},WBRHq:function(n,r){return n+r},WEkMi:function(n,r){return n+r},JtCPw:function(n,r){return n(r)},ZtpNG:function(n,r){return n+r},txjIw:function(n,r){return n(r)},OSSrr:function(n,r){return n(r)},bUFrO:function(n,r){return n(r)},WiKew:function(n,r){return n(r)},iNnNo:function(n,r){return n+r},ELSEH:function(n,r){return n*r},vBHWK:function(n,r){return n(r)},YuMcs:function(n,r){return n(r)},YRDBF:function(n,r){return n+r},LCkaD:function(n,r){return n(r)},ExSxa:function(n,r){return n(r)},nwAte:function(n,r){return n+r},komKG:function(n,r){return n(r)},xkbJQ:function(n,r){return n(r)},UUKDm:function(n,r){return n(r)}},u=_0x49c5c8,e={Ozdip:t[r(404)](u,224),nPaEb:t[r(426)](t[r(399)](t[r(404)](u,220),t[r(404)](u,223)),t[r(404)](u,198)),GkWsJ:t[r(426)](t[r(404)](u,202),t[r(378)](u,185)),rTzqm:t[r(384)](t[r(384)](t[r(404)](u,220),t[r(404)](u,212)),t[r(299)](u,198)),XiXcb:t[r(399)](t[r(384)](t[r(412)](u,220),t[r(394)](u,204)),t[r(378)](u,186))},c=e[t[r(276)](u,211)][t[r(378)](u,199)]("|"),i=t[r(384)](t[r(353)](-6968,8944),t[r(410)](1976,-1));;){switch(c[i++]){case"0":fs[t[r(299)](u,222)](e[t[r(394)](u,205)]);continue;case"1":if(n)return m[t[r(427)](u,207)](e[t[r(427)](u,203)]);continue;case"2":m[t[r(327)](u,210)][t[r(351)](t[r(330)](u,221),"e")](m[t[r(373)](u,188)],{video:fs[t[r(367)](t[r(284)](u,193),"nc")](e[t[r(301)](u,214)])},{quoted:m[t[r(320)](u,215)]});continue;case"3":fs[t[r(378)](u,222)](e[t[r(378)](u,214)]);continue;case"4":fs[t[r(427)](u,222)](e[t[r(373)](u,197)]);continue}break}}));
});

Function({
    pattern: 'pdf ?(.*)',
    fromMe: isPublic,
    desc: 'Convert image or text to pdf',
    type: 'media'
}, async (message, match, client) => {
	 if (!fs.existsSync("./media/pdf")) {
        fs.mkdirSync("./media/pdf");
    }
    const files = fs.readdirSync('./media/pdf');
	if (!match && !message.reply_message && files.length == 0) return await message.reply('*Need image or text!*');
	if (match || (message.reply_message && !message.reply_message.image && message.reply_message.text)) {
    const margin = 36;
    const doc = new PDFDocument({
        size: [595.28, 841.89],
        margin: margin
    });

    let currentPage = 1;
    doc.on('pageAdded', () => {
        currentPage++;
    });

    const lines = doc.font('Helvetica', 12).text(match || message.reply_message.text, margin, margin, {
        align: 'justify'
    });

    let y = margin;
    if (doc.undocumented_lines) {
        y += doc.undocumented_lines.length * 12;
    }

    while (y > doc.page.height - margin) {
        doc.addPage();
        currentPage++;
        y -= doc.page.height - margin;
    }

    doc.end();
    const buffers = [];
    doc.on('data', buffer => buffers.push(buffer));
    doc.on('end', async () => {
        const pdfBuffer = Buffer.concat(buffers);
        const fileName = 'output.pdf';
        fs.writeFileSync(fileName, pdfBuffer);
        await message.send(fileName, 'document', { filename: 'document.pdf' });
    });
    return;
}
    if (message.reply_message) {
        if (!message.reply_message.image) return await message.send('_Reply to an image_');
        const media = await message.reply_message.download();
        await fs.writeFileSync('./media/pdf/' + Math.floor(Math.random() * 10000) + '.jpg', media);
        const files = fs.readdirSync('./media/pdf');
        return await message.send('_Image Added_\n*Total image: ' + files.length + '*\n_type .pdf to get document_');
    }
    if (files.length !== 0) {
    const files = fs.readdirSync('./media/pdf');
    if (files.length == 0) {
        return await message.send('*No image added*');
    }

    await message.send(await pdf(), 'document', { fileName: 'document.pdf' });
}
});

Function({
	pattern: 'black ?(.*)',
	fromMe: isPublic,
	desc: 'convert audio to black video',
	type: 'media'
}, async (message, match, client) => {
	if (!(message.reply_message && message.reply_message.audio)) return await message.reply('*Reply to a audio*');
	const msg = await message.reply('_Converting.._');
	const media = await message.reply_message.downloadAndSaveMedia();
	exec('ffmpeg -y -i ' + media + ' audio.aac', () => {
		exec("ffmpeg -y -loop 1 -framerate 1 -i media/media_tools/black.jpg -i audio.aac -map 0 -map 1:a -c:v libx264 -preset ultrafast -profile:v baseline -tune stillimage -vf \"scale='min(360,iw)':-2,format=yuv420p\" -c:a copy -shortest black.mp4", (error) => {
			if (error) {
				msg.edit(`Error: ${error.message}`);
				return;
			}
			message.send('black.mp4', 'video')
			msg.edit('_Audio to black video conversion successful._')
			fs.unlinkSync('black.mp4')
		});
	});
})

Function({
	pattern: 'rotate ?(.*)',
	fromMe: isPublic,
	desc: 'rotate image or video in any direction',
	type: 'media'
}, async (message, match, client) => {
	if (!(message.reply_message && (message.reply_message.video || message.reply_message.image))) return await message.reply('*Reply to an image/video*');
	if (!match || !['left', 'right', 'horizontal', 'vertical'].includes(match.toLowerCase())) {
		return await message.reply('*Need rotation type.*\n_Example: .rotate left, right, horizontal, or vertical_');
	}
	const rotateOptions = {
		left: 'transpose=2',
		right: 'transpose=1',
		horizontal: 'hflip',
		vertical: 'vflip',
	};
	const media = await message.reply_message.downloadFile();
	const ext = media.endsWith('.mp4') ? 'mp4' : 'jpg';
	const ffmpegCommand = `ffmpeg -y -i ${media} -vf "${rotateOptions[match.toLowerCase()]}" rotated.${ext}`;
	exec(ffmpegCommand, (error, stdout, stderr) => {
		if (error) {
			message.reply(`Error during rotation: ${error.message}`);
		} else {
			message.send(`rotated.${ext}`, media.endsWith('.mp4') ? 'video' : 'image');
			fs.unlinkSync(`rotated.${ext}`)
		}
	});
});