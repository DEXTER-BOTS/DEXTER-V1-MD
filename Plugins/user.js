const {
	Function
} = require('../lib/')

const isBotAdmins = async (message) => {
  const groupMetadata = message.isGroup ? await message.client.groupMetadata(message.chat).catch(() => {}) : "";
  const participants = message.isGroup ? await groupMetadata.participants : "";
  const adminIds = message.isGroup ? await participants.filter(a => null !== a.admin).map(a => a.id) : "";
  return !!message.isGroup && adminIds.includes(message.user_id);
};

Function({
	pattern: 'pp$',
	fromMe: true,
	desc: 'set profile picture in any resolution',
	type: 'user'
}, async (message, match) => {
	if (!message.reply_message || !message.reply_message.image) return await message.send('_Reply to a image._')
	const media = await message.reply_message.downloadAndSaveMedia()
	await message.updateProfilePicture(message.user_id, media)
	await message.send('_Successfully Profile Picture Updated_')
})

Function({
	pattern: 'fullpp$',
	fromMe: true,
	desc: 'set profile picture in any resolution',
	type: 'user'
}, async (message, match) => {
	if (!message.reply_message || !message.reply_message.image) return await message.send('_Reply to a image._')
	const media = await message.reply_message.downloadAndSaveMedia()
	await message.updateProfilePicture(message.user_id, media)
	await message.send('_Successfully Profile Picture Updated_')
})

Function({
	pattern: 'gpp$',
	fromMe: true,
	desc: 'set group icon in any resolution',
	type: 'group'
}, async (message, match) => {
	if (!message.isGroup) return await message.send('_This command only works in group chats_')
	const isbotAdmin = await isBotAdmins(m)
	if (!isBotAdmins) return await message.send("I'm not an admin")
	if (!message.reply_message || !message.reply_message.image) return await message.send('_Reply to a image._')
	const media = await message.reply_message.downloadAndSaveMedia()
	await message.updateProfilePicture(message.jid, media)
	await message.send('_Successfully Group icon Updated_')
})

Function({
	pattern: 'block$',
	fromMe: true,
	desc: 'Block a person',
	type: 'user'
}, async (message, match) => {
	const id = message.mention[0] || message.reply_message.sender || (!message.isGroup && message.jid)
	if (!id) return await message.send('*Give me a user*')
	await message.send('_Blocked_')
	await message.client.updateBlockStatus(id, 'block');
})

Function({
	pattern: 'unblock$',
	fromMe: true,
	desc: 'Unblock a person',
	type: 'user'
}, async (message, match) => {
	const id = message.mention[0] || message.reply_message.sender || (!message.isGroup && message.jid)
	if (!id) return await message.send('*Give me a user*')
	await message.send('_Unblocked_')
	await message.client.updateBlockStatus(id, 'unblock');
})

Function({
	pattern: 'clear$',
	fromMe: true,
	desc: 'delete whatsapp chat',
	type: 'whatsapp'
}, async (message, match) => {
	await message.clearChat(message.chat)
	await message.send('_Cleared_')
})

Function({
	pattern: 'archive$',
	fromMe: true,
	desc: 'archive whatsapp chat',
	type: 'whatsapp'
}, async (message, match) => {
	await message.archiveChat(message.chat, true)
	await message.send('_Archived_')
})

Function({
	pattern: 'unarchive$',
	fromMe: true,
	desc: 'unarchive whatsapp chat',
	type: 'whatsapp'
}, async (message, match) => {
	await message.archiveChat(message.chat, false)
	await message.send('_Unarchived_')
})

Function({
	pattern: 'pin$',
	fromMe: true,
	desc: 'pin a msg',
	type: 'whatsapp'
}, async (message, match) => {
	await message.pinMsg(message.chat, true)
	await message.send('_Pined_')
})

Function({
	pattern: 'unpin$',
	fromMe: true,
	desc: 'unpin a msg',
	type: 'whatsapp'
}, async (message, match) => {
	await message.pinMsg(message.chat, false)
	await message.send('_Unpined_')
})

Function({
	pattern: 'setbio ?(.*)',
	fromMe: true,
	desc: 'To change your profile status',
	type: 'whatsapp'
}, async (message, match) => {
	match = match || message.reply_message.text
	if (!match) return await message.send('*Need Status!*\n*Example: setbio Hey there! I am using WhatsApp*.')
	await message.client.updateProfileStatus(match)
	await message.send('_Profile status updated_')
})

Function({
	pattern: 'setname ?(.*)',
	fromMe: true,
	desc: 'To change your profile name',
	type: 'whatsapp'
}, async (message, match) => {
	match = match || message.reply_message.text
	if (!match) return await message.send('*Need Name!*\n*Example: setname your name*.')
	await message.client.updateProfileName(match)
	await message.send('_Profile name updated_')
})

Function({
	pattern: 'onwa ?(.*)',
	fromMe: true,
	desc: 'To check if a given ID is on WhatsApp',
	type: 'whatsapp'
}, async (message, match) => {
match = match || message.reply_message.text
if (!match) return await message.send('*Need Number!*\n*Example: onwa +1 (123) 456-7890*')
match = match.replace(/[^0-9]/g, '')
if (!match) return await message.send('*Need Number!*\n*Example: onwa +1 (123) 456-7890*')
const [result] = await message.client.onWhatsApp(match)
if (!result) await message.send(match + " doest exists on WhatsApp")
if (result && result.exists) {
return await message.send("*" + match + " exists on WhatsApp*,\njid: " + result.jid)
}
})
