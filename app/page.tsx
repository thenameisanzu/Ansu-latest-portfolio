import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Work from "@/components/Work";
import Skills from "@/components/Skills";
import BehindTheScenes from "@/components/BehindTheScenes";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import AethraSection from "@/components/AethraSection";
import Contact from "@/components/Contact";
import BackToTop from "@/components/BackToTop";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Services />
        <Work />
        <BehindTheScenes />
        <Skills />
        <Testimonials />
        <FAQ />
        <AethraSection />
        <Contact />
      </main>
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}

