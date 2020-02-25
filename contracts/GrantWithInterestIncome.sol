pragma solidity ^0.5.10;

import "@openzeppelin/contracts/ownership/Ownable.sol";

// Storage
import "./storage/CfStorage.sol";
import "./storage/CfConstants.sol";

import "./MarketplaceRegistry.sol";


// rDAI
import "./rtoken-contracts/contracts/IRToken.sol";


contract GrantWithInterestIncome is Ownable, CfStorage, CfConstants {

    IRToken public rToken;

    constructor(address _rToken, address _cToken) public {
        rToken = IRToken(_rToken);  // [Ref]: ./rtoken-contracts/contracts/RToken.sol
    }


    function createGrantWithInerestIncome() public returns (bool) {
        return CfConstants.CONFIRMED;
    }


    //
    // rToken interface
    //

    /**
     * @notice Returns the name of the token.
     */
    function nameRdai() public view returns (string memory) {
        return rToken.name();
    }

    /**
     * @notice Create a new Hat
     * @param recipients List of beneficial recipients
     * @param proportions Relative proportions of benefits received by the recipients
     * @param doChangeHat Should the hat of the `msg.sender` be switched to the new one
     * @return uint256 ID of the newly creatd Hat.
     */
    function createHatRdai(
        address[] memory recipients,
        uint32[] memory proportions,
        bool doChangeHat
    ) public returns (uint256 hatID) {
        return rToken.createHat(recipients, proportions, doChangeHat);
    }


    /**
     * @notice Sender supplies assets into the market and receives rTokens in exchange
     * @param mintAmount The amount of the underlying asset to supply
     * @return uint 0=success, otherwise a failure
     */
    function mintRdai(uint256 _mintAmount) public returns (bool) {
        rToken.mint(_mintAmount);
        return CfConstants.CONFIRMED;
    }

    /**
     * @notice Sender redeems rTokens in exchange for the underlying asset
     * @param redeemTokens The number of rTokens to redeem into underlying
     * @return uint 0=success, otherwise a failure
     */
    // function redeemRdai(uint256 _redeemTokens) public returns (bool) {
    //     rToken.redeem(_redeemTokens);
    //     return CfConstants.CONFIRMED;
    // }

}
