import { StarfieldBackdrop } from "@/components/StarfieldBackdrop";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { ProofSection } from "@/components/ProofSection";
import { CapabilitiesGrid } from "@/components/CapabilitiesGrid";
import { ObserveSection } from "@/components/ObserveSection";
import { EmbedSection } from "@/components/EmbedSection";
import { VideoSection } from "@/components/VideoSection";
import { GetStartedSection } from "@/components/GetStartedSection";
import { Footer } from "@/components/Footer";
import { PWARegister } from "@/components/PWARegister";
import { SectionDivider } from "@/components/SectionDivider";

export default function Home() {
  return (
    <>
      <StarfieldBackdrop />
      <div className="pointer-events-none fixed inset-0 -z-10 grid-paper" aria-hidden />
      <Nav />
      <main className="relative">
        <Hero />
        <SectionDivider />
        <ProofSection />
        <CapabilitiesGrid />
        <SectionDivider />
        <ObserveSection />
        <EmbedSection />
        <SectionDivider />
        <VideoSection />
        <GetStartedSection />
      </main>
      <Footer />
      <PWARegister />
    </>
  );
}
