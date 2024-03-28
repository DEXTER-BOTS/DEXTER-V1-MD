const {
	Function,
	addAudioMetaData,
	isUrl,
	getBuffer,
	prefix,
	getString,
	isPublic,
	ytIdRegex,
	getJson,
	sendwithLinkpreview,
	toAudio,
	h2k
} = require('../lib/');
const { downloadYouTubeVideo, downloadYouTubeAudio, mixAudioAndVideo, combineYouTubeVideoAndAudio, getYoutubeThumbnail, video, bytesToSize } = require('../lib/youtubei.js');
const { getInfo, getAudio, getVideo } = require('../lib/y2mate');
const yts = require("yt-search")
const config = require('../config');
const Lang = getString('scrapers');
const fs = require('fs');
const t = "```";

const send = async (message, file, id) => config.SONG_THUMBNAIL ? await sendwithLinkpreview(message.client, message, file,  'https://www.youtube.com/watch?v=' + id) : await message.client.sendMessage(message.chat, { audio: file, mimetype: 'audio/mpeg' }, { quoted: message.data });

Function({
  on: 'text',
  fromMe: isPublic,
}, async (message, match, client) => {
  if (!message.reply_message.isBaileys) return;
  if (!(message.reply_message && message.reply_message.text)) return;
  const text = message.reply_message.text;
  const index = message.text;
  const ytRegex = /(?:https?:\/\/)?(?:youtu\.be\/|(?:www\.|m\.)?youtube\.com\/(?:watch|v|embed|shorts)(?:\.php)?(?:\?.*v=|\/))([a-zA-Z0-9\_-]+)/gi
  if (text.includes('Search results') && text.includes('Format: audio')) {
  const urls = message.reply_message.text.match(ytRegex);
  if (!urls) return await message.send('*The replied message does not contain any YouTube search results.*');
  if (isNaN(index) || index < 1 || index > urls.length) return await message.send('*Invalid index.*\n_Please provide a number within the range of search results._');
  let ytId = ytIdRegex.exec(urls[index - 1]);
  try {
  const media = await downloadYouTubeAudio(ytId[1]);
  if (media.content_length >= 10485760) return await send(message, await fs.readFileSync(media.file), ytId[1]);
  const writer = await addAudioMetaData(await toAudio(await fs.readFileSync(media.file), 'mp4'), media.thumb, media.title, `hermit-md`, 'Hermit Official');
  return await send(message, writer, ytId[1]);
  } catch {
  const response = await getJson('https://api.adithyan.xyz/ytaudio?id=' + ytId[1]);
  if (!response.status) return await message.send('*Failed to download*');
  if (response.content_length >= 10485760) return await client.sendMessage(message.jid, { audio: {url: response.result }, mimetype: 'audio/mpeg', ptt: false }, { quoted: message.data });
  const buffer = await getBuffer(response.result);
  await fs.writeFileSync('./' + response.file, buffer);
  const writer = await addAudioMetaData(await toAudio(await fs.readFileSync('./' + response.file), 'mp4'), response.thumb, response.title, `hermit-md`, 'Hermit Official');
  return await send(message, writer, ytId[1]);
  }
  } else if (text.includes('Search results') && text.includes('Format: video')) {
  const urls = message.reply_message.text.match(ytRegex);
  if (!urls) return await message.send('*The replied message does not contain any YouTube search results.*');
  if (isNaN(index) || index < 1 || index > urls.length) return await message.send('*Invalid index.*\n_Please provide a number within the range of search results._');
  let id = ytIdRegex.exec(urls[index - 1]);
  try {
  const result = await video(id[1]);
  if (!result) return await message.reply('_Failed to download_');
  return await message.send(result.file, 'video', { quoted: message.data, caption: result.title });
  } catch (error) {
  await message.send('```' + error.message + '```')
  }
  } else if (text.includes('Available quality')) {
  const id = text.match(/\*id:\s(.*?)\*/m)[1].trim();
  const qualityMatches = Array.from(text.matchAll(/(\d+)\.\s(.*?)\s-\s([\d.]+)?\s?(\w{1,2})?/mg));
  const qualityOptions = qualityMatches.map(match => ({
    quality: match[2]
  }));  
  if (isNaN(index) || index < 1 || index > qualityOptions.length) return await message.send('*Invalid number.*\n_Please provide a valid number from the available options._');
  const { quality } = qualityOptions[index - 1]
  const result = await getVideo('https://youtu.be/' + id, quality);
  if (!result) return await message.reply('_Failed to download_');
  return await message.send(result.url, 'video', { quoted: message.data, caption: result.title });
  } else if (/\*⬡ ID :\* (\w+)/.test(text)) {
  const id = text.match(/\*⬡ ID :\* ([\w-]+)/);
  if (!id) return;
  if (isNaN(index) || index < 1 || index > 2) return
  if (index == '2') {
  const result = await video(id[1]);
  return await message.send(result.file, 'video', { quoted: message.data, caption: result.title });
  } else if (index == '1') {
  try {
  const media = await downloadYouTubeAudio(id[1]);
  if (media.content_length >= 10485760) return await send(message, await fs.readFileSync(media.file), id[1]);
  const writer = await addAudioMetaData(await toAudio(await fs.readFileSync(media.file), 'mp4'), media.thumb, media.title, `hermit-md`, 'Hermit Official');
  return await send(message, writer, id[1]);
  } catch {
  const response = await getJson('https://api.adithyan.xyz/ytaudio?id=' + id[1]);
  if (!response.status) return await message.send('*Failed to download*');
  if (response.content_length >= 10485760) return await client.sendMessage(message.jid, { audio: {url: response.result }, mimetype: 'audio/mpeg', ptt: false }, { quoted: message.data });
  const buffer = await getBuffer(response.result);
  await fs.writeFileSync('./' + response.file, buffer);
  const writer = await addAudioMetaData(await toAudio(await fs.readFileSync('./' + response.file), 'mp4'), response.thumb, response.title, `hermit-md`, 'Hermit Official');
  return await send(message, writer, id[1]);
  }
  }
  } else if (text.includes('the desired ringtone number')) {
  const urls = message.reply_message.text.match(/https?:\/\/btones\.b-cdn\.net\/[^ ]+\.mp3/g);
  if (!urls) return
  if (isNaN(index) || index < 1 || index > urls.length) return await message.send('*Invalid index.*\n_Please provide a number within the range of search results._');
  await message.send(urls[index - 1], 'audio', { quoted: message.data, mimetype: 'audio/mpeg' });
  }
});

