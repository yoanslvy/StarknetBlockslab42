const { expect } = require("chai");
const { starknet } = require("hardhat");

const NAME = starknet.shortStringToBigInt("starknettest")

describe("Testing contract : ERC721", function () {

    let contractFactory;
    let contract;
    this.timeout(3_000_000);

    before(async () => {
        contractFactory = await starknet.getContractFactory("TestToken");
        contract = await contractFactory.deploy({
            name: '35731471704748879006430229364', symbol: '1413829460', owner: '0x013e9B0d3D260c8AB58DBa11c1A8C218Bd6eBDD802438d3407EC56616173bebD'
        });
    });

    describe("Deploy", function () {
        it("Should deploy an ERC721 contract and make sure it has the correct name", async function () {
            const { name } = await contract.call("name", {});
            expect(name).to.equal(NAME);
        });
    });

    describe("Mint", function () {
        it("Should deploy an ERC721 contract and mint a token", async function () {
           await contract.invoke("mint", {});
        });
    });
});



