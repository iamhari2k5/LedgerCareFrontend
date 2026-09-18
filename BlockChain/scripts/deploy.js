import { ethers } from "ethers";
import { readFileSync, writeFileSync } from "fs";

async function deployContract(
  provider,
  signer,
  contractName
) {
  console.log(`Deploying ${contractName}...`);

  const artifactPath =
    `./artifacts/contracts/${contractName}.sol/${contractName}.json`;

  const artifact = JSON.parse(
    readFileSync(artifactPath, "utf8")
  );

  const factory = new ethers.ContractFactory(
    artifact.abi,
    artifact.bytecode,
    signer
  );

  const contract = await factory.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();

  console.log(`${contractName}: ${address}\n`);

  return address;
}

async function main() {
  console.log("Starting deployment...\n");

  const provider = new ethers.JsonRpcProvider(
    "http://127.0.0.1:8545"
  );

  const accounts = await provider.listAccounts();

  const signer = await provider.getSigner(
    accounts[0].address
  );

  console.log(
    "Using account:",
    accounts[0].address,
    "\n"
  );

  const addresses = {};

  addresses.CharityRegistry =
    await deployContract(
      provider,
      signer,
      "CharityRegistry"
    );

  addresses.CampaignManager =
    await deployContract(
      provider,
      signer,
      "CampaignManager"
    );

  addresses.DonationLedger =
    await deployContract(
      provider,
      signer,
      "DonationLedger"
    );

  addresses.FundTracker =
    await deployContract(
      provider,
      signer,
      "FundTracker"
    );

  addresses.EvidenceRegistry =
    await deployContract(
      provider,
      signer,
      "EvidenceRegistry"
    );

  writeFileSync(
    "./deployed-addresses.json",
    JSON.stringify(addresses, null, 2)
  );

  console.log("=================================");
  console.log("DEPLOYMENT COMPLETED");
  console.log("=================================\n");

  console.log(addresses);

  console.log(
    "\nSaved to deployed-addresses.json"
  );
}

main().catch((error) => {
  console.error("\nDeployment failed:");
  console.error(error);
  process.exitCode = 1;
});