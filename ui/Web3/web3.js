import Web3 from "web3";
import ashTokenSale from "../../eth/build/contracts/AshTokenSale.json";
import ashToken from "../../eth/build/contracts/AshToken.json";

const ashTokenSaleAddress = "0xc0209173591dFb07AB6c67b00eD01EB94665668a";
const ashTokenAddress = "0x95693b0356C36FD24245253Ffd5ec42525969fFe";
const tokenPrice = 1000000000000000;

export let web3;
export const web3Init = () => {
  if (window.ethereum !== "undefined") {
    web3 = new Web3(Web3.givenProvider);
  } else {
    let provider = new Web3.providers.HttpProvider("http:localhost:7545");
    web3 = new Web3(provider);
  }
};

export const tokenSaleInstance = () => {
  return new web3.eth.Contract(ashTokenSale.abi, ashTokenSaleAddress);
};

export const tokenInstance = () => {
  return new web3.eth.Contract(ashToken.abi, ashTokenAddress);
};
