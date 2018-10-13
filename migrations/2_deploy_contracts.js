// var Fir = artifacts.require("./fir.sol");
var Fir = artifacts.require("./firipfs.sol");

module.exports = function(deployer) {
  deployer.deploy(Fir);
};
