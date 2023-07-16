async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const mockNFT = await ethers.deployContract("MockNFT");
    console.log("MockNFT address:", await mockNFT.getAddress());

    const nFTCemetery = await ethers.deployContract("NFTCemetery");
    console.log("NFTCemetery address:", await nFTCemetery.getAddress());

    // Mint MockNFTs
    console.log("Minting MockNFTs...");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    await mockNFT.mint("0x28DD2379A5e5d058D2d4D3bcF190eA023971e83D");
    console.log("Done.");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });