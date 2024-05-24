import { AudioPlayer, VoiceConnection } from "@discordjs/voice";
import { VoiceBasedChannel } from "discord.js";

export type VoiceSession = {
    vc: VoiceConnection | null,
    player: AudioPlayer | null,
    channel: VoiceBasedChannel | null,
    queue: string[],
    workerInterval: NodeJS.Timeout | null,
};

export const voiceSession: VoiceSession = {
    vc: null,
    player: null,
    channel: null,
    queue: [],
    workerInterval: null,
};