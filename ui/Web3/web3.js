import Web3 from "web3";
import ashTokenSale from "../../eth/build/contracts/AshTokenSale.json";
import ashToken from "../../eth/build/contracts/AshToken.json";

const ashTokenSaleAddress = "0x6d5be33c3058019D6799398a23050a671774AAC6";
const ashTokenAddress = "0x3382ec18b6c2629295715930F129f971AECb0162";
const tokenPrice = 1000000000000000;

export let web3;
export const web3Init = async () => {
    if (window.ethereum !== "undefined") {
        web3 = new Web3(Web3.givenProvider);
    } else {
        let provider = new Web3.providers.HttpProvider("http:localhost:7545");
        web3 = new Web3(provider);
    }
};

export const tokenSaleInstance = () => {
    return new web3.eth.Contract(
        ashTokenSale.abi,
        ashTokenSaleAddress,
    );
};

export const tokenInstance = () => {
    return new web3.eth.Contract(ashToken.abi, ashTokenAddress);
};

