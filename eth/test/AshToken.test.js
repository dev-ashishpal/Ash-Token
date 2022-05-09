let AshToken = artifacts.require("./AshToken.sol");

contract("AshToken", (accounts) => {
	let tokenInstance;
	
  it('initializes contract with the correct values', async () => {
	  const instance = await AshToken.deployed();
	  tokenInstance = instance;
	  const name = await tokenInstance.name();
	  const symbol = await tokenInstance.symbol();
	  const decimal = await tokenInstance.decimal();
	  assert.equal(name, "Ashish Token", "has equal name");
	  assert.equal(symbol, "ASH", "has equal symbol");
	  assert.equal(decimal, 18, "has equal decimal");
  });

  it("allocate the initial supply upon deployment", async() => {
	  const instance = await AshToken.deployed();
	  tokenInstance = instance;
	  const totalSupply = await tokenInstance.totalSupply();
	  const adminBalance = await tokenInstance.balances(accounts[0]);
	  assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 100000');
	  assert.equal(adminBalance.toNumber(), 1000000, 'allocates the initial supply to admin');
  });

  it("minimum tokens required for transfer", async () => {
	  const instance = await AshToken.deployed();
	  tokenInstance = instance;
	  try {
		  await tokenInstance.transfer.call(accounts[1], 999999999999999);
		  assert(false);
	  } catch(err) {
		  assert(err);
	  }
  });

  it("transfer token ownership", async () => {
	  const instance = await AshToken.deployed();	
	  tokenInstance = instance;
	  await tokenInstance.transfer(accounts[1], 250000, {from: accounts[0]});
	  const firstBalance = await tokenInstance.balances(accounts[0]);
	  const secondBalance = await tokenInstance.balances(accounts[1]);
	  assert.equal(firstBalance.toNumber(), 750000, "tokens deducted from first account");
	  assert.equal(secondBalance.toNumber(), 250000, "tokens added to second account");
  });

  it("approve token for delegate transfer", async () => {
	  const instance = await AshToken.deployed();
	  tokenInstance = instance;
	  const success = await tokenInstance.approve.call(accounts[1], 100);
	  assert.equal(success, true, "does returns true");
	  const receipt = await tokenInstance.approve(accounts[1], 100);
	  assert.equal(receipt.logs.length, 1, 'triggers one event');
	  assert.equal(receipt.logs[0].event, "Approval", "Should be the Approval event");
	  assert.equal(receipt.logs[0].args._owner, accounts[0], 'logs the account the tokens are authorized by');
	  assert.equal(receipt.logs[0].args._spender, accounts[1], 'logs the account the tokens are authorized to');
	  assert.equal(receipt.logs[0].args._value, 100, 'logs the transfer amount');

	  const allowance = await tokenInstance.allowance(accounts[0], accounts[1]);
	  assert.equal(allowance, 100, "stores the allowance for delegate transfer");
  });

  it("handle delegate transfer token", async () => {
	  const instance = await AshToken.deployed();
	  tokenInstance = instance;
	  fromAccount = accounts[2];
	  toAccount = accounts[3];
	  spendingAccount = accounts[4];
	  await tokenInstance.transfer(fromAccount, 100, {from: accounts[0]});
	  await tokenInstance.approve(spendingAccount, 10, {from: fromAccount});
	  try{
		  await tokenInstance.transferFrom(fromAccount, toAccount, 9999, {from: spendingAccount});
		  assert(false);
	  } catch(err) {
		  assert(err);
	  }

	  try{
		  await tokenInstance.transferFrom(fromAccount, toAccount, 20, {from: spendingAccount});
		  assert(false);
	  } catch(err) {
		  assert(err);
	  }

	  await tokenInstance.transferFrom(fromAccount, toAccount, 10, {from: spendingAccount});
	  const fromBalance = await tokenInstance.balances(fromAccount);
	  const toBalance = await tokenInstance.balances(toAccount);
	  const spendingToken = await tokenInstance.allowance(fromAccount, spendingAccount);
	  assert.equal(fromBalance.toNumber(), 90, "10 tokens removed from fromAccount");
	  assert.equal(toBalance.toNumber(), 10, "10 tokens delegated to toAccount");
	  assert.equal(spendingToken.toNumber(), 0, "all approved tokens spend");
  });

});
