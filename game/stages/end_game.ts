import * as me from "melonjs";
import game from "../game";

class EndGame extends me.Stage {
    /**
     *  action to perform on state change
     */
    onResetEvent() {
        game.isActive = false;
        this.destroy();
    }

    /**
     *  action to perform on state change
     */
    onDestroyEvent() {
        super.onDestroyEvent();
    }
}

export { EndGame };