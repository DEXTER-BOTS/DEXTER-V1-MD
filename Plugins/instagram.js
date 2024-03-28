const {
	Function,
	isPublic,
	instagram,
	getJson,
	postJson,
	getUrl
} = require('../lib/')
Function({
	pattern: 'insta ?(.*)',
	fromMe: isPublic,
	desc: 'Instagram post or reel downloader',
	type: 'download'
}, async (message, match, client) => {
	match = getUrl(match || message.reply_message.text)
	if (!match) return await message.reply('_*Need instagram link!*_')
	/* try {
	var response = await instagram(match)
	} catch (error) {
	let { result, status } = await postJson(apiUrl + 'instagram', { url: match})
	if (status) response = result
	} */
	// if  (response.length < 1 || response[0].includes('?size=l&dl=1')) {
		var response = [];
		const { result, status } = await postJson(apiUrl + 'instagram', { url: match})
        if (status) response = result
	// } 
	if (response.length < 1) return await message.reply("*No media found!*")
		for (let url of response) {
			await message.sendFromUrl(url)
		}
})

Function({
	pattern: 'story ?(.*)',
	fromMe: isPublic,
	desc: 'Instagram story downloader',
	type: 'download'
}, async (message, match) => {
	try {
		match = match || message.reply_message.text
		if (!match) return await message.reply("*Give me a url or username.*")
		if (match === "" || (!match.includes("/stories/") && match.startsWith("http"))) return await message.reply("*Give me a url or username.*")
		if (match.includes("/stories/")) {
			const index = match.indexOf("/stories/") + 9
			const lastIndex = match.lastIndexOf("/")
			match = match.substring(lastIndex, index)
		}
		const response = await getJson(apiUrl + 'story?url=https://instagram.com/stories/' + match)
		if (!response.status) return await message.reply("*No media found!*")
			for (let url of response.result) {
			await message.sendFromUrl(url)
		}
	} catch (error) {
		console.log(error)
		await message.send('*_Failed to download_*\n_Server meybe down_\n_Please try again later_')
	}
})

Function({
	pattern: 'ig ?(.*)',
	fromMe: true,
	fromMe: isPublic,
	type: 'info'
}, async (message, match, client) => {
match = match.match(/instagram\.com\/([a-zA-Z0-9_]+)/)?.[1] || match;
if (!match) return await message.reply("*Need instagram an profile url or username.*")
const result = await getJson(apiUrl + 'ig/' + match)
if (!result.status) return await message.send('*Invalid username or url*')
return await message.send(result.profile, 'image', { caption: `*Name* : ${result.name}\n*Username* : ${result.username}\n*Followers* : ${result.followers}\n*Following* : ${result.following}\n*Post* : ${result.post}\n*Bio* : ${result.bio}`})
})

Function({
	pattern: 'fb ?(.*)',
	fromMe: isPublic,
	desc: 'download Facebook videos',
	type: 'download'
}, async (message, match) => {
	match = getUrl(match || message.reply_message.text)
	if (!match) return await message.reply('_*Need link!*_')
	const response = await getJson(apiUrl + 'api/convert?url=' + match)
	if (!response.status) return await message.reply("*No media found!*")
	await message.send(response.hd.url || response.sd.url, 'video', { captain: response.meta.title || '' })
})
