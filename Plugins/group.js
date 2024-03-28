const {
	Function,
	isUrl,
	sleep,
	setPDM,
	getPDM,
	prefix,
	getUrl,
	Database
} = require('../lib/')
const arm = new Database('arm');

const isBotAdmins = async (message) => {
	const groupMetadata = await message.client.groupMetadata(message.chat)
	const admins = await groupMetadata.participants.filter(v => v.admin !== null).map(v => v.id)
	return admins.includes(message.user_id)
}

const isAdmin = async (message, user) => {
	const groupMetadata = await message.client.groupMetadata(message.chat)
	const admins = await groupMetadata.participants.filter(v => v.admin !== null).map(v => v.id)
	return admins.includes(user)
}

Function({
		pattern: 'add ?(.*)',
		fromMe: true,
		onlyGroup: true,
		desc: 'Adds someone to the group.',
		type: 'group'
	},
	async (message, match, client) => {
		if (!(await isBotAdmins(message, client))) return await message.reply("I'm not an admin.");
		const num = message.quoted.sender || match.replace(/[^0-9,]/g, '')
		if (!num) return await message.reply('_Enter the numbers you want to add separated by commas._');
		const messages = {
			'403': '_Couldn\'t add. Invite sent!_',
			'408': 'Couldn\'t add {name} because they left the group recently. Try again later.',
			'401': 'Couldn\'t add {name} because they blocked the bot number.',
			'200': '{name}, Added to the group.',
			'409': '{name}, Already in the group.',
		};
		const numbers = num?.split(',').map((num) => num.trim() + '@s.whatsapp.net');
		const onwa = await client.onWhatsApp(...numbers);
		const users = onwa.map((p) => {
			if (p.jid !== client.user.jid) {
				return p.jid;
			}
		});

		if (!users || numbers.length == 0) return await message.reply("_This number doesn't exist on WhatsApp._");
		const participantUpdate = await client.groupParticipantsUpdate(message.jid, users, 'add');
		let msg = '';
		for (result of participantUpdate) {
			if (result.status) msg += `${messages[result.status]?.replace('{name}', `@${result.jid.split('@')[0]}`)}\n`
		}
		await message.send(msg.trim(), 'text', {
			mentions: users,
			quoted: message.data
		});
	});
	
	
Function({
	pattern: 'kick ?(.*)',
	fromMe: true,
    onlyGroup: true,
	desc: 'kick someone in the group. Reply to message or tag a person to use command.',
	type: 'group'
}, async (message, match, client) => {
	const isbotAdmin = await isBotAdmins(message, message.client)
	if (!isbotAdmin) return await message.reply("I'm not an admin")
	if (message.reply_message !== false) {
		if (message.reply_message.data.key.fromMe) return false
		await message.client.sendMessage(message.jid, {
			text: `@${message.reply_message.data.participant.split('@')[0]}, Kicked From The Group`,
			mentions: [message.reply_message.data.participant]
		})
		await message.client.groupParticipantsUpdate(message.jid, [message.reply_message.data.participant], 'remove')
	} else if (message.reply_message === false && message.mention !== false) {
		var etiketler = '';
		message.mention.map(async (user) => {
			etiketler += '@' + user.split('@')[0] + ',';
		});
		await message.client.sendMessage(message.jid, {
			text: `${etiketler} Kicked From The Group`,
			mentions: message.mention
		})
		await message.client.groupParticipantsUpdate(message.jid, message.mention, 'remove')
	} else {
		return await message.reply('*Give me a user!*');
	}
})

Function({
	pattern: 'promote ?(.*)',
	fromMe: true,
    onlyGroup: true,
	desc: 'Makes any person an admin.',
	type: 'group'
}, async (message, match, client) => {
	const isbotAdmin = await isBotAdmins(message, message.client)
	if (!isbotAdmin) return await message.reply("I'm not an admin")
	if (message.reply_message !== false) {
		const admin = await isAdmin(message, message.reply_message.sender)
		if (admin) return await message.send('*User is already an admin*')
		await message.client.sendMessage(message.chat, {
			text: `_@${message.reply_message.data.participant.split('@')[0]}, Is promoted as admin!_`,
			mentions: [message.reply_message.data.participant]
		})
		await message.client.groupParticipantsUpdate(message.jid, [message.reply_message.data.participant], 'promote')
	} else if (message.reply_message === false && message.mention !== false) {
		var user = '';
		message.mention.map(async (users) => {
			user += '@' + users.split('@')[0] + ',';
		});
		await message.client.sendMessage(message.chat, {
			text: `_${user} Is promoted as admin!_`,
			mentions: message.mention
		})
		await message.client.groupParticipantsUpdate(message.jid, message.mention, 'promote')
	} else {
		return await message.reply('*Give me a user!*');
	}
})

