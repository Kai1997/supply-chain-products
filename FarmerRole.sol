pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'FarmerRole' to manage this role - add, remove, check
contract FarmerRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event LogFarmerAdded(address indexed account,uint timeAdd);
  event LogFarmerRemoved(address indexed account,uint timeAdd);

  // Define a struct 'farmers' by inheriting from 'Roles' library, struct Role
  Roles.Role private farmers;

  // In the constructor make the address that deploys this contract the 1st farmer
  constructor() public {
    // _addFarmer(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyFarmer() {
    require(isFarmer(msg.sender));
    _;
  }

  // Define a function 'isFarmer' to check this role
  function isFarmer(address account) public view returns (bool) {
    return farmers.has(account);
  }

  // Define a function 'addFarmer' that adds this role
  function addFarmer(address account,string memory  name, string memory company, string memory latt, string memory longt) public  {
    _addFarmer(account,name, company, latt, longt);
  }

  // Define a function 'renounceFarmer' to renounce this role
  function renounceFarmer() public onlyFarmer{
    _removeFarmer(msg.sender);
  }
    function getFammer(address _account) public view returns (address, string, string, string, string){
       return farmers.get(_account);
    }
  // Define an internal function '_addFarmer' to add this role, called by 'addFarmer'
  function _addFarmer(address account,string memory  name, string memory company, string memory latt, string memory longt) internal {
    farmers.add(account,name, company, latt, longt);
    emit LogFarmerAdded(account,now);
  }

  // Define an internal function '_removeFarmer' to remove this role, called by 'removeFarmer'
  function _removeFarmer(address account) internal {
    farmers.remove(account);
    emit LogFarmerRemoved(account,now);
  }
  
}
