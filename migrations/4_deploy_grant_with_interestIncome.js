var GrantWithInterestIncome = artifacts.require("GrantWithInterestIncome");

module.exports = function(deployer) {
  deployer.deploy(GrantWithInterestIncome);
};
