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

const Procurement = () => {
  const { toast } = useToast();
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

  const documents = [
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

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Procurement</h1>
          <p className="text-xl opacity-90">Partner with us to build Kenya's future</p>
        </div>
      </section>

      {/* Active Tenders */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Active Tenders</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeTenders.map((tender, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
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

      {/* Supplier Registration */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Supplier Registration</h2>
            <p className="text-muted-foreground mb-8">
              Register your company to receive notifications about upcoming tenders and opportunities.
            </p>
            <Card>
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

                  <Button type="submit" className="w-full">
                    Submit Registration
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Downloadable Documents */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Procurement Documents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {documents.map((doc, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center gap-4">
                    <FileText className="h-10 w-10 text-primary" />
                    <div>
                      <p className="font-semibold">{doc.name}</p>
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

      {/* Procurement Guidelines */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Procurement Guidelines</h2>
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Eligibility Requirements</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Valid business registration certificate</li>
                    <li>Tax compliance certificate</li>
                    <li>Relevant industry certifications</li>
                    <li>Proof of past experience in similar projects</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Tender Process</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Download tender documents from our website</li>
                    <li>Submit completed applications before deadline</li>
                    <li>Attend mandatory site visits if required</li>
                    <li>Await evaluation and notification</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Contact Procurement Office</h3>
                  <p className="text-muted-foreground">
                    For inquiries: <span className="font-semibold">procurement@toval.co.ke</span>
                    <br />
                    Phone: <span className="font-semibold">0700 325 637</span>
                  </p>
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

export default Procurement;
