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
import { ArrowLeft, Save, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Tender {
  title: string;
  reference: string;
  category: string;
  deadline: string;
  value: string;
  status: string;
}

interface Document {
  name: string;
  type: string;
  size: string;
  url?: string;
}

interface ProcurementContent {
  tenders: Tender[];
  documents: Document[];
}

const defaultContent: ProcurementContent = {
  tenders: [
    { title: "Road Construction - County Route 34", reference: "TOVAL/TENDER/2024/001", category: "Road Construction", deadline: "2024-12-15", value: "KES 45,000,000", status: "Open" },
    { title: "Commercial Building - Phase 1", reference: "TOVAL/TENDER/2024/002", category: "Building Construction", deadline: "2024-12-20", value: "KES 28,000,000", status: "Open" },
  ],
  documents: [
    { name: "Supplier Registration Form", type: "PDF", size: "245 KB" },
    { name: "Tender Application Guidelines", type: "PDF", size: "1.2 MB" },
  ],
};

const CMSProcurement = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [content, setContent] = useState<ProcurementContent>(defaultContent);

  useEffect(() => {
    loadContent();
  }, []);

  const loadContent = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_pages")
        .select("content")
        .eq("page_key", "procurement")
        .maybeSingle();

      if (error) throw error;

      if (data?.content) {
        const pageContent = data.content as Record<string, any>;
        setContent({
          tenders: pageContent.activeTenders || defaultContent.tenders,
          documents: pageContent.documentsList || defaultContent.documents,
        });
      }
    } catch (error) {
      console.error("Error loading content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Get existing page content
      const { data: existing } = await supabase
        .from("cms_pages")
        .select("content")
        .eq("page_key", "procurement")
        .maybeSingle();

      const existingContent = (existing?.content as Record<string, any>) || {};
      const updatedContent = {
        ...existingContent,
        activeTenders: content.tenders,
        documentsList: content.documents,
      };

      const { error } = await supabase
        .from("cms_pages")
        .update({ content: updatedContent as unknown as Json })
        .eq("page_key", "procurement");

      if (error) throw error;

      toast({ title: "Saved", description: "Procurement content updated successfully" });
    } catch (error: any) {
      console.error("Error saving:", error);
      toast({ title: "Error", description: error.message || "Failed to save", variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  const updateTender = (index: number, field: keyof Tender, value: string) => {
    const newTenders = [...content.tenders];
    newTenders[index] = { ...newTenders[index], [field]: value };
    setContent({ ...content, tenders: newTenders });
  };

  const addTender = () => {
    setContent({
      ...content,
      tenders: [...content.tenders, { title: "", reference: "", category: "", deadline: "", value: "", status: "Open" }],
    });
  };

  const removeTender = (index: number) => {
    setContent({ ...content, tenders: content.tenders.filter((_, i) => i !== index) });
  };

  const updateDocument = (index: number, field: keyof Document, value: string) => {
    const newDocs = [...content.documents];
    newDocs[index] = { ...newDocs[index], [field]: value };
    setContent({ ...content, documents: newDocs });
  };

  const addDocument = () => {
    setContent({
      ...content,
      documents: [...content.documents, { name: "", type: "PDF", size: "" }],
    });
  };

  const removeDocument = (index: number) => {
    setContent({ ...content, documents: content.documents.filter((_, i) => i !== index) });
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
              <Link to="/admin/cms">
                <Button variant="ghost" size="icon"><ArrowLeft className="h-5 w-5" /></Button>
              </Link>
              <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">Procurement Management</h1>
                <p className="text-muted-foreground">Manage tenders and documents</p>
              </div>
            </div>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4 mr-2" /> {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>

          <div className="space-y-6 max-w-4xl">
            {/* Tenders */}
            <Card>
              <CardHeader>
                <CardTitle>Active Tenders</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {content.tenders.map((tender, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Tender {index + 1}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeTender(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input value={tender.title} onChange={(e) => updateTender(index, "title", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Reference</Label>
                        <Input value={tender.reference} onChange={(e) => updateTender(index, "reference", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Input value={tender.category} onChange={(e) => updateTender(index, "category", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Deadline</Label>
                        <Input type="date" value={tender.deadline} onChange={(e) => updateTender(index, "deadline", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Estimated Value</Label>
                        <Input value={tender.value} onChange={(e) => updateTender(index, "value", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Status</Label>
                        <Select value={tender.status} onValueChange={(v) => updateTender(index, "status", v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Open">Open</SelectItem>
                            <SelectItem value="Closing Soon">Closing Soon</SelectItem>
                            <SelectItem value="Closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={addTender}>
                  <Plus className="h-4 w-4 mr-2" /> Add Tender
                </Button>
              </CardContent>
            </Card>

            {/* Documents */}
            <Card>
              <CardHeader>
                <CardTitle>Downloadable Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {content.documents.map((doc, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Document {index + 1}</span>
                      <Button variant="ghost" size="sm" onClick={() => removeDocument(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input value={doc.name} onChange={(e) => updateDocument(index, "name", e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Type</Label>
                        <Select value={doc.type} onValueChange={(v) => updateDocument(index, "type", v)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="PDF">PDF</SelectItem>
                            <SelectItem value="DOCX">DOCX</SelectItem>
                            <SelectItem value="XLSX">XLSX</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Size</Label>
                        <Input value={doc.size} onChange={(e) => updateDocument(index, "size", e.target.value)} placeholder="e.g. 245 KB" />
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={addDocument}>
                  <Plus className="h-4 w-4 mr-2" /> Add Document
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CMSProcurement;
