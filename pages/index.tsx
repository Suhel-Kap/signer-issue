import {ConnectButton} from "@rainbow-me/rainbowkit";
import {useSigner} from "wagmi";

export default function Home() {
  const {data: signer} = useSigner()
  console.log("signer", signer)

  return (
      <>
        <ConnectButton />
      </>
  )
}
