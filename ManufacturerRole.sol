pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'Manufacturer' to manage this role - add, remove, check
contract Manufacturer {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event LogManufacturerAdded(address indexed account,string name, string company, string identify, string lat, string longt, uint timeAdd);
  event LogManufacturerRemoved(address indexed account,uint timeAdd);

  // Define a struct 'manufacturers' by inheriting from 'Roles' library, struct Role
  Roles.Role private manufacturers;

  // In the constructor make the address that deploys this contract the 1st Manufacturer
  constructor() public {
    // _addManufacturer(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyManufacturer() {
    require(isManufacturer(msg.sender));
    _;
  }

  // Define a function 'isManufacturer' to check this role
  function isManufacturer(address account) public view returns (bool) {
    return manufacturers.has(account);
  }

  // Define a function 'addManufacturer' that adds this role
  function addManufacturer(address account,string memory  name, string memory company,string memory identify, string memory latt, string memory longt) public onlyManufacturer {
    _addManufacturer(account,name, company,identify, latt, longt);
  }

  // Define a function 'renounceManufacturer' to renounce this role
  function renounceManufacturer() public {
    _removeManufacturer(msg.sender);
  }
    function getManufacturer(address _account) public view returns (address, string, string, string, string, string){
       return manufacturers.get(_account);
    }
  // Define an internal function '_addManufacturer' to add this role, called by 'addManufacturer'
  function _addManufacturer(address account,string memory  name, string memory company,string memory identify, string memory lati, string memory longt) internal {
    manufacturers.add(account,name, company,identify, lati, longt);
    emit LogManufacturerAdded(account,name, company,identify, lati, longt,now);
  }

  // Define an internal function '_removeManufacturer' to remove this role, called by 'removeManufacturer'
  function _removeManufacturer(address account) internal {
    manufacturers.remove(account);
    emit LogManufacturerRemoved(account,now);
  }
}
