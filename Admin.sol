pragma solidity ^0.4.25;


/**
 * @title Admin
 */
 import './Ownable.sol';
 
contract Admins is Ownable{
    mapping (address => bool) admins;

    
  /**
   * @dev give an account access to this role
   */
  function addAdmin(address _account) public onlyOwner {
    require(_account != address(0),"Account not exist");
    require(!has(_account),"Account not register");

    admins[_account] = true;
   
  }

  /**
   * @dev remove an account's access to this role
   */
  function removeAdmin(address account) onlyOwner public {
    require(account != address(0),"Account not exist");
    require(has(account),"Account not register");
    
    admins[account] = false;
  }
    function isAdmin(address account)
    public
    view
    returns (bool)
  {
    
    return has(account);
  }
  /**
   * @dev check if an account has this role
   * @return bool
   */
  function has(address account)
    internal
    view
    returns (bool)
  {
    require(account != address(0),"Account not exist");
    
    return admins[account] == true;
  }
  
  

}
