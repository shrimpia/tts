import { joinCommand } from "./join.js";
import { leaveCommand } from "./leave.js";
import { userDiceCommand } from "./user-dice.js";
import { BotCommand } from "../models/bot-command.js";

export const commands: Record<string, BotCommand> = {
    join: joinCommand,
    leave: leaveCommand,
    'user-dice': userDiceCommand,
};
