const {
	Function
} = require("../lib/");
Function({
	pattern: 'react ?(.*)',
	fromMe: true,
	desc: 'React Message',
	type: 'misc'
}, async (m, text, client) => {
	const reactionMessage = {
		react: {
			text: m.match[0],
			key: m.quoted_message.key
		}
	}
	client.sendMessage(m.chat, reactionMessage)
});