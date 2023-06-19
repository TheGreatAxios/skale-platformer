import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { wagmiConfig, chains } from "../utils/blockchain";
import { Navigation } from "../components";
import inGameSigner from "../game/blockchain/inGameSigner";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {

    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains}>
                <Navigation />
                <Component {...pageProps} />
            </RainbowKitProvider>
        </WagmiConfig>
    );
}

export default MyApp;
