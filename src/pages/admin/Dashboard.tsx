import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  UserCog, 
  Contact2, 
  TrendingUp, 
  FileText, 
  Building2, 
  Image, 
  FolderKanban,
  LayoutDashboard,
  FileEdit,
  Clock,
  Activity
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalContacts: 0,
    totalLeads: 0,
    activeLeads: 0,
    totalMedia: 0,
    totalProjects: 0,
    totalPages: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    loadStats();
    loadRecentActivity();
  }, []);

  const loadStats = async () => {
    const [usersRes, contactsRes, leadsRes, activeLeadsRes, mediaRes, projectsRes, pagesRes] = await Promise.all([
      supabase.from("profiles").select("id", { count: "exact" }),
      supabase.from("crm_contacts").select("id", { count: "exact" }),
      supabase.from("crm_leads").select("id", { count: "exact" }),
      supabase.from("crm_leads").select("id", { count: "exact" }).eq("status", "active"),
      supabase.from("cms_media").select("id", { count: "exact" }),
      supabase.from("cms_projects").select("id", { count: "exact" }),
      supabase.from("cms_pages").select("id", { count: "exact" }),
    ]);

    setStats({
      totalUsers: usersRes.count || 0,
      totalContacts: contactsRes.count || 0,
      totalLeads: leadsRes.count || 0,
      activeLeads: activeLeadsRes.count || 0,
      totalMedia: mediaRes.count || 0,
      totalProjects: projectsRes.count || 0,
      totalPages: pagesRes.count || 0,
    });
  };

  const loadRecentActivity = async () => {
    const { data } = await supabase
      .from("cms_audit")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(5);
    setRecentActivity(data || []);
  };

  const statCards = [
    { title: "Total Users", value: stats.totalUsers, icon: Users, description: "Registered users", color: "text-blue-600" },
    { title: "CRM Contacts", value: stats.totalContacts, icon: Contact2, description: "Active contacts", color: "text-green-600" },
    { title: "Active Leads", value: stats.activeLeads, icon: TrendingUp, description: "Currently active", color: "text-amber-600" },
    { title: "Media Files", value: stats.totalMedia, icon: Image, description: "Images & videos", color: "text-purple-600" },
    { title: "CMS Projects", value: stats.totalProjects, icon: FolderKanban, description: "Total projects", color: "text-cyan-600" },
    { title: "CMS Pages", value: stats.totalPages, icon: FileText, description: "Website pages", color: "text-rose-600" },
  ];

  const quickActions = [
    { title: "User Management", description: "Manage users and assign roles", icon: UserCog, href: "/admin/users", color: "bg-blue-500" },
    { title: "CRM Contacts", description: "View and manage contacts", icon: Contact2, href: "/admin/contacts", color: "bg-green-500" },
    { title: "CRM Leads", description: "Track and manage leads", icon: TrendingUp, href: "/admin/leads", color: "bg-amber-500" },
    { title: "Media Library", description: "Upload and manage media files", icon: Image, href: "/admin/cms/media", color: "bg-purple-500" },
    { title: "Projects Manager", description: "Manage CMS projects", icon: FolderKanban, href: "/admin/cms/projects", color: "bg-cyan-500" },
    { title: "Pages Editor", description: "Edit website pages", icon: FileEdit, href: "/admin/cms/pages", color: "bg-rose-500" },
  ];

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        {/* Hero Section - Classic Professional Style */}
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary-foreground/10 rounded-lg">
                <LayoutDashboard className="h-12 w-12" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
                  Digital Office
                </h1>
                <p className="text-xl opacity-90 mt-2 font-sans">
                  Manage your website content, users, and CRM from one place
                </p>
              </div>
            </div>
          </div>
        </section>

        <main className="flex-1 py-12">
          <div className="container mx-auto px-4 space-y-12">
            {/* Stats Grid */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6 flex items-center gap-2">
                <Activity className="h-6 w-6 text-primary" />
                Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {statCards.map((card, index) => {
                  const Icon = card.icon;
                  return (
                    <Card key={index} className="border-border/50 hover:shadow-md transition-shadow">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
                        <Icon className={`h-5 w-5 ${card.color}`} />
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold text-foreground">{card.value}</div>
                        <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* Quick Actions */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6 flex items-center gap-2">
                <Building2 className="h-6 w-6 text-primary" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Card 
                      key={index} 
                      className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/30"
                      onClick={() => navigate(action.href)}
                    >
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-lg font-serif">{action.title}</CardTitle>
                        <CardDescription className="text-muted-foreground">{action.description}</CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6 flex items-center gap-2">
                <Clock className="h-6 w-6 text-primary" />
                Recent Activity
              </h2>
              <Card className="border-border/50">
                <CardContent className="p-6">
                  {recentActivity.length > 0 ? (
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                            <Activity className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">
                              {activity.action} on {activity.target_table}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(activity.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Clock className="h-12 w-12 text-muted-foreground/50 mx-auto mb-4" />
                      <p className="text-muted-foreground">No recent activity</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Activity will appear here as you make changes
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </section>

            {/* CMS Quick Links */}
            <section>
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-8">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-4">
                  Content Management System
                </h2>
                <p className="text-muted-foreground mb-6">
                  Manage your website content, upload media, and edit pages with our powerful CMS.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => navigate("/admin/cms/media")} variant="default">
                    <Image className="h-4 w-4 mr-2" />
                    Media Library
                  </Button>
                  <Button onClick={() => navigate("/admin/cms/projects")} variant="outline">
                    <FolderKanban className="h-4 w-4 mr-2" />
                    Manage Projects
                  </Button>
                  <Button onClick={() => navigate("/admin/cms/pages")} variant="outline">
                    <FileEdit className="h-4 w-4 mr-2" />
                    Edit Pages
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;