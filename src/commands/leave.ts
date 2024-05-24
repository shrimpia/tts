import { BotCommand } from "../models/bot-command.js";
import { voiceSession } from "../voice-session.js";

export const leaveCommand: BotCommand = {
    name: 'leave',
    description: 'VCから退出します。',

    handle: async (interaction) => {
        // ギルドでなければエラーを返す
        if (!interaction.guildId) {
            interaction.reply('ギルドで使用してください。');
            return;
        }

        // ボイスチャンネルでなければエラーを返す
        if (!interaction.channel?.isVoiceBased()) {
            interaction.reply('VCで使用してください。');
            return;
        }
        
        const {vc, player, queue, workerInterval} = voiceSession;
        if (!vc) {
            interaction.reply('VCに参加していません。');
            return;
        }

        interaction.reply('ばいちゃ👋');

        vc.destroy();
        player?.stop();
        clearInterval(workerInterval!);
        queue.length = 0;
    },
};
