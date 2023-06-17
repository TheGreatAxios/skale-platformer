import ContractConfiguration from "../../contracts/deployments/nebula/Enemies.json";
import { getContract } from 'viem';
import { inGameSigner } from "../blockchain/inGameSigner";
import { getAccount } from "@wagmi/core";

const contract = getContract({
    address: ContractConfiguration.address as `0x${string}`,
    abi: ContractConfiguration.abi,
    publicClient: inGameSigner.valueOf().client,
    walletClient: inGameSigner.valueOf().wallet,
})


export async function destroyEnemy(tokenId: bigint) {
    const { address } = getAccount();    
    
    const { request } = await contract.simulate.destroy([tokenId, address], {
        nonce: inGameSigner.value.nonce++
    });

    await inGameSigner.valueOf().wallet.writeContract(request);
}