import About from "@/components/About/About";
import BestSellers from "../_components/BestSellers";
import Hero from "../_components/Hero";
import Contact from "@/components/Contact/Contact";
// import { db } from "@/lib/prisma";

export default async function Home() {
  // await db.size.deleteMany();
  // await db.extra.deleteMany();
  // await db.orderProduct.deleteMany();
  // await db.product.deleteMany();
  // await db.category.deleteMany();

  return (
      <main >
        <Hero/>
        <BestSellers/>
        <About/>
        <Contact/>
      </main>
  );
}
