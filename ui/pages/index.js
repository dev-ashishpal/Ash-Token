import React from "react";
import Heading from "../component/Heading";
import Form from "../component/Form";
import ProductList from "../component/ProductList";
import Progress from "../component/Progress";
import { web3, web3Init, tokenSaleInstance, tokenInstance } from "../Web3/web3";
import { useEffect, useState, useRef } from "react";

const productData = [
  { id: 1, image: "images/1.jpg", title: "product1", price: 300 },
  { id: 2, image: "images/1.jpg", title: "product2", price: 100 },
  { id: 3, image: "images/1.jpg", title: "product3", price: 2000 },
  { id: 4, image: "images/1.jpg", title: "product4", price: 50 },
  { id: 5, image: "images/1.jpg", title: "product5", price: 400 },
  { id: 6, image: "images/1.jpg", title: "product6", price: 999 },
];
const Home = () => {
  // STATE
  const [account, setAccount] = useState("0x0");
  const [tokenPrice, setTokenPrice] = useState(null);
  const [tokensSold, setTokensSold] = useState(null);
  const [tokenBalance, setTokenBalance] = useState(null);
  const tokenAvailable = 750000;
  const inputRef = useRef();

  // EFFECT
  useEffect(() => {
    web3Init();
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

  // BUY TOKEN METHOD
  const buyTokens = async (event) => {
    event.preventDefault();
    const noOfTokens = inputRef.current.value;
    const tokenPriceWei = web3.utils.toWei(tokenPrice, "ether");
    await tokenSaleInstance()
      .methods.buyTokens(noOfTokens)
      .send({ from: account, value: noOfTokens * tokenPriceWei, gas: 100000 });
  };

  // BUY PRODUCT METHOD
  const buyProduct = async (e) => {
    // console.log(e.target.previousSibling.innerText);
    const price = e.target.previousSibling.innerText;
    await tokenInstance().methods.transfer(tokenSaleInstance().options.address, price).send({from: account});
    
  };

  // JSX
  return (
    <div className="center">
      <Heading>ash token ico sale</Heading>
      <p>
        Introducing "Ashish Token (ASH)". Token price is {tokenPrice} Ether. You
        have currently {tokenBalance} ASH.
      </p>
      <Form onSubmit={buyTokens} ref={inputRef} />
      {/* <Progress value={tokensSold / tokenAvailable} />
      <p>
        {tokensSold} / {tokenAvailable}
      </p> */}
      <p className="margin-bottom-sm">Your Account Address: {account}</p>
      <ProductList products={productData} onClick={buyProduct} />
    </div>
  );
};

export default Home;
