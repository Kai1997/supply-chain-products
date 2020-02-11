pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'RetailerRole' to manage this role - add, remove, check
contract RetailerRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event RetailerAdded(address indexed account,string name, string company, string identify, string lat, string longt, uint timeAdd);
  event RetailerRemoved(address indexed account,uint timeAdd);
  
  // Define a struct 'retailers' by inheriting from 'Roles' library, struct Role
  Roles.Role private retailers;

  // In the constructor make the address that deploys this contract the 1st retailer
  constructor() public {
    // _addRetailer(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyRetailer() {
    require(isRetailer(msg.sender),"Only retailer");
    _;
  }

  // Define a function 'isRetailer' to check this role
  function isRetailer(address account) public view returns (bool) {
    return retailers.has(account);
  }

  // Define a function 'addRetailer' that adds this role
  function addRetailer(address account,string memory  name, string memory company,string memory identify, string memory latt, string memory longt) public  {
    _addRetailer(account,name, company,identify, latt, longt); 
  }

  // Define a function 'renounceRetailer' to renounce this role
  function renounceRetailer() public onlyRetailer {
    _removeRetailer(msg.sender);
  }
    function getRetailer(address _account) public view returns (address, string, string,string, string, string){
       return retailers.get(_account);
    }
  // Define an internal function '_addRetailer' to add this role, called by 'addRetailer'
  function _addRetailer(address account,string memory  name, string memory company,string memory identify, string memory lati, string memory longt) internal {
    retailers.add(account,name, company, identify, lati, longt);
    emit RetailerAdded(account,name, company,identify, lati, longt,now);
  }

  // Define an internal function '_removeRetailer' to remove this role, called by 'removeRetailer'
  function _removeRetailer(address account) internal {
    retailers.remove(account);
    emit RetailerRemoved(account,now);
  }
}
