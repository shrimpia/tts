export const getFileTypeToRead = (mime: string) => {
    if (mime.startsWith('audio')) {
        return '音声ファイル';
    }
    if (mime.startsWith('image')) {
        return '画像ファイル';
    }
    if (mime.startsWith('video')) {
        return '動画ファイル';
    }
    if (mime.startsWith('text')) {
        return 'テキストファイル';
    }
    if (mime.startsWith('application/pdf')) {
        return 'PDFファイル';
    }
    if (mime.startsWith('application/zip')) {
        return 'ジップファイル';
    }
    return 'ファイル';
};