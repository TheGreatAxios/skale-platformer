import {
    audio,
    device,
    input,
    loader,
    pool,
    state,
    video,
    event,
    TextureAtlas
} from "melonjs";
import resources from "./resources";
import { CoinEntity, CompleteLevel, FlyEnemyEntity, PlayerEntity, SlimeEnemyEntity } from "./renderables";
import { 
    createLevel,
    type GameKey
} from "./games";

import game from "./game";
import { EndGame } from "./stages/end_game";

export default function initialize(args: any[], gameKey: GameKey) {

    if (
        !video.init(800, 600, {
            parent: "screen",
            scaleMethod: "flex",
            renderer: video.AUTO,
            preferWebGL1: false,
            subPixel: false,
        })
    ) {
        alert("Your browser does not support HTML5 canvas.");
        return;
    }
    

    // initialize the "sound engine"
    audio.init("mp3,ogg");

    // set all ressources to be loaded
    loader.preload(resources, () => {
        // set the "Play/Ingame" Screen Object
        state.set(state.PLAY, createLevel(args, gameKey));
        state.set(state.GAME_END, new EndGame());
        
        state.transition("fade", "#FFFFFF", 250);

        // register our objects entity in the object pool
        pool.register("mainPlayer", PlayerEntity);
        pool.register("SlimeEntity", SlimeEnemyEntity);
        pool.register("FlyEntity", FlyEnemyEntity);
        pool.register("CoinEntity", CoinEntity, true);
        // pool.register("me.Trigger", CompleteLevel);

        // load the texture atlas file
        // this will be used by renderable object later
        const txt = new TextureAtlas(
            loader.getJSON("texture"),
            loader.getImage("texture")
        );
        console.log("Txt: ", txt);
        
        game.texture = txt;

        // game.

        // add some keyboard shortcuts
        event.on(event.KEYDOWN, (_: input.KEY, keyCode: number /*, edge */) => {
            // change global volume setting
            if (keyCode === input.KEY.PLUS) {
                // increase volume
                audio.setVolume(audio.getVolume() + 0.1);
            } else if (keyCode === input.KEY.MINUS) {
                // decrease volume
                audio.setVolume(audio.getVolume() - 0.1);
            }

            // toggle fullscreen on/off
            if (keyCode === input.KEY.F) {
                if (!device.isFullscreen()) {
                    device.requestFullscreen();
                } else {
                    device.exitFullscreen();
                }
            }
        });

        state.change(state.PLAY, true);
    });
}
