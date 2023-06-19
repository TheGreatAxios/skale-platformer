import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "./Navigation.module.css";
import Statistics from "../Statistics/Statistics";

export function Navigation() {
    return (
        <nav className={styles.container}>
            <h1>SKALE Platformer</h1>
            <Statistics />
            <div className={styles.connectButton}>
                <ConnectButton />
            </div>
        </nav>
    )
}