pragma solidity ^0.4.25;
//admin: 0x82B1AD4F680F94caF01774F8bB7EEE6A3f7e1B0F

/*==========================================
 =          Interface Ownable              =
 ==========================================*/
interface OwnableInterface {
  function owner() external view returns (address);
  function getStatus() external view returns(bool);
}

/*==========================================
 =             Contract Admins             =
 ==========================================*/
contract Admins {
    mapping (address => bool) admins;
    
    OwnableInterface public OwnableContract;
    /*----------  START EVENT  ----------*/ 
    // Define 2 events, one for Adding, and other for Removing
    event LogAdminAdded(address indexed _account, uint _timeAdd);
    event LogAdminRemoved(address indexed _account, uint _remove);
    /*----------  END EVENT  ----------*/ 
    constructor(address _contract) public {
      OwnableContract = OwnableInterface(_contract);
    }
    
    modifier roleOwner() {
        require(OwnableContract.owner() == msg.sender,"Account not is owner");
        _;
    }
    
    modifier onlyActive() {
        require(OwnableContract.getStatus(),"Dapp not active");
        _;
    }
    
    modifier validateAccount(address _account) {
        require(_account != address(0),"Account not exist");
        _;
    }
    
    function getOwner() public view returns (address) {
        return OwnableContract.owner();
    }
    
    function getStatus() public view returns (bool) {
        return OwnableContract.getStatus();
    }
    /**
    * @dev give an account access to this role
    */
    function joinNetwork(address _contract)
        public
        onlyActive
    {
        OwnableContract = OwnableInterface(_contract);
    
    } 
    function addAdmin(address _account) public roleOwner validateAccount(_account) onlyActive {
      require(!has(_account),"Account registered");
      admins[_account] = true;
      emit LogAdminAdded(msg.sender, now);
    }
  
  function addListAdmin(address[] _account) public roleOwner onlyActive {
    require(_account.length > 0,"Array must be more than 1"); 
    for (uint i=0; i<_account.length; i++) {
            require(!has(_account[i]),"Account registered");
            require(_account[i] != address(0),"Account not exist");
            admins[_account[i]] = true;
            emit LogAdminAdded(_account[i], now);
        }
    
    
  }
  /**
   * @dev remove an account's access to this role
   */
  function removeAdmin(address _account) roleOwner validateAccount(_account) onlyActive public {
    require(has(_account),"Account not register");
    admins[_account] = false;
    emit LogAdminRemoved(msg.sender, now);
  }
  
  function isAdmin(address _account)
    public
    view
    returns (bool)
  {
    
    return has(_account);
  }
  /**
   * @dev check if an account has this role
   * @return bool
   */
   
  function has(address _account)
    internal
    view
    returns (bool)
  {
    require(_account != address(0),"Account not exist");
    
    return admins[_account] == true;
  }
  
  

}
