pragma solidity ^0.4.24;

// Import the library 'Roles'
import "./Roles.sol";

interface AdminInterface {
    function isAdmin(address _account) view external returns(bool);
}

// Define a contract 'DistributorRole' to manage this role - add, remove, check
contract DistributorRole {
  using Roles for Roles.Role;

  AdminInterface public AdminContract;
  // Define 2 events, one for Adding, and other for Removing
  event LogDistributorAdded(address indexed _account,string _name, string _company, string _identify, string _lat, string _longt, uint _timeAdd);
  event LogDistributorRemoved(address indexed _account, uint _timeAdd);

  // Define a struct 'distributors' by inheriting from 'Roles' library, struct Role
  Roles.Role private distributors;

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

  // Define a function 'isDistributor' to check this role
  function isDistributor(address _account) public view returns (bool) {
    return distributors.has(_account);
  }

  // Define a function 'addDistributor' that adds this role
  function addDistributor(address _account, string memory _name, string memory _company,string memory _identify, string memory _lati, string memory _longt) public  {
    _addDistributor(_account, _name, _company, _identify, _lati, _longt);
  }

  // Define a function 'renounceDistributor' to renounce this role
  function renounceDistributor() public  {
    _removeDistributor(msg.sender);
  }
    function getDistributor(address _account) public view returns (address, string, string, string,string, string){
       return distributors.get(_account);
    }
  // Define an internal function '_addDistributor' to add this role, called by 'addDistributor'
  function _addDistributor(address _account, string memory _name, string memory _company,string memory _identify, string memory _lati, string memory _longt) internal onlyAdmin {
    distributors.add(_account, _name, _company, _identify, _lati, _longt);
    emit LogDistributorAdded(_account, _name, _company, _identify, _lati, _longt,now);
  }

  // Define an internal function '_removeDistributor' to remove this role, called by 'removeDistributor'
  function _removeDistributor(address _account) internal onlyAdmin {
    distributors.remove(_account);
    emit LogDistributorRemoved(_account, now);
  }
}
