'use client';
import React, {useEffect} from 'react';
import {ConnectButton} from '@rainbow-me/rainbowkit';
import {useAccount, useSigner} from "wagmi";
import {useRouter} from 'next/router'

import Head from 'next/head';
import styles from '../styles/Home.module.css';
import useVocdoni from "../hooks/useVocdoni";

const Home = () => {

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const { address } = useAccount();
  const { data: signer } = useSigner();
  const router = useRouter();
  const {initElection} = useVocdoni()

  useEffect(() => {
    if (mounted && signer && address){
      console.log("Mounted:",mounted);
      console.log("QS:",router.query);
      console.log("Signer:", signer);
      console.log("Address:", address);
    }
  }, [signer, router, mounted, address]);


  return (
    <div className={styles.container}>
      <Head>
        <title>RainbowKit App</title>
        <meta
          name="description"
          content="Generated by @rainbow-me/create-rainbowkit"
        />
      </Head>

      <main className={styles.main}>
        <ConnectButton />
        <button onClick={async () => {
          const res = await initElection(signer)
          console.log("hello")
        }}>
          Vocdoni client
        </button>
      </main>
    </div>
  );
};

export default Home;