Function({
	pattern: 'play ?(.*)',
	fromMe: isPublic,
	desc: 'play youtube audio and video',
	type: 'download'
}, async (message, match, client) => {
match = match || message.reply_message.text
if (!match) return await message.reply('*Need text!*\n_Example: .play astronaut in the ocean_');
const search = await yts(match)
const audio = await downloadYouTubeAudio(search.videos[0].videoId, false);
const { content_length } = await video(search.videos[0].videoId, false);
const msg = `*${search.videos[0].title}* 

*⬡ ID :* ${search.videos[0].videoId}
*⬡ Duration :* ${search.videos[0].timestamp}
*⬡ Viewers :* ${h2k(search.videos[0].views)}
*⬡ Author :* ${search.videos[0].author.name}
*⬡ Audio Size :* ${bytesToSize(audio.content_length)}
*⬡ Video Size :* ${bytesToSize(content_length)}

1. *Audio*
2. *Video*`
await message.send(await getYoutubeThumbnail(search.videos[0].videoId), 'image', { caption: msg})
})

Function({
	pattern: 'song ?(.*)',
	fromMe: isPublic,
	desc: Lang.SONG_DESC,
	type: 'download'
}, async (message, match, client) => {
	match = match || message.reply_message.text
	if (!match) return message.reply(Lang.NEED_TEXT_SONG)
	if (isUrl(match) && match.includes('youtu')) {
		let ytId = ytIdRegex.exec(match)
		try {
		const media = await downloadYouTubeAudio()
		if (media.content_length >= 10485760) return await send(message, await fs.readFileSync(media.file), ytId[1])
		const thumb = await getBuffer(await getYoutubeThumbnail(ytId[1]))
		const writer = await addAudioMetaData(await toAudio(await fs.readFileSync(media.file)), thumb, media.title, `${config.BOT_INFO.split(";")[0]}`, 'Hermit Official')
		return await send(message, writer, ytId[1])
		} catch {
			  const response = await getJson('https://api.adithyan.xyz/ytaudio?id=' + ytId[1]);
			  if (!response.status) return await message.send('*Failed to download*');
			  if (response.content_length >= 10485760) return await client.sendMessage(message.jid, { audio: {url: response.result }, mimetype: 'audio/mpeg', ptt: false }, { quoted: message.data });
			  const buffer = await getBuffer(response.result);
			  await fs.writeFileSync('./' + response.file, buffer);
			  const writer = await addAudioMetaData(await toAudio(await fs.readFileSync('./' + response.file), 'mp4'), response.thumb, response.title, `hermit-md`, 'Hermit Official');
			  return await send(message, writer, ytId[1])
	   }
	}
	const search = await yts(match)
	if (search.all.length < 1) return await message.reply(Lang.NO_RESULT);
	let no = 1;
	let listText = `${t}Search results for ${match}:${t}\n\n*Format: audio*\n_To download, please reply with the desired title number._\n\n`;
	for (let i of search.all) {
	if (i.type == 'video') {
    listText += `${no++}. *${i.title}*\nhttps://youtu.be/${i.url.match(/(?<=\?v=)[^&]+/)[0]}\n\n`;
    }
    }
    await message.send(listText);
    /* 
	const listbutton = [];
	let no = 1;
	for (var z of search.videos) {
		let button = { title: 'Result - ' + no++ + ' ', rows: [{title: z.title, rowId: prefix + 'song ' + z.url}]
	};
	listbutton.push(button)
	};
	const listMessage = { title: search.videos[0].title, buttonText: 'Select song', sections: listbutton }
	await message.send(`And ${listbutton.length} More Results...`, 'text', { quoted: message.data, ...listMessage })
	 */
});

