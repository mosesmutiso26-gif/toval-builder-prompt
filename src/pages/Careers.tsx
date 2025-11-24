import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Award, Users, TrendingUp, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Careers = () => {
  const benefits = [
    {
      icon: Award,
      title: "Professional Development",
      description: "Continuous training and skill enhancement programs",
    },
    {
      icon: Users,
      title: "Team Environment",
      description: "Collaborative workplace with experienced professionals",
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Clear career progression pathways",
    },
    {
      icon: Heart,
      title: "Competitive Benefits",
      description: "Comprehensive benefits package for all employees",
    },
  ];

  const openings = [
    {
      title: "Civil Engineer",
      department: "Engineering",
      type: "Full-time",
      location: "Kisumu",
    },
    {
      title: "Site Supervisor",
      department: "Operations",
      type: "Full-time",
      location: "Various Sites",
    },
    {
      title: "Quantity Surveyor",
      department: "Procurement",
      type: "Full-time",
      location: "Kisumu",
    },
    {
      title: "Construction Intern",
      department: "Engineering",
      type: "Internship",
      location: "Kisumu",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-xl opacity-90">Build Your Career with Toval</p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Work with Toval</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <benefit.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Current Openings</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {openings.map((job, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{job.department}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <Button>Apply Now</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Submit Your Application</h2>
            <Card>
              <CardContent className="p-6">
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="0700 000 000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="position">Position Applied For</Label>
                    <Input id="position" placeholder="e.g., Civil Engineer" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Cover Letter</Label>
                    <Textarea 
                      id="message" 
                      placeholder="Tell us why you'd like to join Toval..."
                      rows={5}
                    />
                  </div>
                  <Button type="submit" className="w-full">Submit Application</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
