import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowLeft,
  Save,
  Eye,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface HomeContent {
  hero: {
    location: string;
    title: string;
    subtitle: string;
    cta_primary_text: string;
    cta_primary_link: string;
    cta_secondary_text: string;
    cta_secondary_link: string;
  };
  about: {
    label: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    cta_text: string;
    cta_link: string;
  };
  services: {
    label: string;
    title: string;
    items: Array<{ icon: string; title: string; description: string }>;
  };
  imageBreak: {
    label: string;
    title: string;
  };
  whyChooseUs: {
    label: string;
    title: string;
    items: Array<{ title: string; description: string }>;
  };
  cta: {
    label: string;
    title: string;
    subtitle: string;
    button_text: string;
    button_link: string;
  };
  featuredProjects: Array<{ title: string; category: string }>;
}

const defaultHomeContent: HomeContent = {
  hero: {
    location: "Kisumu, Kenya",
    title: "Improving Your Built Environment",
    subtitle: "Toval Engineering Contractors delivers durable, safe, and innovative infrastructure solutions across Kenya.",
    cta_primary_text: "Our Services",
    cta_primary_link: "/services",
    cta_secondary_text: "Call: 0700 325 637",
    cta_secondary_link: "tel:0700325637",
  },
  about: {
    label: "About Our Company",
    title: "Building Kenya's Tomorrow, Today",
    paragraph1: "Toval Engineering Contractors, led by Eng. Tom Illa, provides engineering, building, and construction solutions.",
    paragraph2: "Based in Kisumu, we serve clients across Kenya with professional excellence.",
    cta_text: "Learn More About Us",
    cta_link: "/about",
  },
  services: {
    label: "What We Do",
    title: "Our Key Services",
    items: [],
  },
  imageBreak: {
    label: "Our Equipment",
    title: "Modern Machinery for Quality Results",
  },
  whyChooseUs: {
    label: "Our Advantages",
    title: "Why Choose Toval",
    items: [],
  },
  cta: {
    label: "Get Started",
    title: "Get a Free Consultation Today",
    subtitle: "Let's discuss your next construction project",
    button_text: "Call 0700 325 637",
    button_link: "tel:0700325637",
  },
  featuredProjects: [],
};

