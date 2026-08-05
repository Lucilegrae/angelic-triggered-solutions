export default function CrestViewer() {
  const categories = {
    "ATS Identity": [
      "/certificates/assets/ATS_Crest_HQ.png",
      "/certificates/assets/ats-crest.png",
      "/certificates/assets/ats-crest.svg",
      "/certificates/assets/ats-crest-raw.png",
      "/certificates/assets/crest.png",
    ],

    "Angelic · Covenant · Faith": [
      "/certificates/assets/Golden_Covenant.png",
      "/certificates/assets/golden-covenant.png",
      "/certificates/assets/In_Unity_Faith.png",
      "/certificates/assets/in-unity-faith.png",
      "/certificates/assets/in-unity-faith-raw.png",
      "/certificates/assets/unity_clean.png",
      "/certificates/assets/eternal_preservation_seal.png",
      "/certificates/assets/cosmic.png",
      "/certificates/assets/Cosmic_Frame.png",
    ],

    "Federation Seals": [
      "/certificates/assets/federation-seals/authentication/authentication-seal.jpeg",
      "/certificates/assets/federation-seals/authority/federation-authority-seal.jpeg",
      "/certificates/assets/federation-seals/corporate/ats-seal.jpeg",
      "/certificates/assets/federation-seals/corporate/pvt-ltd-crest.jpeg",
      "/certificates/assets/federation-seals/banking/banking-sector.jpeg",
      "/certificates/assets/federation-seals/community-members/community-members-sector.jpeg",
      "/certificates/assets/federation-seals/councils/councils-sector.jpeg",
      "/certificates/assets/federation-seals/government/government-sector.jpeg",
      "/certificates/assets/federation-seals/housing/housing-sector.jpeg",
      "/certificates/assets/federation-seals/insurance/insurance-sector.jpeg",
      "/certificates/assets/federation-seals/mining/mining-sector.jpeg",
      "/certificates/assets/federation-seals/suppliers/suppliers-sector.jpeg",
      "/certificates/assets/federation-seals/transport/transport-sector.jpeg",
      "/certificates/assets/federation-seals/veterans/veterans-sector.jpeg",
    ],

    "Sector Crests": [
      "/certificates/assets/BANKING.png",
      "/certificates/assets/BANKING .png",
      "/certificates/assets/CEMENT.png",
      "/certificates/assets/CEMENT .png",
      "/certificates/assets/COMMUNITY.png",
      "/certificates/assets/COUNCILS.png",
      "/certificates/assets/GOVERNMENT.png",
      "/certificates/assets/HOUSING.png",
      "/certificates/assets/INSURANCE.png",
      "/certificates/assets/LANDOWNERS.png",
      "/certificates/assets/MINERS.png",
      "/certificates/assets/PARTNERS.png",
      "/certificates/assets/STEEL.png",
      "/certificates/assets/VETERANS.png",
    ],

    "Certificate Frames & Bases": [
      "/certificates/assets/frame.png",
      "/certificates/assets/Golden_Frame.png",
      "/certificates/assets/Parchment_Background.png",
      "/certificates/assets/parchment.png",
      "/certificates/assets/certificate_base.png",
      "/certificates/assets/certificate_base.jpg",
      "/certificates/assets/golden_star.png",
      "/certificates/assets/golden_star_crest.png",
    ],
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">ATS Crest Viewer</h1>

      {Object.entries(categories).map(([category, paths]) => (
        <section key={category} className="mb-12">
          <h2 className="text-xl font-semibold mb-4">{category}</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {paths.map((path) => (
              <div key={path} className="border border-slate-700 p-4 rounded-lg bg-slate-900/40">
                <img src={path} alt={path} className="w-full h-auto mb-2" />
                <p className="text-xs text-slate-400 break-all">{path}</p>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
