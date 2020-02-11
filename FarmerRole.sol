pragma solidity ^0.4.24;

// farmer được admin chấp nhận thì mới thêm vào hệ thống 

import "./Roles.sol";

interface AdminInterface {
    function isAdmin(address account) view external returns(bool);
}

// Define a contract 'FarmerRole' to manage this role - add, remove, check
contract FarmerRole {
  using Roles for Roles.Role;
    AdminInterface public AdminContract;
  // Define 2 events, one for Adding, and other for Removing
  event LogFarmerAdded(address indexed account,string name, string company, string identify, string lat, string longt, uint timeAdd);
  event LogFarmerRemoved(address indexed account,uint timeAdd);

  // Define a struct 'farmers' by inheriting from 'Roles' library, struct Role
  Roles.Role private farmers;

  // In the constructor make the address that deploys this contract the 1st farmer
  constructor(address _contract) public {
      AdminContract = AdminInterface(_contract);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyFarmer() {
    require(isFarmer(msg.sender),"Only Farmer");
    _;
  }
    function joinNetwork(address _contract)
        public
    {
        AdminContract = AdminInterface(_contract);
    
    }
  // Define a function 'isFarmer' to check this role
  function isFarmer(address account) public view returns (bool) {
    return farmers.has(account);
  }

  // Define a function 'addFarmer' that adds this role
  function addFarmer(address account,string memory  name, string memory company,string memory identify, string memory lati, string memory longt) public  {
    _addFarmer(account,name, company,identify, lati, longt);
  }

  // Define a function 'renounceFarmer' to renounce this role
  function renounceFarmer() public onlyFarmer{
    _removeFarmer(msg.sender);
  }
    function getFammer(address _account) public view returns (address, string, string,string, string, string){
       return farmers.get(_account);
    }
  // Define an internal function '_addFarmer' to add this role, called by 'addFarmer'
  function _addFarmer(address account,string memory  name, string memory company,string memory identify, string memory lati, string memory longt) internal {
     require(AdminContract.isAdmin(msg.sender),"Not is admin");
    farmers.add(account,name, company,identify, lati, longt);
    emit LogFarmerAdded(account,name, company,identify, lati, longt,now);
  }

  // Define an internal function '_removeFarmer' to remove this role, called by 'removeFarmer'
  function _removeFarmer(address account) internal {
      require(AdminContract.isAdmin(msg.sender),"Not is admin");
    farmers.remove(account);
    emit LogFarmerRemoved(account,now);
  }
  
}
