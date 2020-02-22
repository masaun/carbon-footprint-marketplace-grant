pragma solidity ^0.5.10;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

// Storage
import "./storage/CfStorage.sol";
import "./storage/CfConstants.sol";

import "./MarketplaceRegistry.sol";

// rDAI
import "./rtoken-contracts/contracts/RToken.sol";


contract GrantWithInterestIncome is Ownable, CfStorage, CfConstants {

    RToken public rToken;

    constructor(address _rToken) public {
        rToken = RToken(_rToken);
    }


    function createGrant() public returns (bool) {}


    //
    // rToken interface
    //

    /// @dev IRToken.mint implementation
    function mintRdai(uint256 _mintAmount) public returns (bool) {
        rToken.mint(_mintAmount);
    }

    /**
     * @dev IRToken.redeem implementation
     *      It withdraws equal amount of initially supplied underlying assets
     */
    function redeemRdai(uint256 _redeemTokens) public returns (bool) {
        rToken.redeem(_redeemTokens);
    }

}
