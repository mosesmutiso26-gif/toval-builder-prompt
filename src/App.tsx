import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import News from "./pages/News";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Procurement from "./pages/Procurement";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/admin/Dashboard";
import UserManagement from "./pages/admin/UserManagement";
import CRMContacts from "./pages/admin/CRMContacts";
import CRMLeads from "./pages/admin/CRMLeads";
import CMSDashboard from "./pages/admin/CMSDashboard";
import CMSMedia from "./pages/admin/CMSMedia";
import CMSProjects from "./pages/admin/CMSProjects";
import CMSProjectEdit from "./pages/admin/CMSProjectEdit";
import CMSPages from "./pages/admin/CMSPages";
import CMSPageEdit from "./pages/admin/CMSPageEdit";
import Install from "./pages/Install";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/news" element={<News />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/procurement" element={<Procurement />} />
          <Route path="/install" element={<Install />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/contacts" element={<CRMContacts />} />
          <Route path="/admin/leads" element={<CRMLeads />} />
          <Route path="/admin/cms" element={<CMSDashboard />} />
          <Route path="/admin/cms/media" element={<CMSMedia />} />
          <Route path="/admin/cms/projects" element={<CMSProjects />} />
          <Route path="/admin/cms/projects/:id" element={<CMSProjectEdit />} />
          <Route path="/admin/cms/pages" element={<CMSPages />} />
          <Route path="/admin/cms/pages/:pageKey" element={<CMSPageEdit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
