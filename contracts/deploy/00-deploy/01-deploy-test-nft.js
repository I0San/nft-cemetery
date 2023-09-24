module.exports = async ({ getNamedAccounts, deployments, network }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const confirmations = network.config.blockConfirmations || 1;

    let contract_name = "MockNFT"
    let contractAddress = ethers.ZeroAddress;
    try {
        let tokenInstance = await deployments.get(contract_name);
        if (tokenInstance) {
            contractAddress = tokenInstance.address;
        }
    } catch (e) {}

    if (!contractAddress || contractAddress == ethers.ZeroAddress) {
        let args = []
        const deployContract = await deploy(contract_name, {
            from: deployer,
            args: args,
            log: true,
            waitConfirmations: confirmations
        });
        log(`${contract_name} instance at ${deployContract.address}`);
    } else {
        log(`${contract_name} instance already at ${contractAddress}`);
    }
}
module.exports.tags = ["all", "deploy", "test", "mock-nft", "deploy-test-mock-nft"]