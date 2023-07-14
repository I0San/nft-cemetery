const { expect } = require("chai");

describe("NFT Cemetery tests", function () {

    it("Should deploy NFT contract and mint a token correctly", async function () {
        const [owner] = await ethers.getSigners();
        // Deploy the MockNFTContract contract
        const MockNFTContract = await ethers.deployContract("MockNFT");
        // Mint a token
        await MockNFTContract.mint(owner.address);
        // Check that the owner has the minted token
        expect(await MockNFTContract.ownerOf(0)).to.equal(owner.address);
    });

    it("Should burn an NFT correctly", async function () {
        // Deploy the contract
        const NFTCemeteryContract = await ethers.deployContract("NFTCemetery");
        const NFTCemeteryContractAddress = await NFTCemeteryContract.getAddress();

        // Deploy NFT contract and mint a token
        const MockNFTContract = await ethers.deployContract("MockNFT");
        const MockNFTContractAddress = await MockNFTContract.getAddress();
        const [owner] = await ethers.getSigners();
        await MockNFTContract.mint(owner.address);

        // Mock values for the transfer
        const nftContract = MockNFTContractAddress;
        const nftId = 0;
        const inscription = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";

        // Approve
        await MockNFTContract.connect(owner).approve(NFTCemeteryContractAddress, nftId);

        // Call burryMyToken method
        await NFTCemeteryContract.burryMyNFT(nftContract, nftId, inscription);

        // Call getGraveyard method
        const [result, total] = await NFTCemeteryContract.getGraveyard(1, 10);

        // Check the results
        expect(total).to.equal(1);
        expect(result[0].nftOwner).to.equal(owner.address);
        expect(result[0].nftContract).to.equal(nftContract);
        expect(result[0].nftId).to.equal(nftId);
        expect(result[0].inscription).to.equal(inscription);
    });
});