Function({
	pattern: 'demote ?(.*)',
	fromMe: true,
    onlyGroup: true,
	desc: 'Takes the authority of any admin.',
	type: 'group'
}, async (message, match, client) => {
	const isbotAdmin = await isBotAdmins(message, message.client)
	if (!isbotAdmin) return await message.reply("I'm not an admin")
	if (message.reply_message !== false) {
		const admin = await isAdmin(message, message.reply_message.sender)
		await message.client.sendMessage(message.chat, {
			text: `_@${message.reply_message.data.participant.split('@')[0]}, Is no longer an admin!_`,
			mentions: [message.reply_message.data.participant]
		})
		await message.client.groupParticipantsUpdate(message.jid, [message.reply_message.data.participant], 'demote')
	} else if (message.reply_message === false && message.mention !== false) {
		var user = '';
		message.mention.map(async (users) => {
			user += '@' + users.split('@')[0] + ',';
		});
		await message.client.sendMessage(message.chat, {
			text: `_${user} Is no longer an admin!_`,
			mentions: message.mention
		})
		await message.client.groupParticipantsUpdate(message.jid, message.mention, 'demote')
	} else {
		return await message.reply('*Give me a user!*');
	}
})

Function({
	pattern: 'mute ?(.*)',
	fromMe: true,
    onlyGroup: true,
	desc: 'Mute the group chat. Only the admins can send a message.',
	type: 'group'
}, async (message, match) => {
	const iamAdmin = await isBotAdmins(message)
	if (!iamAdmin) return await message.reply("I'm not an admin")
	if (!match || isNaN(match)) {
		await message.client.groupSettingUpdate(message.chat, 'announcement')
		await message.send('*Group Closed.*')
		return;
	}
	await message.client.groupSettingUpdate(message.chat, 'announcement')
	await message.send('_Group Muted for ' + match + ' mins_')
	await sleep(1000 * 60 * match)
	await message.client.groupSettingUpdate(message.chat, 'not_announcement')
	await message.send('*Group opened.*')
})
Function({
	pattern: 'unmute ?(.*)',
	fromMe: true,
    onlyGroup: true,
	desc: 'Unmute the group chat. Anyone can send a message.',
	type: 'group'
}, async (message, match) => {
	if (!isBotAdmins) return await message.reply("I'm not an admin")
	if (!match || isNaN(match)) {
		await message.client.groupSettingUpdate(message.chat, 'not_announcement')
		await message.send('*Group opened.*')
		return;
	}
	await message.client.groupSettingUpdate(message.chat, 'not_announcement')
	await message.send('_Group Unmuted for ' + match + ' mins_')
	await sleep(1000 * 60 * match)
	await message.client.groupSettingUpdate(message.chat, 'announcement')
	await message.send('*Group Closed.*')
})

