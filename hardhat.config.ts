import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import "@nomicfoundation/hardhat-ethers";
import fs from "fs";
import path from "path";
import "dotenv/config";

task("exportABI", "Exports the ABI of the compiled contract")
  .addParam("contract", "The name of the contract")
  .setAction(async (taskArgs, hre) => {
    await hre.run("compile"); // ensure the contract is compiled

    const contractArtifacts = await hre.artifacts.readArtifact(
      taskArgs.contract
    );

    // if abi directory does not exist, create it
    if (!fs.existsSync(path.join(__dirname, "abi"))) {
      fs.mkdirSync(path.join(__dirname, "abi"));
    }

    fs.writeFileSync(
      path.join(__dirname, `abi/${taskArgs.contract}.json`),
      JSON.stringify(contractArtifacts.abi, null, 2)
    );

    console.log(`ABI of ${taskArgs.contract} has been exported successfully.`);
  });

const config: HardhatUserConfig = {
  solidity: "0.8.27",
  networks: {
    kaia: {
      url: "https://api-baobab.klaytnscope.com",
      accounts: [String(process.env.PRIVATE_KEY)],
    },
    kairos: {
      chainId: 1001,
      url: "https://public-en.kairos.node.kaia.io",
      accounts: [String(process.env.PRIVATE_KEY)],
    },
  },
  etherscan: {
    apiKey: {
      kairos: "unnecessary",
    },
    customChains: [
      {
        network: "kairos",
        chainId: 1001,
        urls: {
          apiURL: "https://api-baobab.klaytnscope.com/api",
          browserURL: "https://kairos.kaiascope.com",
        },
      },
    ],
  },
};

export default config;
