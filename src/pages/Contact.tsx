import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Phone, MapPin, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import buildingImage from "@/assets/project-building-1.jpg";

const Contact = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Magazine-Style Hero */}
      <section 
        className="h-[50vh] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${buildingImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <p className="text-primary-foreground/80 uppercase tracking-[0.3em] text-sm mb-4">Get In Touch</p>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">Contact Us</h1>
          <div className="w-24 h-1 bg-primary mb-4" />
          <p className="text-xl text-primary-foreground/90">Let's Discuss Your Project</p>
        </div>
      </section>

      {/* Contact Info and Form - Magazine Style */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">Reach Out</p>
              <h2 className="text-4xl font-bold mb-6 leading-tight">Get In Touch</h2>
              <div className="w-16 h-1 bg-primary mb-8" />
              <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                Have a project in mind? We'd love to hear from you. Contact us today to discuss your construction needs.
              </p>

              <div className="space-y-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 flex items-start gap-4">
                    <MapPin className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">Head Office</h3>
                      <p className="text-muted-foreground">Kisumu, Kenya</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 flex items-start gap-4">
                    <Phone className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">Phone</h3>
                      <a href="tel:0700325637" className="text-primary hover:underline text-lg">
                        0700 325 637
                      </a>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 flex items-start gap-4">
                    <Clock className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg mb-1">Business Hours</h3>
                      <p className="text-muted-foreground">Monday - Friday: 8:00 AM - 5:00 PM</p>
                      <p className="text-muted-foreground">Saturday: 9:00 AM - 1:00 PM</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card className="border-0 shadow-xl">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="0700 000 000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="Project Inquiry" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us about your project..."
                        rows={5}
                      />
                    </div>
                    <Button type="submit" className="w-full" size="lg">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section - Magazine Style */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">Location</p>
            <h2 className="text-4xl font-bold mb-4">Find Us</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="w-full h-96 bg-muted flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                    <p className="text-xl font-bold">Kisumu, Kenya</p>
                    <p className="text-muted-foreground">Toval Engineering Contractors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
