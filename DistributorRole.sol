pragma solidity ^0.4.24;
// dis : 

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
 =        Contract DistributorRole         =
 ==========================================*/
contract DistributorRole {
  using Roles for Roles.Role;

  AdminInterface public AdminContract;
  
  /*----------  START EVENT  ----------*/ 
  // Define 2 events, one for Adding, and other for Removing
  event LogDistributorAdded(address indexed _account,string _name, string _company, string _identify, string _lat, string _longt, uint _timeAdd);
  event LogDistributorRemoved(address indexed _account, uint _timeAdd);
  /*----------  END EVENT  ----------*/
  
  // Define a struct 'distributors' by inheriting from 'Roles' library, struct Role
  Roles.Role private distributors;

  /*constructor to join address contract of AdminContract
   *@param _contract : is address contract of  AdminContract
   */
  constructor(address _contract) public {
      AdminContract = AdminInterface(_contract);
  }

  /*----------  START MODIFIER  ----------*/
  // Define a modifier that checks to see if msg.sender has the appropriate role
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
  
  /*function 'isDistributor' to check _account is Distributor or not
   *@param _account : is address metamask of Distributor
   *@return bool
   */
  function isDistributor(address _account) public view returns (bool) {
    return distributors.has(_account);
  }

  /*function 'addDistributor' to add a Distributor to chain
   *@param _account : is address metamask of Distributor
   *@param _name : is name of Distributor
   *@param _company : is company of Distributor
   *@param _identify : is identify of Distributor
   *@param _lati : is latitude of Distributor
   *@param _longt : is longitude of Distributor
   */
  function addDistributor(address _account, string memory _name, string memory _company,string memory _identify, string memory _lati, string memory _longt) public  {
    _addDistributor(_account, _name, _company, _identify, _lati, _longt);
  }

  /*function 'renounceDistributor' to remove a Distributor out chain
   *@param _account : is address metamask of Distributor
   */
  function renounceDistributor( address _account) public  {
    _removeDistributor(_account);
  }
  
  /*function 'getDistributor' to get information a Distributor
   *@param _account : is address metamask of Distributor
   *@returns : account, name, company, identify, latitude, longitude
   */
  function getDistributor(address _account) public view returns (address, string, string, string,string, string){
     return distributors.get(_account);
  }
  
  /* Define an internal function '_addDistributor' to add this role, called by 'addDistributor'
   *@param _account : is address metamask of Distributor
   *@param _name : is name of Distributor
   *@param _company : is company of Distributor
   *@param _identify : is identify of Distributor
   *@param _lati : is latitude of Distributor
   *@param _longt : is longitude of Distributor
   *@modifier onlyAdmin : check is msg.sender is admin or not
   *@event LogFarmerAdded : log information Distributor in chain
   */  
  function _addDistributor(address _account, string memory _name, string memory _company,string memory _identify, string memory _lati, string memory _longt) internal onlyAdmin {
    distributors.add(_account, _name, _company, _identify, _lati, _longt);
    emit LogDistributorAdded(_account, _name, _company, _identify, _lati, _longt,now);
  }

  /* Define an internal function '_removeDistributor' to remove this role, called by 'removeDistributor'
   *@param _account : is address metamask of Distributor
   *@modifier onlyAdmin : check is msg.sender is admin or not
   *@event LogFarmerRemoved : log information Distributor in chain
   */ 
  function _removeDistributor(address _account) internal onlyAdmin {
    distributors.remove(_account);
    emit LogDistributorRemoved(_account, now);
  }
}
