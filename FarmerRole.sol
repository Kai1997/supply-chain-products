pragma solidity ^0.4.24;

// farmer được admin chấp nhận thì mới thêm vào hệ thống 

import "./Roles.sol";

interface AdminInterface {
    function isAdmin(address _account) view external returns(bool);
}

// Define a contract 'FarmerRole' to manage this role - add, remove, check
contract FarmerRole {
  using Roles for Roles.Role;
  AdminInterface public AdminContract;
  
  // Define 2 events, one for Adding, and other for Removing
  event LogFarmerAdded(address indexed _account,string _name, string _company, string _identify, string _lat, string _longt, uint _timeAdd);
  event LogFarmerRemoved(address indexed _account,uint _timeAdd);

  // Define a struct 'farmers' by inheriting from 'Roles' library, struct Role
  Roles.Role private farmers;

  // In the constructor make the address that deploys this contract the 1st farmer
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
  
  // Define a function 'isFarmer' to check this role
  function isFarmer(address _account) public view returns (bool) {
    return farmers.has(_account);
  }

  // Define a function 'addFarmer' that adds this role
  function addFarmer(address _account, string memory  _name, string memory _company, string memory _identify, string memory _lati, string memory _longt) public  {
    _addFarmer(_account, _name, _company, _identify, _lati, _longt);
  }

  // Define a function 'renounceFarmer' to renounce this role
  function renounceFarmer(address _account) public {
    _removeFarmer(_account);
  }
  
  function getFammer(address _account) public view returns (address, string, string, string, string, string){
     return farmers.get(_account);
  }
    
  // Define an internal function '_addFarmer' to add this role, called by 'addFarmer'
  function _addFarmer(address _account, string memory  _name, string memory _company, string memory _identify, string memory _lati, string memory _longt) internal onlyAdmin {
    farmers.add(_account, _name, _company, _identify, _lati, _longt);
    emit LogFarmerAdded(_account, _name, _company, _identify, _lati, _longt, now);
  }

  // Define an internal function '_removeFarmer' to remove this role, called by 'removeFarmer'
  function _removeFarmer(address _account) internal onlyAdmin {
    farmers.remove(_account);
    emit LogFarmerRemoved(_account, now);
  }
  
}
