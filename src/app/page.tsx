import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Carousel from "@/components/Carousel";
import Services from "@/components/Services";
import About from "@/components/About";
import Founder from "@/components/Founder";
import Contact from "@/components/Contact";
import JoinTeam from "@/components/JoinTeam";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import { getPortfolioConfig } from "@/lib/storage";

export const dynamic = "force-dynamic";

export default async function Home() {
  const config = await getPortfolioConfig();
  const activeProjects = config.projects.filter((p) => p.enabled && p.image);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Portfolio projects={activeProjects} />
        <Carousel projects={activeProjects} />
        <Services />
        <About />
        <Founder />
        <JoinTeam />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </>
  );
}
