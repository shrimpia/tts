import { Client, GatewayIntentBits, Partials } from 'discord.js';

import { DISCORD_TOKEN } from './const.js';
import { registerCommands } from './init/register-command.js';
import { commands } from './commands/commands.js';
import { voiceSession } from './voice-session.js';
import { filterContent } from './services/filter-content.js';
import { joinVC } from './services/join-vc.js';
import { getFileTypeToRead } from './services/get-file-type-to-read.js';
import { Log } from './log.js';

const client = new Client({
  partials: [Partials.Message, Partials.Channel, Partials.Reaction],
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildMessages, GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent],
});
client.token = DISCORD_TOKEN;

Log.info('BOT is starting...');

client.once('ready', async () => {
  await registerCommands(client);

  client.guilds.cache.forEach(async (guild) => {
    // VCに参加している場合は再接続
    const vc = guild.members.me?.voice.channel;
    if (vc) {
      await joinVC(vc.guild, vc);
    }
  });

  Log.info('This bot is ready');
});

// コマンドの処理
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  commands[commandName]?.handle(interaction);
});

// チャットに投稿されたメッセージの処理
client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  if (!voiceSession.player || !voiceSession.vc) return;
  if (voiceSession.vc.joinConfig.channelId !== message.channelId) return;

  let content = filterContent(message.content, message.channel);

  // 添付ファイルについても読み上げる
  if (message.attachments.size > 1) {
    content += ' ' + (message.attachments.size) + '件のファイル';
  } else if (message.attachments.size === 1) {
    const file = message.attachments.first();
    content += ' ' + getFileTypeToRead(file?.contentType ?? '');
  }
  
  // 投票についても読み上げる
  if (message.poll !== null) {
    content += ` 投票「${message.poll.question.text}」`;
  }

  if (!content) return;

  Log.info('Queueing message: ' + content);
  voiceSession.queue.push(content);
});

// VC参加/退出の処理
client.on('voiceStateUpdate', (oldState, newState) => {
  if (!voiceSession.player || !voiceSession.vc) return;

  // チャンネルに参加したとき
  if (oldState.channelId === null && newState.channelId !== null) {
    if (newState.channelId !== voiceSession.vc.joinConfig.channelId) return;
    const name = filterContent(newState.member?.nickname ?? newState.member?.displayName ?? '');
    Log.info(`${name} joined the channel`);
    voiceSession.queue.push(`${name}さんが来ました`);
    return;
  }
  // チャンネルから退出したとき
  if (newState.channelId === null && oldState.channelId !== null) {
    if (oldState.channelId !== voiceSession.vc.joinConfig.channelId) return;
    const name = filterContent(oldState.member?.nickname ?? oldState.member?.displayName ?? '');
    Log.info(`${name} left the channel`);
    voiceSession.queue.push(`${name}さんが退出しました`);
    return;
  }

  // 寝落ち部屋に飛んだとき
  if (newState.channelId === '1083261589525909524' && oldState.channelId !== null) {
    if (oldState.channelId !== voiceSession.vc.joinConfig.channelId) return;
    const name = filterContent(oldState.member?.nickname ?? oldState.member?.displayName ?? '');
    Log.info(`${name} left the channel`);
    voiceSession.queue.push(`${name} 寝落ち～`);
    return;
  }
});

client.login();

process.on('beforeExit', async () => {
  await client.destroy();
});