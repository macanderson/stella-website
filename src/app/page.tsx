import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { MechanismsSection } from "@/components/MechanismsSection";
import { Recordings } from "@/components/Recordings";
import { SwitchingSection } from "@/components/SwitchingSection";
import { InstallSection } from "@/components/InstallSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-brand-deep focus:px-4 focus:py-2 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <MechanismsSection />
        <Recordings />
        <SwitchingSection />
        <InstallSection />
      </main>
      <Footer />
    </>
  );
}