Function({
	pattern: 'video ?(.*)',
	fromMe: isPublic,
	desc: Lang.VIDEO_DESC,
	type: 'download'
}, async (message, match, client) => {
	match = match || message.reply_message.text
	if (!match) return message.reply('*Need Youtube video url or query*')
	if (isUrl(match) && match.includes('youtu')) {
		const id = ytIdRegex.exec(match)
	 try {
	  const result = await video(id[1]);
	  if (!result) return await message.reply('_Failed to download_');
	  return await message.send(result.file, 'video', { quoted: message.data, caption: result.title });
	  } catch (error) {
	  return await message.send('```' + error.message + '```')
	  }
	}
	const search = await yts(match)
	if (search.all.length < 1) return await message.reply(Lang.NO_RESULT);
	let no = 1;
	let listText = `${t}Search results for ${match}:${t}\n\n*Format: video*\n_To download, please reply with the desired title number._\n\n`;
	for (let i of search.all) {
	if (i.type == 'video') {
    listText += `${no++}. *${i.title}*\nhttps://youtu.be/${i.url.match(/(?<=\?v=)[^&]+/)[0]}\n\n`;
    }
    }
    await message.send(listText);
	/* const listbutton = [];
	var num = 1;
	for (var z of search.videos) {
		let button = { title: 'Result - ' + no++ + ' ', rows: [{title: z.title, rowId: prefix + 'video ' + z.url}]
	};
	listbutton.push(button)
	};
	const listMessage = { title: search.videos[0].title, buttonText: 'Select video', sections: listbutton }
	return await message.send(`And ${listbutton.length} More Results...`, 'text', { quoted: message.data, ...listMessage });
	*/
});

