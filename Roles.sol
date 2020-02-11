pragma solidity ^0.4.25;

/**
 * @title Roles
 * @dev Library for managing addresses assigned to a Role.
 */
library Roles {
    struct Role {
        mapping (address => User) bearer;
    }
    struct User {
        address account;
        bool status;
        string name;
        string company;
        string latt;
        string longt;
    }
    
  /**
   * @dev give an account access to this role
   */
  function add(Role storage role, address account, string memory  name, string memory company, string memory latt, string memory longt) internal {
    require(account != address(0),"Account not exist");
    require(!has(role, account),"Account not register");

    role.bearer[account] = User({
        account: account,
        status: true,
        name : name,
        company : company,
        latt : latt,
        longt : longt
    });
   
  }

  /**
   * @dev remove an account's access to this role
   */
  function remove(Role storage role, address account) internal {
    require(account != address(0),"Account not exist");
    require(has(role, account),"Account not register");
    
    role.bearer[account].status = false;
  }

  /**
   * @dev check if an account has this role
   * @return bool
   */
  function has(Role storage role, address account)
    internal
    view
    returns (bool)
  {
    require(account != address(0),"Account not exist");
    
    return role.bearer[account].status == true;
  }
    /**
    * @dev get infomation user
    */
    function get(
        Role storage role, 
        address _account
    ) 
    internal 
    view 
    returns (
      address, 
      string, 
      string, 
      string, 
      string
      )
    {
    require(_account != address(0),"Account not exist");
    require(has(role, _account),"Account not register");
    
    return (
        role.bearer[_account].account,
        role.bearer[_account].name, 
        role.bearer[_account].company, 
        role.bearer[_account].latt, 
        role.bearer[_account].longt
        );
  }

}
