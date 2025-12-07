import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, HardHat, Construction, Droplet, MapPin, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

const Index = () => {
  const services = [
    {
      icon: HardHat,
      title: "Road Construction",
      description: "Professional road construction and maintenance services across Kenya",
      image: roadImage1,
    },
    {
      icon: Building2,
      title: "Commercial & Residential Buildings",
      description: "Quality building construction from foundation to completion",
      image: buildingImage,
    },
    {
      icon: Construction,
      title: "Bridges & Drainage Systems",
      description: "Expert engineering for bridges, culverts and drainage infrastructure",
      image: drainageImage1,
    },
    {
      icon: Droplet,
      title: "Water & Sewerage Works",
      description: "Complete water supply and sewerage system installations",
      image: drainageImage2,
    },
    {
      icon: MapPin,
      title: "Surveying & Site Preparation",
      description: "GPS surveying, drone mapping and comprehensive site preparation",
      image: siteSurvey,
    },
    {
      icon: Award,
      title: "Project Management",
      description: "End-to-end project management and construction supervision",
      image: buildingOngoing2,
    },
  ];

  const featuredProjects = [
    { image: roadImage1, title: "Urban Road Network", category: "Road Construction" },
    { image: buildingImage, title: "Residential Project", category: "Building" },
    { image: drainageImage1, title: "Drainage System", category: "Infrastructure" },
    { image: buildingOngoing1, title: "Office Complex", category: "Ongoing" },
  ];

  const whyChooseUs = [
    { title: "Experienced Engineers", description: "Professional team with proven expertise" },
    { title: "High Safety Standards", description: "Zero-incident safety culture" },
    { title: "Modern Equipment", description: "State-of-the-art construction machinery" },
    { title: "On-time Delivery", description: "Committed to project timelines" },
    { title: "Quality Assurance", description: "Rigorous testing and quality control" },
    { title: "Transparent Communication", description: "Clear updates throughout the project" },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Magazine-Style Hero Section */}
      <section className="relative">
        {/* Main Hero Image */}
        <div 
          className="h-[70vh] bg-cover bg-center relative"
          style={{ backgroundImage: `url(${roadImage1})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
            <p className="text-primary-foreground/80 uppercase tracking-[0.3em] text-sm mb-4">Kisumu, Kenya</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight max-w-5xl">
              Improving Your Built Environment
            </h1>
            <div className="w-24 h-1 bg-primary mb-6" />
            <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mb-8 leading-relaxed">
              Toval Engineering Contractors delivers durable, safe, and innovative infrastructure solutions across Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" asChild>
                <a href="/services">Our Services</a>
              </Button>
              <Button size="lg" variant="outline" className="bg-background/10 text-primary-foreground border-primary-foreground/50 hover:bg-background hover:text-foreground" asChild>
                <a href="tel:0700325637">Call: 0700 325 637</a>
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
                  src={project.image} 
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
              <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">About Our Company</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Building Kenya's Tomorrow, Today</h2>
              <div className="w-16 h-1 bg-primary mb-6" />
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Toval Engineering Contractors, led by Eng. Tom Illa, provides engineering, building, and construction solutions with a strong commitment to quality, safety, and client satisfaction.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Based in Kisumu, we serve clients across Kenya with professional excellence in every project we undertake.
              </p>
              <Button size="lg" asChild>
                <a href="/about">Learn More About Us</a>
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
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">What We Do</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Key Services</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <service.icon className="absolute bottom-4 left-4 h-10 w-10 text-primary-foreground" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
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
            <p className="uppercase tracking-[0.3em] text-sm mb-4">Our Equipment</p>
            <h2 className="text-4xl md:text-5xl font-bold">Modern Machinery for Quality Results</h2>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Magazine Grid */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">Our Advantages</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Toval</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
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
          <p className="text-primary-foreground/80 uppercase tracking-[0.3em] text-sm mb-4">Get Started</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-primary-foreground">
            Get a Free Consultation Today
          </h2>
          <div className="w-24 h-1 bg-primary-foreground mx-auto mb-6" />
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Let's discuss your next construction project and bring your vision to life
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href="tel:0700325637">Call 0700 325 637</a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
