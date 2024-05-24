import { AudioPlayerStatus, StreamType, createAudioResource, getVoiceConnection } from "@discordjs/voice";
import { voiceSession } from "../voice-session.js";
import { generateSpeech } from "../services/generate-speech.js";
import { Readable } from "stream";
import { Log } from "../log.js";

export const ttsWorker = async () => {
    const {vc, player, queue} = voiceSession;
    // セッションがなければ何もしない
    if (player === null || vc === null) {
        return;
    }
    
    const conn = getVoiceConnection(vc.joinConfig.guildId);
    if (!conn) {
        Log.warn('VCにいないのにTTSワーカーが動作しています。');
        return;
    }

    // プレイヤーが再生中なら何もしない
    if (player.state.status !== AudioPlayerStatus.Idle) {
        return;
    }

    voiceSession.recentStream?.destroy();

    // キューから取り出して再生
    const text = queue.shift();
    if (text === undefined) {
        return;
    }

    Log.info(`読み上げ開始: ${text}`);

    const data = await generateSpeech(text, 61);
    Log.info('音声生成完了');
    const readable = new Readable();
    readable.push(data);
    readable.push(null);
    const resource = createAudioResource(readable, {
        inputType: StreamType.Arbitrary,
    });
    player.play(resource);
    conn.configureNetworking();
    conn.subscribe(player);
    Log.info('再生開始');
};