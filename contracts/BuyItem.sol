pragma solidity ^0.4.17;

contract BuyItem {

// variables
uint[] itemId;
mapping(uint => uint) public itemPrice;
mapping(uint => uint) public itemAvailiable;


function initItem(uint[] _itemId, uint[] _itemPrice, uint[] _itemAvailable) public
{
  itemId = _itemId;

  for(uint i = 0; i < itemId.length;i++)
  {
    itemPrice[_itemId[i]]= _itemPrice[i];
    itemAvailiable[_itemId[i]] = _itemAvailable[i];
  }
}

function buy(uint id,uint quantity) public returns (uint) 
{

  require(checkValidItem(id));

  if(itemAvailiable[id] < quantity)
  {
    return 0;
  }
  itemAvailiable[id] -= quantity;
  return itemAvailiable[id];


}

function getItemAvailable(uint id)public returns (uint) 
{
  return itemAvailiable[id];
}

function checkValidItem(uint id) view public returns(bool)
{
  for(uint i = 0; i < itemId.length;i++)
  {
    if(itemId[i] == id)
    {
      return true;
    }
  }
  return false;
}

// Retrieving the adopters
//function getBuyers() public view returns (address[16]) {
//  return buyers;
//}

}