const CMSPageEdit = () => {
  const { pageKey } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<HomeContent>(defaultHomeContent);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    hero: true,
    about: false,
    services: false,
    imageBreak: false,
    whyChooseUs: false,
    cta: false,
    featuredProjects: false,
  });

  useEffect(() => {
    if (pageKey) {
      loadPage(pageKey);
    }
  }, [pageKey]);

  const loadPage = async (key: string) => {
    try {
      const { data, error } = await supabase
        .from("cms_pages")
        .select("*")
        .eq("page_key", key)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setTitle(data.title || "");
        const pageContent = data.content as unknown as HomeContent;
        if (pageContent) {
          setContent({ ...defaultHomeContent, ...pageContent });
        }
      } else {
        setTitle(key.charAt(0).toUpperCase() + key.slice(1));
      }
    } catch (error) {
      console.error("Error loading page:", error);
      toast({
        title: "Error",
        description: "Failed to load page",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateNestedField = (section: keyof HomeContent, field: string, value: string) => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as Record<string, unknown>),
        [field]: value,
      },
    }));
  };

  const updateServiceItem = (index: number, field: string, value: string) => {
    const newItems = [...content.services.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setContent((prev) => ({
      ...prev,
      services: { ...prev.services, items: newItems },
    }));
  };

  const addServiceItem = () => {
    setContent((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: [...prev.services.items, { icon: "HardHat", title: "", description: "" }],
      },
    }));
  };

  const removeServiceItem = (index: number) => {
    setContent((prev) => ({
      ...prev,
      services: {
        ...prev.services,
        items: prev.services.items.filter((_, i) => i !== index),
      },
    }));
  };

  const updateWhyChooseItem = (index: number, field: string, value: string) => {
    const newItems = [...content.whyChooseUs.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setContent((prev) => ({
      ...prev,
      whyChooseUs: { ...prev.whyChooseUs, items: newItems },
    }));
  };

  const addWhyChooseItem = () => {
    setContent((prev) => ({
      ...prev,
      whyChooseUs: {
        ...prev.whyChooseUs,
        items: [...prev.whyChooseUs.items, { title: "", description: "" }],
      },
    }));
  };

  const removeWhyChooseItem = (index: number) => {
    setContent((prev) => ({
      ...prev,
      whyChooseUs: {
        ...prev.whyChooseUs,
        items: prev.whyChooseUs.items.filter((_, i) => i !== index),
      },
    }));
  };

  const updateFeaturedProject = (index: number, field: string, value: string) => {
    const newItems = [...content.featuredProjects];
    newItems[index] = { ...newItems[index], [field]: value };
    setContent((prev) => ({ ...prev, featuredProjects: newItems }));
  };

  const addFeaturedProject = () => {
    setContent((prev) => ({
      ...prev,
      featuredProjects: [...prev.featuredProjects, { title: "", category: "" }],
    }));
  };

  const removeFeaturedProject = (index: number) => {
    setContent((prev) => ({
      ...prev,
      featuredProjects: prev.featuredProjects.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async () => {
    if (!pageKey) return;

    setSaving(true);

    try {
      const { data: existing } = await supabase
        .from("cms_pages")
        .select("id")
        .eq("page_key", pageKey)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from("cms_pages")
          .update({ title, content: content as unknown as Json })
          .eq("page_key", pageKey);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("cms_pages")
          .insert({ page_key: pageKey, title, content: content as unknown as Json });

        if (error) throw error;
      }

      toast({
        title: "Saved",
        description: "Page saved successfully",
      });
    } catch (error: any) {
      console.error("Error saving page:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to save page",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute requireAdmin>
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <main className="flex-1 container mx-auto px-4 py-8">
            <div className="text-center py-12">Loading...</div>
          </main>
          <Footer />
        </div>
      </ProtectedRoute>
    );
  }

  const isHomePage = pageKey === "home";

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link to="/admin/cms/pages">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">
                  Edit: {title || pageKey}
                </h1>
                <p className="text-muted-foreground">Customize page content and layout</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to={pageKey === "home" ? "/" : `/${pageKey}`} target="_blank">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Link>
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? "Saving..." : "Save Page"}
              </Button>
            </div>
          </div>

          <div className="space-y-4 max-w-4xl">
            {/* Page Title */}
            <Card>
              <CardHeader>
                <CardTitle>Page Title</CardTitle>
              </CardHeader>
              <CardContent>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Page title" />
              </CardContent>
            </Card>

            {isHomePage && (
              <>
                {/* Hero Section */}
                <Collapsible open={openSections.hero} onOpenChange={() => toggleSection("hero")}>
                  <Card>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center justify-between">
                          <CardTitle>Hero Section</CardTitle>
                          {openSections.hero ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Location</Label>
                            <Input value={content.hero.location} onChange={(e) => updateNestedField("hero", "location", e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input value={content.hero.title} onChange={(e) => updateNestedField("hero", "title", e.target.value)} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Subtitle</Label>
                          <Textarea value={content.hero.subtitle} onChange={(e) => updateNestedField("hero", "subtitle", e.target.value)} rows={2} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Primary Button Text</Label>
                            <Input value={content.hero.cta_primary_text} onChange={(e) => updateNestedField("hero", "cta_primary_text", e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Primary Button Link</Label>
                            <Input value={content.hero.cta_primary_link} onChange={(e) => updateNestedField("hero", "cta_primary_link", e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Secondary Button Text</Label>
                            <Input value={content.hero.cta_secondary_text} onChange={(e) => updateNestedField("hero", "cta_secondary_text", e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Secondary Button Link</Label>
                            <Input value={content.hero.cta_secondary_link} onChange={(e) => updateNestedField("hero", "cta_secondary_link", e.target.value)} />
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>

                {/* About Section */}
                <Collapsible open={openSections.about} onOpenChange={() => toggleSection("about")}>
                  <Card>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center justify-between">
                          <CardTitle>About Section</CardTitle>
                          {openSections.about ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Section Label</Label>
                            <Input value={content.about.label} onChange={(e) => updateNestedField("about", "label", e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input value={content.about.title} onChange={(e) => updateNestedField("about", "title", e.target.value)} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Paragraph 1</Label>
                          <Textarea value={content.about.paragraph1} onChange={(e) => updateNestedField("about", "paragraph1", e.target.value)} rows={3} />
                        </div>
                        <div className="space-y-2">
                          <Label>Paragraph 2</Label>
                          <Textarea value={content.about.paragraph2} onChange={(e) => updateNestedField("about", "paragraph2", e.target.value)} rows={3} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Button Text</Label>
                            <Input value={content.about.cta_text} onChange={(e) => updateNestedField("about", "cta_text", e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Button Link</Label>
                            <Input value={content.about.cta_link} onChange={(e) => updateNestedField("about", "cta_link", e.target.value)} />
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>

                {/* Services Section */}
                <Collapsible open={openSections.services} onOpenChange={() => toggleSection("services")}>
                  <Card>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center justify-between">
                          <CardTitle>Services Section</CardTitle>
                          {openSections.services ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Section Label</Label>
                            <Input value={content.services.label} onChange={(e) => updateNestedField("services", "label", e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input value={content.services.title} onChange={(e) => updateNestedField("services", "title", e.target.value)} />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label>Service Items</Label>
                          {content.services.items.map((item, index) => (
                            <div key={index} className="border rounded-lg p-4 space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">Service {index + 1}</span>
                                <Button variant="ghost" size="sm" onClick={() => removeServiceItem(index)}>
                                  Remove
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-2">
                                  <Label>Icon</Label>
                                  <Input value={item.icon} onChange={(e) => updateServiceItem(index, "icon", e.target.value)} placeholder="HardHat, Building2, etc." />
                                </div>
                                <div className="space-y-2">
                                  <Label>Title</Label>
                                  <Input value={item.title} onChange={(e) => updateServiceItem(index, "title", e.target.value)} />
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea value={item.description} onChange={(e) => updateServiceItem(index, "description", e.target.value)} rows={2} />
                              </div>
                            </div>
                          ))}
                          <Button variant="outline" onClick={addServiceItem}>
                            Add Service
                          </Button>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>

                {/* Image Break Section */}
                <Collapsible open={openSections.imageBreak} onOpenChange={() => toggleSection("imageBreak")}>
                  <Card>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center justify-between">
                          <CardTitle>Image Break Section</CardTitle>
                          {openSections.imageBreak ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Label</Label>
                            <Input value={content.imageBreak.label} onChange={(e) => updateNestedField("imageBreak", "label", e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input value={content.imageBreak.title} onChange={(e) => updateNestedField("imageBreak", "title", e.target.value)} />
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>

                {/* Why Choose Us Section */}
                <Collapsible open={openSections.whyChooseUs} onOpenChange={() => toggleSection("whyChooseUs")}>
                  <Card>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center justify-between">
                          <CardTitle>Why Choose Us Section</CardTitle>
                          {openSections.whyChooseUs ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Section Label</Label>
                            <Input value={content.whyChooseUs.label} onChange={(e) => updateNestedField("whyChooseUs", "label", e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input value={content.whyChooseUs.title} onChange={(e) => updateNestedField("whyChooseUs", "title", e.target.value)} />
                          </div>
                        </div>
                        <div className="space-y-3">
                          <Label>Items</Label>
                          {content.whyChooseUs.items.map((item, index) => (
                            <div key={index} className="border rounded-lg p-4 space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="font-medium">Item {index + 1}</span>
                                <Button variant="ghost" size="sm" onClick={() => removeWhyChooseItem(index)}>
                                  Remove
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <div className="space-y-2">
                                  <Label>Title</Label>
                                  <Input value={item.title} onChange={(e) => updateWhyChooseItem(index, "title", e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                  <Label>Description</Label>
                                  <Input value={item.description} onChange={(e) => updateWhyChooseItem(index, "description", e.target.value)} />
                                </div>
                              </div>
                            </div>
                          ))}
                          <Button variant="outline" onClick={addWhyChooseItem}>
                            Add Item
                          </Button>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>

                {/* CTA Section */}
                <Collapsible open={openSections.cta} onOpenChange={() => toggleSection("cta")}>
                  <Card>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center justify-between">
                          <CardTitle>Call to Action Section</CardTitle>
                          {openSections.cta ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Label</Label>
                            <Input value={content.cta.label} onChange={(e) => updateNestedField("cta", "label", e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Title</Label>
                            <Input value={content.cta.title} onChange={(e) => updateNestedField("cta", "title", e.target.value)} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label>Subtitle</Label>
                          <Textarea value={content.cta.subtitle} onChange={(e) => updateNestedField("cta", "subtitle", e.target.value)} rows={2} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Button Text</Label>
                            <Input value={content.cta.button_text} onChange={(e) => updateNestedField("cta", "button_text", e.target.value)} />
                          </div>
                          <div className="space-y-2">
                            <Label>Button Link</Label>
                            <Input value={content.cta.button_link} onChange={(e) => updateNestedField("cta", "button_link", e.target.value)} />
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>

                {/* Featured Projects */}
                <Collapsible open={openSections.featuredProjects} onOpenChange={() => toggleSection("featuredProjects")}>
                  <Card>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center justify-between">
                          <CardTitle>Featured Projects</CardTitle>
                          {openSections.featuredProjects ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-4">
                        {content.featuredProjects.map((project, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="font-medium">Project {index + 1}</span>
                              <Button variant="ghost" size="sm" onClick={() => removeFeaturedProject(index)}>
                                Remove
                              </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              <div className="space-y-2">
                                <Label>Title</Label>
                                <Input value={project.title} onChange={(e) => updateFeaturedProject(index, "title", e.target.value)} />
                              </div>
                              <div className="space-y-2">
                                <Label>Category</Label>
                                <Input value={project.category} onChange={(e) => updateFeaturedProject(index, "category", e.target.value)} />
                              </div>
                            </div>
                          </div>
                        ))}
                        <Button variant="outline" onClick={addFeaturedProject}>
                          Add Featured Project
                        </Button>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CMSPageEdit;