Function({
	pattern: 'invite ?(.*)',
	fromMe: true,
    onlyGroup: true,
	desc: "Provides the group's invitation link.",
	type: 'group'
}, async (m, text, client) => {
	if (!m.isGroup) return await m.reply('_This command only works in group chats_')
	const isbotAdmin = await isBotAdmins(m, client)
	if (!isbotAdmin) return await m.reply("I'm not an admin")
	const response = await client.groupInviteCode(m.chat)
	await m.reply(`https://chat.whatsapp.com/${response}`)
})
Function({
	pattern: 'revoke ?(.*)',
	fromMe: true,
    onlyGroup: true,
	desc: 'Revoke Group invite link.',
	type: 'group'
}, async (message, match) => {
	const isbotAdmin = await isBotAdmins(message, message.client)
	if (!isbotAdmin) return await message.reply("I'm not an admin")
	await message.client.groupRevokeInvite(message.jid)
	await message.send('_Revoked_')
})
Function({
	pattern: 'ginfo ?(.*)',
	fromMe: true,
    onlyGroup: true,
	desc: 'Shows group invite info',
	type: 'group'
}, async (message, match) => {
	match = match || message.reply_message.text
	if (!match) return await message.reply('*Need Group Link*\n_Example : ginfo group link_')
	const [link, invite] = match.match(/chat.whatsapp.com\/([0-9A-Za-z]{20,24})/i) || []
	if (!invite) return await message.reply('*Invalid invite link*')
	try {
		const response = await message.client.groupGetInviteInfo(invite)
		await message.send("id: " + response.id + "\nsubject: " + response.subject + "\nowner: " + `${response.owner ? response.owner.split('@')[0] : 'unknown'}` + "\nsize: " + response.size + "\nrestrict: " + response.restrict + "\nannounce: " + response.announce + "\ncreation: " + require('moment-timezone')(response.creation * 1000).tz('Asia/Kolkata').format('DD/MM/YYYY HH:mm:ss') + "\ndesc" + response.desc)
	} catch (error) {
		await message.reply('*Invalid invite link*')
	}
})
Function({
	pattern: 'join ?(.*)',
	fromMe: true,
	desc: 'Join invite link.',
	type: 'group'
}, async (message, match, client) => {
	match = getUrl(match || message.reply_message.text)
	if (!match) return await message.reply('_Enter the group link!_')
	if (!isUrl(match) && !match.includes('whatsapp.com')) return await message.reply('*Invalid Link!*')
	let result = match.split('https://chat.whatsapp.com/')[1]
	let res = await message.client.groupAcceptInvite(result)
	if (!res) return await message.reply('_Invalid Group Link!_')
	if (res) return await message.reply('_Joined!_')
})

Function({
	pattern: 'left ?(.*)',
	fromMe: true,
    onlyGroup: true,
	desc: 'Left from group',
	type: 'group'
}, async (message, text, client) => {
	await client.groupLeave(message.chat)
})

Function({
	pattern: 'lock',
	fromMe: true,
    onlyGroup: true,
	desc: "only allow admins to modify the group's settings",
	type: 'group'
}, async (message, match, client) => {
	const isbotAdmin = await isBotAdmins(message)
	if (!isbotAdmin) return await message.send("I'm not an admin")
	const meta = await message.client.groupMetadata(message.chat)
	if (meta.restrict) return await message.send("_Already only admin can modify group settings_")
	await client.groupSettingUpdate(message.chat, 'locked')
	return await message.send("*Only admin can modify group settings*")
})

Function({
	pattern: 'unlock',
	fromMe: true,
    onlyGroup: true,
	desc: "allow everyone to modify the group's settings -- like display picture etc.",
	type: 'group'
}, async (message, match, client) => {
	const isbotAdmin = await isBotAdmins(message)
	if (!isbotAdmin) return await message.send("I'm not an admin")
	const meta = await message.client.groupMetadata(message.chat)
	if (!meta.restrict) return await message.send("_Already everyone can modify group settings_")
	await client.groupSettingUpdate(message.chat, 'unlocked')
	return await message.send("*Everyone can modify group settings*")
})

Function({
	pattern: 'gname ?(.*)',
	fromMe: true,
    onlyGroup: true,
	desc: "To change the group's subject",
	type: 'group'
}, async (message, match, client) => {
	match = match || message.reply_message.text
	if (!match) return await message.send('*Need Subject!*\n*Example: gname New Subject!*.')
	const meta = await message.client.groupMetadata(message.chat)
	if (!meta.restrict) {
		await client.groupUpdateSubject(message.chat, match)
		return await message.send("*Subject updated*")
	}
	const isbotAdmin = await isBotAdmins(message)
	if (!isbotAdmin) return await message.send("I'm not an admin")
	await client.groupUpdateSubject(message.chat, match)
	return await message.send("*Subject updated*")
})

Function({
	pattern: 'gdesc ?(.*)',
	fromMe: true,
    onlyGroup: true,
	desc: "To change the group's description",
	type: 'group'
}, async (message, match, client) => {
	match = match || message.reply_message.text
	if (!match) return await message.send('*Need Description!*\n*Example: gdesc New Description!*.')
	const meta = await message.client.groupMetadata(message.chat)
	if (!meta.restrict) {
		await client.groupUpdateDescription(message.chat, match)
		return await message.send("*Description updated*")
	}
	const isbotAdmin = await isBotAdmins(message)
	if (!isbotAdmin) return await message.send("I'm not an admin")
	await client.groupUpdateDescription(message.chat, match)
	return await message.send("*Description updated*")
})

