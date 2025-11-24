import { Card, CardContent } from "@/components/ui/card";
import { Award, Shield, Leaf, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import engTomImage from "@/assets/eng-tom-illa.jpg";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Toval</h1>
          <p className="text-xl opacity-90">Building Excellence Since Day One</p>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Company Profile</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Toval Building and Construction Company is a leading civil engineering firm based in Kisumu, Kenya. We specialize in delivering comprehensive infrastructure solutions that meet the highest standards of quality, safety, and innovation.
              </p>
              <p>
                With a strong commitment to professionalism and engineering excellence, we serve clients across Kenya, from government entities to private developers. Our team combines technical expertise with modern equipment to deliver projects on time and within budget.
              </p>
              <p>
                Our mission is to build infrastructure that stands the test of time while maintaining the highest safety standards and environmental responsibility.
              </p>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <Card>
                <CardContent className="p-6">
                  <Target className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To deliver exceptional construction and engineering services that exceed client expectations through innovation, quality, and professionalism.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Award className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                  <p className="text-muted-foreground">
                    To be the most trusted and innovative civil engineering firm in Kenya, setting new standards for infrastructure development.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Leadership</h2>
          <div className="max-w-2xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <img 
                    src={engTomImage} 
                    alt="Eng. Tom Illa"
                    className="w-48 h-48 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Eng. Tom Illa</h3>
                    <p className="text-primary font-semibold mb-4">Director</p>
                    <p className="text-muted-foreground">
                      Eng. Tom Illa is an experienced civil engineer with extensive expertise in structural design, project management, and infrastructure development. Under his leadership, Toval has become known for delivering high-quality construction projects across Kenya.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety & Quality */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Safety & Quality</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <Shield className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Safety First</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Zero-incident safety culture</li>
                    <li>• Regular safety training programs</li>
                    <li>• Compliance with all safety regulations</li>
                    <li>• Modern safety equipment for all workers</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <Award className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Compliance with Kenyan building codes</li>
                    <li>• Rigorous material testing</li>
                    <li>• Quality control at every stage</li>
                    <li>• Engineering standards certification</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Leaf className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">Sustainability</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We are committed to environmentally responsible construction practices. Our approach includes efficient waste management, sustainable material sourcing, and active community engagement in all our projects.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Environmental Care</h3>
                  <p className="text-sm text-muted-foreground">
                    Minimizing environmental impact through responsible practices
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Waste Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Efficient waste disposal and recycling systems
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Community Engagement</h3>
                  <p className="text-sm text-muted-foreground">
                    Working closely with local communities
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
