import { Card, CardContent } from "@/components/ui/card";
import { Award, Shield, Leaf, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCMSPage } from "@/hooks/useCMSPage";
import { Skeleton } from "@/components/ui/skeleton";
import engTomImage from "@/assets/eng-tom-illa.jpg";
import buildingOngoing1 from "@/assets/project-building-ongoing-1.jpg";
import roadImage2 from "@/assets/project-road-2.jpg";
import drainageImage1 from "@/assets/project-drainage-1.jpg";

const About = () => {
  const { loading, getContent } = useCMSPage("about");

  // Get CMS content with fallbacks
  const hero = getContent("hero", { label: "Our Story", title: "About Toval", subtitle: "Building Excellence Since Day One" });
  const profile = getContent("profile", { label: "Company Profile", title: "A Legacy of Engineering Excellence", paragraphs: [] });
  const mission = getContent("mission", { title: "Our Mission", description: "" });
  const vision = getContent("vision", { title: "Our Vision", description: "" });
  const imageBreak = getContent("imageBreak", { label: "Since Establishment", title: "Trusted by Clients Across Kenya" });
  const leadership = getContent("leadership", { label: "Meet Our Leader", title: "Leadership", name: "Eng. Tom Illa", role: "Director", bio: "" });
  const safety = getContent("safety", { label: "Our Standards", title: "Safety & Quality", safetyItems: [], qualityItems: [] });
  const sustainability = getContent("sustainability", { label: "Environmental Responsibility", title: "Sustainability", description: "", pillars: [] });

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <Skeleton className="h-[50vh] w-full" />
        <div className="container mx-auto px-4 py-20">
          <Skeleton className="h-12 w-64 mx-auto mb-8" />
          <Skeleton className="h-96" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Magazine-Style Hero */}
      <section 
        className="h-[50vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${buildingOngoing1})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <p className="text-primary-foreground/80 uppercase tracking-[0.3em] text-sm mb-4">{hero.label}</p>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">{hero.title}</h1>
          <div className="w-24 h-1 bg-primary mb-4" />
          <p className="text-xl text-primary-foreground/90">{hero.subtitle}</p>
        </div>
      </section>

      {/* Company Profile - Magazine Style */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">{profile.label}</p>
                <h2 className="text-4xl font-bold mb-6 leading-tight">{profile.title}</h2>
                <div className="w-16 h-1 bg-primary mb-6" />
              </div>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                {(profile.paragraphs?.length ? profile.paragraphs : [
                  "Toval Engineering Contractors is a leading civil engineering firm based in Kisumu, Kenya. We specialize in delivering comprehensive infrastructure solutions that meet the highest standards of quality, safety, and innovation.",
                  "With a strong commitment to professionalism and engineering excellence, we serve clients across Kenya, from government entities to private developers."
                ]).map((paragraph: string, idx: number) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Values - Magazine Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <Target className="h-12 w-12 text-primary mb-6" />
                  <h3 className="text-2xl font-bold mb-4">{mission.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {mission.description || "To deliver exceptional construction and engineering services that exceed client expectations through innovation, quality, and professionalism."}
                  </p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <Award className="h-12 w-12 text-primary mb-6" />
                  <h3 className="text-2xl font-bold mb-4">{vision.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {vision.description || "To be the most trusted and innovative civil engineering firm in Kenya, setting new standards for infrastructure development."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Full-Width Image Break */}
      <section 
        className="h-[40vh] bg-cover bg-center bg-fixed relative"
        style={{ backgroundImage: `url(${roadImage2})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <p className="uppercase tracking-[0.3em] text-sm mb-4">{imageBreak.label}</p>
            <h2 className="text-4xl md:text-5xl font-bold">{imageBreak.title}</h2>
          </div>
        </div>
      </section>

      {/* Leadership - Magazine Style */}
      <section id="leadership" className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">{leadership.label}</p>
            <h2 className="text-4xl font-bold mb-4">{leadership.title}</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
          <div className="max-w-3xl mx-auto">
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-2">
                  <img 
                    src={engTomImage} 
                    alt={leadership.name}
                    className="w-full h-80 md:h-full object-cover"
                  />
                  <div className="p-8 flex flex-col justify-center">
                    <h3 className="text-3xl font-bold mb-2">{leadership.name}</h3>
                    <p className="text-primary font-semibold text-lg mb-6">{leadership.role}</p>
                    <p className="text-muted-foreground leading-relaxed">
                      {leadership.bio || "Eng. Tom Illa is an experienced civil engineer with extensive expertise in structural design, project management, and infrastructure development. Under his leadership, Toval has become known for delivering high-quality construction projects across Kenya."}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety & Quality - Magazine Style */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">{safety.label}</p>
              <h2 className="text-4xl font-bold mb-4">{safety.title}</h2>
              <div className="w-24 h-1 bg-primary mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <Shield className="h-12 w-12 text-primary mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Safety First</h3>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    {(safety.safetyItems?.length ? safety.safetyItems : [
                      "Zero-incident safety culture",
                      "Regular safety training programs",
                      "Compliance with all safety regulations",
                      "Modern safety equipment for all workers"
                    ]).map((item: string, idx: number) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <Award className="h-12 w-12 text-primary mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Quality Assurance</h3>
                  <ul className="space-y-3 text-muted-foreground leading-relaxed">
                    {(safety.qualityItems?.length ? safety.qualityItems : [
                      "Compliance with Kenyan building codes",
                      "Rigorous material testing",
                      "Quality control at every stage",
                      "Engineering standards certification"
                    ]).map((item: string, idx: number) => (
                      <li key={idx}>• {item}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability - Magazine Style */}
      <section 
        className="py-24 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${drainageImage1})` }}
      >
        <div className="absolute inset-0 bg-primary/90" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-primary-foreground">
            <Leaf className="h-16 w-16 mx-auto mb-6" />
            <p className="uppercase tracking-[0.3em] text-sm mb-4 opacity-80">{sustainability.label}</p>
            <h2 className="text-4xl font-bold mb-6">{sustainability.title}</h2>
            <div className="w-24 h-1 bg-primary-foreground mx-auto mb-8" />
            <p className="text-xl mb-12 opacity-90 leading-relaxed">
              {sustainability.description || "We are committed to environmentally responsible construction practices. Our approach includes efficient waste management, sustainable material sourcing, and active community engagement in all our projects."}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {(sustainability.pillars?.length ? sustainability.pillars : [
                { title: "Environmental Care", description: "Minimizing environmental impact through responsible practices" },
                { title: "Waste Management", description: "Efficient waste disposal and recycling systems" },
                { title: "Community Engagement", description: "Working closely with local communities" }
              ]).map((pillar: { title: string; description: string }, idx: number) => (
                <Card key={idx} className="border-0 bg-background/10 backdrop-blur">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2 text-primary-foreground">{pillar.title}</h3>
                    <p className="text-sm text-primary-foreground/80">
                      {pillar.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
