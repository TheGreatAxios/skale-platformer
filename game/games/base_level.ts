import * as me from "melonjs";

abstract class BaseLevel extends me.Stage {
    public readonly levelName: string;
    public readonly trackName: string;
    
    constructor({
        levelName,
        trackName
    }: {
        levelName: string,
        trackName: string
    }) {
        super();
        this.levelName = levelName;
        this.trackName = trackName;
    }

    onResetEvent() {
        me.level.load(this.levelName);
        me.audio.playTrack(this.trackName);
    }
    onDestroyEvent() {
        me.audio.stopTrack();
    }
}

export { BaseLevel };
