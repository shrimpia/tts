import { getEmojiReadingTable } from "@/emoji-reading-table";
import { TextBasedChannel, cleanContent } from "discord.js";
import emojiRegex from "emoji-regex";
import { removeEmojiVariationSelectors } from "./remove-emoji-variation-selectors";

const emojiPatterns = emojiRegex();

/**
 * URLやコードブロックなどを省略する
 */
export const filterContent = async (content: string, channel?: TextBasedChannel) => {
    const table = await getEmojiReadingTable();

    content = content.replace(/https?:\/\/\S+/g, 'リンク省略 ');
    content = content.replace(/```\n[\s\S]+\n```/g, 'コード省略 ');
    content = content.replace(/`[\s\S]+`/g, 'コード省略 ');
    content = content.replace(/\|\|[\s\S]+\|\|/g, 'ネタバレ ');
    content = content.trim();

    content = content.replaceAll(emojiPatterns, (substring) => table[removeEmojiVariationSelectors(substring)]);

    if (channel) {
        content = cleanContent(content, channel);
    }
    if (content.length > 100) {
        content = content.slice(0, 100) + '以下略';
    }
    return content;
};