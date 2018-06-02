const contract = require('truffle-contract')
const CoinContract = require('../build/contracts/Coin.json')
const Web3 = require('web3')
let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
const BN = web3.utils.BN

const coinContract = contract(CoinContract)
coinContract.setProvider(web3.currentProvider)

if (typeof coinContract.currentProvider.sendAsync !== "function") { // web3 currentProvider bug fix
    coinContract.currentProvider.sendAsync = function () {
        return coinContract.currentProvider.send.apply(
            coinContract.currentProvider, arguments
        );
    };
}

web3.eth.getAccounts().then(accounts => {
    const run = async () => {
        const deployedCoinContract = await coinContract.deployed()

        var event = deployedCoinContract.Sent();
        event.watch(async (err, result) => {
            if (err) {
                console.log('err', err);
                return;
            } else {
                console.log("Coin transfer: " + result.args.amount +
                    " coins were sent from " + result.args.from +
                    " to " + result.args.to + ".");
                console.log("Balances now:\n" +
                    "Sender: " + (await deployedCoinContract.balances(result.args.from)).toNumber(),
                    "Receiver: " + (await deployedCoinContract.balances(result.args.to)).toNumber());
            }
        })
    }

    run()
})


