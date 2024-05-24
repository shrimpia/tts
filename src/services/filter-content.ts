import { TextBasedChannel, cleanContent } from "discord.js";

/**
 * URLやコードブロックなどを省略する
 */
export const filterContent = (content: string, channel?: TextBasedChannel) => {
    content = content.replace(/https?:\/\/\S+/g, 'リンク省略 ');
    content = content.replace(/```[\s\S]+```/g, 'コード省略 ');
    content = content.replace(/`[\s\S]+`/g, 'コード省略 ');
    content = content.replace(/\|\|`[\s\S]+\|\|`/g, 'ネタバレ ');
    content = content.trim();
    if (channel) {
        content = cleanContent(content, channel);
    }
    if (content.length > 100) {
        content = content.slice(0, 100) + '以下略';
    }
    return content;
};