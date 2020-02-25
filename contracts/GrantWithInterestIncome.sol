pragma solidity ^0.5.10;

import "@openzeppelin/contracts/ownership/Ownable.sol";

// Storage
import "./storage/CfStorage.sol";
import "./storage/CfConstants.sol";

import "./MarketplaceRegistry.sol";

// rDAI
//import "./rtoken-contracts/contracts/RToken.sol";


contract GrantWithInterestIncome is Ownable, CfStorage, CfConstants {

    RToken public rToken;

    constructor(address _rToken) public {
        rToken = RToken(_rToken);  // [Ref]: ./rtoken-contracts/contracts/RToken.sol
    }


    function createGrantWithInerestIncom(

    ) public returns (bool) {

    }


    //
    // rToken interface
    //

    /**
     * @notice Sender supplies assets into the market and receives rTokens in exchange
     * @param mintAmount The amount of the underlying asset to supply
     * @return uint 0=success, otherwise a failure
     */
    function mintRdai(uint256 _mintAmount) public returns (bool) {
        rToken.mint(_mintAmount);
    }

    /**
     * @notice Sender redeems rTokens in exchange for the underlying asset
     * @param redeemTokens The number of rTokens to redeem into underlying
     * @return uint 0=success, otherwise a failure
     */
    function redeemRdai(uint256 _redeemTokens) public returns (bool) {
        rToken.redeem(_redeemTokens);
    }

}
