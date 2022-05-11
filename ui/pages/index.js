import React from "react";
import Heading from "../component/Heading";
import Form from "../component/Form";
import Progress from "../component/Progress";
import { web3, web3Init, tokenSaleInstance, tokenInstance } from "../Web3/web3";
import { useEffect, useState, useRef } from "react";

const Home = () => {
  // const [Web3, setWeb3] = useState({});
  const [account, setAccount] = useState("0x0");
  const [tokenPrice, setTokenPrice] = useState(null);
  const [tokensSold, setTokensSold] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);
  const tokenAvailable = 750000;
  const inputRef = useRef();

  useEffect(() => {
    web3Init();
    // setWeb3(web3);
    const fetchData = async () => {
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      const tokenPrice = await tokenSaleInstance().methods.tokenPrice().call();
      const tokenPriceEth = web3.utils.fromWei(tokenPrice, "ether");
      setTokenPrice(tokenPriceEth);
      const tokensSold = await tokenSaleInstance().methods.tokensSold().call();
      setTokensSold(+tokensSold);
      const tokenBalance = await tokenInstance()
        .methods.balances(accounts[0])
        .call();
      setTokenBalance(tokenBalance);
    };
    fetchData();
  }, []);

  const buyTokens = async (event) => {
    event.preventDefault();
    const noOfTokens = inputRef.current.value;
    const tokenPriceWei = web3.utils.toWei(tokenPrice, "ether");
    await tokenSaleInstance()
      .methods.buyTokens(noOfTokens)
      .send({ from: account, value: noOfTokens * tokenPriceWei, gas: 100000 });
  };
  return (
    <div className="center">
      <Heading>ash token ico sale</Heading>
      <p className="margin-bottom-sm margin-top-sm">
        Introducing "Ashish Token (ASH)". Token price is {tokenPrice} Ether. You
        have currently {tokenBalance} ASH
      </p>
      <Form onSubmit={buyTokens} ref={inputRef} />
      <Progress value={tokensSold / tokenAvailable} />
      <p>
        {tokensSold} / {tokenAvailable}
      </p>
      <p className="margin-top-lg">Your Account Address: {account}</p>
    </div>
  );
};

export default Home;
