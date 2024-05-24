import { ApplicationCommand, ApplicationCommandDataResolvable, CommandInteraction } from "discord.js";

export type BotCommand = ApplicationCommandDataResolvable & {
    handle: (interaction: CommandInteraction) => void;
};
