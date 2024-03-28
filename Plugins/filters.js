const {
	Function,
	getString,
	parseMessage
} = require('../lib/');
const FilterDb = require('../lib/database/filters');

Function({
	pattern: 'filter ?(.*)',
	fromMe: true,
	desc: 'set filter message in any chat',
	type: 'group'
}, async (message, text, client) => {
	match = text.match(/[\'\"\“](.*?)[\'\"\“]/gsm);

	if (match === null) {
		filtreler = await FilterDb.getFilter(message.jid);
		if (filtreler === false) {
			await message.reply('_There are no filters in this chat!_')
		} else {
			var msg = '_There is your filters in this chat:_\n';
			filtreler.map((filter) => msg += '```' + filter.dataValues.pattern + '```\n');
			await message.reply(msg);
		}
	} else {
		if (match.length < 2) {
			return await message.reply(`*Need text!*\nExample: filter 'hi' 'hello'`)
		}
		await FilterDb.setFilter(message.jid, match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, ''), match[0][0] === "'" ? true : false);
		await message.reply('_Successfully set_ ```' + match[0].replace(/['"]+/g, '') + '``` _to filter!_');
	}
});

Function({
	pattern: 'stop ?(.*)',
	fromMe: true,
	desc: 'stop filter message',
	type: 'group'
}, async (message, match, client) => {
	if (!match) return await message.reply(`*Need text!*\nExample: stop hi`)
	del = await FilterDb.deleteFilter(message.jid, match);
	if (!del) return await message.reply('_There is already no filter like this!_')
	await message.reply('_The filter was successfully deleted!_')
});

Function({
	pattern: 'pfilter ?(.*)',
	fromMe: true,
	desc: 'set filter message in all pm',
	type: 'group'
}, async (message, text, client) => {
	match = text.match(/[\'\"\“](.*?)[\'\"\“]/gsm);
	if (match === null) {
		filtreler = await FilterDb.getFilter('pfilter');
		if (filtreler === false) {
			await message.reply('_No pfilters found!_')
		} else {
			var msg = '_There is your pfilters:_\n';
			filtreler.map((filter) => msg += '```' + filter.dataValues.pattern + '```\n');
			await message.reply(msg);
		}
	} else {
		if (match.length < 2) {
			return await message.reply(`*Need text!*\nExample: pfilter 'hi' 'hello'`)
		}
		await FilterDb.setFilter('pfilter', match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, ''), match[0][0] === "'" ? true : false);
		await message.reply('_Successfully set_ ```' + match[0].replace(/['"]+/g, '') + '``` _to pfilter!_');
	}
});

Function({
	pattern: 'pstop ?(.*)',
	fromMe: true,
	desc: 'stop filter message in all pm',
	type: 'group'
}, async (message, match, client) => {
	if (!match) return await message.reply(`*Need text!*\nExample: stop hi`)
	del = await FilterDb.deleteFilter('pfilter', match);
	if (!del) return await message.reply('_There is already no pfilter like this!_')
	await message.reply('_The pfilter has successfully deleted!_')
});

Function({
	pattern: 'gfilter ?(.*)',
	fromMe: true,
	desc: 'set filter message in all groups',
	type: 'group'
}, async (message, text, client) => {
	match = text.match(/[\'\"\“](.*?)[\'\"\“]/gsm);
	if (match === null) {
		filtreler = await FilterDb.getFilter('gfilter');
		if (filtreler === false) {
			await message.reply('_No Gfilters found!_')
		} else {
			var msg = '_There is your Gfilters:_\n';
			filtreler.map((filter) => msg += '```' + filter.dataValues.pattern + '```\n');
			await message.reply(msg);
		}
	} else {
		if (match.length < 2) {
			return await message.reply(`*Need text!*\nExample: pfilter 'hi' 'hello'`)
		}
		await FilterDb.setFilter('gfilter', match[0].replace(/['"“]+/g, ''), match[1].replace(/['"“]+/g, ''), match[0][0] === "'" ? true : false);
		await message.reply('_Successfully set_ ```' + match[0].replace(/['"]+/g, '') + '``` _to Gfilter!_');
	}
});

Function({
	pattern: 'gstop ?(.*)',
	fromMe: true,
	desc: 'stop filter message in all group',
	type: 'group'
}, async (message, match, client) => {
	if (!match) return await message.reply(`*Need text!*\nExample: stop hi`)
	del = await FilterDb.deleteFilter('gfilter', match);
	if (!del) return await message.reply('_There is already no Gfilter like this!_')
	await message.reply('_The Gfilter has successfully deleted!_')
});


Function({
	on: 'text',
	fromMe: false
}, async (message, text, client) => {
	var filtreler = await FilterDb.getFilter(message.jid);
	if (!filtreler) return;
	filtreler.map(
		async (filter) => {
			pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
			if (pattern.test(message.text)) {
				await client.sendMessage(message.jid, await parseMessage(message.jid, message.sender, client, filter.dataValues.text), {
					quoted: message.data
				})
			}
		}
	);
});

Function({
	on: 'text',
	fromMe: false
}, async (message, text, client) => {
	var filtreler = await FilterDb.getFilter('pfilter');
	if (!filtreler) return;
	filtreler.map(
		async (filter) => {
			pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
			if (pattern.test(message.text)) {
				await client.sendMessage(message.jid, await parseMessage(message.jid, message.sender, client, filter.dataValues.text), {
					quoted: message.data
				})
			}
		}
	);
});

Function({
	on: 'text',
	fromMe: false
}, async (message, text, client) => {
	var filtreler = await FilterDb.getFilter('gfilter');
	if (!filtreler) return;
	filtreler.map(
		async (filter) => {
			pattern = new RegExp(filter.dataValues.regex ? filter.dataValues.pattern : ('\\b(' + filter.dataValues.pattern + ')\\b'), 'gm');
			if (pattern.test(message.text)) {
				await client.sendMessage(message.jid, await parseMessage(message.jid, message.sender, client, filter.dataValues.text), {
					quoted: message.data
				})
			}
		}
	);
});