import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

// Real project images
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

const Projects = () => {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState("");

  const completedProjects = [
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

  const ongoingProjects = [
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

  const openGallery = (images: string[], title: string) => {
    setSelectedImages(images);
    setSelectedTitle(title);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
          <p className="text-xl opacity-90">Building Kenya's Infrastructure Excellence</p>
        </div>
      </section>

      {/* Completed Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Completed Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedProjects.map((project, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Card 
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => openGallery(project.images, project.title)}
                  >
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
            {['Road Construction', 'Building Projects', 'Infrastructure', 'Water & Sewerage'].map((category, index) => (
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
