import { BaseLevel } from './base_level';

class MelonMan extends BaseLevel {
    
    public readonly argsLength: number = 2;

    constructor(map: string, track: string) {
        super({
            levelName: map, /// map1
            trackName: track, /// "dst-gameforest"
        });
    }
};

export {
    MelonMan
}
