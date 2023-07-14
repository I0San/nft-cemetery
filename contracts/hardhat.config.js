require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.18",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      live: false,
      blockConfirmations: 1,
      tags: ["test", "local"],
    },
    localhost: {
        live: false,
        blockConfirmations: 1,
        tags: ["local"]
    }
  }
};
