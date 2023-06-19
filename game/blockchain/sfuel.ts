import { AnonymousPoW } from "@skaleproject/pow-ethers";
import { createPublicClient, http } from "viem";
import { skaleNebula } from "viem/chains";

export async function distributeSFuel({
    recipient
}: {
    recipient: string
}) : Promise<boolean> {
    const pow = new AnonymousPoW({ 
        rpcUrl: skaleNebula.rpcUrls.default.http[0],
    });

    const hash = await pow.send({
        to: "0x5a6869ef5b81DCb58EBF51b8F893c31f5AFE3Fa8",
        data: "0x0c11dedd000000000000000000000000" + recipient.substring(2)
    })

    const receipt = await hash.wait(1);

    return true;
}