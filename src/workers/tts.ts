import { AudioPlayerStatus, StreamType, createAudioResource, getVoiceConnection } from "@discordjs/voice";
import { voiceSession } from "../voice-session.js";
import { generateSpeech } from "../services/generate-speech.js";
import { Readable } from "stream";

export const ttsWorker = async () => {
    const {vc, player, queue} = voiceSession;
    // セッションがなければ何もしない
    if (player === null || vc === null) {
        return;
    }
    
    const conn = getVoiceConnection(vc.joinConfig.guildId);
    if (!conn) {
        console.warn('Failed to get VoiceConnection');
        return;
    }

    // プレイヤーが再生中なら何もしない
    if (player.state.status !== AudioPlayerStatus.Idle) {
        return;
    }

    // キューから取り出して再生
    const text = queue.shift();
    if (text === undefined) {
        return;
    }

    const data = await generateSpeech(text, 61);
    const readable = new Readable();
    readable.push(data);
    readable.push(null);
    const resource = createAudioResource(readable, {
        inputType: StreamType.Arbitrary,
    });
    player.play(resource);
    conn.configureNetworking();
    conn.subscribe(player);
};