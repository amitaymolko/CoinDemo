pragma solidity ^0.4.23;

contract Coin {
    // The keyword "public" makes those variables
    // readable from outside.
    address public minter;
    mapping (address => uint) public balances;

    // Events allow light clients to react on
    // changes efficiently.
    event Sent(address from, address to, uint amount);

    modifier onlyMinter() {
        require(msg.sender == minter);
        _;
    }

    modifier validBalance(uint amount) {
        require(balances[msg.sender] >= amount);
        _;
    }

    // This is the constructor whose code is
    // run only when the contract is created.
    constructor () public {
        minter = msg.sender;
    }

    function mint(address receiver, uint amount) 
    onlyMinter
    public 
    {
        balances[receiver] += amount;
    }

    function transferTo(address receiver, uint amount) 
    validBalance(amount)
    public 
    {
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}