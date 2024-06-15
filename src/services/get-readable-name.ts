import { prisma } from "@/prisma";
import { GuildMember, User } from "discord.js";

export const getReadableName = async (member: GuildMember) => {
    const record = await prisma.nickname.findUnique({
        where: {
            user_id: member.user.id,
        },
    });

    if (record) return record.nickname;
    return (member.nickname ?? member.displayName) + 'さん';
};