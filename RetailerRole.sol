pragma solidity ^0.4.24;
// retail " 0xEd5F17c295839b1872EC488e699096441a084eaa"
library Roles {
    struct Role {
        mapping (address => User) bearer;
    }
    struct User {
        address account;
        bool status;
        string name;
        string identify;
        string company;
        string lati;
        string longt;
    }
    
  /**
   * @dev give an account access to this role
   */
  function add(Role storage role, address _account, string memory  _name, string memory _company,string memory _identify, string memory _lati, string memory _longt) internal {
    require(_account != address(0),"Account not exist");
    require(!has(role, _account),"Account not register");

    role.bearer[_account] = User({
        account: _account,
        status: true,
        name : _name,
        company : _company,
        identify : _identify,
        lati : _lati,
        longt : _longt
    });
   
  }

  /**
   * @dev remove an account's access to this role
   */
  function remove(Role storage _role, address _account) internal {
    require(_account != address(0),"Account not exist");
    require(has(_role, _account),"Account not register");
    
    _role.bearer[_account].status = false;
  }

  /**
   * @dev check if an account has this role
   * @return bool
   */
  function has(Role storage _role, address _account)
    internal
    view
    returns (bool)
  {
    require(_account != address(0),"Account not exist");
    
    return _role.bearer[_account].status == true;
  }
    /**
    * @dev get infomation user
    */
    function get(
        Role storage _role, 
        address _account
    ) 
    internal 
    view 
    returns (
      address, 
      string, 
      string, 
      string,
      string, 
      string
      )
    {
    require(_account != address(0),"Account not exist");
    require(has(_role, _account),"Account not register");
    
    return (
        _role.bearer[_account].account,
        _role.bearer[_account].name, 
        _role.bearer[_account].company,
        _role.bearer[_account].identify,
        _role.bearer[_account].lati, 
        _role.bearer[_account].longt
        );
  }

}

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
  function checkIsAdmin() public view returns(bool) {
      return AdminContract.isAdmin(msg.sender);
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
  function renounceRetailer(address _account) public {
    _removeRetailer(_account);
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
