pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

interface AdminInterface {
    function isAdmin(address _account) view external returns(bool);
}

// Define a contract 'Manufacturer' to manage this role - add, remove, check
contract Manufacturer {
  using Roles for Roles.Role;
  AdminInterface public AdminContract;
  
  // Define 2 events, one for Adding, and other for Removing
  event LogManufacturerAdded(address indexed _account, string _name, string _company, string _identify, string _lat, string _longt, uint _timeAdd);
  event LogManufacturerRemoved(address indexed _account, uint _timeAdd);

  // Define a struct 'manufacturers' by inheriting from 'Roles' library, struct Role
  Roles.Role private manufacturers;

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

  // Define a function 'isManufacturer' to check this role
  function isManufacturer(address _account) public view returns (bool) {
    return manufacturers.has(_account);
  }

  // Define a function 'addManufacturer' that adds this role
  function addManufacturer(address _account, string memory  _name, string memory _company, string memory _identify, string memory _lati, string memory _longt) public  {
    _addManufacturer(_account, _name, _company, _identify, _lati, _longt);
  }

  // Define a function 'renounceManufacturer' to renounce this role
  function renounceManufacturer() public {
    _removeManufacturer(msg.sender);
  }
    function getManufacturer(address _account) public view returns (address, string, string, string, string, string){
       return manufacturers.get(_account);
    }
  // Define an internal function '_addManufacturer' to add this role, called by 'addManufacturer'
  function _addManufacturer(address _account, string memory _name, string memory _company,string memory _identify, string memory _lati, string memory _longt) internal onlyAdmin {
    manufacturers.add(_account, _name, _company, _identify, _lati, _longt);
    emit LogManufacturerAdded(_account, _name, _company, _identify, _lati, _longt, now);
  }

  // Define an internal function '_removeManufacturer' to remove this role, called by 'removeManufacturer'
  function _removeManufacturer(address _account) internal onlyAdmin{
    manufacturers.remove(_account);
    emit LogManufacturerRemoved(_account,now);
  }
}
