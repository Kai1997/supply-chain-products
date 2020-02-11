pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'ThirdPL' to manage this role - add, remove, check
contract ThirdPLRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event LogThirdPLAdded(address indexed account,uint timeAdd);
  event LogThirdPLRemoved(address indexed account,uint timeAdd);

  // Define a struct 'thirdPLs' by inheriting from 'Roles' library, struct Role
  Roles.Role private thirdPLs;

  // In the constructor make the address that deploys this contract the 1st ThirdPL
  constructor() public {
    // _addThirdPL(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyThirdPL() {
    require(isThirdPL(msg.sender));
    _;
  }

  // Define a function 'isThirdPL' to check this role
  function isThirdPL(address account) public view returns (bool) {
    return thirdPLs.has(account);
  }

  // Define a function 'addThirdPL' that adds this role
  function addThirdPL(address account,string memory  name, string memory company, string memory latt, string memory longt) public onlyThirdPL {
    _addThirdPL(account,name, company, latt, longt);
  }

  // Define a function 'renounceThirdPL' to renounce this role
  function renounceThirdPL() public {
    _removeThirdPL(msg.sender);
  }
    function getThirdPL(address _account) public view returns (address, string, string, string, string){
       return thirdPLs.get(_account);
    }
  // Define an internal function '_addThirdPL' to add this role, called by 'addThirdPL'
  function _addThirdPL(address account,string memory  name, string memory company, string memory latt, string memory longt) internal {
    thirdPLs.add(account,name, company, latt, longt);
    emit LogThirdPLAdded(account,now);
  }

  // Define an internal function '_removeThirdPL' to remove this role, called by 'removeThirdPL'
  function _removeThirdPL(address account) internal {
    thirdPLs.remove(account);
    emit LogThirdPLRemoved(account,now);
  }
}
