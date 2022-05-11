let AshTokenSale = artifacts.require("./AshTokenSale.sol");
let AshToken = artifacts.require("./AshToken.sol");

contract("AshTokenSale", (accounts) => {
  let tokenSaleInstance;
  let tokenInstance;
  let admin = accounts[0];
  let buyer = accounts[1];
  let numberOfTokens;
  const tokensAvailable = 750000;
  const tokenPrice = 1000000000000000; // in WEI

  it("initialize the contract with correct values", async () => {
    const instance = await AshTokenSale.deployed();
    tokenSaleInstance = instance;
    const address = await tokenSaleInstance.address;
    assert.notEqual(address, 0x0, "has contract address");
    const tokenAddress = await tokenSaleInstance.tokenContract();
    assert.notEqual(tokenAddress, 0x0, "has token contract address");
    const price = await tokenSaleInstance.tokenPrice();
    assert.equal(price, tokenPrice, "token price is correct");
  });

  it("facilitates token buying", async () => {
    const ashTokenInstance = await AshToken.deployed();
    const saleInstance = await AshTokenSale.deployed();
    tokenSaleInstance = saleInstance;
    tokenInstance = ashTokenInstance;
    await tokenInstance.transfer(tokenSaleInstance.address, tokensAvailable, {
      from: admin,
    });
    numberOfTokens = 10;
    const receipt = await tokenSaleInstance.buyTokens(numberOfTokens, {
      from: buyer,
      value: numberOfTokens * tokenPrice,
    });
    assert.equal(receipt.logs.length, 1, "triggers one event");
    assert.equal(receipt.logs[0].event, "Sell", "Should be the Sell event");
    assert.equal(
      receipt.logs[0].args._buyer,
      buyer,
      "logs the account the tokens are authorized by"
    );
    assert.equal(
      receipt.logs[0].args._amount,
      numberOfTokens,
      "logs the account the tokens are authorized to"
    );
    const amount = await tokenSaleInstance.tokensSold();
    assert.equal(
      amount.toNumber(),
      numberOfTokens,
      "increments the number of tokens sold"
    );
    const buyerBalance = await tokenInstance.balances(buyer);
    assert.equal(buyerBalance.toNumber(), numberOfTokens);
    const senderBalance = await tokenInstance.balances(
      tokenSaleInstance.address
    );
    assert.equal(senderBalance.toNumber(), tokensAvailable - numberOfTokens);

    try {
      await tokenSaleInstance.buyTokens(numberOfTokens, {
        from: buyer,
        value: 1,
      });
      assert(false);
    } catch (err) {
      assert(err);
    }

    try {
      await tokenSaleInstance.buyTokens(800000, { from: buyer, value: 1 });
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it("ending token sale", async () => {
    const ashTokenInstance = await AshToken.deployed();
    tokenInstance = ashTokenInstance;
    const instance = await AshTokenSale.deployed();
    tokenSaleInstance = instance;
    try {
      await tokenSaleInstance.endSale({ from: buyer });
      assert(false);
    } catch (err) {
      assert(err);
    }
    await tokenSaleInstance.endSale({ from: admin });
    const balance = await tokenInstance.balances(admin);
    assert.equal(
      balance.toNumber(),
      999990,
      "returns all unsold daap token to admin"
    );
    // const price = await tokenSaleInstance.tokenPrice();
    // assert.equal(price.toNumber(), 0, 'token price was reset');
  });
});
