import Web3 from "web3";
import ashTokenSale from "../../eth/build/contracts/AshTokenSale.json";
import ashToken from "../../eth/build/contracts/AshToken.json";

const Web3Init = async () => {
  let provider;
  let web3;

  if (window.ethereum != "undefined") {
    // console.log("it works");
    provider = Web3.givenProvider;
    web3 = new Web3(provider);
  } else {
    provider = new Web3.providers.HttpProvider("http:localhost:7545");
    web3 = new Web3(provider);
  }
  console.log(provider);
};

export default Web3Init;
