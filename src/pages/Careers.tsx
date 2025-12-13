import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Construction } from "lucide-react";
import { useCMSPage } from "@/hooks/useCMSPage";
import { Skeleton } from "@/components/ui/skeleton";

const Careers = () => {
  const { loading, getContent } = useCMSPage("careers");

  const hero = getContent("hero", { title: "Careers", subtitle: "Building Careers, Building Kenya" });
  const comingSoon = getContent("comingSoon", { 
    title: "Coming Soon", 
    description: "We're building something exciting! Our careers page will be available soon with opportunities to join our engineering team." 
  });

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <Skeleton className="h-12 w-48 mx-auto mb-4 bg-primary-foreground/20" />
            <Skeleton className="h-6 w-64 mx-auto bg-primary-foreground/20" />
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{hero.title}</h1>
          <p className="text-xl opacity-90">{hero.subtitle}</p>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-32">
        <div className="container mx-auto px-4 text-center">
          <Construction className="h-24 w-24 mx-auto mb-6 text-primary" />
          <h2 className="text-4xl font-bold mb-4">{comingSoon.title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {comingSoon.description}
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
