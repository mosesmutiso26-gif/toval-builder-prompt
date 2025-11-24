import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import roadImage from "@/assets/road-construction.jpg";
import buildingImage from "@/assets/building-construction.jpg";
import bridgeImage from "@/assets/bridge-construction.jpg";

const Projects = () => {
  const completedProjects = [
    {
      title: "Kisumu Urban Road Network",
      category: "Road Construction",
      description: "5km urban road network including drainage and street lighting",
      image: roadImage,
      status: "Completed",
    },
    {
      title: "Commercial Plaza Development",
      category: "Building Construction",
      description: "3-storey commercial building with modern amenities",
      image: buildingImage,
      status: "Completed",
    },
    {
      title: "Local River Bridge",
      category: "Infrastructure",
      description: "Small bridge construction over local river for community access",
      image: bridgeImage,
      status: "Completed",
    },
  ];

  const ongoingProjects = [
    {
      title: "County Government Office Complex",
      category: "Government",
      description: "Modern administrative building with conference facilities",
      progress: "75%",
    },
    {
      title: "Residential Estate - Phase 2",
      category: "Residential",
      description: "50-unit housing development with infrastructure",
      progress: "60%",
    },
    {
      title: "Highway Rehabilitation Project",
      category: "Road Construction",
      description: "15km highway upgrade and resurfacing",
      progress: "40%",
    },
  ];

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
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge variant="secondary">{project.status}</Badge>
                  </div>
                  <Badge variant="outline">{project.category}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
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
              <Card key={index}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <Badge>{project.progress}</Badge>
                  </div>
                  <Badge variant="outline">{project.category}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{project.description}</p>
                </CardContent>
              </Card>
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
