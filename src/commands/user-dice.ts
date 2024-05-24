import { ApplicationCommandOptionType, GuildMember } from "discord.js";
import { BotCommand } from "../models/bot-command.js";
import { voiceSession } from "../voice-session.js";

export const userDiceCommand: BotCommand = {
    name: 'user-dice',
    description: 'VC参加ユーザーでサイコロを振ります。',
    options: [{
        type: ApplicationCommandOptionType.Integer,
        minValue: 1,
        name: 'times',
        description: '選出するユーザー数',
        required: true,
    }],

    handle: async (interaction) => {
        // ギルドでなければエラーを返す
        if (!interaction.guild) {
            interaction.reply('ギルドで使用してください。');
            return;
        }

        // ボイスチャンネルでなければエラーを返す
        if (voiceSession.vc === null || voiceSession.channel === null) {
            interaction.reply('VCにいません');
            return;
        }

        const members = voiceSession.channel?.members.toJSON().filter(m => !m.user.bot) as GuildMember[];

        const times = interaction.options.get('times', true).value as number;
        if (times > members.length) {
            interaction.reply(`参加者よりも多い数は選べません！\n現在のユーザー数は **${members.length}人** です。これはbotを除いた数です。`);
            return;
        }
        
        await interaction.reply('ころころ…');
        
        // 2秒待つ
        await new Promise((res) => setTimeout(res, 2000));

        const selectedMembers: GuildMember[] = [];

        for (let i = 0; i < times; i++) {
            const index = Math.floor(Math.random() * members.length);
            selectedMembers.push(members[index]);
            members.splice(index, 1);
        }
        
        await interaction.editReply(selectedMembers.map(m => `<@${m.id}>`).join(' '));
    },
};

