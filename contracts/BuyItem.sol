pragma solidity ^0.4.17;

contract BuyItem {

// variables
uint[] itemId;
mapping(uint => uint) public itemPrice;
mapping(uint => uint) public itemAvailiable;


function initItem(uint[] _itemId, uint[] _itemPrice, uint[] _itemAvailable) public returns (uint)
{
  itemId = _itemId;
  for(uint i = 0; i < itemId.length;i++)
  {
    itemPrice[_itemId[i]]= _itemPrice[i];
    itemAvailiable[_itemId[i]] = _itemAvailable[i];
  }
  return 1;
}

function buy(uint id,uint quantity) payable public returns (uint) 
{

  require(checkValidItem(id));
  require(itemAvailiable[id] >= quantity);

  itemAvailiable[id] -= quantity;
  return itemAvailiable[id];


}

function getItemAvailable(uint id) view public returns (uint) 
{
  return itemAvailiable[id];
}

function checkValidItem(uint id) view public returns(bool)
{
  for (uint i = 0; i < itemId.length;i++)
  {
    if(itemId[i] == id)
    {
      return true;
    }
  }
  return false;
}


}

