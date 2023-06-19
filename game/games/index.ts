import { MelonMan } from "./melon_man";

export type GameKey =
    | "melon_man";

type GameLevel = 
    | MelonMan;

export function createLevel(args: any[], game: GameKey) : GameLevel {
    switch (game) {
        case "melon_man":
            return new MelonMan(args[0], args[1]);
        default:
            throw new Error("Invalid Game")
    }
}