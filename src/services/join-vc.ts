import { NoSubscriberBehavior, VoiceConnectionStatus, createAudioPlayer, entersState, joinVoiceChannel } from "@discordjs/voice";
import { voiceSession } from "../voice-session.js";
import { ttsWorker } from "../workers/tts.js";
import { Guild, VoiceBasedChannel } from "discord.js";

export const joinVC = async (guild: Guild, channel: VoiceBasedChannel) => {
    const vc = joinVoiceChannel({
        guildId: guild.id,
        channelId: channel.id,
        adapterCreator: guild.voiceAdapterCreator!,
    });
    await entersState(vc, VoiceConnectionStatus.Ready, 5000);

    voiceSession.player = createAudioPlayer({
        behaviors: {
            noSubscriber: NoSubscriberBehavior.Pause,
        },
    });

    voiceSession.vc = vc;
    voiceSession.channel = channel;
    voiceSession.workerInterval = setInterval(ttsWorker, 1000);
};
