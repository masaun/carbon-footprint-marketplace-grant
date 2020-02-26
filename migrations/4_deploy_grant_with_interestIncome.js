var GrantWithInterestIncome = artifacts.require("GrantWithInterestIncome");

// Kovan（Ref => https://github.com/rtoken-project/rtoken-contracts/blob/master/README.md ）
const UnderlyingToken = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa'  // DAI
const AllocationToken = '0xe7bc397dbd069fc7d0109c0636d06888bb50668c'  // cDAI
const rDaiProxy = '0x462303f77a3f17Dbd95eb7bab412FE4937F9B9CB';       // rDAI

module.exports = function(deployer) {
  deployer.deploy(GrantWithInterestIncome, UnderlyingToken, AllocationToken, rDaiProxy);
};
