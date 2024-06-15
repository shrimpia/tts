import { BotCommand } from "@/models/bot-command";
import { prisma } from "@/prisma";
import { ApplicationCommandOptionType } from "discord.js";

export const setNicknameCommand: BotCommand = {
    name: 'set-nickname',
    description: 'ニックネームを設定します。',
    options: [{
        type: ApplicationCommandOptionType.String,
        name: 'nickname',
        description: '設定するニックネーム',
        required: true,
    }],
    handle: async (interaction) => {
        // ギルドでなければエラーを返す
        if (!interaction.guild) {
            interaction.reply('ギルドで使用してください。');
            return;
        }

        const nickname = interaction.options.get('nickname', true).value as string;

        await interaction.reply({
            content: '設定中…',
        });
        
        await prisma.nickname.upsert({
            where: {
                user_id: interaction.user.id,
            },
            update: {
                nickname,
            },
            create: {
                user_id: interaction.user.id,
                nickname,
            },
        });

        await interaction.editReply({
            content: 'ニックネームを設定しました。',
        });
    },
};