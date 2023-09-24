async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const nFTCemetery = await ethers.deployContract("NFTCemetery");
    console.log("NFTCemetery address:", await nFTCemetery.getAddress());

    // MockNFTs
    const mockNFT = await ethers.deployContract("MockNFT");
    console.log("MockNFT address:", await mockNFT.getAddress());
    console.log("Minting MockNFTs...");
    await mockNFT.mint(deployer.address);
    await mockNFT.mint(deployer.address);
    await mockNFT.mint(deployer.address);
    // await mockNFT.mint(deployer.address);
    // await mockNFT.mint(deployer.address);
    console.log("Done.");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });