import ContractConfiguration from "../../contracts/deployments/nebula/Gold.json";
import { getContract } from 'viem';
import game from "../game";
import { getAccount } from "@wagmi/core";

const contract = getContract({
    address: ContractConfiguration.address as `0x${string}`,
    abi: ContractConfiguration.abi,
    publicClient: game.signer.client,
    walletClient: game.signer.wallet,
})


export async function collectGold() {
    const { address } = getAccount();    
    
    const { request } = await contract.simulate.publicMint([address], {
        nonce: game.signer.nonce++
    });

    await game.signer.wallet.writeContract(request);
}