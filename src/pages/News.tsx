import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const News = () => {
  const articles = [
    {
      title: "Toval Completes Major Bridge Project Ahead of Schedule",
      date: "November 15, 2025",
      category: "Project Update",
      excerpt: "Our team successfully completed the regional bridge construction project two weeks ahead of schedule, demonstrating our commitment to efficiency and quality.",
    },
    {
      title: "New Safety Initiative Launched Across All Sites",
      date: "November 10, 2025",
      category: "Safety",
      excerpt: "We have introduced an enhanced safety training program to ensure zero incidents across all our construction sites.",
    },
    {
      title: "Toval Wins Government Infrastructure Contract",
      date: "November 5, 2025",
      category: "Company News",
      excerpt: "We are proud to announce that Toval has been awarded a major government contract for road construction in Western Kenya.",
    },
    {
      title: "Engineering Excellence in Modern Construction",
      date: "October 28, 2025",
      category: "Engineering Insights",
      excerpt: "Our Director, Eng. Tom Illa, shares insights on maintaining quality standards in large-scale infrastructure projects.",
    },
    {
      title: "Community Engagement Program Success",
      date: "October 20, 2025",
      category: "CSR",
      excerpt: "Our latest community outreach program in Kisumu has provided training opportunities for over 50 local youth in construction skills.",
    },
    {
      title: "Sustainable Construction Practices at Toval",
      date: "October 15, 2025",
      category: "Sustainability",
      excerpt: "Learn about our commitment to environmentally responsible construction and waste management practices.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">News & Media</h1>
          <p className="text-xl opacity-90">Latest Updates from Toval</p>
        </div>
      </section>

      {/* Articles */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{article.date}</span>
                  </div>
                  <Badge variant="outline" className="w-fit mb-2">
                    {article.category}
                  </Badge>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{article.excerpt}</p>
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

export default News;
