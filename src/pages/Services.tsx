import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HardHat, Building2, Construction, Droplet, MapPin, ClipboardCheck, Hammer, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Real project images
import roadImage1 from "@/assets/project-road-1.jpg";
import roadImage2 from "@/assets/project-road-2.jpg";
import roadImage3 from "@/assets/project-road-3.jpg";
import buildingImage from "@/assets/project-building-1.jpg";
import drainageImage1 from "@/assets/project-drainage-1.jpg";
import drainageImage2 from "@/assets/project-drainage-2.jpg";
import buildingOngoing2 from "@/assets/project-building-ongoing-2.jpg";
import siteSurvey from "@/assets/project-site-survey.jpg";

const Services = () => {
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
          <p className="text-primary-foreground/80 uppercase tracking-[0.3em] text-sm mb-4">What We Do</p>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">Our Services</h1>
          <div className="w-24 h-1 bg-primary mb-4" />
          <p className="text-xl text-primary-foreground/90 max-w-2xl">Comprehensive Civil Engineering and Construction Solutions</p>
        </div>
      </section>

      {/* Civil Engineering - Magazine Style */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">Core Expertise</p>
            <h2 className="text-4xl font-bold mb-4">Civil Engineering</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            <div className="group">
              <div className="relative overflow-hidden mb-6">
                <img src={roadImage2} alt="Road Construction" className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <HardHat className="absolute bottom-4 left-4 h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Road Construction</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Professional road construction and maintenance services including highway development, urban road networks, and rural access roads.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Asphalt and concrete paving</li>
                <li>• Road rehabilitation and maintenance</li>
                <li>• Traffic management systems</li>
                <li>• Quality material testing</li>
              </ul>
            </div>

            <div className="group">
              <div className="relative overflow-hidden mb-6">
                <img src={drainageImage1} alt="Bridge and Drainage" className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <Construction className="absolute bottom-4 left-4 h-10 w-10 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Bridges & Drainage Systems</h3>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Expert engineering for bridges, culverts, and comprehensive drainage infrastructure.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Bridge design and construction</li>
                <li>• Culvert installations</li>
                <li>• Storm water drainage systems</li>
                <li>• Flood control structures</li>
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
                <h3 className="text-xl font-bold mb-3">Water & Sewerage Works</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Water supply systems installation</li>
                  <li>• Sewerage network construction</li>
                  <li>• Treatment plant works</li>
                  <li>• Pipeline laying and testing</li>
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
                <h3 className="text-xl font-bold mb-3">Structural Engineering</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Structural design and analysis</li>
                  <li>• Foundation engineering</li>
                  <li>• Site preparation and earthworks</li>
                  <li>• Concrete and steel structures</li>
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
            <p className="uppercase tracking-[0.3em] text-sm mb-4">Quality Equipment</p>
            <h2 className="text-4xl md:text-5xl font-bold">Modern Machinery for Every Project</h2>
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
              <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">Construction Services</p>
              <h2 className="text-4xl font-bold mb-6 leading-tight">Building Construction</h2>
              <div className="w-16 h-1 bg-primary mb-6" />
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Residential Developments
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Quality housing construction from single-family homes to multi-unit residential complexes.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Commercial Buildings
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Office buildings, retail spaces, warehouses, and industrial facilities.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    Institutional Buildings
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Schools, hospitals, government buildings, and community facilities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Services - Magazine Style */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">Additional Expertise</p>
            <h2 className="text-4xl font-bold mb-4">Specialized Services</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <MapPin className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-4">Surveying</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• GPS and Total Station surveying</li>
                  <li>• Drone mapping and aerial surveys</li>
                  <li>• Topographic surveys</li>
                  <li>• Land subdivision</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <ClipboardCheck className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-4">Material Testing</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Concrete quality testing</li>
                  <li>• Soil analysis and testing</li>
                  <li>• Aggregate testing</li>
                  <li>• Material certification</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <Users className="h-12 w-12 text-primary mb-6" />
                <h3 className="text-xl font-bold mb-4">Project Management</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• End-to-end project management</li>
                  <li>• Construction supervision</li>
                  <li>• Cost estimation and budgeting</li>
                  <li>• Progress monitoring and reporting</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Industries Served - Magazine Style */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">Our Clients</p>
            <h2 className="text-4xl font-bold mb-4">Industries We Serve</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {['Government', 'Real Estate', 'NGOs', 'Private Developers', 'Commercial'].map((industry, index) => (
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
