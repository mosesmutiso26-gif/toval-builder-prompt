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
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { 
  ArrowLeft,
  Save,
  Image as ImageIcon
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProjectForm {
  title: string;
  project_slug: string;
  summary: string;
  detailed_content: string;
  client_name: string;
  location: string;
  start_date: string;
  end_date: string;
  budget: string;
  status: string;
}

const CMSProjectEdit = () => {
  const { id } = useParams();
  const isNew = id === 'new';
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<ProjectForm>({
    title: '',
    project_slug: '',
    summary: '',
    detailed_content: '',
    client_name: '',
    location: '',
    start_date: '',
    end_date: '',
    budget: '',
    status: 'draft'
  });

  useEffect(() => {
    if (!isNew && id) {
      loadProject(parseInt(id));
    }
  }, [id, isNew]);

  const loadProject = async (projectId: number) => {
    try {
      const { data, error } = await supabase
        .from('cms_projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) throw error;
      
      if (data) {
        setForm({
          title: data.title || '',
          project_slug: data.project_slug || '',
          summary: data.summary || '',
          detailed_content: data.detailed_content || '',
          client_name: data.client_name || '',
          location: data.location || '',
          start_date: data.start_date || '',
          end_date: data.end_date || '',
          budget: data.budget?.toString() || '',
          status: data.status || 'draft'
        });
      }
    } catch (error) {
      console.error('Error loading project:', error);
      toast({
        title: "Error",
        description: "Failed to load project",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setForm(prev => ({
      ...prev,
      title: value,
      project_slug: prev.project_slug || generateSlug(value)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive"
      });
      return;
    }

    setSaving(true);

    try {
      const projectData = {
        title: form.title,
        project_slug: form.project_slug || generateSlug(form.title),
        summary: form.summary || null,
        detailed_content: form.detailed_content || null,
        client_name: form.client_name || null,
        location: form.location || null,
        start_date: form.start_date || null,
        end_date: form.end_date || null,
        budget: form.budget ? parseFloat(form.budget) : null,
        status: form.status,
        created_by: user?.id
      };

      if (isNew) {
        const { error } = await supabase
          .from('cms_projects')
          .insert(projectData);

        if (error) throw error;

        toast({
          title: "Created",
          description: "Project created successfully"
        });
      } else {
        const { error } = await supabase
          .from('cms_projects')
          .update(projectData)
          .eq('id', parseInt(id!));

        if (error) throw error;

        toast({
          title: "Saved",
          description: "Project saved successfully"
        });
      }

      navigate('/admin/cms/projects');
    } catch (error: any) {
      console.error('Error saving project:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to save project",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <ProtectedRoute requiredRole="admin">
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
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Link to="/admin/cms/projects">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-serif font-bold text-foreground">
                  {isNew ? 'New Project' : 'Edit Project'}
                </h1>
              </div>
            </div>
            <Button onClick={handleSubmit} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Project'}
            </Button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Project Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Title *</Label>
                      <Input
                        id="title"
                        value={form.title}
                        onChange={(e) => handleTitleChange(e.target.value)}
                        placeholder="Enter project title"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="slug">URL Slug</Label>
                      <Input
                        id="slug"
                        value={form.project_slug}
                        onChange={(e) => setForm(prev => ({ ...prev, project_slug: e.target.value }))}
                        placeholder="project-url-slug"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="summary">Summary</Label>
                      <Textarea
                        id="summary"
                        value={form.summary}
                        onChange={(e) => setForm(prev => ({ ...prev, summary: e.target.value }))}
                        placeholder="Brief project summary (40-60 words)"
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="content">Detailed Content</Label>
                      <Textarea
                        id="content"
                        value={form.detailed_content}
                        onChange={(e) => setForm(prev => ({ ...prev, detailed_content: e.target.value }))}
                        placeholder="Full project description..."
                        rows={8}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="client">Client Name</Label>
                        <Input
                          id="client"
                          value={form.client_name}
                          onChange={(e) => setForm(prev => ({ ...prev, client_name: e.target.value }))}
                          placeholder="Client or organization"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={form.location}
                          onChange={(e) => setForm(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="Project location"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="start_date">Start Date</Label>
                        <Input
                          id="start_date"
                          type="date"
                          value={form.start_date}
                          onChange={(e) => setForm(prev => ({ ...prev, start_date: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="end_date">End Date</Label>
                        <Input
                          id="end_date"
                          type="date"
                          value={form.end_date}
                          onChange={(e) => setForm(prev => ({ ...prev, end_date: e.target.value }))}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="budget">Budget (KES)</Label>
                        <Input
                          id="budget"
                          type="number"
                          value={form.budget}
                          onChange={(e) => setForm(prev => ({ ...prev, budget: e.target.value }))}
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Publish</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="status">Status</Label>
                      <Select
                        value={form.status}
                        onValueChange={(value) => setForm(prev => ({ ...prev, status: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="draft">Draft</SelectItem>
                          <SelectItem value="active">Published</SelectItem>
                          <SelectItem value="complete">Complete</SelectItem>
                          <SelectItem value="paused">Paused</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button type="submit" className="w-full" disabled={saving}>
                      <Save className="h-4 w-4 mr-2" />
                      {saving ? 'Saving...' : (form.status === 'active' ? 'Publish' : 'Save Draft')}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cover Image</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed">
                      <div className="text-center">
                        <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground">
                          Select from Media Library
                        </p>
                        <Link to="/admin/cms/media">
                          <Button variant="outline" size="sm" className="mt-2">
                            Browse Media
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CMSProjectEdit;
