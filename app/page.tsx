import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { LatestDrop } from '@/components/pencil/LatestDrop';
import { Difference } from '@/components/Difference';
import { Problem } from '@/components/Problem';
import { OfficeSection } from '@/components/office/OfficeSection';
import { NodeSection } from '@/components/architecture/NodeSection';
import { SystemSection } from '@/components/architecture/SystemSection';
import { Scenario } from '@/components/Scenario';
import { UseCases } from '@/components/UseCases';
import { Founder } from '@/components/Founder';
import { FlightSheetSection } from '@/components/flight-sheet/FlightSheetSection';
import { Services } from '@/components/Services';
import { GoDeeper } from '@/components/GoDeeper';
import { VaultSection } from '@/components/architecture/VaultSection';
import { IdentitySection } from '@/components/identity/IdentitySection';
import { ValidatorProvider } from '@/components/validation/ValidatorContext';
import { ValidatorSection } from '@/components/validation/ValidatorSection';
import { Expertise } from '@/components/Expertise';
import { Faq } from '@/components/Faq';
import { FinalCta } from '@/components/FinalCta';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        {/* One set of hypothetical inputs drives the sample Flight Sheet (08), the receipt (11) and the validator (12). */}
        <ValidatorProvider>
          {/* Overview: what BullNet does, the Office, the Node, how they connect, examples, founder, Flight Sheet. */}
          <Hero />
          <LatestDrop />
          <Difference />
          <Problem />
          <OfficeSection />
          <NodeSection />
          <SystemSection />
          <Scenario />
          <UseCases />
          <Founder />
          <FlightSheetSection />
          <Services />
          {/* Technical layer. */}
          <GoDeeper />
          <VaultSection />
          <IdentitySection />
          <ValidatorSection />
          <Expertise />
          <Faq />
          <FinalCta />
        </ValidatorProvider>
      </main>
      <Footer />
    </>
  );
}
