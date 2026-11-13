import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Difference } from '@/components/Difference';
import { Problem } from '@/components/Problem';
import { SystemSection } from '@/components/architecture/SystemSection';
import { VaultSection } from '@/components/architecture/VaultSection';
import { IdentitySection } from '@/components/identity/IdentitySection';
import { NodeSection } from '@/components/architecture/NodeSection';
import { ValidatorProvider } from '@/components/validation/ValidatorContext';
import { ValidatorSection } from '@/components/validation/ValidatorSection';
import { Expertise } from '@/components/Expertise';
import { FlightSheetSection } from '@/components/flight-sheet/FlightSheetSection';
import { Founder } from '@/components/Founder';
import { Services } from '@/components/Services';
import { Faq } from '@/components/Faq';
import { FinalCta } from '@/components/FinalCta';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main id="top">
        {/* One set of hypothetical inputs drives the receipt (06), the validator (08) and the sample Flight Sheet (10). */}
        <ValidatorProvider>
          <Hero />
          <Difference />
          <Problem />
          <SystemSection />
          <VaultSection />
          <IdentitySection />
          <NodeSection />
          <ValidatorSection />
          <Expertise />
          <FlightSheetSection />
          <Founder />
          <Services />
          <Faq />
          <FinalCta />
        </ValidatorProvider>
      </main>
      <Footer />
    </>
  );
}
