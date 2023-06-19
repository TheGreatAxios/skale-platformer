import { useAccount } from "wagmi";
import Gold from "../../contracts/deployments/nebula/Gold.json";
import Enemies from "../../contracts/deployments/nebula/Enemies.json";
import { zeroAddress } from "viem";
import { useEffect, useState } from "react";
import styles from "./Statistics.module.css";
import { skaleNebula } from "wagmi/chains";

export default function Statistics() {
    const { address } = useAccount();

    const [balances, setBalances] = useState({
        gold: 0,
        slimes: 0,
        flies: 0,
    });

    async function getGoldBalance() {
        const data = {
            jsonrpc: "2.0",
            method: "eth_call",
            params: [
                {
                    to: Gold.address,
                    data: `0x70a08231000000000000000000000000${address?.substring(
                        2
                    )}`,
                },
                "latest",
            ],
            id: 1,
        };

        const response = await fetch(skaleNebula.rpcUrls.default.http[0], {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        const balanceHex = responseData.result;
        const balanceWei = parseInt(balanceHex, 16);
        const balanceGold = balanceWei / 1e18;

        return balanceGold;
    }

    async function getEnemyBalance(tokenId: number) {
        const encodeAddress = (address: string): string => {
            return address.replace("0x", "").toLowerCase().padStart(64, "0");
        };

        const encodeUint256 = (value: number): string => {
            return value.toString(16).padStart(64, "0");
        };

        const data = {
            jsonrpc: "2.0",
            method: "eth_call",
            params: [
                {
                    to: Enemies.address,
                    data: `0x00fdd58e${encodeAddress(
                        address ?? zeroAddress
                    )}${encodeUint256(tokenId)}`,
                },
                "latest",
            ],
            id: 1,
        };

        const response = await fetch(skaleNebula.rpcUrls.default.http[0], {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const responseData = await response.json();
        const balanceHex = responseData.result;
        const balanceWei = parseInt(balanceHex, 16);
        const enemeyBalance = balanceWei / 1e18;

        return balanceWei;
    }

    useEffect(() => {
        if (address) {
            const interval = setInterval(async () => {
                const [g, f, s] = await Promise.all([
                    getGoldBalance(),
                    getEnemyBalance(1),
                    getEnemyBalance(2),
                ]);
                
                setBalances({
                    ...balances,
                    gold: parseInt(g.toFixed(0)),
                    flies: f,
                    slimes: s
                });
            }, 2500);

            return () => clearInterval(interval);
        }
    }, [address]);

    return (
        <div className={styles.statistics}>
            <div className={styles.column}>
                <img src="/data/img/assets/collectables/coin.png" alt="Coin" />
                <p>{balances.gold}</p>
            </div>
            <div className={styles.column}>
                <img
                    src="/data/img/assets/enemies/slime_normal.png"
                    alt="Coin"
                />
                <p>{balances.slimes}</p>
            </div>
            <div className={styles.column}>
                <img src="/data/img/assets/enemies/fly_normal.png" alt="Coin" />
                <p>{balances.flies}</p>
            </div>
        </div>
    );
}
