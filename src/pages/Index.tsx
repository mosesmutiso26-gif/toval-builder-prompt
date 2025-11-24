import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, HardHat, Construction, Droplet, MapPin, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-construction.jpg";
import buildingImage from "@/assets/building-construction.jpg";
import roadImage from "@/assets/road-construction.jpg";
import bridgeImage from "@/assets/bridge-construction.jpg";

const Index = () => {
  const services = [
    {
      icon: HardHat,
      title: "Road Construction",
      description: "Professional road construction and maintenance services across Kenya",
      image: roadImage,
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
      image: bridgeImage,
    },
    {
      icon: Droplet,
      title: "Water & Sewerage Works",
      description: "Complete water supply and sewerage system installations",
    },
    {
      icon: MapPin,
      title: "Surveying & Material Testing",
      description: "GPS surveying, drone mapping and comprehensive material testing",
    },
    {
      icon: Award,
      title: "Project Management",
      description: "End-to-end project management and construction supervision",
    },
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

      {/* Hero Section */}
      <section 
        className="relative h-[600px] flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${heroImage})` }}
      >
        <div className="container mx-auto px-4 z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            Engineering the Future of Kenya's Infrastructure
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Toval Building and Construction Company is a Kisumu-based civil engineering firm delivering durable, safe, and innovative infrastructure solutions across Kenya.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/services">Our Services</a>
            </Button>
            <Button size="lg" variant="outline" className="bg-white/10 text-white border-white hover:bg-white hover:text-foreground" asChild>
              <a href="tel:0700325637">Call: 0700 325 637</a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Toval</h2>
            <p className="text-lg text-muted-foreground">
              Toval Building and Construction Company, led by Eng. Tom Illa, provides engineering, building, and construction solutions with a strong commitment to quality, safety, and client satisfaction. Based in Kisumu, we serve clients across Kenya with professional excellence.
            </p>
            <Button className="mt-8" asChild>
              <a href="/about">Learn More About Us</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Our Key Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  {service.image && (
                    <div className="mb-4 h-48 rounded-lg overflow-hidden">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <service.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Toval</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Get a Free Consultation Today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss your next construction project
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
