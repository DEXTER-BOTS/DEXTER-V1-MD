const {
	Function,
	isPublic,
	postJson,
	getUrl
} = require("../lib/");
Function({
	pattern: '24news',
	fromMe: isPublic,
	desc: 'get lastest in 24news',
	type: 'search'
}, async (message, match) => {
	const {
		result
	} = await postJson(apiUrl + 'api/24News')
	const buttons = [];
	for (var index = 0; index < result.length; index++) {
		buttons.push({
			title: result[index].title,
			rowId: '24news-getinfo ' + result[index].url
		})
	};
	const listMessage = {
		text: 'And ' + buttons.length + ' More Results...',
		title: result[0].title,
		buttonText: 'Select News',
		sections: [{
			title: '24News',
			rows: buttons
		}]
	}
	await message.client.sendMessage(message.jid, listMessage, {
		quoted: message.data
	})
})

/* Function({
	on: 'button',
	fromMe: isPublic
}, async (message, match) => {
	if (message.button_msg.startsWith('24news-getinfo')) {
		const {
			result
		} = await postJson(apiUrl + 'api/24News-getinfo', {
			url: await getUrl(message.button_msg)
		})
		const msg = `*Title* : ${result.title}\n*Ago* : ${result.ago}\n*Description* : ${result.description}`
		await message.client.sendMessage(message.jid, {
			image: {
				url: result.image
			},
			caption: msg
		})
	}
}) */