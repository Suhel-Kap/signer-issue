import {AppProps} from 'next/app';
import Head from 'next/head';
import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import {
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import {alchemyProvider} from 'wagmi/providers/alchemy';
import {publicProvider} from 'wagmi/providers/public';
import {useState, useEffect} from "react";
import {polygonMumbai} from "@wagmi/chains";

export default function App(props: AppProps) {
  const [user, setUser] = useState(null);
  const {Component, pageProps} = props;
  const {chains, provider, webSocketProvider} = configureChains(
      [polygonMumbai],
      [
        alchemyProvider({apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!}),
        publicProvider()
      ]
  );
  const {connectors} = getDefaultWallets({
    appName: 'Dynamic Audio NFTs',
    chains
  });
  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
    webSocketProvider
  })


  return (
      <>
        <Head>
          <title>The Crypto Studio</title>
        </Head>
        <WagmiConfig client={wagmiClient}>
          <RainbowKitProvider chains={chains} theme={darkTheme()}>
                  <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </>
  );
}