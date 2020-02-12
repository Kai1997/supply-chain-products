pragma solidity ^0.4.25;


/**
 * @title Admin
 */

interface OwnableInterface {
    function isOwner() external view returns (bool);
}

contract Admins {
    mapping (address => bool) admins;
    
    OwnableInterface public OwnableContract;
    
    constructor(address _contract) public {
      OwnableContract = OwnableInterface(_contract);
    }
    
    modifier roleOwner() {
        require(OwnableContract.isOwner(),"Account not is owner");
        _;
    }
    
    modifier validateAccount(address _account) {
        require(_account != address(0),"Account not exist");
        require(!has(_account),"Account not register");
        _;
    }
  /**
   * @dev give an account access to this role
   */
    function joinNetwork(address _contract)
        public
    {
        OwnableContract = OwnableInterface(_contract);
    
    }
  function addAdmin(address _account) public roleOwner validateAccount(_account) {
    admins[_account] = true;
  }

  /**
   * @dev remove an account's access to this role
   */
  function removeAdmin(address _account) roleOwner validateAccount(_account) public {
    admins[_account] = false;
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
