import {ConnectButton} from "@rainbow-me/rainbowkit";
import {useSigner} from "wagmi";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [id, setId] = useState(router.query.id);
  const { data: signer } = useSigner();

  useEffect(() => {
    setId(router.query.id);
  }, [router.query.id]);

  console.log("signer", signer);

  return (
    <>
      <ConnectButton />
    </>
  );
}
