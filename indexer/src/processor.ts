import { TypeormDatabase } from "@subsquid/typeorm-store";
import { EvmBatchProcessor } from "@subsquid/evm-processor";
import { lookupArchive } from "@subsquid/archive-registry";
import { ContractName, Block, Transaction } from "./model";

const processor = new EvmBatchProcessor()
    .setDataSource({
        chain: "https://mainnet.skalenodes.com/v1/green-giddy-denebola",
        archive: lookupArchive("skale-nebula"),
    })
    .addTransaction(["0x092Eec89C0175Ddaf210a92d6f9a66B876E4550C", "0x0C8b6DE084385Fd681f19611f84659dc8175Df5c"], {
        range: {
            from: 1_700_000
        },
        data: {
            block: {
                id: true,
                height: true,
                hash: true,
                parentHash: true,
                nonce: true,
                sha3Uncles: true,
                logsBloom: true,
                transactionsRoot: true,
                stateRoot: true,
                receiptsRoot: true,
                miner: true,
                difficulty: true,
                totalDifficulty: true,
                extraData: true,
                size: true,
                gasLimit: true,
                gasUsed: true,
                timestamp: true,
                mixHash: true,
                baseFeePerGas: true,
            },
            transaction: {
                id: true,
                from: true,
                gas: true,
                gasPrice: true,
                hash: true,
                input: true,
                nonce: true,
                to: true,
                index: true,
                value: true,
                type: true,
                data: true,
                chainId: true,
                v: true,
                r: true,
                s: true,
                maxPriorityFeePerGas: true,
                maxFeePerGas: true,
                yParity: true,
                status: true,
            },
        },
    });

function formatID(height: any, hash: string) {
    return `${String(height).padStart(10, "0")}-${hash}`;
}

function getContractName(to: string | undefined) {
  if (to === "0x092Eec89C0175Ddaf210a92d6f9a66B876E4550C") return ContractName.Gold;
  else if (to === "0x0C8b6DE084385Fd681f19611f84659dc8175Df5c") return ContractName.Enemies;
  return null;
}

processor.run(new TypeormDatabase(), async (ctx) => {
    const blocks: Block[] = [];
    const txs: Transaction[] = [];

    for (let block of ctx.blocks) {
        /// Store Block
        blocks.push(new Block({
            ...block.header,
            timestamp: BigInt(block.header.timestamp),
        }));

        for (let item of block.items) {
            if (item.kind === "transaction") {
                txs.push(new Transaction({
                    ...item.transaction,
                    blockNumber: block.header.height,
                    blockHash: block.header.hash,
                    contractName: getContractName(item.transaction.to)
                }));
            }
        }
    }

    await ctx.store.save(txs);
    await ctx.store.save(blocks);
});