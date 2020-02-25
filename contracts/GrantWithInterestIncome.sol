pragma solidity ^0.5.10;

// Storage
import "./storage/CfStorage.sol";
import "./storage/CfConstants.sol";

import "./MarketplaceRegistry.sol";

// cDAI
import "./rtoken-contracts/contracts/CompoundAllocationStrategy.sol";

// rDAI
import "./rtoken-contracts/contracts/IRToken.sol";


contract GrantWithInterestIncome is CfStorage, CfConstants {

    IRToken public rToken;
    CompoundAllocationStrategy public compoundAllocationStrategy;

    constructor(address _rToken) public {
        rToken = IRToken(_rToken);  // [Ref]: ./rtoken-contracts/contracts/RToken.sol
    }


    function createGrantWithInerestIncome(uint256 _mintAmount, address _redeemTo, uint256 _redeemTokens, address _owner) public returns (bool) {
        // #1 Mint rDAI
        mintRdai(_mintAmount);

        // #2 Redeem rDAI with DAI
        //redeemRdai(_redeemTokens);

        // #2 Redeem rDAI with DAI and #3 Transfer
        redeemAndTransferRdai(_redeemTo, _redeemTokens);

        // #4 Pay interest income
        payInterestRdai(_owner);

        return CfConstants.CONFIRMED;
    }


    /////////////////////////////////////////
    // rToken interface / Basic 3 functions
    /////////////////////////////////////////
    function mintRdai(uint256 _mintAmount) public returns (bool) {
        rToken.mint(_mintAmount);
        return CfConstants.CONFIRMED;
    }

    function redeemRdai(uint256 _redeemTokens) public returns (bool) {
        rToken.redeem(_redeemTokens);
        return CfConstants.CONFIRMED;
    }

    function redeemAndTransferRdai(address _redeemTo, uint256 _redeemTokens) public returns (bool) {
        rToken.redeemAndTransfer(_redeemTo, _redeemTokens);
        return CfConstants.CONFIRMED;
    }
    

    function payInterestRdai(address _owner) public returns (bool) {
        rToken.payInterest(_owner);
        return CfConstants.CONFIRMED;
    }





    ///////////////////////////////
    // rToken interface / Others
    ///////////////////////////////
    /**
     * @notice Returns the name of the token.
     */
    function nameRdai() public view returns (string memory) {
        return rToken.name();
    }


    function createHatRdai(
        address[] memory recipients,
        uint32[] memory proportions,
        bool doChangeHat
    ) public returns (uint256 hatID) {
        return rToken.createHat(recipients, proportions, doChangeHat);
    }


    function underlyingERC20() public returns (bool) {
        compoundAllocationStrategy.underlying();
    }
    

}
