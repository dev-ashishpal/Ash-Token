//SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract AshToken {
	string public name = "Ashish Token";
	string public symbol = "ASH";
	uint8 public decimal = 18;
	uint256 public totalSupply;
	mapping(address => uint256) public balances;
	mapping(address => mapping(address => uint256)) public allowance;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);
	event Approval(address indexed _owner, address indexed _spender, uint _value);

	constructor(uint256 _initialSupply) {
		totalSupply = _initialSupply;
		balances[msg.sender] = totalSupply;
	}

	function transfer(address _to, uint256 value) public returns (bool) {
		require(value <= balances[msg.sender]);
		balances[msg.sender] = balances[msg.sender] - value;
		balances[_to] = balances[_to] + value;
		emit Transfer(msg.sender, _to, value);
		return true;
	}

	function approve(address _spender, uint _value) public returns (bool success) {
		allowance[msg.sender][_spender] = _value;
		emit Approval(msg.sender, _spender, _value);
		return true;
	}

	function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
		require(_value <= balances[_from]);
		require(_value <= allowance[_from][msg.sender]);
		balances[_from] = balances[_from] - _value;
		balances[_to] = balances[_to] + _value;
		allowance[_from][msg.sender] = allowance[_from][msg.sender] - _value;	
		emit Transfer(_from, _to, _value);
		return true;
	}

}