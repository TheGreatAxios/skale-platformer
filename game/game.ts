import { TextureAtlas } from "melonjs";
import InGameSigner from "./blockchain/inGameSigner";

class Game {
    public isActive: boolean = false;
    public texture: TextureAtlas;
    public nonce: number | bigint;
    public signer = InGameSigner;

    constructor() {
        this.texture = new TextureAtlas({}),
        this.nonce = 0;
    }
}

export default new Game();