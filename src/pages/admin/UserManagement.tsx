import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { UserCog, Shield } from "lucide-react";

interface User {
  id: string;
  email: string;
  full_name: string;
  company_name: string;
  created_at: string;
  roles: string[];
}

const UserManagement = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from("user_roles")
        .select("*");

      if (rolesError) throw rolesError;

      const usersWithRoles = profiles.map((profile) => ({
        ...profile,
        roles: roles
          .filter((role) => role.user_id === profile.id)
          .map((role) => role.role),
      }));

      setUsers(usersWithRoles);
    } catch (error: any) {
      toast({
        title: "Error loading users",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const assignRole = async (userId: string, role: "admin" | "moderator" | "user") => {
    try {
      const { error } = await supabase
        .from("user_roles")
        .insert({ user_id: userId, role: role });

      if (error) throw error;

      toast({
        title: "Role assigned",
        description: `Successfully assigned ${role} role`,
      });

      loadUsers();
    } catch (error: any) {
      toast({
        title: "Error assigning role",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const removeRole = async (userId: string, role: "admin" | "moderator" | "user") => {
    try {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", userId)
        .eq("role", role);

      if (error) throw error;

      toast({
        title: "Role removed",
        description: `Successfully removed ${role} role`,
      });

      loadUsers();
    } catch (error: any) {
      toast({
        title: "Error removing role",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen">
        <Navbar />

        <section className="bg-primary text-primary-foreground py-12">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3">
              <UserCog className="h-10 w-10" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">User Management</h1>
                <p className="text-lg opacity-90">Manage users and assign roles</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card>
              <CardHeader>
                <CardTitle>All Users</CardTitle>
                <CardDescription>View and manage user roles</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading users...</div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Email</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Roles</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {users.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.email}</TableCell>
                          <TableCell>{user.full_name || "—"}</TableCell>
                          <TableCell>{user.company_name || "—"}</TableCell>
                          <TableCell>
                            <div className="flex gap-1 flex-wrap">
                              {user.roles.map((role) => (
                                <Badge
                                  key={role}
                                  variant={role === "admin" ? "default" : "secondary"}
                                  className="cursor-pointer"
                                  onClick={() => removeRole(user.id, role as "admin" | "moderator" | "user")}
                                >
                                  {role}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Select
                              onValueChange={(value) => assignRole(user.id, value as "admin" | "moderator" | "user")}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue placeholder="Add role" />
                              </SelectTrigger>
                              <SelectContent>
                                {!user.roles.includes("admin") && (
                                  <SelectItem value="admin">Admin</SelectItem>
                                )}
                                {!user.roles.includes("moderator") && (
                                  <SelectItem value="moderator">Moderator</SelectItem>
                                )}
                                {!user.roles.includes("user") && (
                                  <SelectItem value="user">User</SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                          </TableCell>
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

export default UserManagement;
