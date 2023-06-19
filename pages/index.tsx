import type { NextPage } from "next";
import { Navigation } from "../components";
import Link from "next/link";
import styles from "../styles/Home.module.css";

/** Icons */
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";


const Home: NextPage = () => {

    const [isReady, setIsReady] = useState<boolean>(false);

    const { isConnected, address } = useAccount();

    useEffect(() => {
        if (isConnected && address && !isReady) {
            setIsReady(true);
        }
    }, [isConnected, address])


    if (!isReady) {
        return (
            <div className={styles.container}>
                <h1>SKALE Platformer</h1>
                <ConnectButton />
            </div>
        );
    }
    

    return (
        <div className={styles.container}>
            <div className={styles.actions}>
                <Link href="/game" className={styles.actions__play}>
                    <SportsEsportsIcon />
                    <h3>Play Now</h3>
                </Link>
                <Link href="#" className={styles.actions__play}>
                    <EmojiPeopleIcon />
                    <h3>Coming Soon</h3>
                </Link>
                <Link href="#" className={styles.actions__play}>
                    <StorefrontIcon />
                    <h3>Coming Soon</h3>
                </Link>
            </div>
        </div>
    );
};

export default Home;
