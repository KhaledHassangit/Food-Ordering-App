import About from "@/components/About/About";
import BestSellers from "./_components/BestSellers";
import Hero from "./_components/Hero";
import Contact from "@/components/Contact/Contact";

export default async  function Home() {




  return (
      <main >
        <Hero/>
        <BestSellers/>
        <About/>
        <Contact/>
      </main>
  );
}