Function({
	pattern: 'yta ?(.*)',
	fromMe: isPublic,
	desc: 'download audios from youtube',
	type: 'download'
}, async (message, match, client) => {
	match = match || message.reply_message.text
	if (!match) return message.reply('_Need url or song name!_\n*Example: .yta url/song name*')
	if (isUrl(match) && match.includes('youtu')) {
		const ytId = ytIdRegex.exec(match)
		try {
		const result = await downloadYouTubeAudio(ytId[1])
		if (result.content_length >= 10485760) return await message.client.sendMessage(message.jid, { audio: await fs.readFileSync(result.file), mimetype: 'audio/mpeg'}, {quoted: message.data})
		const thumb = await getBuffer(await getYoutubeThumbnail(ytId[1]))
		const writer = await addAudioMetaData(await toAudio(await fs.readFileSync(result.file)), thumb, result.title, `${config.BOT_INFO.split(";")[0]}`, 'Hermit Official')
		return await message.client.sendMessage(message.jid, {audio: writer, mimetype: 'audio/mpeg'}, {quoted: message.data})
		} catch {
		const response = await getJson('https://api.adithyan.xyz/ytaudio?id=' + ytId[1])
		if (response.status) return await client.sendMessage(message.jid, { audio: {url: response.result }, mimetype: 'audio/mpeg', ptt: false }, { quoted: message.data })
	   }
	}
	const search = await yts(match)
	if (search.all.length < 1) return await message.reply('_Not Found_');
	try {
	const result = await downloadYouTubeAudio(search.videos[0].videoId)
	if (result.content_length >= 10485760) return await message.client.sendMessage(message.jid, {audio: await fs.readFileSync(result.file), mimetype: 'audio/mpeg'}, {quoted: message.data})
	const file = await addAudioMetaData(await fs.readFileSync(result.file), result.thumb, result.title, `${config.BOT_INFO.split(";")[0]}`, 'Hermit Official')
	return await message.client.sendMessage(message.jid, {audio: await fs.readFileSync(result.file), mimetype: 'audio/mpeg'}, {quoted: message.data})
	} catch {
	const response = await getJson('https://api.adithyan.xyz/ytaudio?id=' + ytId[1])
	if (response.status) return await client.sendMessage(message.jid, { audio: {url: response.result }, mimetype: 'audio/mpeg', ptt: false }, { quoted: message.data })
	}
});

Function({
	pattern: 'ytv ?(.*)',
	fromMe: isPublic,
	desc: 'download videos from youtube',
	type: 'download'
}, async (message, match, client) => {
	match = match || message.reply_message.text
	if (!match) return message.reply('_Need url or video name!_\n*Example: .ytv url/video name*')
	if (isUrl(match) && match.includes('youtu')) {
	const ytId = ytIdRegex.exec(match)
	const { result } = await getInfo(match);
	let msg = '';
	let no = 1;
	for (let i of result) {
	if (i.video) {
	msg += `${no++}. ${i.quality} - ${i.size}\n`;
	}
	}
	return await message.send(`*${result.title}*\n\n*id: ${ytId[1]}*\n\n${t}Available quality${t}\n\n${list}\n_To download, please reply with the desired quality number._`);
	};
	const search = await yts(match)
	if (search.all.length < 1) return await message.reply('_Not Found_');
	try {
	const result = await video(search.videos[0].videoId);
	if (!result) return await message.reply('_Failed to download_');
	return await message.send(result.file, 'video', { quoted: message.data, caption: result.title });
	} catch (error) {
	return await message.send('```' + error.message + '```')
	}
});