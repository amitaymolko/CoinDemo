web3 = new Web3(web3.currentProvider);

var app = angular.module("myApp", []);

app.controller('coinCtrl', function ($scope, $http) {
  $scope.addresses = [
    { name: 'minter', address: '0x65A59579734B8d7c8b88939814566075Dd607242', balance: 0 }, 
    { name: 'receiver', address: '0x6780b8a52AE86D89B5E3c4BebA1986ac4C093D43', balance: 0 },
    { name: 'receiver2', address: '0x528d8dB283c2cc2B66CAbf697DCFd1DF46F5f024', balance: 0 },
  ];
  $scope.mint = {}
  $scope.transferAmounts = {}

  fetch("Coin.json").then((e) => e.json().then(function (text) {
    $scope.CoinJson = text    
    $scope.CoinAbi = web3.eth.contract($scope.CoinJson.abi);
    $scope.Coin = $scope.CoinAbi.at($scope.CoinJson['networks']['5777'].address);
    console.log('$scope.Coin', $scope.Coin)
    $scope.account = web3.eth.accounts[0]
    loadMinter($scope)

    loadBalances($scope)
  }));

  function loadBalances($scope) {
    for (var index = 0; index < $scope.addresses.length; index++) {
      loadBalance(index, $scope)
    }
  }

  function loadBalance(index, $scope) {
    const address = $scope.addresses[index].address
    console.log('address', address) 
    $scope.Coin.balances(address, function (err, value) {
      if (err) {
        console.log('err', err);
      } else {
        $scope.$apply(function () {
          $scope.addresses[index].balance = value.toNumber();
          console.log('$scope.addresses', $scope.addresses)
        });
      }
    })
  }

  function loadMinter($scope) {
    $scope.Coin.minter(function (err, value) {
      if (err) {
        console.log('err', err);
      } else {
        $scope.$apply(function () {
          $scope.minter = value;          
        });
      }
    })
  }

    $scope.mint = function() {
      $scope.Coin.mint($scope.minter, $scope.mint.amount, function() {
        $scope.$apply(function () {
          $scope.mint = {}
        });
      })
    }

    $scope.transfer = function(address) {
      console.log('$scope.transferAmounts', $scope.transferAmounts)
      
      $scope.Coin.transferTo(address, $scope.transferAmounts[address], function() {
        $scope.$apply(function () {
          $scope.transferAmounts[address] = null
        });
      })
    }
});

