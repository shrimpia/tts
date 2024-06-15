import { joinCommand } from "./join.js";
import { leaveCommand } from "./leave.js";
import { userDiceCommand } from "./user-dice.js";
import { BotCommand } from "../models/bot-command.js";
import { getNicknameCommand } from "./get-nickname.js";
import { setNicknameCommand } from "./set-nickname.js";

export const commands: Record<string, BotCommand> = {
    join: joinCommand,
    leave: leaveCommand,
    'user-dice': userDiceCommand,
    'get-nickname': getNicknameCommand,
    'set-nickname': setNicknameCommand,
};
