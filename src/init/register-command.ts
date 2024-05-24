import { Client } from "discord.js";
import { commands } from "../commands/commands.js";

export const registerCommands = async (client: Client) => {
    await client.application?.commands.set(Object.values(commands));
};
