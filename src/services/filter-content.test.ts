import { filterContent } from './filter-content';
import { describe, expect, it } from 'vitest';

describe('filterContent', () => {
    it('が、「`test`」を「コード省略」に変換すること', async () => {
        const input = '`test`';
        const expected = 'コード省略';
        const result = await filterContent(input);
        expect(result).toBe(expected);
    });

    it('が、「|| test ||」を「ネタバレ」に変換すること', async () => {
        const input = '|| test ||';
        const expected = 'ネタバレ';
        const result = await filterContent(input);
        expect(result).toBe(expected);
    });

    it('が、「https://example.com」を「リンク省略」に変換すること"', async () => {
        const input = '宣伝→ https://example.com';
        const expected = '宣伝→ リンク省略';
        const result = await filterContent(input);
        expect(result).toBe(expected);
    });

    it('が、文字列の前後にある不要な空白を除去すること', async () => {
        const input = '  本文  ';
        const expected = '本文';
        const result = await filterContent(input);
        expect(result).toBe(expected);
    });

    it('が、100文字を超える文字列を100文字以内に切り詰めた上で、「以下略」を追加すること', async () => {
        const input = 'あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえお';
        const expected = 'あいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえおあいうえお以下略';
        const result = await filterContent(input);
        expect(result).toBe(expected);
    });

    it('should convert 👴🕹️ to "おじいさんジョイスティック"', async () => {
        const input = '👴🕹️';
        const expected = 'おじいさんジョイスティック';
        const result = await filterContent(input);
        expect(result).toBe(expected);
    });
});