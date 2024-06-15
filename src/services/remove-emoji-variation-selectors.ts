/**
 * 絵文字用の異体字セレクタを削除する
 * @param text 異体字セレクタを含む文字列
 * @returns 異体字セレクタを削除した文字列
 */
export const removeEmojiVariationSelectors = (text: string) => {
    return text.replaceAll(/[\ufe0e\ufe0f]/g, '');
};