pragma solidity ^0.4.24;

import "./Roles.sol";

interface AdminInterface {
    function isAdmin(address _account) view external returns(bool);
}

// Define a contract 'ConsumerRole' to manage this role - add, remove, check
contract ConsumerRole {
  using Roles for Roles.Role;

  AdminInterface public AdminContract;
  // Define 2 events, one for Adding, and other for Removing
  event ConsumerAdded(address indexed _account,string _name, string _company, string _identify, string _lat, string _longt, uint _timeAdd);
  event ConsumerRemoved(address indexed account, uint timeRemove);
    
  // Define a struct 'consumers' by inheriting from 'Roles' library, struct Role
  Roles.Role private consumers;

  constructor(address _contract) public {
      AdminContract = AdminInterface(_contract);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyAdmin() {
    require(AdminContract.isAdmin(msg.sender),"Not is admin");
    _;
  }
  
  function joinNetwork(address _contract)
    public
  {
      AdminContract = AdminInterface(_contract);
  }

  // Define a function 'isConsumer' to check this role
  function isConsumer(address _account) public view returns (bool) {
    return consumers.has(_account);
  }

  // Define a function 'addConsumer' that adds this role
  function addConsumer(address _account, string memory _name, string memory _company,string memory _identify, string memory _lati, string memory _longt) public  {
    _addConsumer(_account, _name, _company, _identify, _lati, _longt);
  }

  // Define a function 'renounceConsumer' to renounce this role
  function renounceConsumer() public  {
    _removeConsumer(msg.sender);
  }
    function getConsumer(address _account) public view returns (address, string, string, string,string, string){
       return consumers.get(_account);
    }
  // Define an internal function '_addConsumer' to add this role, called by 'addConsumer'
  function _addConsumer(address _account, string memory _name, string memory _company,string memory _identify, string memory _lati, string memory _longt) internal onlyAdmin {
    consumers.add(_account, _name, _company, _identify, _lati, _longt);
    emit ConsumerAdded(_account, _name, _company, _identify, _lati, _longt, now);
  }

  // Define an internal function '_removeConsumer' to remove this role, called by 'removeConsumer'
  function _removeConsumer(address _account) internal onlyAdmin {
    consumers.remove(_account);
    emit ConsumerRemoved(_account, now);
  }
}
