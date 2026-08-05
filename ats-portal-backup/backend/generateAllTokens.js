const { signAtsSession } = require("./signAtsSession");
const presets = require("./presets/permissions");

// Replace with your installation UUID
const installationUuid = "00000000-0000-0000-0000-000000000000";

// Replace with real user IDs when integrating
function fakeUser(id) {
  return { id: `user-${id}` };
}

function generateAll() {
  const tokens = {};

  tokens.Community = signAtsSession(
    fakeUser(1).id,
    "Community",
    "KubatanaDistrict",
    installationUuid,
    null,
    presets.Community
  );

  tokens.CommunityMember = signAtsSession(
    fakeUser(2).id,
    "CommunityMember",
    "KubatanaDistrict",
    installationUuid,
    null,
    presets.CommunityMember
  );

  tokens.Miner = signAtsSession(
    fakeUser(3).id,
    "Miner",
    "DinsonSteel",
    installationUuid,
    null,
    presets.Miner
  );

  tokens.Supplier = signAtsSession(
    fakeUser(4).id,
    "Supplier",
    "CementSuppliers",
    installationUuid,
    null,
    presets.Supplier
  );

  tokens.Insurance = signAtsSession(
    fakeUser(5).id,
    "Insurance",
    "NyaradzoInsurance",
    installationUuid,
    null,
    presets.Insurance
  );

  tokens.Bank = signAtsSession(
    fakeUser(6).id,
    "Bank",
    "BankABC",
    installationUuid,
    null,
    presets.Bank
  );

  tokens.Government = signAtsSession(
    fakeUser(7).id,
    "Government",
    "MinistryOfMines",
    installationUuid,
    "MinistryOfMines",
    presets.Government
  );

  tokens.Transporter = signAtsSession(
    fakeUser(8).id,
    "Transporter",
    "TransportFederation",
    installationUuid,
    null,
    presets.Transporter
  );

  tokens.Landowner = signAtsSession(
    fakeUser(9).id,
    "Landowner",
    "BorrowdaleWest",
    installationUuid,
    null,
    presets.Landowner
  );

  tokens.Donor = signAtsSession(
    fakeUser(10).id,
    "Donor",
    "CommunitySupport",
    installationUuid,
    null,
    presets.Donor
  );

  tokens.Investor = signAtsSession(
    fakeUser(11).id,
    "Investor",
    "CapitalMarkets",
    installationUuid,
    null,
    presets.Investor
  );

  console.log(JSON.stringify(tokens, null, 2));
}

generateAll();
