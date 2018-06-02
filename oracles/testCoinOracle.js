const contract = require('truffle-contract')
const CoinContract = require('../build/contracts/Coin.json')
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
const BN = web3.utils.BN

const coinContract = contract(CoinContract)
coinContract.setProvider(web3.currentProvider)

if (typeof coinContract.currentProvider.sendAsync !== "function") {
    coinContract.currentProvider.sendAsync = function () {
        return coinContract.currentProvider.send.apply(
            coinContract.currentProvider, arguments
        );
    };
}

web3.eth.getAccounts().then(accounts => {
    var minter = accounts[0]
    var receiver = accounts[1]

    web3.eth.defaultAccount = minter;

    const run = async () => {
        const deployedCoinContract = await coinContract.deployed()
        await deployedCoinContract.mint(minter, 10, { from: minter, gas: 470000 })
        const balance = await deployedCoinContract.balances(minter)
        await deployedCoinContract.transferTo(receiver, 5, { from: minter, gas: 470000 })
    }

    run()
})


