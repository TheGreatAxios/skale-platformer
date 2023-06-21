import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_} from "typeorm"
import * as marshal from "./marshal"

@Entity_()
export class Block {
    constructor(props?: Partial<Block>) {
        Object.assign(this, props)
    }

    @PrimaryColumn_()
    id!: string

    @Column_("int4", {nullable: false})
    height!: number

    @Column_("text", {nullable: false})
    hash!: string

    @Column_("text", {nullable: false})
    parentHash!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    nonce!: bigint | undefined | null

    @Column_("text", {nullable: false})
    sha3Uncles!: string

    @Column_("text", {nullable: false})
    logsBloom!: string

    @Column_("text", {nullable: false})
    transactionsRoot!: string

    @Column_("text", {nullable: false})
    stateRoot!: string

    @Column_("text", {nullable: false})
    receiptsRoot!: string

    @Column_("text", {nullable: false})
    miner!: string

    @Column_("text", {nullable: true})
    difficulty!: string | undefined | null

    @Column_("text", {nullable: true})
    totalDifficulty!: string | undefined | null

    @Column_("text", {nullable: false})
    extraData!: string

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    size!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    gasLimit!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    gasUsed!: bigint

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    timestamp!: bigint

    @Column_("text", {nullable: true})
    mixHash!: string | undefined | null

    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: true})
    baseFeePerGas!: bigint | undefined | null
}
