pragma solidity ^0.5.10;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

// Storage
import "./storage/CfStorage.sol";
import "./storage/CfConstants.sol";

import "./MarketplaceRegistry.sol";


contract GrantForBuyer is Ownable, CfStorage, CfConstants {

    constructor() public {}

    function createGrant() public returns (bool) {}

}
