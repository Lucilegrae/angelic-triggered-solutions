import CosmicHeader from "@/components/cosmic/CosmicHeader";
import CosmicPage from "@/components/cosmic/CosmicPage";
import CosmicInput from "@/components/cosmic/CosmicInput";
import CosmicButton from "@/components/cosmic/CosmicButton";

// FIXED: Certificate components now imported from src/lib/cosmic
import CosmicCertificateAnimation from "@/lib/cosmic/CosmicCertificateAnimation";
import CosmicCertificateForge from "@/lib/cosmic/CosmicCertificateForge";
import CosmicCertificateScroll from "@/lib/cosmic/CosmicCertificateScroll";
import CosmicCertificateForgeV2 from "@/lib/cosmic/CosmicCertificateForgeV2";
import CosmicCertificateAscension from "@/lib/cosmic/CosmicCertificateAscension";
import CosmicCertificateAscensionRitual from "@/lib/cosmic/CosmicCertificateAscensionRitual";
import CosmicCertificateEternal from "@/lib/cosmic/CosmicCertificateEternal";
import CosmicCelestialRelic from "@/lib/cosmic/CosmicCelestialRelic";

export default function IssueCertificate() {
  return (
    <CosmicPage className="cosmic-certificates">
      <CosmicHeader title="Issue Certificate" className="cosmic-certificates" />

      {/* Input Fields */}
      <CosmicInput label="Member ID" placeholder="Enter member ID" />
      <CosmicInput label="Certificate Type" placeholder="e.g. COMMUNITY, GOVERNMENT" />
      <CosmicInput label="Issued By" placeholder="Officer Name" />

      <CosmicButton onClick={() => alert("Certificate Issued")}>
        Issue Certificate
      </CosmicButton>

      {/* After issuing certificate */}
      <div className="mt-10 space-y-10">

        <CosmicCertificateAnimation>
          <div className="text-yellow-300 text-xl font-bold">
            Certificate Issued Successfully
          </div>
        </CosmicCertificateAnimation>

        <CosmicCertificateForge type="COMMUNITY" />

        <CosmicCertificateScroll>
          <div className="text-yellow-300 text-xl font-bold">
            Certificate Ready
          </div>
        </CosmicCertificateScroll>

        <CosmicCertificateForgeV2 type="COMMUNITY" />

        <CosmicCertificateAscension>
          <div className="text-yellow-300 text-xl font-bold">
            Certificate Ascended
          </div>
        </CosmicCertificateAscension>

        <CosmicCertificateAscensionRitual>
          <div className="text-yellow-300 text-2xl font-bold">
            Certificate Ascended Into the Celestial Continuum
          </div>
        </CosmicCertificateAscensionRitual>

        <CosmicCertificateEternal>
          <div className="text-yellow-300 text-3xl font-bold">
            Certificate Ascended Into Eternal Continuum
          </div>
        </CosmicCertificateEternal>

        <CosmicCelestialRelic>
          <div className="text-yellow-300 text-3xl font-bold">
            Sacred Certificate Relic Forged
          </div>
        </CosmicCelestialRelic>

      </div>
    </CosmicPage>
  );
}
