App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    App.initWeb3();
    App.initContract();
  },

initContract: function(item_data) {
$.getJSON('BuyItem.json', function(data) {

  var BuyItemArtifact = data;
  App.contracts.BuyItem = TruffleContract(BuyItemArtifact);

  // Set the provider for our contract
  App.contracts.BuyItem.setProvider(App.web3Provider);

    return App.initData();
    });
},

initData: function() {
    var itemsRow = $('#itemsRow');
    var itemTemplate = $('#itemTemplate');
    var buyIteminstance;


    App.contracts.BuyItem.deployed().then(function(instance){
      buyIteminstance = instance
      return buyIteminstance.getItemIDList.call();
    }).then(function(itemList) {
      for (i = 0; i < itemList.length; i++) {
        var itemID = itemList[i];
        buyIteminstance.getItemData(itemList[i]).then(function(result){
        itemTemplate.find('.panel-title').text(result[1]);
        itemTemplate.find('img').attr('src', result[2]);
          itemTemplate.find('.available').text(result[5]);
          itemTemplate.find('.price').text(result[4]);
          itemTemplate.find('.description').text(result[3]);
          itemTemplate.find('.btn-buy').attr('data-id',result[0]);
          itemsRow.append(itemTemplate.html());

        });
    }
}).catch(function(err){
    console.log(err.message);
    });
              return App.bindEvents();
},

  bindEvents: function() {
    $(document).on('click', '.btn-buy', App.handleBuy);
    return
  },

  initWeb3: function() {

	// Is there an injected web3 instance?
	if (typeof web3 !== 'undefined') {
	  App.web3Provider = web3.currentProvider;
	} else {
	  // If no injected web3 instance is detected, fall back to Ganache
	  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
	}
	web3 = new Web3(App.web3Provider);

  },

  buyFinish: function(itemId) {

	var buyInstance;

	App.contracts.BuyItem.deployed().then(function(instance) {
		buyInstance = instance;
	  return buyInstance.getItemData(itemId);
	}).then(function(available) {
  	alert("Buy Succeed");
	location.reload();
	}).catch(function(err) {
	  console.log(err.message);
	});


  },

  handleBuy: function(event) {
    event.preventDefault();

    var itemId = parseInt($(event.target).data('id'));
    var itemQuantity = parseInt($(event.target.parentElement).find('.quantity').val());
    var itemPrice = parseInt($(event.target.parentElement).find('.price').text());

	var buyInstance;

	web3.eth.getAccounts(function(error, accounts) {
	  if (error) {
	    console.log(error);
	  }

	  var account = accounts[0];

	  App.contracts.BuyItem.deployed().then(function(instance) {
	    buyInstance = instance;
	    // Execute adopt as a transaction by sending account
            return buyInstance.buy(itemId, itemQuantity, {from: account, value: web3.toWei(itemPrice * itemQuantity, 'ether')});
	  }).then(function(result) {
	    return App.buyFinish(itemId);
	  }).catch(function(err) {
	    console.log(err.message);
      alert("Buy Failed");
	  });
	});

  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
