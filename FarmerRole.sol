pragma solidity ^0.4.24;
//0xa646C5af0a0425F51cbAEEa84d182adD98FAfb4F

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
 =         Contract FarmerRole             =
 ==========================================*/
contract FarmerRole {
  using Roles for Roles.Role;
  AdminInterface public AdminContract;      //Define interface: adminContract
  
  /*----------  START EVENT  ----------*/ 
  // Define 2 events, one for Adding, and other for Removing
  event LogFarmerAdded(address indexed _account,string _name, string _company, string _identify, string _lat, string _longt, uint _timeAdd);
  event LogFarmerRemoved(address indexed _account,uint _timeAdd);
  /*----------  END EVENT  ----------*/ 
  
  // Define a struct 'farmers' by inheriting from 'Roles' library, struct Role
  Roles.Role private farmers;

  /*constructor to join address contract of AdminContract
   *@param _contract : is address contract of  AdminContract
   */
  constructor(address _contract) public {
      AdminContract = AdminInterface(_contract);
  }

  /*----------  START MODIFIER  ----------*/
  // Define a modifier that checks to see if msg.sender is Admin
  modifier onlyAdmin() {
    require(AdminContract.isAdmin(msg.sender),"Not is admin");
    _;
  }
  /*----------  END MODIFIER  ----------*/
  
  /*function 'joinNetwork' to join address contract of AdminContract
   *@param _contract : is address contract of  AdminContract
   */
  function joinNetwork(address _contract)
    public
  {
      AdminContract = AdminInterface(_contract);
  }
  
  /*function 'checkIsAdmin' to check msg.sender is Admin or not
   *@return bool
   */
  function checkIsAdmin() public view returns(bool) {
      return AdminContract.isAdmin(msg.sender);
  }
  
  /*function 'isFarmer' to check _account is Farmer or not
   *@param _account : is address metamask of Farmer
   *@return bool
   */
  function isFarmer(address _account) public view returns (bool) {
    return farmers.has(_account);
  }

  /*function 'addFarmer' to add a farmer to chain
   *@param _account : is address metamask of Farmer
   *@param _name : is name of Farmer
   *@param _company : is company of Farmer
   *@param _identify : is identify of Farmer
   *@param _lati : is latitude of Farmer
   *@param _longt : is longitude of Farmer
   */
  function addFarmer(address _account, string memory  _name, string memory _company, string memory _identify, string memory _lati, string memory _longt) public  {
    _addFarmer(_account, _name, _company, _identify, _lati, _longt);
  }

  /*function 'renounceFarmer' to remove a farmer out chain
   *@param _account : is address metamask of Farmer
   */
  function renounceFarmer(address _account) public {
    _removeFarmer(_account);
  }
  
  /*function 'getFammer' to get information a farmer
   *@param _account : is address metamask of Farmer
   *@returns : account, name, company, identify, latitude, longitude
   */
  function getFammer(address _account) public view returns (address, string, string, string, string, string){
     return farmers.get(_account);
  }
   
  /* Define an internal function '_addFarmer' to add this role, called by 'addFarmer'
   *@param _account : is address metamask of Farmer
   *@param _name : is name of Farmer
   *@param _company : is company of Farmer
   *@param _identify : is identify of Farmer
   *@param _lati : is latitude of Farmer
   *@param _longt : is longitude of Farmer
   *@modifier onlyAdmin : check is msg.sender is admin or not
   *@event LogFarmerAdded : log information Farmer in chain
   */  
  function _addFarmer(address _account, string memory  _name, string memory _company, string memory _identify, string memory _lati, string memory _longt) internal onlyAdmin {
    farmers.add(_account, _name, _company, _identify, _lati, _longt);
    emit LogFarmerAdded(_account, _name, _company, _identify, _lati, _longt, now);
  }

  /* Define an internal function '_removeFarmer' to remove this role, called by 'removeFarmer'
   *@param _account : is address metamask of Farmer
   *@modifier onlyAdmin : check is msg.sender is admin or not
   *@event LogFarmerRemoved : log information Farmer in chain
   */ 
  function _removeFarmer(address _account) internal onlyAdmin {
    farmers.remove(_account);
    emit LogFarmerRemoved(_account, now);
  }
  
}
