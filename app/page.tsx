import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Signup from "@/components/Signup";
import Footer from "@/components/Footer";
import Page3 from "@/components/Page3";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Signup />
      <Footer />
      <Page3 />
    </main>
  );
}
