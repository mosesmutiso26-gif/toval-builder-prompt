import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText,
  ArrowLeft,
  Edit,
  Home,
  Briefcase,
  FolderOpen,
  Phone,
  Users,
  Info
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

interface CMSPage {
  id: number;
  page_key: string;
  title: string;
  updated_at: string;
}

const defaultPages = [
  { key: 'homepage', title: 'Homepage', icon: Home, description: 'Main landing page with hero and sections' },
  { key: 'about', title: 'About Us', icon: Info, description: 'Company information and team' },
  { key: 'services', title: 'Services', icon: Briefcase, description: 'Service offerings and capabilities' },
  { key: 'projects', title: 'Projects', icon: FolderOpen, description: 'Project showcase and portfolio' },
  { key: 'contact', title: 'Contact', icon: Phone, description: 'Contact form and information' },
  { key: 'careers', title: 'Careers', icon: Users, description: 'Job listings and applications' }
];

const CMSPages = () => {
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      const { data, error } = await supabase
        .from('cms_pages')
        .select('*')
        .order('page_key');

      if (error) throw error;
      setPages(data || []);
    } catch (error) {
      console.error('Error loading pages:', error);
      toast({
        title: "Error",
        description: "Failed to load pages",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getPageData = (pageKey: string) => {
    return pages.find(p => p.page_key === pageKey);
  };

  const handleEditPage = async (pageKey: string, title: string) => {
    const existingPage = getPageData(pageKey);
    
    if (!existingPage) {
      // Create the page first
      try {
        const { error } = await supabase
          .from('cms_pages')
          .insert({
            page_key: pageKey,
            title: title,
            content: {}
          });

        if (error) throw error;
      } catch (error) {
        console.error('Error creating page:', error);
        toast({
          title: "Error",
          description: "Failed to create page",
          variant: "destructive"
        });
        return;
      }
    }

    navigate(`/admin/cms/pages/${pageKey}`);
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link to="/admin/cms">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-serif font-bold text-foreground">
                Website Pages
              </h1>
              <p className="text-muted-foreground">
                Edit page content and layouts
              </p>
            </div>
          </div>

          {/* Pages Grid */}
          {loading ? (
            <div className="text-center py-12">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {defaultPages.map((page) => {
                const pageData = getPageData(page.key);
                const Icon = page.icon;
                
                return (
                  <Card 
                    key={page.key}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => handleEditPage(page.key, page.title)}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{page.title}</CardTitle>
                            {pageData ? (
                              <Badge variant="outline" className="mt-1">
                                Customized
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="mt-1">
                                Default
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">
                        {page.description}
                      </p>
                      {pageData && (
                        <p className="text-xs text-muted-foreground">
                          Last updated: {new Date(pageData.updated_at).toLocaleDateString()}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CMSPages;
