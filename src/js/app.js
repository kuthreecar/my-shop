App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    $.getJSON('../items.json', function(data) {
      var itemsRow = $('#itemsRow');
      var itemTemplate = $('#itemTemplate');

      for (i = 0; i < data.length; i ++) {
        itemTemplate.find('.panel-title').text(data[i].name);
        itemTemplate.find('img').attr('src', data[i].picture);
        itemTemplate.find('.available').text(data[i].available);
        itemTemplate.find('.description').text(data[i].description);
        itemTemplate.find('.btn-buy').attr('data-id', data[i].id);
        itemsRow.append(itemTemplate.html());
      }
    App.initWeb3();
    return App.initContract(data);
    });

  },

initContract: function(item_data) {
$.getJSON('BuyItem.json', function(data) {


  var BuyItemArtifact = data;
  App.contracts.BuyItem = TruffleContract(BuyItemArtifact);

  // Set the provider for our contract
  App.contracts.BuyItem.setProvider(App.web3Provider);
  App.contracts.BuyItem.deployed().then(function(instance){

    var idArray=[];
    var availableArray=[];
    var priceArray=[];
    for (i = 0; i < item_data.length; i ++) {
      idArray.push(item_data[i].name);
      availableArray.push(item_data[i].available);
      priceArray.push(item_data[i].price);
    }

    return instance.initItem(idArray, availableArray, priceArray);
    }).catch(function(err){
  console.log(err.message);
});
  return;
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

  buyFinish: function(result) {

	var adoptionInstance;

	App.contracts.BuyItem.deployed().then(function(instance) {
	  return instance.getItemAvailable.call();
	}).then(function(available) {
	  for (i = 0; i < adopters.length; i++) {
	    if (adopters[i] !== '0x0000000000000000000000000000000000000000') {
	      $('.panel-pet').eq(i).find('button').text('Success').attr('disabled', true);
	    }
	  }
	}).catch(function(err) {
	  console.log(err.message);
	});

	alert("buy succeed")

  },

  handleBuy: function(event) {
    event.preventDefault();

    var itemId = parseInt($(event.target).data('id'));
    var itemQuantity = parseInt($(event.target.parentElement).find('.quantity').val());
    //var itemAvailable = parseInt($(event.target.parentElement).find('.available').text());

	var buyInstance;

	web3.eth.getAccounts(function(error, accounts) {
	  if (error) {
	    console.log(error);
	  }

	  var account = accounts[0];

	  App.contracts.BuyItem.deployed().then(function(instance) {
	    buyInstance = instance;
	    // Execute adopt as a transaction by sending account
            var buyok = buyInstance.buy(itemId, itemQuantity, {from: account});
	    //alert(buyok);
	    return buyok;
	  }).then(function(result) {
	    return App.buyFinish();
	  }).catch(function(err) {
	    console.log(err.message);
	  });
	});

  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
