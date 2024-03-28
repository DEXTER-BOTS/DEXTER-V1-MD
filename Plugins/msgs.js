const { Function, getMessage, formatDuration } = require('../lib/');

Function({
  pattern: 'msgs ?(.*)',
  fromMe: true,
  desc: 'Gives an overview of the total messages in the group',
  type: 'group'
}, async (message, match, client) => {
  if (!message.isGroup) return await message.reply('_This command only works in group chats_');
  const userId = message.mention[0] || message.reply_message?.sender;
  const data = await getMessage(message.jid);
  const timeNow = new Date().getTime();
  let msg = '';

  if (match === 'total') {
    let totalCount = 0;
    const typeCount = {};

    Object.values(data).forEach(({ total, type }) => {
      totalCount += total;

      Object.entries(type).forEach(([typeName, count]) => {
        typeCount[typeName] = (typeCount[typeName] || 0) + count;
      });
    });

    msg += '*Total :* ' + totalCount + '\n';
    Object.entries(typeCount).forEach(([typeName, count]) => {
      msg += '*' + typeName + ' :* ' + count + '\n';
    });
  } else if (userId) {
    const user = await getMessage(message.jid, userId);
    msg += '*Number :* ' + userId.split("@")[0] + '\n*Name :* ' + (user.name.replace( /[\r\n]+/gm, "") || 'Unknown') + '\n';
    Object.keys(user.type).map(item => msg += '*' + item + ' :* ' + user.type[item] + '\n');
    msg += '*Total :* ' + user.total + '\n';
    msg += '*lastActivity :* ' + formatDuration((timeNow - user.time) / 1000) + ' ago\n\n';
  } else {
    Object.entries(data)
      .sort(([, a], [, b]) => b.total - a.total)
      .map(([user, { name, total, type, time }]) => {
        msg += '*Number :* ' + user.split("@")[0] + '\n*Name :* ' + (name.replace( /[\r\n]+/gm, "") || 'Unknown') + '\n';
        Object.keys(type).map(item => msg += '*' + item + ' :* ' + type[item] + '\n');
        msg += '*Total :* ' + total + '\n';
        msg += '*lastActivity :* ' + formatDuration((timeNow - time) / 1000) + ' ago\n\n';
      });
  }

  return await message.send(msg.trim());
});