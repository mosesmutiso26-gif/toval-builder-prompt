import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { TrendingUp, Plus } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface Lead {
  id: string;
  project_name: string;
  project_value: number;
  status: string;
  priority: string;
  source: string;
  expected_close_date: string;
  notes: string;
}

const CRMLeads = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const [formData, setFormData] = useState({
    project_name: "",
    project_value: "",
    status: "new",
    priority: "medium",
    source: "",
    expected_close_date: "",
    notes: "",
  });

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    try {
      const { data, error } = await supabase
        .from("crm_leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error: any) {
      toast({
        title: "Error loading leads",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from("crm_leads")
        .insert({
          project_name: formData.project_name,
          project_value: formData.project_value ? parseFloat(formData.project_value) : null,
          status: formData.status,
          priority: formData.priority,
          source: formData.source,
          expected_close_date: formData.expected_close_date || null,
          notes: formData.notes,
          created_by: user!.id,
        });

      if (error) throw error;

      toast({
        title: "Lead created",
        description: "Lead has been added successfully",
      });

      setIsDialogOpen(false);
      setFormData({
        project_name: "",
        project_value: "",
        status: "new",
        priority: "medium",
        source: "",
        expected_close_date: "",
        notes: "",
      });
      loadLeads();
    } catch (error: any) {
      toast({
        title: "Error creating lead",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
    }).format(value);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen">
        <Navbar />

        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-10 w-10" />
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">CRM Leads</h1>
                  <p className="text-lg opacity-90">Track and manage sales leads</p>
                </div>
              </div>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="secondary">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Lead
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Lead</DialogTitle>
                    <DialogDescription>Create a new lead in your CRM</DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="project_name">Project Name *</Label>
                      <Input
                        id="project_name"
                        value={formData.project_name}
                        onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="project_value">Project Value (KES)</Label>
                        <Input
                          id="project_value"
                          type="number"
                          step="0.01"
                          value={formData.project_value}
                          onChange={(e) => setFormData({ ...formData, project_value: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expected_close_date">Expected Close Date</Label>
                        <Input
                          id="expected_close_date"
                          type="date"
                          value={formData.expected_close_date}
                          onChange={(e) => setFormData({ ...formData, expected_close_date: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="new">New</SelectItem>
                            <SelectItem value="contacted">Contacted</SelectItem>
                            <SelectItem value="qualified">Qualified</SelectItem>
                            <SelectItem value="proposal">Proposal</SelectItem>
                            <SelectItem value="won">Won</SelectItem>
                            <SelectItem value="lost">Lost</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="priority">Priority</Label>
                        <Select value={formData.priority} onValueChange={(value) => setFormData({ ...formData, priority: value })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="source">Source</Label>
                        <Input
                          id="source"
                          value={formData.source}
                          onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                          placeholder="Website, referral..."
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="notes">Notes</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <Button type="submit" className="w-full">Create Lead</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card>
              <CardHeader>
                <CardTitle>All Leads</CardTitle>
                <CardDescription>Total: {leads.length} leads</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading leads...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project Name</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Priority</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Close Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leads.map((lead) => (
                        <TableRow key={lead.id}>
                          <TableCell className="font-medium">{lead.project_name}</TableCell>
                          <TableCell>{lead.project_value ? formatCurrency(lead.project_value) : "—"}</TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                lead.status === "won" ? "default" : 
                                lead.status === "lost" ? "destructive" : 
                                "secondary"
                              }
                            >
                              {lead.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant={
                                lead.priority === "high" ? "destructive" : 
                                lead.priority === "medium" ? "default" : 
                                "secondary"
                              }
                            >
                              {lead.priority}
                            </Badge>
                          </TableCell>
                          <TableCell>{lead.source || "—"}</TableCell>
                          <TableCell>{lead.expected_close_date || "—"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default CRMLeads;
