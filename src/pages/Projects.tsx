import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useCMSPage } from "@/hooks/useCMSPage";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// Fallback images
import roadImage1 from "@/assets/project-road-1.jpg";
import roadImage2 from "@/assets/project-road-2.jpg";
import roadImage3 from "@/assets/project-road-3.jpg";
import buildingImage from "@/assets/project-building-1.jpg";
import drainageImage1 from "@/assets/project-drainage-1.jpg";
import drainageImage2 from "@/assets/project-drainage-2.jpg";
import buildingOngoing1 from "@/assets/project-building-ongoing-1.jpg";
import buildingOngoing2 from "@/assets/project-building-ongoing-2.jpg";
import buildingOngoing3 from "@/assets/project-building-ongoing-3.jpg";
import siteSurvey from "@/assets/project-site-survey.jpg";

interface CMSProject {
  id: number;
  title: string;
  summary: string | null;
  status: string | null;
  location: string | null;
  cover_media_id: number | null;
  cover_media?: { url: string | null };
  project_media?: Array<{ media: { url: string | null } }>;
}

const Projects = () => {
  const { loading: pageLoading, getContent } = useCMSPage("projects");
  const [cmsProjects, setCmsProjects] = useState<CMSProject[]>([]);
  const [projectsLoading, setProjectsLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Get CMS content
  const hero = getContent("hero", { title: "Our Projects", subtitle: "Building Kenya's Infrastructure Excellence" });
  const categories = getContent("categories", ["Road Construction", "Building Projects", "Infrastructure", "Water & Sewerage"]);

  // Fetch projects from CMS
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("cms_projects")
          .select(`
            *,
            cover_media:cms_media!cms_projects_cover_media_id_fkey(url),
            project_media:cms_project_media(
              media:cms_media(url)
            )
          `)
          .eq("status", "active")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setCmsProjects(data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setProjectsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Fallback static projects
  const staticCompletedProjects = [
    {
      title: "Kisumu Urban Road Network",
      category: "Road Construction",
      description: "5km urban road network including drainage and street lighting",
      images: [roadImage1, roadImage2, roadImage3],
      status: "Completed",
    },
    {
      title: "Residential Building Project",
      category: "Building Construction",
      description: "Modern residential building with quality finishes",
      images: [buildingImage],
      status: "Completed",
    },
    {
      title: "Storm Water Drainage System",
      category: "Infrastructure",
      description: "Comprehensive drainage and culvert construction for community access",
      images: [drainageImage1, drainageImage2],
      status: "Completed",
    },
  ];

  const staticOngoingProjects = [
    {
      title: "County Government Office Complex",
      category: "Government",
      description: "Modern administrative building with conference facilities",
      images: [buildingOngoing1, buildingOngoing2, buildingOngoing3],
      progress: "75%",
    },
    {
      title: "Residential Estate - Phase 2",
      category: "Residential",
      description: "Multi-unit housing development with site preparation",
      images: [siteSurvey],
      progress: "60%",
    },
    {
      title: "Highway Rehabilitation Project",
      category: "Road Construction",
      description: "Road grading and surface preparation works",
      images: [roadImage3],
      progress: "40%",
    },
  ];

  // Use CMS projects if available, otherwise fallback to static
  const hasProjects = cmsProjects.length > 0;
  const completedProjects = hasProjects 
    ? cmsProjects.filter(p => p.status === "active") 
    : staticCompletedProjects;
  const ongoingProjects = staticOngoingProjects;

  const getProjectImages = (project: CMSProject): string[] => {
    const images: string[] = [];
    if (project.cover_media?.url) {
      images.push(project.cover_media.url);
    }
    if (project.project_media) {
      project.project_media.forEach(pm => {
        if (pm.media?.url) {
          images.push(pm.media.url);
        }
      });
    }
    return images.length > 0 ? images : [roadImage1];
  };

  const loading = pageLoading || projectsLoading;

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <Skeleton className="h-12 w-64 mx-auto mb-4 bg-primary-foreground/20" />
            <Skeleton className="h-6 w-96 mx-auto bg-primary-foreground/20" />
          </div>
        </section>
        <div className="container mx-auto px-4 py-16">
          <Skeleton className="h-10 w-48 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => <Skeleton key={i} className="h-80" />)}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{hero.title}</h1>
          <p className="text-xl opacity-90">{hero.subtitle}</p>
        </div>
      </section>

      {/* CMS Projects (if available) */}
      {hasProjects && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cmsProjects.map((project) => {
                const images = getProjectImages(project);
                return (
                  <Dialog key={project.id}>
                    <DialogTrigger asChild>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                        <img 
                          src={images[0]} 
                          alt={project.title}
                          className="w-full h-48 object-cover"
                        />
                        <CardHeader>
                          <div className="flex justify-between items-start mb-2">
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <Badge variant="secondary">{project.status}</Badge>
                          </div>
                          {project.location && (
                            <Badge variant="outline">{project.location}</Badge>
                          )}
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{project.summary}</p>
                          {images.length > 1 && (
                            <p className="text-sm text-primary mt-2">{images.length} photos - Click to view gallery</p>
                          )}
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                      <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                      {images.length > 1 ? (
                        <div className="space-y-4">
                          <div className="relative">
                            <img 
                              src={images[selectedImageIndex]} 
                              alt={`${project.title} - Image ${selectedImageIndex + 1}`}
                              className="w-full h-96 object-cover rounded-lg"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center">
                              <Button
                                variant="secondary"
                                size="icon"
                                className="ml-2"
                                onClick={() => setSelectedImageIndex(i => i === 0 ? images.length - 1 : i - 1)}
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center">
                              <Button
                                variant="secondary"
                                size="icon"
                                className="mr-2"
                                onClick={() => setSelectedImageIndex(i => i === images.length - 1 ? 0 : i + 1)}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <div className="flex gap-2 overflow-x-auto pb-2">
                            {images.map((img, idx) => (
                              <button
                                key={idx}
                                onClick={() => setSelectedImageIndex(idx)}
                                className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-colors ${
                                  idx === selectedImageIndex ? 'border-primary' : 'border-transparent'
                                }`}
                              >
                                <img src={img} alt="" className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <img 
                          src={images[0]} 
                          alt={project.title}
                          className="w-full h-96 object-cover rounded-lg"
                        />
                      )}
                      <p className="text-muted-foreground mt-4">{project.summary}</p>
                    </DialogContent>
                  </Dialog>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Static Completed Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Completed Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staticCompletedProjects.map((project, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <img 
                      src={project.images[0]} 
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <Badge variant="secondary">{project.status}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{project.category}</Badge>
                        {project.images.length > 1 && (
                          <Badge variant="outline">{project.images.length} photos</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{project.description}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.map((img, imgIndex) => (
                      <img 
                        key={imgIndex}
                        src={img} 
                        alt={`${project.title} - Image ${imgIndex + 1}`}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Ongoing Projects */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Ongoing Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ongoingProjects.map((project, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                    <img 
                      src={project.images[0]} 
                      alt={project.title}
                      className="w-full h-48 object-cover"
                    />
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                        <Badge>{project.progress}</Badge>
                      </div>
                      <div className="flex gap-2">
                        <Badge variant="outline">{project.category}</Badge>
                        {project.images.length > 1 && (
                          <Badge variant="outline">{project.images.length} photos</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{project.description}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-4xl">
                  <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.images.map((img, imgIndex) => (
                      <img 
                        key={imgIndex}
                        src={img} 
                        alt={`${project.title} - Image ${imgIndex + 1}`}
                        className="w-full h-64 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Project Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Project Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {(Array.isArray(categories) ? categories : ['Road Construction', 'Building Projects', 'Infrastructure', 'Water & Sewerage']).map((category: string, index: number) => (
              <Card key={index} className="text-center hover:bg-accent transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <p className="font-semibold">{category}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
