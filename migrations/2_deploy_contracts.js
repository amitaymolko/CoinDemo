
var Coin = artifacts.require("./Coin.sol");


module.exports = async (deployer, network, accounts) => {
  const minter = accounts[0]
  deployer.deploy(Coin, {from: minter})
};
