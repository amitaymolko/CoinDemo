import React, { Component } from 'react'
import { AccountData, ContractData, ContractForm } from 'drizzle-react-components'
import logo from '../../logo.png'

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      address: null,
      addresses: []
    }
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.addAddress = this.addAddress.bind(this);
  }

  handleAddressChange(event) {
    this.setState({ address: event.target.value });
  }

  addAddress() {
    const addresses = this.state.addresses;
    addresses.push(this.state.address);
    this.setState({ addresses, address: null });
  }

  render() {
    const addresses = this.state.addresses;
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            {/* <img src={logo} alt="drizzle-logo" /> */}
            <h1>Coin Demo</h1>
            {/* <p>Examples of how to get started with Drizzle in various situations.</p> */}
          </div>
        
          <div className="pure-u-1-1">
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="3" />
          </div>

          <div className="pure-u-1-1">
            <h2>Contract</h2>
            {/* <p>Here we have a form with custom, friendly labels. Also note the token symbol will not display a loading indicator. We've suppressed it with the <code>hideIndicator</code> prop because we know this variable is constant.</p> */}
            <p><strong>Total Supply</strong>: <ContractData contract="Coin" method="totalSupply" methodArgs={[{from: this.props.accounts[0]}]} /></p>
            <p><strong>My Balance</strong>: <ContractData contract="Coin" method="balances" methodArgs={[this.props.accounts[0]]} /></p>
            
            <h3>Mint</h3>
            <ContractForm contract="Coin" method="mint" labels={['To Address', 'Amount to Mint']} />

            <h3>Send Tokens</h3>
            <ContractForm contract="Coin" method="transferTo" labels={['To Address', 'Amount to Send']} />
            
            <h3>Check Balance</h3>
            <form className="pure-form pure-form-stacked">
              <p><input type="text" name="address" placeholder="Address" onChange={this.handleAddressChange} /></p>
              <button type="button" className="pure-button" onClick={this.addAddress}>Add Address</button>
            </form>
            <br /><br />

            <p><strong>Balances:</strong></p>
            {
              addresses.map((address) =>
              {
                return (
                  <p key={address}>{address}: <ContractData contract="Coin" method="balances" methodArgs={[address ? address : 0x00]} /></p>
                )
              })
            }
           
            <br/><br/>
          </div>
          
        </div>
      </main>
    )
  }
}

export default Home
