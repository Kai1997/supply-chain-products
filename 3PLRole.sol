pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

interface AdminInterface {
    function isAdmin(address _account) view external returns(bool);
}

// Define a contract 'ThirdPL' to manage this role - add, remove, check
contract ThirdPLRole {
  using Roles for Roles.Role;

  AdminInterface public AdminContract;
  // Define 2 events, one for Adding, and other for Removing
  event LogThirdPLAdded(address indexed _account,string _name, string _company, string _identify, string _lat, string _longt, uint _timeAdd);
  event LogThirdPLRemoved(address indexed account,uint timeAdd);

  // Define a struct 'thirdPLs' by inheriting from 'Roles' library, struct Role
  Roles.Role private thirdPLs;

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

  // Define a function 'isThirdPL' to check this role
  function isThirdPL(address _account) public view returns (bool) {
    return thirdPLs.has(_account);
  }

  // Define a function 'addThirdPL' that adds this role
  function addThirdPL(address _account, string memory _name, string memory _company,string memory _identify, string memory _lati, string memory _longt) public  {
    _addThirdPL(_account, _name, _company, _identify, _lati, _longt);
  }

  // Define a function 'renounceThirdPL' to renounce this role
  function renounceThirdPL() public {
    _removeThirdPL(msg.sender);
  }
    function getThirdPL(address _account) public view returns (address, string, string, string,string, string){
       return thirdPLs.get(_account);
    }
  // Define an internal function '_addThirdPL' to add this role, called by 'addThirdPL'
  function _addThirdPL(address _account, string memory _name, string memory _company,string memory _identify, string memory _lati, string memory _longt) internal onlyAdmin {
    thirdPLs.add(_account, _name, _company, _identify, _lati, _longt);
    emit LogThirdPLAdded(_account, _name, _company, _identify, _lati, _longt,now);
  }

  // Define an internal function '_removeThirdPL' to remove this role, called by 'removeThirdPL'
  function _removeThirdPL(address _account) internal onlyAdmin {
    thirdPLs.remove(_account);
    emit LogThirdPLRemoved(_account, now);
  }
}
