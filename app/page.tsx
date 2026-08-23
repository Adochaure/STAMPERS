import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Signup from "@/components/Signup";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Signup />

    </main>
  );
}
