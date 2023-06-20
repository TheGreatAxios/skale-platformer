'use client';

import initialize from "../game/initialize"
import { Metadata, NextPage } from "next";
import styles from "../styles/Game.module.css";
import { useEffect, useState } from "react";
import levels from "../levels.json";
import inGameSigner from "../game/blockchain/inGameSigner";
import { start } from "repl";

export const metadata: Metadata = {
    viewport: {
        width: "device-width",
        initialScale: 1,
        maximumScale: 1,
        userScalable: false
    }
       
}

const Game: NextPage = () => {

    const [isReady, setIsReady] = useState<boolean>(false);
    const [startGame, setStartGame] = useState<boolean>(false);

    useEffect(() => {
        if (!isReady) inGameSigner.setupSFUEL()
            .then((res) => {
                setIsReady(res);
            })
            .catch((err) => {
                console.log(err);
                throw err;
            })
    }, [isReady]);

    useEffect(() => {
        if (isReady && !startGame) {
            setStartGame(true);
            initialize([levels[0].map, levels[0].track], "melon_man");
        }
    }, [isReady])

    return (
        <div className={styles.container}>
            {!isReady && <h2>Loading sFUEL and Game</h2>}
            <div className={styles.screen} id="screen"></div>
        </div>
    )
}

export default Game;