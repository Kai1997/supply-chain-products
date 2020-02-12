pragma solidity ^0.4.24;

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
