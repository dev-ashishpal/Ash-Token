const AshToken = artifacts.require("AshToken.sol");
const AshTokenSale = artifacts.require("AshTokenSale.sol");

module.exports =  async deployer => {
  const tokenPrice = 1000000000000000; // in WEI

  await deployer.deploy(AshToken, 1000000).then(() => {
    console.log('AshToken', AshToken.address);
  });
  await deployer.deploy(AshTokenSale, AshToken.address,tokenPrice ).then(() => {
    console.log('AshTokenSale', AshTokenSale.address);
  });
};
 