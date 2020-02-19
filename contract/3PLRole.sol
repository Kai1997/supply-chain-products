pragma solidity ^0.4.24;
// third : 0x3C2De641ede2EDe9c176e93F7ee3ab2a727dA257

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
 =          Contract ThirdPLRole           =
 ==========================================*/
contract ThirdPLRole {
  using Roles for Roles.Role;

  AdminInterface public AdminContract;
  OwnableInterface public OwnableContract;
  /*----------  START EVENT  ----------*/ 
  // Define 2 events, one for Adding, and other for Removing
  event LogThirdPLAdded(address indexed _account,string _name, string _company, string _identify, string _lat, string _longt, uint _timeAdd);
  event LogThirdPLRemoved(address indexed account,uint timeAdd);
  /*----------  END EVENT  ----------*/ 
  
  // Define a struct 'thirdPLs' by inheriting from 'Roles' library, struct Role
  Roles.Role private thirdPLs;
  
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
  
  /*function 'isThirdPL' to check _account is ThirdPL or not
   *@param _account : is address metamask of ThirdPL
   *@return bool
   */
  function isThirdPL(address _account) public view returns (bool) {
    return thirdPLs.has(_account);
  }

  /*function 'addThirdPL' to add a ThirdPL to chain
   *@param _account : is address metamask of ThirdPL
   *@param _name : is name of ThirdPL
   *@param _company : is company of ThirdPL
   *@param _identify : is identify of ThirdPL
   *@param _lati : is latitude of ThirdPL
   *@param _longt : is longitude of ThirdPL
   */
  function addThirdPL(address _account, string memory _name, string memory _company,string memory _identify, string memory _lati, string memory _longt) public  {
    _addThirdPL(_account, _name, _company, _identify, _lati, _longt);
  }

  /*function 'renounceThirdPL' to remove a ThirdPL out chain
   *@param _account : is address metamask of ThirdPL
   */
  function renounceThirdPL(address _account) public {
    _removeThirdPL(_account);
  }
  
  /*function 'getThirdPL' to get information a ThirdPL
   *@param _account : is address metamask of ThirdPL
   *@returns : account, name, company, identify, latitude, longitude
   */
  function getThirdPL(address _account) public view returns (address, string, string, string,string, string){
    return thirdPLs.get(_account);
  }
  
  /* Define an internal function '_addThirdPL' to add this role, called by 'addThirdPL'
   *@param _account : is address metamask of ThirdPL
   *@param _name : is name of ThirdPL
   *@param _company : is company of ThirdPL
   *@param _identify : is identify of ThirdPL
   *@param _lati : is latitude of ThirdPL
   *@param _longt : is longitude of ThirdPL
   *@modifier onlyAdmin : check is msg.sender is admin or not
   *@event LogFarmerAdded : log information ThirdPL in chain
   */  
  function _addThirdPL(address _account, string memory _name, string memory _company,string memory _identify, string memory _lati, string memory _longt) internal onlyAdmin onlyActive {
    thirdPLs.add(_account, _name, _company, _identify, _lati, _longt);
    emit LogThirdPLAdded(_account, _name, _company, _identify, _lati, _longt,now);
  }

  /* Define an internal function '_removeThirdPL' to remove this role, called by 'removeThirdPL'
   *@param _account : is address metamask of ThirdPL
   *@modifier onlyAdmin : check is msg.sender is admin or not
   *@event LogFarmerRemoved : log information ThirdPL in chain
   */ 
  function _removeThirdPL(address _account) internal onlyAdmin onlyActive {
    thirdPLs.remove(_account);
    emit LogThirdPLRemoved(_account, now);
  }
}
