const Identity = artifacts.require("Identity");
const Registry = artifacts.require("Registry");
const DataSharing = artifacts.require("DataSharing");

module.exports = async function (deployer) {
    await deployer.deploy(Identity);
    const identityInstance = await Identity.deployed();

    await deployer.deploy(Registry, identityInstance.address);
    await deployer.deploy(DataSharing, identityInstance.address);
};
