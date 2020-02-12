pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

interface AdminInterface {
    function isAdmin(address _account) view external returns(bool);
}

// Define a contract 'RetailerRole' to manage this role - add, remove, check
contract RetailerRole {
  using Roles for Roles.Role;

  AdminInterface public AdminContract;
  // Define 2 events, one for Adding, and other for Removing
  event RetailerAdded(address indexed _account,string _name, string _company, string _identify, string _lat, string _longt, uint _timeAdd);
  event RetailerRemoved(address indexed _account,uint _timeAdd);
  
  // Define a struct 'retailers' by inheriting from 'Roles' library, struct Role
  Roles.Role private retailers;

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

  // Define a function 'isRetailer' to check this role
  function isRetailer(address _account) public view returns (bool) {
    return retailers.has(_account);
  }

  // Define a function 'addRetailer' that adds this role
  function addRetailer(address _account, string memory _name, string memory _company, string memory _identify, string memory _lati, string memory _longt) public  {
    _addRetailer(_account, _name, _company, _identify, _lati, _longt); 
  }

  // Define a function 'renounceRetailer' to renounce this role
  function renounceRetailer() public {
    _removeRetailer(msg.sender);
  }
    function getRetailer(address _account) public view returns (address, string, string, string, string, string){
       return retailers.get(_account);
    }
  // Define an internal function '_addRetailer' to add this role, called by 'addRetailer'
  function _addRetailer(address _account, string memory _name, string memory _company,string memory _identify, string memory _lati, string memory _longt) internal onlyAdmin {
    retailers.add(_account, _name, _company, _identify, _lati, _longt);
    emit RetailerAdded(_account, _name, _company, _identify, _lati, _longt,now);
  }

  // Define an internal function '_removeRetailer' to remove this role, called by 'removeRetailer'
  function _removeRetailer(address _account) internal onlyAdmin {
    retailers.remove(_account);
    emit RetailerRemoved(_account, now);
  }
}
