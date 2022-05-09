//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;
import "./AshToken.sol";

contract AshTokenSale {
	address admin;
	AshToken public tokenContract;
	uint256 public tokenPrice;
	uint256 public tokensSold;

	event Sell(address _buyer, uint256 _amount);

	constructor(AshToken _tokenContract, uint256 _tokenPrice) {
		admin = msg.sender;
		tokenContract = _tokenContract;
		tokenPrice = _tokenPrice;
	}

	function buyTokens(uint256 _numberOfTokens) public payable {
		// Require that value is equal to tokens
		require(_numberOfTokens * tokenPrice == msg.value);
		// Require that the contract has enough tokens
		require(tokenContract.balances(address(this)) >= _numberOfTokens);
		// Require that a transfer is successful
		require(tokenContract.transfer(msg.sender, _numberOfTokens));
		tokensSold = tokensSold + _numberOfTokens; 
		emit Sell(msg.sender, _numberOfTokens);
	}

	// Ending token sale
	function endSale() payable public {
		// Require admin
		require(msg.sender == admin);
		// Transfer remaning AshToken to admin
		require(tokenContract.transfer(admin, tokenContract.balances(address(this))));
		// Destroy Contract
		selfdestruct(payable(address(admin)));
	}
}