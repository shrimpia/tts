import axios from 'axios';

const rpc = axios.create({
    baseURL: 'http://voicevox:50021',
});

export const generateSpeech = async (text: string, speakerId: number) => {
    const queryRes = await rpc.post(`/audio_query?text=${encodeURIComponent(text)}&speaker=${speakerId}`, );

    const queryJson = await queryRes.data;

    const audioRes = await rpc.post(`/synthesis?speaker=${speakerId}`, JSON.stringify(queryJson), {
        responseType: 'arraybuffer',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    return audioRes.data;
};
