import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { supabase } from "@/integrations/supabase/client";
import { 
  LayoutDashboard, 
  Image, 
  FolderOpen, 
  FileText, 
  Users, 
  Activity,
  Plus,
  Upload,
  Edit
} from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalMedia: number;
  totalPages: number;
}

interface AuditLog {
  id: number;
  action: string;
  target_table: string;
  created_at: string;
}

const CMSDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjects: 0,
    activeProjects: 0,
    totalMedia: 0,
    totalPages: 0
  });
  const [recentActivity, setRecentActivity] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      // Load stats
      const [projectsRes, activeProjectsRes, mediaRes, pagesRes, auditRes] = await Promise.all([
        supabase.from('cms_projects').select('id', { count: 'exact', head: true }),
        supabase.from('cms_projects').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('cms_media').select('id', { count: 'exact', head: true }),
        supabase.from('cms_pages').select('id', { count: 'exact', head: true }),
        supabase.from('cms_audit').select('*').order('created_at', { ascending: false }).limit(5)
      ]);

      setStats({
        totalProjects: projectsRes.count || 0,
        activeProjects: activeProjectsRes.count || 0,
        totalMedia: mediaRes.count || 0,
        totalPages: pagesRes.count || 0
      });

      if (auditRes.data) {
        setRecentActivity(auditRes.data);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const quickActions = [
    { label: "Add Project", icon: Plus, href: "/admin/cms/projects/new", color: "bg-primary" },
    { label: "Upload Media", icon: Upload, href: "/admin/cms/media", color: "bg-accent" },
    { label: "Edit Homepage", icon: Edit, href: "/admin/cms/pages/homepage", color: "bg-secondary" }
  ];

  const modules = [
    { label: "Media Library", icon: Image, href: "/admin/cms/media", count: stats.totalMedia, description: "Manage images and videos" },
    { label: "Projects", icon: FolderOpen, href: "/admin/cms/projects", count: stats.totalProjects, description: "Manage project content" },
    { label: "Pages", icon: FileText, href: "/admin/cms/pages", count: stats.totalPages, description: "Edit website pages" },
    { label: "Users", icon: Users, href: "/admin/users", count: null, description: "Manage user roles" }
  ];

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-serif font-bold text-foreground mb-2">
              Digital Office
            </h1>
            <p className="text-muted-foreground">
              Manage your website content, projects, and media from one place.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {quickActions.map((action) => (
              <Link key={action.label} to={action.href}>
                <Button 
                  className="w-full h-16 text-lg font-medium gap-3"
                  variant="default"
                >
                  <action.icon className="h-5 w-5" />
                  {action.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Projects
                </CardTitle>
                <FolderOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalProjects}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Projects
                </CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-primary">{stats.activeProjects}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Media Files
                </CardTitle>
                <Image className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalMedia}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  CMS Pages
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalPages}</div>
              </CardContent>
            </Card>
          </div>

          {/* Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {modules.map((module) => (
              <Link key={module.label} to={module.href}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <module.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{module.label}</CardTitle>
                        {module.count !== null && (
                          <p className="text-sm text-muted-foreground">{module.count} items</p>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{module.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.map((log) => (
                    <div key={log.id} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium">{log.action}</p>
                        <p className="text-sm text-muted-foreground">{log.target_table}</p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {new Date(log.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center py-8">
                  No recent activity. Start by adding a project or uploading media.
                </p>
              )}
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CMSDashboard;
