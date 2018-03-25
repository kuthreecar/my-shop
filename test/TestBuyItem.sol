pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BuyItem.sol";

contract TestBuyItem {
  uint[] itemId;
  uint[] itemPrice;
  uint[] itemAvailiable;
  BuyItem buyItem = BuyItem(DeployedAddresses.BuyItem());
string aa;
function testCheckValidItem() public {
  bool returned = buyItem.checkValidItem(2);
  bool expected = true;
  Assert.equal(returned, expected, "CheckValidItem Fail");
}

function testCheckValidItem2() public {
  bool returned = buyItem.checkValidItem(5);
  bool expected = false;
  Assert.equal(returned, expected, "CheckValidItem2 Fail");
}

function testGetItemData() public {
string memory a;string memory b;string memory c;
 uint d;uint e;
(a,b,c,d,e) = buyItem.getItemData(2);
  aa = "Rocksack";
  Assert.equal(a, aa, "testGetItemData Fail");
}

// Test buy if not available
// A little utility that runs a wrapped method invocation as an internal Solidity call
// Returns true if the underlying call succeeds and false if it throws.
/*
function execute(string signature) internal returns (bool){
    bytes4 sig = bytes4(keccak256(signature));
    address self = address(this);
    return self.call(sig);
  }

function buyTooMany() public {
    buyItem.buy(3,5);
}

function testBuy2() public {
  Assert.isFalse(execute('buyTooMany()'), "Should fail over limit");
}
*/
}
