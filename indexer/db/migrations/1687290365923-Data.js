module.exports = class Data1687290365923 {
    name = 'Data1687290365923'

    async up(db) {
        await db.query(`CREATE TABLE "block" ("id" character varying NOT NULL, "height" integer NOT NULL, "hash" text NOT NULL, "parent_hash" text NOT NULL, "nonce" numeric, "sha3_uncles" text NOT NULL, "logs_bloom" text NOT NULL, "transactions_root" text NOT NULL, "state_root" text NOT NULL, "receipts_root" text NOT NULL, "miner" text NOT NULL, "difficulty" text, "total_difficulty" text, "extra_data" text NOT NULL, "size" numeric NOT NULL, "gas_limit" numeric NOT NULL, "gas_used" numeric NOT NULL, "timestamp" numeric NOT NULL, "mix_hash" text, "base_fee_per_gas" numeric, CONSTRAINT "PK_d0925763efb591c2e2ffb267572" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "transaction" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "block_hash" text NOT NULL, "from" text, "gas" numeric NOT NULL, "gas_price" numeric, "hash" text NOT NULL, "input" text NOT NULL, "nonce" numeric NOT NULL, "to" text NOT NULL, "index" integer NOT NULL, "value" numeric NOT NULL, "type" integer, "chain_id" integer, "v" numeric NOT NULL, "r" text NOT NULL, "s" text NOT NULL, "max_priority_fee_per_gas" numeric, "max_fee_per_gas" numeric, "y_parity" integer, "status" integer, "contract_name" character varying(7), CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "block"`)
        await db.query(`DROP TABLE "transaction"`)
    }
}
