import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HardHat, Building2, Construction, Droplet, MapPin, ClipboardCheck, Hammer, Users } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import roadImage from "@/assets/road-construction.jpg";
import buildingImage from "@/assets/building-construction.jpg";
import bridgeImage from "@/assets/bridge-construction.jpg";

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl opacity-90">Comprehensive Civil Engineering and Construction Solutions</p>
        </div>
      </section>

      {/* Civil Engineering */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Civil Engineering</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img src={roadImage} alt="Road Construction" className="rounded-lg shadow-lg w-full h-64 object-cover mb-6" />
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HardHat className="h-6 w-6 text-primary" />
                    Road Construction
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Professional road construction and maintenance services including highway development, urban road networks, and rural access roads.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Asphalt and concrete paving</li>
                    <li>• Road rehabilitation and maintenance</li>
                    <li>• Traffic management systems</li>
                    <li>• Quality material testing</li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div>
              <img src={bridgeImage} alt="Bridge Construction" className="rounded-lg shadow-lg w-full h-64 object-cover mb-6" />
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Construction className="h-6 w-6 text-primary" />
                    Bridges & Drainage Systems
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Expert engineering for bridges, culverts, and comprehensive drainage infrastructure.
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li>• Bridge design and construction</li>
                    <li>• Culvert installations</li>
                    <li>• Storm water drainage systems</li>
                    <li>• Flood control structures</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Droplet className="h-6 w-6 text-primary" />
                  Water & Sewerage Works
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Water supply systems installation</li>
                  <li>• Sewerage network construction</li>
                  <li>• Treatment plant works</li>
                  <li>• Pipeline laying and testing</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hammer className="h-6 w-6 text-primary" />
                  Structural Engineering
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
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

      {/* Building Construction */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Building Construction</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <img src={buildingImage} alt="Building Construction" className="rounded-lg shadow-lg w-full h-80 object-cover" />
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-primary" />
                    Residential Developments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Quality housing construction from single-family homes to multi-unit residential complexes.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-primary" />
                    Commercial Buildings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Office buildings, retail spaces, warehouses, and industrial facilities.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-6 w-6 text-primary" />
                    Institutional Buildings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Schools, hospitals, government buildings, and community facilities.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Specialized Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  Surveying
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• GPS and Total Station surveying</li>
                  <li>• Drone mapping and aerial surveys</li>
                  <li>• Topographic surveys</li>
                  <li>• Land subdivision</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardCheck className="h-6 w-6 text-primary" />
                  Material Testing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Concrete quality testing</li>
                  <li>• Soil analysis and testing</li>
                  <li>• Aggregate testing</li>
                  <li>• Material certification</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Project Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
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

      {/* Industries Served */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Industries We Serve</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {['Government', 'Real Estate', 'NGOs', 'Private Developers', 'Commercial'].map((industry, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <p className="font-semibold">{industry}</p>
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
