pragma solidity ^0.4.24;

// Provides basic authorization control
contract Ownable {
    address private origOwner;

    // Define an Event
    event LogSetOwner(address indexed _oldOwner, address indexed _newOwner);

    /// Assign the contract to an owner
    constructor () internal {
        origOwner = msg.sender;
        emit LogSetOwner(address(0), origOwner);
    }

    /// Look up the address of the owner
    function owner() public view returns (address) {
        return origOwner;
    }

    /// Define a function modifier 'onlyOwner'
    modifier onlyOwner() {
        require(isOwner(),"Only owner");
        _;
    }

    /// Check if the calling address is the owner of the contract
    function isOwner() public view returns (bool) {
        return msg.sender == origOwner;
    }

    /// Define a function to renounce ownerhip
    function renounceOwnership() public onlyOwner {
        emit LogSetOwner(origOwner, address(0));
        origOwner = address(0);
    }

    /// Define a public function to transfer ownership
    function transferOwnership(address _newOwner) public onlyOwner {
        _transferOwnership(_newOwner);
    }

    /// Define an internal function to transfer ownership
    function _transferOwnership(address _newOwner) internal {
        require(_newOwner != address(0),"Address not exist");
        emit LogSetOwner(origOwner, _newOwner);
        origOwner = _newOwner;
    }
}

