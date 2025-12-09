import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, HardHat, Construction, Droplet, MapPin, Award, LucideIcon } from "lucide-react";
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
import buildingOngoing1 from "@/assets/project-building-ongoing-1.jpg";
import buildingOngoing2 from "@/assets/project-building-ongoing-2.jpg";
import buildingOngoing3 from "@/assets/project-building-ongoing-3.jpg";
import siteSurvey from "@/assets/project-site-survey.jpg";

// Icon mapping for dynamic rendering
const iconMap: Record<string, LucideIcon> = {
  HardHat,
  Building2,
  Construction,
  Droplet,
  MapPin,
  Award,
};

// Default image mapping for services
const serviceImages = [roadImage1, buildingImage, drainageImage1, drainageImage2, siteSurvey, buildingOngoing2];
const featuredImages = [roadImage1, buildingImage, drainageImage1, buildingOngoing1];

interface HeroContent {
  location: string;
  title: string;
  subtitle: string;
  cta_primary_text: string;
  cta_primary_link: string;
  cta_secondary_text: string;
  cta_secondary_link: string;
}

interface AboutContent {
  label: string;
  title: string;
  paragraph1: string;
  paragraph2: string;
  cta_text: string;
  cta_link: string;
}

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

interface ServicesContent {
  label: string;
  title: string;
  items: ServiceItem[];
}

interface ImageBreakContent {
  label: string;
  title: string;
}

interface WhyChooseItem {
  title: string;
  description: string;
}

interface WhyChooseUsContent {
  label: string;
  title: string;
  items: WhyChooseItem[];
}

interface CTAContent {
  label: string;
  title: string;
  subtitle: string;
  button_text: string;
  button_link: string;
}

interface FeaturedProject {
  title: string;
  category: string;
}

// Default content as fallback
const defaultHero: HeroContent = {
  location: "Kisumu, Kenya",
  title: "Improving Your Built Environment",
  subtitle: "Toval Engineering Contractors delivers durable, safe, and innovative infrastructure solutions across Kenya.",
  cta_primary_text: "Our Services",
  cta_primary_link: "/services",
  cta_secondary_text: "Call: 0700 325 637",
  cta_secondary_link: "tel:0700325637",
};

const defaultAbout: AboutContent = {
  label: "About Our Company",
  title: "Building Kenya's Tomorrow, Today",
  paragraph1: "Toval Engineering Contractors, led by Eng. Tom Illa, provides engineering, building, and construction solutions with a strong commitment to quality, safety, and client satisfaction.",
  paragraph2: "Based in Kisumu, we serve clients across Kenya with professional excellence in every project we undertake.",
  cta_text: "Learn More About Us",
  cta_link: "/about",
};

const defaultServices: ServicesContent = {
  label: "What We Do",
  title: "Our Key Services",
  items: [
    { icon: "HardHat", title: "Road Construction", description: "Professional road construction and maintenance services across Kenya" },
    { icon: "Building2", title: "Commercial & Residential Buildings", description: "Quality building construction from foundation to completion" },
    { icon: "Construction", title: "Bridges & Drainage Systems", description: "Expert engineering for bridges, culverts and drainage infrastructure" },
    { icon: "Droplet", title: "Water & Sewerage Works", description: "Complete water supply and sewerage system installations" },
    { icon: "MapPin", title: "Surveying & Site Preparation", description: "GPS surveying, drone mapping and comprehensive site preparation" },
    { icon: "Award", title: "Project Management", description: "End-to-end project management and construction supervision" },
  ],
};

const defaultImageBreak: ImageBreakContent = {
  label: "Our Equipment",
  title: "Modern Machinery for Quality Results",
};

const defaultWhyChooseUs: WhyChooseUsContent = {
  label: "Our Advantages",
  title: "Why Choose Toval",
  items: [
    { title: "Experienced Engineers", description: "Professional team with proven expertise" },
    { title: "High Safety Standards", description: "Zero-incident safety culture" },
    { title: "Modern Equipment", description: "State-of-the-art construction machinery" },
    { title: "On-time Delivery", description: "Committed to project timelines" },
    { title: "Quality Assurance", description: "Rigorous testing and quality control" },
    { title: "Transparent Communication", description: "Clear updates throughout the project" },
  ],
};

const defaultCTA: CTAContent = {
  label: "Get Started",
  title: "Get a Free Consultation Today",
  subtitle: "Let's discuss your next construction project and bring your vision to life",
  button_text: "Call 0700 325 637",
  button_link: "tel:0700325637",
};

