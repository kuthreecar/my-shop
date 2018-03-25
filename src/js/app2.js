App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    App.initWeb3();
    App.initData();
  },


initData: function() {
    var itemsRow = $('#itemsRow');
    var itemTemplate = $('#itemTemplate');



	web3.eth.getBlockNumber(function(err, res){
		App.showBlock(1, res);
	});

},
showBlock: function(cur, num) {
    var blockRow = $('#blockRow');
    var blockTemplate = $('#blockTemplate');

	web3.eth.getBlock(cur, function(error, result){
		if(!error)
		{
		console.log(result);
          blockTemplate.find('.number').text(result.number);
          blockTemplate.find('.hash').text(result.hash);
          blockTemplate.find('.parentHash').text(result.parentHash);
          blockTemplate.find('.mixHash').text(result.mixHash);
          blockTemplate.find('.nonce').text(result.nonce);
          blockTemplate.find('.logsBloom').text(result.logsBloom);
          blockTemplate.find('.transactionsRoot').text(result.transactionsRoot);
          blockTemplate.find('.stateRoot').text(result.stateRoot);
          blockTemplate.find('.receiptsRoot').text(result.receiptsRoot);
          blockTemplate.find('.miner').text(result.miner);
          blockTemplate.find('.difficulty').text(result.difficulty);
          blockTemplate.find('.totalDifficulty').text(result.totalDifficulty);
          blockTemplate.find('.extraData').text(result.extraData);
          blockTemplate.find('.size').text(result.size);
          blockTemplate.find('.gasLimit').text(result.gasLimit);
          blockTemplate.find('.gasUsed').text(result.gasUsed);
          blockTemplate.find('.timestamp').text(result.timestamp);
          blockTemplate.find('.transactions').text(result.transactions);
          blockTemplate.find('.uncles').text(result.uncles);

			  blockRow.append(blockTemplate.html());
		}
		else
			console.error(error);
		if(cur < num)
			App.showBlock(cur + 1,num)
		});

},

  bindEvents: function() {
    $(document).on('click', '.btn-buy', App.handleBuy);
    return
  },

  initWeb3: function() {

	// Is there an injected web3 instance?
	if (typeof web3 !== 'undefined') {
	  //App.web3Provider = web3.currentProvider;
	  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
	} else {
	  // If no injected web3 instance is detected, fall back to Ganache
	  App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
	}
	web3 = new Web3(App.web3Provider);

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
            return buyInstance.buy(itemId, itemQuantity, {from: account});
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
