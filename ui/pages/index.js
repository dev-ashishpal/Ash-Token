import Heading from "../component/Heading";
import Form from "../component/Form";
import Progress from "../component/Progress";
import Web3Init from "../Web3/web3";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    Web3Init();
  },[]);
  return (
    <div className="center">
      <Heading>ash token ico sale</Heading>
      <p className="margin-bottom-sm margin-top-sm">
        Introducing "Ashish Token (ASH)". Token price is 0.001 Ether. You have
        currently 0 ASH
      </p>
      <Form />
      <Progress value="1" />
      <p>3018 / 750000 tokens sold</p>
      <p className="margin-top-lg">
        Your Account Address: 0x546054515Bb8cB0a3bf0Ff19b27f836df20a116d
      </p>
    </div>
  );
}
