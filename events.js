window.onload = async function () {
  var metamask = false;
	if (window.ethereum) {
		window.web3 = new Web3(ethereum);
		metamask = true;
		try {
			await ethereum.enable();
			accounts= await web3.eth.getAccounts();
			option={from: accounts[0] };
		} catch (error) {
			// User denied account access...
		}
	}
	// Legacy dapp browsers...
	else if (window.web3) {
		window.web3 = new Web3(web3.currentProvider);
		metamask = true;
		// Acccounts always exposed
		try {
			web3.eth.defaultAccount = web3.eth.accounts[0];
			option = {from: web3.eth.accounts[0]}
		} catch (error) {

		}
		web3.eth.sendTransaction({/* ... */});
	}
	// Non-dapp browsers...
	else {
		web3 = new Web3(new Web3.providers.HttpProvider(inforaUrl));
		var account = web3.eth.accounts.create();
		option = {from: account.address};
	}

  InvestAddress = '0xD7ACd2a9FD159E69Bb102A1ca21C9a3e3A5F771B';
  InvestAbi = [{"inputs":[],"name":"invest","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"withdraw_profit","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"investors","outputs":[{"internalType":"uint256","name":"investedAmount","type":"uint256"},{"internalType":"uint256","name":"profit","type":"uint256"},{"internalType":"uint256","name":"profitWithdrawn","type":"uint256"},{"internalType":"uint256","name":"timeStart","type":"uint256"},{"internalType":"uint256","name":"timeEnd","type":"uint256"},{"internalType":"bool","name":"isStarted","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"showcrrentProfit","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
  Investment = new web3.eth.Contract(InvestAbi, InvestAddress);

  document.getElementById('invest').onclick = function() {
    Investment.methods.invest().send(option, function(error, result) {
      if (! error)
        alert(result);
      else
        alert(error);
    });
  }
  document.getElementById('showcrrentProfit').onclick = function() {
    Investment.methods.showcrrentProfit().call(option, function(error, result) {
      if (! error)
        document.getElementById('someth').innerText = result.concat(' : is your totaly profit.');
      else
        alert(error);
    });
  }
  document.getElementById('withdraw_profit').onclick = function() {
    Investment.methods.withdraw_profit().send(option, function(error, result) {
      if (! error)
        alert(result);
      else
        alert(error);
    });
  }
}

