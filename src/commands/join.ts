import { BotCommand } from "../models/bot-command.js";
import { joinVC } from "../services/join-vc.js";

export const joinCommand: BotCommand = {
    name: 'join',
    description: 'VCに参加します。',

    handle: async (interaction) => {
        // ギルドでなければエラーを返す
        if (!interaction.guild) {
            interaction.reply('ギルドで使用してください。');
            return;
        }

        // ボイスチャンネルでなければエラーを返す
        if (!interaction.channel?.isVoiceBased()) {
            interaction.reply('VCで使用してください。');
            return;
        }

        
        await interaction.deferReply();

        await joinVC(interaction.guild, interaction.channel);
        
        await interaction.editReply('こんちゃす');
    },
};

