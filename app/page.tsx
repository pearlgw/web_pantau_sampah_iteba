import AboutPage from "@/components/about/page";
import ContentSampah from "@/components/contentsampah/page";
import Footer from "@/components/footer/page";
import JumbotronPage from "@/components/jumbotron/page";
import PerangkatIoT from "@/components/perangkat/page";

export default function Home() {
  return (
    <>
      <JumbotronPage />
      <AboutPage />
      <ContentSampah />
      <PerangkatIoT />
      <Footer />
    </>
  );
}
