pragma solidity ^0.4.24;

import "./Roles.sol";

// Define a contract 'ConsumerRole' to manage this role - add, remove, check
contract ConsumerRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event ConsumerAdded(address indexed account,string name, string company, string identify, string lat, string longt, uint timeAdd);
  event ConsumerRemoved(address indexed account, uint timeRemove);
    
  // Define a struct 'consumers' by inheriting from 'Roles' library, struct Role
  Roles.Role private consumers;

  // In the constructor make the address that deploys this contract the 1st consumer
  constructor() public {
      
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyConsumer() {
    require(isConsumer(msg.sender));
    _;
  }

  // Define a function 'isConsumer' to check this role
  function isConsumer(address account) public view returns (bool) {
    return consumers.has(account);
  }

  // Define a function 'addConsumer' that adds this role
  function addConsumer(address account,string memory  name, string memory company,string memory identify, string memory latt, string memory longt) public onlyConsumer {
    _addConsumer(account, name, company,identify, latt, longt);
  }

  // Define a function 'renounceConsumer' to renounce this role
  function renounceConsumer() public {
    _removeConsumer(msg.sender);
  }
    function getConsumer(address _account) public view returns (address, string, string, string,string, string){
       return consumers.get(_account);
    }
  // Define an internal function '_addConsumer' to add this role, called by 'addConsumer'
  function _addConsumer(address account, string memory  name, string memory company,string memory identify, string memory lati, string memory longt) internal {
    consumers.add(account,name, company,identify, lati, longt);
    emit ConsumerAdded(account,name, company,identify, lati, longt,now);
  }

  // Define an internal function '_removeConsumer' to remove this role, called by 'removeConsumer'
  function _removeConsumer(address account) internal {
    consumers.remove(account);
    emit ConsumerRemoved(account, now);
  }
}
