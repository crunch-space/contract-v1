import { run, ethers } from "hardhat";

async function main() {
  const sbtContract = await ethers.deployContract("SoulBoundToken");
  await sbtContract.waitForDeployment();

  console.log(
    `Congratulations! You have just successfully deployed your soul bound tokens.`
  );
  console.log(
    `SBT contract address is ${sbtContract.target}. You can verify on https://kairos.kaiascope.com/account/${sbtContract.target}`
  );

  await run("verify:verify", {
    address: sbtContract.target,
    contract: "contracts/SoulBoundToken.sol:SoulBoundToken",
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
