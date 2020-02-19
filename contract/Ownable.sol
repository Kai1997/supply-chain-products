pragma solidity ^0.4.24;
// 0x3B9b4873a7A3905226eB49443Ca1530d02702860

/*==========================================
 =             Contract Ownable            =
 =   Provides basic authorization control  =
 ==========================================*/
contract Ownable {
    address private origOwner;
    bool private statusApp;
    // Define an Event
    event LogSetOwner(address indexed _oldOwner, address indexed _newOwner);

    /// Assign the contract to an owner
    constructor () public {
        statusApp = true;
        origOwner = msg.sender;
        emit LogSetOwner(address(0), origOwner);
    }

    /// Look up the address of the owner
    function owner() public view returns (address) {
        return origOwner;
    }

    ///function get status dapp
    function getStatus() public view returns(bool) {
        return statusApp;
    }

    ///function change status dapp : active or deactive
    function changeStatusDapp() public onlyOwner  {
        statusApp = !statusApp;
    }
    
    /// Define a function modifier 'onlyOwner'
    modifier onlyOwner() {
        require(isOwner(),"Only owner");
        _;
    }

    /// Define a function modifier 'onlyActive'
    modifier onlyActive() {
        require(statusApp,"Dapp not active");
        _;
    }
    
    /// Check if the calling address is the owner of the contract
    function isOwner() public view returns (bool) {
        return msg.sender == origOwner;
    }

    /// Define a function to renounce ownerhip
    // function renounceOwnership() public onlyOwner onlyActive {
    //     emit LogSetOwner(origOwner, address(0));
    //     origOwner = address(0);
    // }

    /// Define a public function to transfer ownership
    function transferOwnership(address _newOwner) public onlyOwner onlyActive {
        _transferOwnership(_newOwner);
    }

    /// Define an internal function to transfer ownership
    function _transferOwnership(address _newOwner) internal {
        require(_newOwner != address(0),"Address not exist");
        emit LogSetOwner(origOwner, _newOwner);
        origOwner = _newOwner;
    }
}