const defaultFeaturedProjects: FeaturedProject[] = [
  { title: "Urban Road Network", category: "Road Construction" },
  { title: "Residential Project", category: "Building" },
  { title: "Drainage System", category: "Infrastructure" },
  { title: "Office Complex", category: "Ongoing" },
];

const Index = () => {
  const { getContent, loading } = useCMSPage("home");

  const hero = getContent<HeroContent>("hero", defaultHero);
  const about = getContent<AboutContent>("about", defaultAbout);
  const services = getContent<ServicesContent>("services", defaultServices);
  const imageBreak = getContent<ImageBreakContent>("imageBreak", defaultImageBreak);
  const whyChooseUs = getContent<WhyChooseUsContent>("whyChooseUs", defaultWhyChooseUs);
  const cta = getContent<CTAContent>("cta", defaultCTA);
  const featuredProjects = getContent<FeaturedProject[]>("featuredProjects", defaultFeaturedProjects);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="h-[70vh] bg-muted animate-pulse" />
        <div className="container mx-auto px-4 py-20">
          <Skeleton className="h-12 w-1/2 mx-auto mb-4" />
          <Skeleton className="h-6 w-3/4 mx-auto" />
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Magazine-Style Hero Section */}
      <section className="relative">
        <div 
          className="h-[70vh] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${roadImage1})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <p className="text-primary-foreground/80 uppercase tracking-[0.3em] text-sm mb-4">{hero.location}</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight max-w-5xl">
              {hero.title}
            </h1>
            <div className="w-24 h-1 bg-primary mb-6" />
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mb-8 leading-relaxed">
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <a href={hero.cta_primary_link}>{hero.cta_primary_text}</a>
              </Button>
              <Button size="lg" variant="outline" className="bg-background/10 text-primary-foreground border-primary-foreground/50 hover:bg-background hover:text-foreground" asChild>
                <a href={hero.cta_secondary_link}>{hero.cta_secondary_text}</a>
              </Button>
            </div>
          </div>
        </div>

        {/* Magazine Grid Below Hero */}
        <div className="container mx-auto px-4 -mt-20 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featuredProjects.map((project, index) => (
              <div key={index} className="group relative overflow-hidden aspect-square">
                <img 
                  src={featuredImages[index % featuredImages.length]} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-primary-foreground/70 text-xs uppercase tracking-wider">{project.category}</p>
                  <h3 className="text-primary-foreground font-semibold">{project.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Magazine-Style About Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">{about.label}</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{about.title}</h2>
              <div className="w-16 h-1 bg-primary mb-6" />
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {about.paragraph1}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {about.paragraph2}
              </p>
              <Button size="lg" asChild>
                <a href={about.cta_link}>{about.cta_text}</a>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src={buildingOngoing3} alt="Construction work" className="w-full h-64 object-cover" />
              <img src={roadImage2} alt="Road construction" className="w-full h-64 object-cover mt-8" />
              <img src={drainageImage2} alt="Drainage work" className="w-full h-64 object-cover -mt-8" />
              <img src={buildingOngoing2} alt="Building work" className="w-full h-64 object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Magazine-Style Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">{services.label}</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{services.title}</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.items.map((service, index) => {
              const IconComponent = iconMap[service.icon] || HardHat;
              return (
                <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={serviceImages[index % serviceImages.length]} 
                      alt={service.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <IconComponent className="absolute bottom-4 left-4 h-10 w-10 text-primary-foreground" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Full-Width Image Break */}
      <section 
        className="h-[50vh] bg-cover bg-center bg-fixed relative"
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

      {/* Why Choose Us - Magazine Grid */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">{whyChooseUs.label}</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{whyChooseUs.title}</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.items.map((item, index) => (
              <Card key={index} className="border-0 bg-card/50 backdrop-blur">
                <CardContent className="p-8">
                  <span className="text-5xl font-bold text-primary/20">0{index + 1}</span>
                  <h3 className="text-xl font-bold mt-2 mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Magazine Style */}
      <section 
        className="py-24 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${buildingImage})` }}
      >
        <div className="absolute inset-0 bg-primary/90" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-primary-foreground/80 uppercase tracking-[0.3em] text-sm mb-4">{cta.label}</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
            {cta.title}
          </h2>
          <div className="w-24 h-1 bg-primary-foreground mx-auto mb-6" />
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            {cta.subtitle}
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href={cta.button_link}>{cta.button_text}</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
