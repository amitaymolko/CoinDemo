const Coin = artifacts.require('Coin')

contract('Coin', (accounts) => {
  
  var minter = accounts[0]
  var receiver = accounts[1]

  it('deploy and grab', async () => {
    // Contract = await Coin.new()
    Contract = await Coin.deployed()
    // console.log('Contract', Contract.address)
  })

  it('fails to mint when not minter', async () => {
    try {
      const tx = await Contract.mint(receiver, 10, { from: receiver, gas: 470000 })
      console.log('tx', tx)
      throw new Error('unauthorized tx')
    } catch (err) {
      if (!err.message.endsWith('revert')) {
        throw err
      }
      return
    }
  })

  it('mints 10 coins', async () => {
    const initialBalance = await Contract.balances(minter)

    await Contract.mint(minter, 10, { from: minter, gas: 470000 })

    const finalBalance = await Contract.balances(minter)

    assert.isTrue(finalBalance.toNumber() == initialBalance.toNumber() + 10)
  })

  it('fails to send more than balance', async () => {
    try {
      const initialMinterBalance = await Contract.balances(minter)
      const tx = await Contract.transferTo(receiver, initialMinterBalance + 5, { from: minter, gas: 470000 })
      console.log('tx', tx)
      throw new Error('unauthorized tx')
    } catch (err) {
      if (!err.message.endsWith('revert')) {
        throw err
      }
      return
    }
  })

  it('sends 5 coins', async () => {
    const initialMinterBalance = await Contract.balances(minter)
    const initialReceiverBalance = await Contract.balances(receiver)

    await Contract.transferTo(receiver, 5, { from: minter, gas: 470000 })

    const finalMinterBalance = await Contract.balances(minter)
    const finalReceiverBalance = await Contract.balances(receiver)

    assert.isTrue(finalMinterBalance.toNumber() == initialMinterBalance.toNumber() - 5)
    assert.isTrue(finalReceiverBalance.toNumber() == initialReceiverBalance.toNumber() + 5)
  })
  
})
