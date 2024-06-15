import { BotCommand } from "@/models/bot-command";
import { prisma } from "@/prisma";

export const getNicknameCommand: BotCommand = {
    name: 'get-nickname',
    description: 'あなたに設定されたニックネームを確認します。',
    handle: async (interaction) => {
        // ギルドでなければエラーを返す
        if (!interaction.guild) {
            interaction.reply('ギルドで使用してください。');
            return;
        }

        await interaction.deferReply();

        const nickname = await prisma.nickname.findUnique({
            where: {
                user_id: interaction.user.id,
            },
        });
        
        if (!nickname) {
            interaction.editReply('ニックネームが設定されていません。');
            return;
        }

        await interaction.editReply({
            content: `あなたのニックネームは「${nickname.nickname}」です。`,
        });
    },
};