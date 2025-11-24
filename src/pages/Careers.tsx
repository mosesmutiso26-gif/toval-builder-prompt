import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Construction } from "lucide-react";

const Careers = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Careers</h1>
          <p className="text-xl opacity-90">Building Careers, Building Kenya</p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-32">
        <div className="container mx-auto px-4 text-center">
          <Construction className="h-24 w-24 mx-auto mb-6 text-primary" />
          <h2 className="text-4xl font-bold mb-4">Coming Soon</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We're building something exciting! Our careers page will be available soon with opportunities to join our engineering team.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