Function({
	pattern: 'pdm ?(.*)',
	fromMe: true,
    onlyGroup: true,
	desc: 'promote demote message',
	type: 'group'
}, async (message, match, client) => {
	if (!match) return await message.send('_Need input!_\n*Example: pdm on/off*')
	if (match == 'on' || match == 'off') {
		await setPDM(message.jid, match)
		return await message.send(`_pdm ${match == 'on' ? 'Activated' : 'Deactivated'}_`)
	}
	await message.send('_Need input!_\n*Example: pdm on/off*')
})

Function({
  pattern: 'arm ?(.*)',
  fromMe: true,
  desc: 'approve and reject message',
  type: 'group'
}, async (message, match, client) => {
  if (!match) return await message.send('_Need input!_\n*Example: arm on/off*')
  if (match == 'on') {
    await arm.set(message.chat, true);
    await message.send(`_Approve reject msg ${match == 'on' ? 'Activated' : 'Deactivated'}_`)
  } else if (match == 'off') {
    await arm.delete(message.chat)
    await message.send(`_Approve reject msg ${match == 'on' ? 'Activated' : 'Deactivated'}_`)
  } else {
    await message.send('_Need input!_\n*Example: arm on/off*')
  }
});

Function({
  pattern: 'ban ?(.*)',
  fromMe: true,
  onlyGroup: true,
  desc: 'Ban users from group.',
  type: 'group',
}, async (message, match, client) => {
  const isbotAdmin = await isBotAdmins(message, message.client)
  if (!isbotAdmin) return await message.reply("I'm not an admin")
  const db = new Database('bannedNumbers');
  const groupBans = db.get(message.chat) || [];
  const usersToBan = message.reply_message?.sender ? [message.reply_message.sender] : (message.mention ? message.mention : false);
  if (!usersToBan) return await message.reply('*Give me a user!*');
  usersToBan.forEach((userJid) => {
    if (!groupBans.includes(userJid)) {
      groupBans.push(userJid);
    }
  });

  db.set(message.chat, groupBans);
  await message.client.sendMessage(message.jid, { text: `@${usersToBan[0].split('@')[0]}, *Banned From The Group*`, mentions: usersToBan })
  await message.client.groupParticipantsUpdate(message.jid, usersToBan, 'remove')
});

Function({
  pattern: 'unban ?(.*)',
  fromMe: true,
  onlyGroup: true,
  desc: 'Unban users from group.',
  type: 'group',
}, async (message, match, client) => {
  match = message.reply_message?.sender ? [message.reply_message.sender] : (message.mention ? message.mention : [match.replace(/[^0-9,]/g, '')].map((num) => num.trim() + '@s.whatsapp.net'))
  const db = new Database('bannedNumbers');
  const groupBans = db.get(message.chat) || [];
  if (!match) return await message.send('*Need user!*\n_Example: .unban +1 (440) 111-0000_');
  const unbannedUsers = [];

  match.forEach((userJid) => {
    const index = groupBans.indexOf(userJid);
    if (index !== -1) {
      groupBans.splice(index, 1);
      unbannedUsers.push(userJid);
    }
  });
  if (unbannedUsers.length === 0) {
    return await message.reply('*This user is not banned.*');
  }
  db.set(message.chat, groupBans);
  return await message.client.sendMessage(message.jid, { text: `@${match.map((element) => element.split('@')[0]).join(',')}, _unbanned_`, mentions: match })
});

Function({
  pattern: 'listban',
  fromMe: true,
  onlyGroup: true,
  desc: 'List all banned users in the group.',
  type: 'group',
}, async (message, match, client) => {
  const db = new Database('bannedNumbers');
  const groupBans = db.get(message.chat) || [];
  if (groupBans.length === 0) return await message.reply('_No users are banned in this group_');
  return await message.reply(`_Banned Users in this Group:_\n${groupBans.map((element) => element.split('@')[0]).join('\n')}`);
});