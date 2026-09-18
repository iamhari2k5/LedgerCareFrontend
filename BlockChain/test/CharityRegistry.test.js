const { expect } = require("chai");

describe("CharityRegistry", function () {

    it("should register a charity", async function () {

        const CharityRegistry =
            await ethers.getContractFactory("CharityRegistry");

        const registry =
            await CharityRegistry.deploy();

        await registry.waitForDeployment();

        const [charity] = await ethers.getSigners();

        await registry.registerCharity(
            "Helping Hands Foundation",
            "REG-001",
            "help@example.com"
        );

        const result =
            await registry.getCharity(1);

        expect(result.organizationName)
            .to.equal("Helping Hands Foundation");

        expect(result.walletAddress)
            .to.equal(charity.address);

        expect(result.verified)
            .to.equal(false);
    });

});