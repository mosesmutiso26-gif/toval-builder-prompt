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
  Plus,
  Trash2,
  GripVertical,
  Eye
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ContentBlock {
  id: string;
  type: string;
  data: Record<string, any>;
}

interface PageContent {
  blocks: ContentBlock[];
}

const blockTypes = [
  { value: 'hero', label: 'Hero Section', fields: ['title', 'subtitle', 'cta_text', 'cta_link'] },
  { value: 'text', label: 'Text Block', fields: ['content'] },
  { value: 'services_list', label: 'Services List', fields: ['title'] },
  { value: 'projects_carousel', label: 'Projects Carousel', fields: ['title', 'count'] },
  { value: 'testimonials', label: 'Testimonials', fields: ['title'] },
  { value: 'cta', label: 'Call to Action', fields: ['title', 'subtitle', 'button_text', 'button_link'] },
  { value: 'contact_form', label: 'Contact Form', fields: ['title'] }
];

const CMSPageEdit = () => {
  const { pageKey } = useParams();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);

  useEffect(() => {
    if (pageKey) {
      loadPage(pageKey);
    }
  }, [pageKey]);

  const loadPage = async (key: string) => {
    try {
      const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .eq('page_key', key)
        .maybeSingle();

      if (error) throw error;
      
      if (data) {
        setTitle(data.title || '');
        const content = data.content as unknown as PageContent;
        setBlocks(content?.blocks || []);
      } else {
        // Set default title based on page key
        setTitle(key.charAt(0).toUpperCase() + key.slice(1));
      }
    } catch (error) {
      console.error('Error loading page:', error);
      toast({
        title: "Error",
        description: "Failed to load page",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const addBlock = (type: string) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      data: {}
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const updateBlockData = (id: string, field: string, value: string) => {
    setBlocks(blocks.map(b => 
      b.id === id 
        ? { ...b, data: { ...b.data, [field]: value } }
        : b
    ));
  };

  const handleSave = async () => {
    if (!pageKey) return;

    setSaving(true);

    try {
      const content = { blocks } as unknown as Json;

      const { data: existing } = await supabase
        .from('cms_pages')
        .select('id')
        .eq('page_key', pageKey)
        .maybeSingle();

      if (existing) {
        const { error } = await supabase
          .from('cms_pages')
          .update({ title, content })
          .eq('page_key', pageKey);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('cms_pages')
          .insert({ page_key: pageKey, title, content });

        if (error) throw error;
      }

      toast({
        title: "Saved",
        description: "Page saved successfully"
      });
    } catch (error: any) {
      console.error('Error saving page:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save page",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const getBlockTypeInfo = (type: string) => {
    return blockTypes.find(bt => bt.value === type);
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
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">
                  Edit: {title || pageKey}
                </h1>
                <p className="text-muted-foreground">
                  Customize page content and layout
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild>
                <Link to={`/${pageKey === 'homepage' ? '' : pageKey}`} target="_blank">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Link>
              </Button>
              <Button onClick={handleSave} disabled={saving}>
                <Save className="h-4 w-4 mr-2" />
                {saving ? 'Saving...' : 'Save Page'}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Content Blocks */}
            <div className="lg:col-span-3 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Page Title</CardTitle>
                </CardHeader>
                <CardContent>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Page title"
                  />
                </CardContent>
              </Card>

              {blocks.length === 0 ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <p className="text-muted-foreground mb-4">
                      No content blocks yet. Add blocks from the sidebar to build your page.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                blocks.map((block, index) => {
                  const blockType = getBlockTypeInfo(block.type);
                  
                  return (
                    <Card key={block.id}>
                      <CardHeader className="flex flex-row items-center justify-between py-3">
                        <div className="flex items-center gap-2">
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                          <CardTitle className="text-base">
                            {blockType?.label || block.type}
                          </CardTitle>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeBlock(block.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {blockType?.fields.map((field) => (
                          <div key={field} className="space-y-2">
                            <Label className="capitalize">
                              {field.replace(/_/g, ' ')}
                            </Label>
                            {field === 'content' ? (
                              <Textarea
                                value={block.data[field] || ''}
                                onChange={(e) => updateBlockData(block.id, field, e.target.value)}
                                placeholder={`Enter ${field.replace(/_/g, ' ')}`}
                                rows={4}
                              />
                            ) : (
                              <Input
                                value={block.data[field] || ''}
                                onChange={(e) => updateBlockData(block.id, field, e.target.value)}
                                placeholder={`Enter ${field.replace(/_/g, ' ')}`}
                              />
                            )}
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>

            {/* Sidebar - Add Blocks */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Add Block</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {blockTypes.map((bt) => (
                    <Button
                      key={bt.value}
                      variant="outline"
                      className="w-full justify-start"
                      onClick={() => addBlock(bt.value)}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      {bt.label}
                    </Button>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Tips</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground space-y-2">
                  <p>• Add blocks to build your page layout</p>
                  <p>• Drag blocks to reorder them</p>
                  <p>• Use the Preview button to see changes</p>
                  <p>• Save frequently to avoid losing work</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CMSPageEdit;
