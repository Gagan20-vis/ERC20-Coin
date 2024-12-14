const { expect } = require("chai");
const {loadFixture} = require('@nomicfoundation/hardhat-network-helpers')
describe("Coins", function () {

    async function deployContract() {
        const Token = await ethers.getContractFactory("Token");
        const tokens = await Token.deploy("Coins", "CNS", 8, 0);
        return {tokens};
    }

    it("Deployment should assign the total supply of tokens to the owner", async function () {
        const [owner] = await ethers.getSigners();
        const {tokens} = await loadFixture(deployContract);
        const ownerBalance = await tokens.balanceOf(owner.address);
        expect(await tokens.totalSupply()).to.equal(ownerBalance);
    });

    it("Should assignment the correct name",async function() {
        const {tokens} = await loadFixture(deployContract);
        expect(await tokens.name()).to.equal("Coins");
    })
    
    it("Should assignment the correct symbol",async function() {
        const {tokens} = await loadFixture(deployContract);
        expect(await tokens.symbol()).to.equal("CNS");
    })
    deployContract();
});
