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
import { ArrowLeft, Save, Eye, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const CMSPageEdit = () => {
  const { pageKey } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<Record<string, any>>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

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
        setContent((data.content as Record<string, any>) || {});
      } else {
        setTitle(key.charAt(0).toUpperCase() + key.slice(1));
      }
    } catch (error) {
      console.error("Error loading page:", error);
      toast({ title: "Error", description: "Failed to load page", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateField = (path: string, value: any) => {
    const keys = path.split(".");
    setContent((prev) => {
      const newContent = { ...prev };
      let current: any = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return newContent;
    });
  };

  const updateArrayItem = (arrayPath: string, index: number, field: string, value: string) => {
    const keys = arrayPath.split(".");
    setContent((prev) => {
      const newContent = JSON.parse(JSON.stringify(prev));
      let current: any = newContent;
      for (const key of keys) {
        current = current[key];
      }
      if (Array.isArray(current) && current[index]) {
        current[index][field] = value;
      }
      return newContent;
    });
  };

  const addArrayItem = (arrayPath: string, template: Record<string, string>) => {
    const keys = arrayPath.split(".");
    setContent((prev) => {
      const newContent = JSON.parse(JSON.stringify(prev));
      let current: any = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      const lastKey = keys[keys.length - 1];
      if (!current[lastKey]) current[lastKey] = [];
      current[lastKey].push(template);
      return newContent;
    });
  };

  const removeArrayItem = (arrayPath: string, index: number) => {
    const keys = arrayPath.split(".");
    setContent((prev) => {
      const newContent = JSON.parse(JSON.stringify(prev));
      let current: any = newContent;
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      const lastKey = keys[keys.length - 1];
      if (Array.isArray(current[lastKey])) {
        current[lastKey].splice(index, 1);
      }
      return newContent;
    });
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

      toast({ title: "Saved", description: "Page saved successfully" });
    } catch (error: any) {
      console.error("Error saving page:", error);
      toast({ title: "Error", description: error.message || "Failed to save page", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const renderSection = (sectionKey: string, sectionTitle: string, fields: React.ReactNode) => (
    <Collapsible open={openSections[sectionKey]} onOpenChange={() => toggleSection(sectionKey)}>
      <Card>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50">
            <div className="flex items-center justify-between">
              <CardTitle>{sectionTitle}</CardTitle>
              {openSections[sectionKey] ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="space-y-4">{fields}</CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );

  const renderTextField = (path: string, label: string, multiline = false) => {
    const keys = path.split(".");
    let value: any = content;
    for (const key of keys) {
      value = value?.[key];
    }
    const stringValue = typeof value === 'string' ? value : '';
    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        {multiline ? (
          <Textarea value={stringValue} onChange={(e) => updateField(path, e.target.value)} rows={3} />
        ) : (
          <Input value={stringValue} onChange={(e) => updateField(path, e.target.value)} />
        )}
      </div>
    );
  };

  const renderArrayEditor = (arrayPath: string, label: string, fields: string[], template: Record<string, string>) => {
    const keys = arrayPath.split(".");
    let items: any = content;
    for (const key of keys) {
      items = items?.[key];
    }
    const arrayItems: any[] = Array.isArray(items) ? items : [];

    return (
      <div className="space-y-3">
        <Label>{label}</Label>
        {arrayItems.map((item: any, index: number) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">Item {index + 1}</span>
              <Button variant="ghost" size="sm" onClick={() => removeArrayItem(arrayPath, index)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {fields.map((field) => (
                <div key={field} className="space-y-2">
                  <Label className="capitalize">{field}</Label>
                  <Input
                    value={item[field] || ""}
                    onChange={(e) => updateArrayItem(arrayPath, index, field, e.target.value)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <Button variant="outline" onClick={() => addArrayItem(arrayPath, template)}>
          <Plus className="h-4 w-4 mr-2" /> Add Item
        </Button>
      </div>
    );
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

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link to="/admin/cms/pages">
                <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
              </Link>
              <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">Edit: {title || pageKey}</h1>
                <p className="text-muted-foreground">Customize page content and layout</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to={pageKey === "home" ? "/" : `/${pageKey}`} target="_blank">
                  <Eye className="h-4 w-4 mr-2" /> Preview
                </Link>
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="h-4 w-4 mr-2" /> {saving ? "Saving..." : "Save Page"}
              </Button>
            </div>
          </div>

          <div className="space-y-4 max-w-4xl">
            {/* Page Title */}
            <Card>
              <CardHeader><CardTitle>Page Title</CardTitle></CardHeader>
              <CardContent>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Page title" />
              </CardContent>
            </Card>

            {/* Home Page */}
            {pageKey === "home" && (
              <>
                {renderSection("hero", "Hero Section", (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      {renderTextField("hero.location", "Location")}
                      {renderTextField("hero.title", "Title")}
                    </div>
                    {renderTextField("hero.subtitle", "Subtitle", true)}
                    <div className="grid grid-cols-2 gap-4">
                      {renderTextField("hero.cta_primary_text", "Primary Button Text")}
                      {renderTextField("hero.cta_primary_link", "Primary Button Link")}
                      {renderTextField("hero.cta_secondary_text", "Secondary Button Text")}
                      {renderTextField("hero.cta_secondary_link", "Secondary Button Link")}
                    </div>
                  </>
                ))}
                {renderSection("about", "About Section", (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      {renderTextField("about.label", "Label")}
                      {renderTextField("about.title", "Title")}
                    </div>
                    {renderTextField("about.paragraph1", "Paragraph 1", true)}
                    {renderTextField("about.paragraph2", "Paragraph 2", true)}
                    <div className="grid grid-cols-2 gap-4">
                      {renderTextField("about.cta_text", "Button Text")}
                      {renderTextField("about.cta_link", "Button Link")}
                    </div>
                  </>
                ))}
                {renderSection("imageBreak", "Image Break", (
                  <div className="grid grid-cols-2 gap-4">
                    {renderTextField("imageBreak.label", "Label")}
                    {renderTextField("imageBreak.title", "Title")}
                  </div>
                ))}
                {renderSection("cta", "Call to Action", (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      {renderTextField("cta.label", "Label")}
                      {renderTextField("cta.title", "Title")}
                    </div>
                    {renderTextField("cta.subtitle", "Subtitle", true)}
                    <div className="grid grid-cols-2 gap-4">
                      {renderTextField("cta.button_text", "Button Text")}
                      {renderTextField("cta.button_link", "Button Link")}
                    </div>
                  </>
                ))}
              </>
            )}

            {/* Services Page */}
            {pageKey === "services" && (
              <>
                {renderSection("hero", "Hero Section", (
                  <>
                    {renderTextField("hero.label", "Label")}
                    {renderTextField("hero.title", "Title")}
                    {renderTextField("hero.subtitle", "Subtitle", true)}
                  </>
                ))}
                {renderSection("civilEngineering", "Civil Engineering Section", (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      {renderTextField("civilEngineering.label", "Label")}
                      {renderTextField("civilEngineering.title", "Title")}
                    </div>
                  </>
                ))}
                {renderSection("imageBreak", "Image Break", (
                  <div className="grid grid-cols-2 gap-4">
                    {renderTextField("imageBreak.label", "Label")}
                    {renderTextField("imageBreak.title", "Title")}
                  </div>
                ))}
                {renderSection("buildingConstruction", "Building Construction", (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      {renderTextField("buildingConstruction.label", "Label")}
                      {renderTextField("buildingConstruction.title", "Title")}
                    </div>
                  </>
                ))}
                {renderSection("specializedServices", "Specialized Services", (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      {renderTextField("specializedServices.label", "Label")}
                      {renderTextField("specializedServices.title", "Title")}
                    </div>
                  </>
                ))}
                {renderSection("industries", "Industries Served", (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      {renderTextField("industries.label", "Label")}
                      {renderTextField("industries.title", "Title")}
                    </div>
                  </>
                ))}
              </>
            )}

            {/* About Page */}
            {pageKey === "about" && (
              <>
                {renderSection("hero", "Hero Section", (
                  <>
                    {renderTextField("hero.label", "Label")}
                    {renderTextField("hero.title", "Title")}
                    {renderTextField("hero.subtitle", "Subtitle")}
                  </>
                ))}
                {renderSection("profile", "Company Profile", (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      {renderTextField("profile.label", "Label")}
                      {renderTextField("profile.title", "Title")}
                    </div>
                  </>
                ))}
                {renderSection("mission", "Mission", (
                  <>
                    {renderTextField("mission.title", "Title")}
                    {renderTextField("mission.description", "Description", true)}
                  </>
                ))}
                {renderSection("vision", "Vision", (
                  <>
                    {renderTextField("vision.title", "Title")}
                    {renderTextField("vision.description", "Description", true)}
                  </>
                ))}
                {renderSection("leadership", "Leadership", (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      {renderTextField("leadership.label", "Label")}
                      {renderTextField("leadership.title", "Title")}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {renderTextField("leadership.name", "Name")}
                      {renderTextField("leadership.role", "Role")}
                    </div>
                    {renderTextField("leadership.bio", "Biography", true)}
                  </>
                ))}
                {renderSection("safety", "Safety & Quality", (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      {renderTextField("safety.label", "Label")}
                      {renderTextField("safety.title", "Title")}
                    </div>
                  </>
                ))}
                {renderSection("sustainability", "Sustainability", (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      {renderTextField("sustainability.label", "Label")}
                      {renderTextField("sustainability.title", "Title")}
                    </div>
                    {renderTextField("sustainability.description", "Description", true)}
                  </>
                ))}
              </>
            )}

            {/* Contact Page */}
            {pageKey === "contact" && (
              <>
                {renderSection("hero", "Hero Section", (
                  <>
                    {renderTextField("hero.label", "Label")}
                    {renderTextField("hero.title", "Title")}
                    {renderTextField("hero.subtitle", "Subtitle")}
                  </>
                ))}
                {renderSection("info", "Contact Information", (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      {renderTextField("info.label", "Label")}
                      {renderTextField("info.title", "Title")}
                    </div>
                    {renderTextField("info.description", "Description", true)}
                    <div className="grid grid-cols-2 gap-4">
                      {renderTextField("info.address", "Address")}
                      {renderTextField("info.phone", "Phone")}
                      {renderTextField("info.email", "Email")}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      {renderTextField("info.businessHours.weekdays", "Weekday Hours")}
                      {renderTextField("info.businessHours.saturday", "Saturday Hours")}
                    </div>
                  </>
                ))}
                {renderSection("form", "Contact Form", (
                  <>{renderTextField("form.title", "Form Title")}</>
                ))}
                {renderSection("map", "Map Section", (
                  <div className="grid grid-cols-2 gap-4">
                    {renderTextField("map.label", "Label")}
                    {renderTextField("map.title", "Title")}
                  </div>
                ))}
              </>
            )}

            {/* Careers Page */}
            {pageKey === "careers" && (
              <>
                {renderSection("hero", "Hero Section", (
                  <>
                    {renderTextField("hero.title", "Title")}
                    {renderTextField("hero.subtitle", "Subtitle")}
                  </>
                ))}
                {renderSection("comingSoon", "Coming Soon Message", (
                  <>
                    {renderTextField("comingSoon.title", "Title")}
                    {renderTextField("comingSoon.description", "Description", true)}
                  </>
                ))}
              </>
            )}

            {/* News Page */}
            {pageKey === "news" && (
              <>
                {renderSection("hero", "Hero Section", (
                  <>
                    {renderTextField("hero.title", "Title")}
                    {renderTextField("hero.subtitle", "Subtitle")}
                  </>
                ))}
                {renderSection("articles", "News Articles", (
                  renderArrayEditor("articles", "Articles", ["title", "date", "category", "excerpt"], { title: "", date: "", category: "", excerpt: "" })
                ))}
              </>
            )}

            {/* Procurement Page */}
            {pageKey === "procurement" && (
              <>
                {renderSection("hero", "Hero Section", (
                  <>
                    {renderTextField("hero.label", "Label")}
                    {renderTextField("hero.title", "Title")}
                    {renderTextField("hero.subtitle", "Subtitle")}
                  </>
                ))}
                {renderSection("tenders", "Tenders Section", (
                  <div className="grid grid-cols-2 gap-4">
                    {renderTextField("tenders.label", "Label")}
                    {renderTextField("tenders.title", "Title")}
                  </div>
                ))}
                {renderSection("imageBreak", "Image Break", (
                  <div className="grid grid-cols-2 gap-4">
                    {renderTextField("imageBreak.label", "Label")}
                    {renderTextField("imageBreak.title", "Title")}
                  </div>
                ))}
                {renderSection("registration", "Supplier Registration", (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      {renderTextField("registration.label", "Label")}
                      {renderTextField("registration.title", "Title")}
                    </div>
                    {renderTextField("registration.description", "Description", true)}
                  </>
                ))}
                {renderSection("documents", "Documents Section", (
                  <div className="grid grid-cols-2 gap-4">
                    {renderTextField("documents.label", "Label")}
                    {renderTextField("documents.title", "Title")}
                  </div>
                ))}
                {renderSection("guidelines", "Guidelines Section", (
                  <div className="grid grid-cols-2 gap-4">
                    {renderTextField("guidelines.label", "Label")}
                    {renderTextField("guidelines.title", "Title")}
                  </div>
                ))}
              </>
            )}

            {/* Projects Page */}
            {pageKey === "projects" && (
              <>
                {renderSection("hero", "Hero Section", (
                  <>
                    {renderTextField("hero.title", "Title")}
                    {renderTextField("hero.subtitle", "Subtitle")}
                  </>
                ))}
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
