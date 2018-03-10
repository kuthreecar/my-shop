pragma solidity ^0.4.17;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/BuyItem.sol";

contract TestBuyItem {
  uint[] itemId;
  uint[] itemPrice;
  uint[] itemAvailiable;
  BuyItem buyItem = BuyItem(DeployedAddresses.BuyItem());

// Test Init
function testInitItem() public {

  itemId.push(1);
  itemId.push(2);
  itemId.push(3);
  itemId.push(4);
  itemPrice.push(2);
  itemPrice.push(3);
  itemPrice.push(4);
  itemPrice.push(5);
  itemAvailiable.push(3);
  itemAvailiable.push(4);
  itemAvailiable.push(5);
  itemAvailiable.push(6);
  
  uint returnedId = buyItem.initItem(itemId, itemPrice, itemAvailiable);

  uint expected = 1;

  Assert.equal(returnedId, expected, "Adoption of pet ID 8 should be recorded.");
}

// Test GetItemAvailable
function testGetItemAvailable() public {

  uint returnedId = buyItem.getItemAvailable(3);

  uint expected = 5;

  Assert.equal(returnedId, expected, "Adoption of pet ID 8 should be recorded.");
}

// Test buy if available
function testBuy() public {

  uint returnedId = buyItem.buy(3,2);

  uint expected = 3;

  Assert.equal(returnedId, expected, "Adoption of pet ID 8 should be recorded.");
}


  
// Test buy if not available
// A little utility that runs a wrapped method invocation as an internal Solidity call
// Returns true if the underlying call succeeds and false if it throws.
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
}
