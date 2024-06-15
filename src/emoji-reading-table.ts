import { CldrAnnotations } from "./models/cldr-annotations";

let emojiReadingTable: Record<string, string> | null = null;

const READING_TABLE_URL = 'https://raw.githubusercontent.com/unicode-org/cldr-json/main/cldr-json/cldr-annotations-full/annotations/ja/annotations.json';

export const getEmojiReadingTable = async () => {
    if (!emojiReadingTable) {
        const data = await fetch(READING_TABLE_URL).then(r => r.json() as Promise<CldrAnnotations>);
        const table = Object.fromEntries(Object.entries(data.annotations.annotations).map(r => [r[0], r[1].tts[0]]));

        emojiReadingTable = table;
        return table;
    }

    return emojiReadingTable;
};
