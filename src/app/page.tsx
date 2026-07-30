import { StarfieldBackdrop } from "@/components/StarfieldBackdrop";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { TransparencySection } from "@/components/TransparencySection";
import { ParitySection } from "@/components/ParitySection";
import { VideoLibrary } from "@/components/VideoLibrary";
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
        <TransparencySection />
        <SectionDivider />
        <VideoLibrary />
        <ParitySection />
        <GetStartedSection />
      </main>
      <Footer />
      <PWARegister />
    </>
  );
}
