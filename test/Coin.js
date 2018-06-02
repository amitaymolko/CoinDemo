const Coin = artifacts.require('Coin')

contract('Coin', (accounts) => {
  
  var minter = accounts[0]
  var receiver = accounts[1]

  it('deploy and grab', async () => {
    // Contract = await Coin.new()
    Contract = await Coin.deployed()
    // console.log('Contract', Contract.address)
  })


  it('mints 10 coins', async () => {
    const initialBalance = await Contract.balances(minter)

    await Contract.mint(minter, 10, { from: minter, gas: 470000 })

    const finalBalance = await Contract.balances(minter)

    assert.isTrue(finalBalance.toNumber() == initialBalance.toNumber() + 10)
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

  // it('fails to submit hashcrack with invalid hashtype', async () => {
  //   try {
  //     const value = web3.toWei(0.1, 'ether')
  //     const tx = await Contract.requestHashCrack(0x19513FDC9DA4FB72A4A05EB66917548D3C90FF94D5419E1F2363EEA89DFEE1DD, "invalid_hash_type", "", { value })
  //     console.log('tx', tx)
  //     throw new Error('unauthorized tx')
  //   } catch (err) {
  //     if (!err.message.endsWith('revert')) {
  //       throw err
  //     }
  //     return
  //   }
  // })

  // it('fails to submit hashcrack with invalid amount', async () => {
  //   try {
  //     const value = web3.toWei(0.0001, 'ether')
  //     const tx = await Contract.requestHashCrack(0x19513FDC9DA4FB72A4A05EB66917548D3C90FF94D5419E1F2363EEA89DFEE1DD, "sha256", "", { value })
  //     console.log('tx', tx)
  //     throw new Error('unauthorized tx')
  //   } catch (err) {
  //     if (!err.message.endsWith('revert')) {
  //       throw err
  //     }
  //     return
  //   }
  // })

  // it('fires NewHashEvent', (done) => {
  //   const value = web3.toWei(0.1, 'ether')
  //   var event = Contract.NewHashEvent()
  //   event.watch(function (err, result) {
  //     if (err) {
  //       console.log(err)
  //       return
  //     }      
      
  //     assert.isTrue(result.args.requestorAddress == account)
  //     assert.isTrue(result.args.bountyValue.toString() == value)
  //     assert.isTrue(result.args.hashBytes == "0x19513fdc9da4fb72a4a05eb66917548d3c90ff94d5419e1f2363eea89dfee1dd")
  //     assert.isTrue(result.args.hashType == "sha256")

  //     event.stopWatching()
  //     done()
  //   })
  //   Contract.requestHashCrack("0x19513FDC9DA4FB72A4A05EB66917548D3C90FF94D5419E1F2363EEA89DFEE1DD", "sha256", "", { value }) //Password1
  // })

  // it('fails to submit crack with wrong password', async () => {
  //   try {
  //     const value = web3.toWei(0.1, 'ether')
  //     const tx = await Contract.submitCrack(0, "wrong_password", { value })
  //     console.log('tx', tx)
  //     throw new Error('unauthorized tx')
  //   } catch (err) {
  //     if (!err.message.endsWith('revert')) {
  //       throw err
  //     }
  //     return
  //   }
  // })

  // it('fails to cancel crack with wrong account', async () => {
  //   try {
  //     const tx = await Contract.cancelHashCrack(0, {from: account2})
  //     console.log('tx', tx)
  //     throw new Error('unauthorized tx')
  //   } catch (err) {
  //     if (!err.message.endsWith('revert')) {
  //       throw err
  //     }
  //     return
  //   }
  // })

  // it('fires CrackedHashEvent', (done) => {
  //   const value = web3.toWei(0.1, 'ether')
  //   var event = Contract.CrackedHashEvent()
  //   event.watch(function (err, result) {
  //     if (err) {
  //       console.log(err)
  //       return
  //     }

  //     assert.isTrue(result.args.crackerAddress == account2)
    
  //     event.stopWatching()
  //     done()
  //   })
  //   Contract.submitCrack(0, "Password1", { from: account2, value })
  // })

  // it('redeem reward', async () => {
  //   const initialHashCrack = (await Contract.hashCracks(0))
  //   assert.isFalse(initialHashCrack[7])
  //   await Contract.redeemRewardUnsafe(0, { from: account2 })
  //   const finalHashCrack = (await Contract.hashCracks(0))
  //   assert.isTrue(finalHashCrack[7])
  // })

  // it('fails to redeem redeemed hash', async () => {
  //   const initialHashCrack = (await Contract.hashCracks(0))
  //   assert.isTrue(initialHashCrack[7])
  //   try {
  //     const tx = await Contract.redeemCrackAttemptUnsafe(0, { from: account2 })
  //     console.log('tx', tx)
  //     throw new Error('unauthorized tx')
  //   } catch (err) {
  //     if (!err.message.endsWith('revert')) {
  //       throw err
  //     }
  //     return
  //   }
  // })

  // it('fails to submit crack on already cracked hash', async () => {
  //   const length = (await Contract.getHashCracksLength()).toNumber()
  //   const hashCrack = (await Contract.hashCracks(0))
  //   // console.log('length', length)
  //   // console.log('hashCrack', hashCrack)

  //   try {
  //     const value = web3.toWei(0.1, 'ether')
  //     const tx = await Contract.submitCrack(0, "Password1", { from: account2, value })
  //     console.log('tx', tx)
  //     throw new Error('unauthorized tx')
  //   } catch (err) {
  //     if (!err.message.endsWith('revert')) {
  //       throw err
  //     }
  //     return
  //   }
  // })

  // it('submits and cancels crack with password', async() => { 
  //   const value = web3.toWei(0.1, 'ether')
  //   await Contract.requestHashCrack("0x19513FDC9DA4FB72A4A05EB66917548D3C90FF94D5419E1F2363EEA89DFEE1DD", "sha256", "", { value }) //Password1
  //   await Contract.cancelHashCrack(1)
  //   const hashCrack = (await Contract.hashCracks(1))    
  //   assert.isTrue(hashCrack[6])
  // })

  // it('submits scrypt hash', async () => {
  //   const value = web3.toWei(0.1, 'ether')
  //   const hash = web3.sha3(inputBytes, { encoding: "hex" })
  //   await Contract.requestHashCrack(hash, "scrypt", inputBytes, { value })
  //   // const hashCrack = (await Contract.hashCracks(1))
  //   const scryptHashParam = await Contract.getScrypt(hash)

  //   assert.isTrue(scryptHashParam[0] == "0x19af5e7a09875927cdec8900a5b4ce1e428b6746836586ea6838d1cf5a027115")
  //   assert.isTrue(scryptHashParam[1].toNumber() == 32)
  //   assert.isTrue(scryptHashParam[2] == "0x52d7e775c9b3a5d8ebf40e2be3be234707816a758b6eec1ba28c54a4b6cf63de")
  //   assert.isTrue(scryptHashParam[3].toNumber() == 8192)
  //   assert.isTrue(scryptHashParam[4].toNumber() == 8)
  //   assert.isTrue(scryptHashParam[5].toNumber() == 1)
  //   assert.isTrue(scryptHashParam[6] == "0x0994fb7a49c0f5f4b2c365e168f27701366acb3c326c11366b027eb96119140b")
  // })

  // it('submits scrypt hash', async () => {
  //   const value = web3.toWei(0.1, 'ether')
  //   const length = (await Contract.getHashCracksLength()).toNumber()
  //   await Contract.submitCrack(length - 1, "1234567890", { value, from: account2 })
  // })

  // it('fails to submit crack on already requested password', async () => {
  //   const value = web3.toWei(0.1, 'ether')
  //   const length = (await Contract.getHashCracksLength()).toNumber()

  //   try {
  //     const tx = await Contract.submitCrack(length - 1, "1234567890", { value, from: oracle })
  //     console.log('tx', tx)
  //     throw new Error('unauthorized tx')
  //   } catch (err) {
  //     if (!err.message.endsWith('revert')) {
  //       throw err
  //     }
  //     return
  //   }
  // })
  
})
