import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, Calendar, FileText, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCMSPage } from "@/hooks/useCMSPage";
import { Skeleton } from "@/components/ui/skeleton";
import roadImage1 from "@/assets/project-road-1.jpg";
import buildingOngoing1 from "@/assets/project-building-ongoing-1.jpg";

const Procurement = () => {
  const { toast } = useToast();
  const { loading, getContent } = useCMSPage("procurement");
  
  const [formData, setFormData] = useState({
    companyName: "",
    registrationNumber: "",
    contactPerson: "",
    email: "",
    phone: "",
    category: "",
    experience: "",
    message: "",
  });

  const hero = getContent("hero", { label: "Partner With Us", title: "Procurement", subtitle: "Partner with us to build Kenya's future" });
  const tenders = getContent("tenders", { label: "Current Opportunities", title: "Active Tenders" });
  const imageBreak = getContent("imageBreak", { label: "Join Our Network", title: "Become a Trusted Supplier" });
  const registration = getContent("registration", { label: "Join Us", title: "Supplier Registration", description: "Register your company to receive notifications about upcoming tenders and opportunities." });
  const documents = getContent("documents", { label: "Resources", title: "Procurement Documents" });
  const guidelines = getContent("guidelines", { label: "How It Works", title: "Procurement Guidelines" });

  const activeTenders = [
    {
      title: "Road Construction - County Route 34",
      reference: "TOVAL/TENDER/2024/001",
      category: "Road Construction",
      deadline: "2024-12-15",
      value: "KES 45,000,000",
      status: "Open",
    },
    {
      title: "Commercial Building - Phase 1",
      reference: "TOVAL/TENDER/2024/002",
      category: "Building Construction",
      deadline: "2024-12-20",
      value: "KES 28,000,000",
      status: "Open",
    },
    {
      title: "Bridge Rehabilitation Works",
      reference: "TOVAL/TENDER/2024/003",
      category: "Infrastructure",
      deadline: "2024-12-10",
      value: "KES 12,500,000",
      status: "Closing Soon",
    },
  ];

  const documentsList = [
    { name: "Supplier Registration Form", type: "PDF", size: "245 KB" },
    { name: "Tender Application Guidelines", type: "PDF", size: "1.2 MB" },
    { name: "Company Profile Template", type: "DOCX", size: "180 KB" },
    { name: "Standard Contract Terms", type: "PDF", size: "890 KB" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Registration Submitted",
      description: "We will review your application and contact you soon.",
    });
    setFormData({
      companyName: "",
      registrationNumber: "",
      contactPerson: "",
      email: "",
      phone: "",
      category: "",
      experience: "",
      message: "",
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <Skeleton className="h-[50vh] w-full" />
        <div className="container mx-auto px-4 py-20">
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
        style={{ backgroundImage: `url(${roadImage1})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4">
          <p className="text-primary-foreground/80 uppercase tracking-[0.3em] text-sm mb-4">{hero.label}</p>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-4">{hero.title}</h1>
          <div className="w-24 h-1 bg-primary mb-4" />
          <p className="text-xl text-primary-foreground/90">{hero.subtitle}</p>
        </div>
      </section>

      {/* Active Tenders - Magazine Style */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">{tenders.label}</p>
            <h2 className="text-4xl font-bold mb-4">{tenders.title}</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {activeTenders.map((tender, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-xl">{tender.title}</CardTitle>
                    <Badge variant={tender.status === "Closing Soon" ? "destructive" : "default"}>
                      {tender.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {tender.reference}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Category:</span>
                    <Badge variant="outline">{tender.category}</Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Deadline:</span>
                    <span className="font-semibold">{tender.deadline}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Estimated Value:</span>
                    <span className="font-semibold ml-2">{tender.value}</span>
                  </div>
                  <Button className="w-full mt-4">
                    <Download className="mr-2 h-4 w-4" />
                    Download Tender Documents
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Full-Width Image Break */}
      <section 
        className="h-[40vh] bg-cover bg-center bg-fixed relative"
        style={{ backgroundImage: `url(${buildingOngoing1})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-primary-foreground">
            <p className="uppercase tracking-[0.3em] text-sm mb-4">{imageBreak.label}</p>
            <h2 className="text-4xl md:text-5xl font-bold">{imageBreak.title}</h2>
          </div>
        </div>
      </section>

      {/* Supplier Registration - Magazine Style */}
      <section className="py-20 bg-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">{registration.label}</p>
              <h2 className="text-4xl font-bold mb-4">{registration.title}</h2>
              <div className="w-24 h-1 bg-primary mx-auto mb-6" />
              <p className="text-muted-foreground">{registration.description}</p>
            </div>
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle>Registration Form</CardTitle>
                <CardDescription>
                  Fill in your company details to join our supplier database
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleChange("companyName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="registrationNumber">Registration Number *</Label>
                      <Input
                        id="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={(e) => handleChange("registrationNumber", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      value={formData.contactPerson}
                      onChange={(e) => handleChange("contactPerson", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Service Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="materials">Construction Materials</SelectItem>
                          <SelectItem value="equipment">Equipment Supply</SelectItem>
                          <SelectItem value="subcontractor">Subcontracting</SelectItem>
                          <SelectItem value="consulting">Consulting Services</SelectItem>
                          <SelectItem value="other">Other Services</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience *</Label>
                      <Input
                        id="experience"
                        type="number"
                        value={formData.experience}
                        onChange={(e) => handleChange("experience", e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Information</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      rows={4}
                      placeholder="Tell us about your company's capabilities..."
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Submit Registration
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Downloadable Documents - Magazine Style */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">{documents.label}</p>
            <h2 className="text-4xl font-bold mb-4">{documents.title}</h2>
            <div className="w-24 h-1 bg-primary mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {documentsList.map((doc, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <FileText className="h-12 w-12 text-primary" />
                    <div>
                      <p className="font-bold text-lg">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {doc.type} • {doc.size}
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Procurement Guidelines - Magazine Style */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary uppercase tracking-[0.2em] text-sm mb-4">{guidelines.label}</p>
              <h2 className="text-4xl font-bold mb-4">{guidelines.title}</h2>
              <div className="w-24 h-1 bg-primary mx-auto" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <span className="text-5xl font-bold text-primary/20">01</span>
                  <h3 className="text-xl font-bold mt-4 mb-4">Eligibility Requirements</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Valid business registration</li>
                    <li>• Tax compliance certificate</li>
                    <li>• Industry certifications</li>
                    <li>• Proof of experience</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <span className="text-5xl font-bold text-primary/20">02</span>
                  <h3 className="text-xl font-bold mt-4 mb-4">Tender Process</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Download tender documents</li>
                    <li>• Submit before deadline</li>
                    <li>• Attend site visits</li>
                    <li>• Await evaluation</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <span className="text-5xl font-bold text-primary/20">03</span>
                  <h3 className="text-xl font-bold mt-4 mb-4">Contact Us</h3>
                  <div className="text-muted-foreground space-y-2">
                    <p>Email:</p>
                    <p className="font-semibold">info@toval-eng.co.ke</p>
                    <p className="mt-4">Phone:</p>
                    <p className="font-semibold">0700 325 637</p>
                  </div>
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

export default Procurement;
