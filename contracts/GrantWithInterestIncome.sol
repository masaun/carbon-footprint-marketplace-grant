pragma solidity ^0.5.10;

// OpenZeppelin
import "@openzeppelin/contracts/math/SafeMath.sol";

// Storage
import "./storage/CfStorage.sol";
import "./storage/CfConstants.sol";

import "./MarketplaceRegistry.sol";

// DAI（ERC20）
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

// cDAI
import "./rtoken-contracts/contracts/IAllocationStrategy.sol";

// rDAI
//import "./rtoken-contracts/contracts/tokens/rDAI.sol";
import "./rtoken-contracts/contracts/IRToken.sol";


contract GrantWithInterestIncome is CfStorage, CfConstants {

    using SafeMath for uint256;

    IERC20 public Dai;
    IAllocationStrategy public cDai;
    //rDAI public rDai;
    IRToken public rDai;

    address rDaiProxy;

    constructor(
        address _UnderlyingToken,  // DAI
        address _AllocationToken,  // cDAI
        address _rDaiProxy         // rDAI
    ) public {
        Dai = IERC20(_UnderlyingToken);                // DAI
        cDai = IAllocationStrategy(_AllocationToken);  // cDAI
        //rDai = rDAI(_rDaiProxy, _AllocationToken);   // rDAI
        rDai = IRToken(_rDaiProxy);                    // rDAI

        rDaiProxy = _rDaiProxy;
    }


    function testFunc() public returns (bool) {
        return CfConstants.CONFIRMED;
    } 


    function createGrantWithInerestIncome(uint256 _mintAmount, address _redeemTo, uint256 _redeemTokens, address _owner) public returns (bool) {
        // #1 Mint rDAI
        rDaiMint(_mintAmount);

        // #2 Redeem rDAI with DAI
        //rDaiRedeem(_redeemTokens);

        // #2 Redeem rDAI with DAI and #3 Transfer
        rDaiRedeemAndTransfer(_redeemTo, _redeemTokens);

        // #4 Pay interest income
        rDaiPayInterest(_owner);

        return CfConstants.CONFIRMED;
    }


    /////////////////////////////////////////
    // rToken interface / Basic 3 functions
    /////////////////////////////////////////
    function DaiApprove(uint256 amount) public returns (bool) {
        // approve(address spender, uint256 amount) <= [Ref]: IERC20.sol
        Dai.approve(rDaiProxy, amount.div(10**18));
    }    

    function rDaiMint(uint256 _mintAmount) public returns (bool) {
        rDai.mint(_mintAmount.div(10**18));

        // @dev - Transfer minted rToken to contract
        //rDai.transfer(address(this), _mintAmount);
        
        return CfConstants.CONFIRMED;
    }
    

    function rDaiRedeem(uint256 _redeemTokens) public returns (bool) {
        rDai.redeem(_redeemTokens.div(10**18));
        return CfConstants.CONFIRMED;
    }

    function rDaiPayInterest(address _owner) public returns (bool) {
        rDai.payInterest(_owner);
        return CfConstants.CONFIRMED;
    }


    /////////////////////////////////////////
    // rToken interface / Combination 3 functions
    /////////////////////////////////////////

    function rDaiMintWithNewHat(
        uint256 _mintAmount,
        address[] memory _recipients,
        uint32[] memory _proportions
    ) public returns (bool) {
        rDai.mintWithNewHat(_mintAmount.div(10**18), _recipients, _proportions);
        return CfConstants.CONFIRMED;
    }

    function rDaiRedeemAndTransfer(address _redeemTo, uint256 _redeemTokens) public returns (bool) {
        rDai.redeemAndTransfer(_redeemTo, _redeemTokens.div(10**18));
        return CfConstants.CONFIRMED;
    }




    ///////////////////////////////
    // rToken interface / Others
    ///////////////////////////////
    /**
     * @notice Returns the name of the token.
     */
    function rDaiName() public view returns (string memory) {
        return rDai.name();
    }


    function rDaiCreateHat(
        address[] memory recipients,
        uint32[] memory proportions,
        bool doChangeHat
    ) public returns (uint256 hatID) {
        return rDai.createHat(recipients, proportions, doChangeHat);
    }


    function rDaiUnderlying() public returns (bool) {
        cDai.underlying();
    }
    

}
