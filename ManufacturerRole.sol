pragma solidity ^0.4.24;
// manu : 0x713140d0BDA6eBb4e109a831Cfef107c65F4CD69

/*==========================================
 =          Library Roles                  =
 ==========================================*/
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

/*==========================================
 =          Interface Admin                =
 ==========================================*/
interface AdminInterface {
    function isAdmin(address _account) view external returns(bool);
}

/*==========================================
 =          Interface Ownable              =
 ==========================================*/
interface OwnableInterface {
  function getStatus() external view returns(bool);
}

/*==========================================
 =          Contract Manufacturer          =
 ==========================================*/
contract Manufacturer {
  using Roles for Roles.Role;
  AdminInterface public AdminContract;
  OwnableInterface public OwnableContract;
  
  /*----------  START EVENT  ----------*/ 
  // Define 2 events, one for Adding, and other for Removing
  event LogManufacturerAdded(address indexed _account, string _name, string _company, string _identify, string _lat, string _longt, uint _timeAdd);
  event LogManufacturerRemoved(address indexed _account, uint _timeAdd);
  /*----------  END EVENT  ----------*/ 
  
  // Define a struct 'manufacturers' by inheriting from 'Roles' library, struct Role
  Roles.Role private manufacturers;

  /*constructor to join address contract of AdminContract
   *@param _contract : is address contract of  AdminContract
   *["owneable","admin"]
   *["0x3B9b4873a7A3905226eB49443Ca1530d02702860","0x82B1AD4F680F94caF01774F8bB7EEE6A3f7e1B0F"]
   */
  constructor(address[2] _contract) public {
      OwnableContract = OwnableInterface(_contract[0]);
      AdminContract = AdminInterface(_contract[1]);
  }

  /*----------  START MODIFIER  ----------*/
  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyAdmin() {
    require(AdminContract.isAdmin(msg.sender),"Not is admin");
    _;
  }
  // Define a modifier that checks stataus dapp
  modifier onlyActive() {
    require(OwnableContract.getStatus(),"Dapp not active");
    _;
  }
  /*----------  END MODIFIER  ----------*/
  
  /*function 'joinNetwork' to join address contract of AdminContract
   *@param _contract : is address contract of  AdminContract
   */
  function joinNetwork(address[2] _contract)
    public
  {
      OwnableContract = OwnableInterface(_contract[0]);
      AdminContract = AdminInterface(_contract[1]);
  }
  
  /*function 'checkIsAdmin' to check msg.sender is Admin or not
   *@return bool
   */
  function checkIsAdmin() public view returns(bool) {
      return AdminContract.isAdmin(msg.sender);
  }
  
  /*function 'getStatus' to check status dapp
   *@return bool
   */
  function getStatus() public view returns (bool) {
        return OwnableContract.getStatus();
    }
  
  /*function 'isManufacturer' to check _account is Manufacturer or not
   *@param _account : is address metamask of Manufacturer
   *@return bool
   */
  function isManufacturer(address _account) public view returns (bool) {
    return manufacturers.has(_account);
  }

  /*function 'addManufacturer' to add a Manufacturer to chain
   *@param _account : is address metamask of Manufacturer
   *@param _name : is name of Manufacturer
   *@param _company : is company of Manufacturer
   *@param _identify : is identify of Manufacturer
   *@param _lati : is latitude of Manufacturer
   *@param _longt : is longitude of Manufacturer
   */
  function addManufacturer(address _account, string memory  _name, string memory _company, string memory _identify, string memory _lati, string memory _longt) public  {
    _addManufacturer(_account, _name, _company, _identify, _lati, _longt);
  }

  /*function 'renounceManufacturer' to remove a Manufacturer out chain
   *@param _account : is address metamask of Manufacturer
   */
  function renounceManufacturer(address _account) public {
    _removeManufacturer(_account);
  }
  
  /*function 'getManufacturer' to get information a Manufacturer
   *@param _account : is address metamask of Manufacturer
   *@returns : account, name, company, identify, latitude, longitude
   */
  function getManufacturer(address _account) public view returns (address, string, string, string, string, string){
   return manufacturers.get(_account);
  }
  
  /* Define an internal function '_addManufacturer' to add this role, called by 'addManufacturer'
   *@param _account : is address metamask of Manufacturer
   *@param _name : is name of Manufacturer
   *@param _company : is company of Manufacturer
   *@param _identify : is identify of Manufacturer
   *@param _lati : is latitude of Manufacturer
   *@param _longt : is longitude of Manufacturer
   *@modifier onlyAdmin : check is msg.sender is admin or not
   *@event LogFarmerAdded : log information Manufacturer in chain
   */ 
  function _addManufacturer(address _account, string memory _name, string memory _company,string memory _identify, string memory _lati, string memory _longt) internal onlyAdmin onlyActive {
    manufacturers.add(_account, _name, _company, _identify, _lati, _longt);
    emit LogManufacturerAdded(_account, _name, _company, _identify, _lati, _longt, now);
  }

  /* Define an internal function '_removeManufacturer' to remove this role, called by 'removeManufacturer'
   *@param _account : is address metamask of Manufacturer
   *@modifier onlyAdmin : check is msg.sender is admin or not
   *@event LogFarmerRemoved : log information Manufacturer in chain
   */ 
  function _removeManufacturer(address _account) internal onlyAdmin onlyActive {
    manufacturers.remove(_account);
    emit LogManufacturerRemoved(_account,now);
  }
}
