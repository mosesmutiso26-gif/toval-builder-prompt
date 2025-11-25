import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, UserCog, Contact2, TrendingUp, FileText, Building2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalContacts: 0,
    totalLeads: 0,
    activeLeads: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [usersRes, contactsRes, leadsRes, activeLeadsRes] = await Promise.all([
      supabase.from("profiles").select("id", { count: "exact" }),
      supabase.from("crm_contacts").select("id", { count: "exact" }),
      supabase.from("crm_leads").select("id", { count: "exact" }),
      supabase.from("crm_leads").select("id", { count: "exact" }).eq("status", "active"),
    ]);

    setStats({
      totalUsers: usersRes.count || 0,
      totalContacts: contactsRes.count || 0,
      totalLeads: leadsRes.count || 0,
      activeLeads: activeLeadsRes.count || 0,
    });
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      description: "Registered users",
    },
    {
      title: "CRM Contacts",
      value: stats.totalContacts,
      icon: Contact2,
      description: "Active contacts",
    },
    {
      title: "Total Leads",
      value: stats.totalLeads,
      icon: TrendingUp,
      description: "All leads",
    },
    {
      title: "Active Leads",
      value: stats.activeLeads,
      icon: FileText,
      description: "Currently active",
    },
  ];

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen">
        <Navbar />

        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3">
              <Building2 className="h-10 w-10" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
                <p className="text-lg opacity-90">Manage users, CRM, and system settings</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {statCards.map((card, index) => {
                const Icon = card.icon;
                return (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{card.value}</div>
                      <p className="text-xs text-muted-foreground">{card.description}</p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = "/admin/users"}>
                <CardHeader>
                  <UserCog className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage users and assign roles</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = "/admin/contacts"}>
                <CardHeader>
                  <Contact2 className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>CRM Contacts</CardTitle>
                  <CardDescription>View and manage contacts</CardDescription>
                </CardHeader>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => window.location.href = "/admin/leads"}>
                <CardHeader>
                  <TrendingUp className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>CRM Leads</CardTitle>
                  <CardDescription>Track and manage leads</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AdminDashboard;
