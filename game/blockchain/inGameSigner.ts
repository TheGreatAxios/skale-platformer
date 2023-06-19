import { createPublicClient, createWalletClient, http, webSocket } from "viem";
import { skaleNebula } from "viem/chains";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts"
import { distributeSFuel } from "./sfuel";

class InGameSigner {
    
    public nonce: number = 0;
    public ready: boolean = false;

    public client;
    public wallet;

    private __initializeClient() {
        return createPublicClient({
            chain: skaleNebula,
            transport: http()
          });
    }

    private __initializeWallet() {
        return createWalletClient({
            chain: skaleNebula,
            transport: webSocket("wss://mainnet.skalenodes.com/v1/ws/green-giddy-denebola"),
            account: privateKeyToAccount(generatePrivateKey())
          });
    }

    constructor() {
        this.client = this.__initializeClient();
        this.wallet = this.__initializeWallet();
    }

    public async setupSFUEL() {
        this.ready = await distributeSFuel({ recipient: this.wallet.account.address })
        return this.ready;
    }
}

export default new InGameSigner();