pragma solidity ^0.4.17;

contract BuyItem {
struct Item
{
  uint itemID;
  string itemName;
  string itemDescription;
  string itemPicLoc;
  uint itemPrice;
  uint itemAvailiable;
}
// variables
uint[] itemId;
mapping(uint => Item) public itemByID; //id -> item

Item[4] items;


function BuyItem() public
{
  items[0].itemID=0;
  items[0].itemName="Black Bag";
  items[0].itemPicLoc="images/blackhandbag.jpg";
  items[0].itemDescription = "Black Bag";
  items[0].itemPrice = 20;
  items[0].itemAvailiable =3;

  items[1].itemID=1;
  items[1].itemName="Black Handbag";
  items[1].itemPicLoc="images/brownhandbag.jpg";
  items[1].itemDescription = "Black Handbag";
  items[1].itemPrice = 30;
  items[1].itemAvailiable =7;

  items[2].itemID=2;
  items[2].itemName="Rocksack";
  items[2].itemPicLoc="images/rocksack.jpg";
  items[2].itemDescription = "Rocksack";
  items[2].itemPrice = 20;
  items[2].itemAvailiable =4;

  items[3].itemID=3;
  items[3].itemName="Black Bag";
  items[3].itemPicLoc="images/blackbag.jpg";
  items[3].itemDescription = "Black Bag";
  items[3].itemPrice = 15;
  items[3].itemAvailiable =5;

  uint arrayLength = items.length;

  for(uint i = 0; i < arrayLength;i++)
  {
    itemId.push(items[i].itemID);
    itemByID[items[i].itemID]=items[i];
  }
}

function buy(uint id,uint quantity) payable public returns (uint)
{

  require(checkValidItem(id));
  require(itemByID[id].itemAvailiable >= quantity);

  itemByID[id].itemAvailiable -= quantity;
  return itemByID[id].itemAvailiable;


}
function getItemIDList() view public returns (uint[])
{
  return itemId;
}

function getItemData(uint _itemID) view public returns (uint, string, string, string, uint, uint)
{
  return (itemByID[_itemID].itemID, itemByID[_itemID].itemName, itemByID[_itemID].itemPicLoc,itemByID[_itemID].itemDescription,itemByID[_itemID].itemPrice,itemByID[_itemID].itemAvailiable);
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
