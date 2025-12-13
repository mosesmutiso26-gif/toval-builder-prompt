import { Card, CardContent } from "@/components/ui/card";
import { HardHat, Building2, Construction, Droplet, MapPin, ClipboardCheck, Hammer, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCMSPage } from "@/hooks/useCMSPage";
import { Skeleton } from "@/components/ui/skeleton";

// Real project images
import roadImage1 from "@/assets/project-road-1.jpg";
import roadImage2 from "@/assets/project-road-2.jpg";
import roadImage3 from "@/assets/project-road-3.jpg";
import buildingImage from "@/assets/project-building-1.jpg";
import drainageImage1 from "@/assets/project-drainage-1.jpg";
import drainageImage2 from "@/assets/project-drainage-2.jpg";
import buildingOngoing2 from "@/assets/project-building-ongoing-2.jpg";
import siteSurvey from "@/assets/project-site-survey.jpg";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "Surveying": MapPin,
  "Material Testing": ClipboardCheck,
  "Project Management": Users,
};

const Services = () => {
  const { loading, getContent } = useCMSPage("services");

  // Get CMS content with fallbacks
  const hero = getContent("hero", { label: "What We Do", title: "Our Services", subtitle: "Comprehensive Civil Engineering and Construction Solutions" });
  const civilEngineering = getContent("civilEngineering", { label: "Core Expertise", title: "Civil Engineering", services: [], additionalServices: [] });
  const imageBreak = getContent("imageBreak", { label: "Quality Equipment", title: "Modern Machinery for Every Project" });
  const buildingConstruction = getContent("buildingConstruction", { label: "Construction Services", title: "Building Construction", services: [] });
  const specializedServices = getContent("specializedServices", { label: "Additional Expertise", title: "Specialized Services", services: [] });
  const industries = getContent("industries", { label: "Our Clients", title: "Industries We Serve", list: ["Government", "Real Estate", "NGOs", "Private Developers", "Commercial"] });

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <Skeleton className="h-[50vh] w-full" />
        <div className="container mx-auto px-4 py-20">
          <Skeleton className="h-12 w-64 mx-auto mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="h-96" />
            <Skeleton className="h-96" />
          </div>
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
        style={{ backgroundImage: `url(${roadImage1})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <p className="text-primary-foreground/80 uppercase tracking-[0.3em] text-sm mb-4">{hero.label}</p>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">{hero.title}</h1>
          <div className="w-24 h-1 bg-primary mb-4" />
          <p className="text-xl text-primary-foreground/90 max-w-2xl">{hero.subtitle}</p>
        </div>
      </section>

      {/* Civil Engineering - Magazine Style */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">{civilEngineering.label}</p>
            <h2 className="text-4xl font-bold mb-4">{civilEngineering.title}</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="group">
              <div className="relative overflow-hidden mb-6">
                <img src={roadImage2} alt="Road Construction" className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <HardHat className="absolute bottom-4 left-4 h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{civilEngineering.services?.[0]?.title || "Road Construction"}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {civilEngineering.services?.[0]?.description || "Professional road construction and maintenance services including highway development, urban road networks, and rural access roads."}
              </p>
              <ul className="space-y-2 text-muted-foreground">
                {(civilEngineering.services?.[0]?.items || ["Asphalt and concrete paving", "Road rehabilitation and maintenance", "Traffic management systems", "Quality material testing"]).map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>

            <div className="group">
              <div className="relative overflow-hidden mb-6">
                <img src={drainageImage1} alt="Bridge and Drainage" className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Construction className="absolute bottom-4 left-4 h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">{civilEngineering.services?.[1]?.title || "Bridges & Drainage Systems"}</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                {civilEngineering.services?.[1]?.description || "Expert engineering for bridges, culverts, and comprehensive drainage infrastructure."}
              </p>
              <ul className="space-y-2 text-muted-foreground">
                {(civilEngineering.services?.[1]?.items || ["Bridge design and construction", "Culvert installations", "Storm water drainage systems", "Flood control structures"]).map((item: string, idx: number) => (
                  <li key={idx}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img src={drainageImage2} alt="Water Works" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Droplet className="absolute bottom-4 left-4 h-8 w-8 text-primary-foreground" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">{civilEngineering.additionalServices?.[0]?.title || "Water & Sewerage Works"}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {(civilEngineering.additionalServices?.[0]?.items || ["Water supply systems installation", "Sewerage network construction", "Treatment plant works", "Pipeline laying and testing"]).map((item: string, idx: number) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img src={buildingOngoing2} alt="Structural Engineering" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Hammer className="absolute bottom-4 left-4 h-8 w-8 text-primary-foreground" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">{civilEngineering.additionalServices?.[1]?.title || "Structural Engineering"}</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {(civilEngineering.additionalServices?.[1]?.items || ["Structural design and analysis", "Foundation engineering", "Site preparation and earthworks", "Concrete and steel structures"]).map((item: string, idx: number) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Full-Width Image Break */}
      <section 
        className="h-[40vh] bg-cover bg-center bg-fixed relative"
        style={{ backgroundImage: `url(${roadImage3})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <p className="uppercase tracking-[0.3em] text-sm mb-4">{imageBreak.label}</p>
            <h2 className="text-4xl md:text-5xl font-bold">{imageBreak.title}</h2>
          </div>
        </div>
      </section>

      {/* Building Construction - Magazine Style */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 grid grid-cols-2 gap-4">
              <img src={buildingImage} alt="Building Construction" className="w-full h-64 object-cover" />
              <img src={siteSurvey} alt="Site Survey" className="w-full h-64 object-cover mt-8" />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">{buildingConstruction.label}</p>
              <h2 className="text-4xl font-bold mb-6 leading-tight">{buildingConstruction.title}</h2>
              <div className="w-16 h-1 bg-primary mb-6" />
              <div className="space-y-6">
                {(buildingConstruction.services || [
                  { title: "Residential Developments", description: "Quality housing construction from single-family homes to multi-unit residential complexes." },
                  { title: "Commercial Buildings", description: "Office buildings, retail spaces, warehouses, and industrial facilities." },
                  { title: "Institutional Buildings", description: "Schools, hospitals, government buildings, and community facilities." }
                ]).map((service: { title: string; description: string }, idx: number) => (
                  <div key={idx}>
                    <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Services - Magazine Style */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">{specializedServices.label}</p>
            <h2 className="text-4xl font-bold mb-4">{specializedServices.title}</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(specializedServices.services || [
              { title: "Surveying", items: ["GPS and Total Station surveying", "Drone mapping and aerial surveys", "Topographic surveys", "Land subdivision"] },
              { title: "Material Testing", items: ["Concrete quality testing", "Soil analysis and testing", "Aggregate testing", "Material certification"] },
              { title: "Project Management", items: ["End-to-end project management", "Construction supervision", "Cost estimation and budgeting", "Progress monitoring and reporting"] }
            ]).map((service: { title: string; items: string[] }, idx: number) => {
              const IconComponent = iconMap[service.title] || MapPin;
              return (
                <Card key={idx} className="border-0 shadow-lg">
                  <CardContent className="p-8">
                    <IconComponent className="h-12 w-12 text-primary mb-6" />
                    <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      {service.items.map((item: string, itemIdx: number) => (
                        <li key={itemIdx}>• {item}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Served - Magazine Style */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">{industries.label}</p>
            <h2 className="text-4xl font-bold mb-4">{industries.title}</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {(industries.list || ['Government', 'Real Estate', 'NGOs', 'Private Developers', 'Commercial']).map((industry: string, index: number) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <span className="text-4xl font-bold text-primary/20">0{index + 1}</span>
                  <p className="font-bold mt-2">{industry}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
