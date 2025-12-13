import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Image as ImageIcon } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

interface MediaItem {
  id: number;
  url: string;
  original_filename: string;
  type: string;
}

const Gallery = () => {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const { data, error } = await supabase
        .from("cms_media")
        .select("id, url, original_filename, type")
        .eq("type", "image")
        .order("uploaded_at", { ascending: false });

      if (error) throw error;
      setMedia(data || []);
    } catch (error) {
      console.error("Error loading gallery:", error);
    } finally {
      setLoading(false);
    }
  };

  const openImage = (index: number) => setSelectedIndex(index);
  const closeImage = () => setSelectedIndex(null);
  const prevImage = () => setSelectedIndex((i) => (i !== null && i > 0 ? i - 1 : media.length - 1));
  const nextImage = () => setSelectedIndex((i) => (i !== null && i < media.length - 1 ? i + 1 : 0));

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <section className="bg-primary text-primary-foreground py-20">
          <div className="container mx-auto px-4 text-center">
            <Skeleton className="h-12 w-48 mx-auto mb-4 bg-primary-foreground/20" />
            <Skeleton className="h-6 w-64 mx-auto bg-primary-foreground/20" />
          </div>
        </section>
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton key={i} className="aspect-square" />
            ))}
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Photo Gallery</h1>
          <p className="text-xl opacity-90">Explore Our Projects and Work</p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {media.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <ImageIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold mb-2">No Images Yet</h3>
                <p className="text-muted-foreground">
                  Check back soon for photos from our projects.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.map((item, index) => (
                <Card
                  key={item.id}
                  className="overflow-hidden cursor-pointer hover:shadow-xl transition-shadow group"
                  onClick={() => openImage(index)}
                >
                  <div className="aspect-square relative">
                    <img
                      src={item.url}
                      alt={item.original_filename}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Dialog */}
      <Dialog open={selectedIndex !== null} onOpenChange={closeImage}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border-0">
          {selectedIndex !== null && media[selectedIndex] && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 z-10 text-primary-foreground hover:bg-primary-foreground/20"
                onClick={closeImage}
              >
                <X className="h-6 w-6" />
              </Button>
              
              <div className="flex items-center justify-center min-h-[60vh] p-4">
                <img
                  src={media[selectedIndex].url}
                  alt={media[selectedIndex].original_filename}
                  className="max-w-full max-h-[80vh] object-contain"
                />
              </div>

              {media.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 -translate-y-1/2 text-primary-foreground hover:bg-primary-foreground/20"
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-primary-foreground hover:bg-primary-foreground/20"
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  >
                    <ChevronRight className="h-8 w-8" />
                  </Button>
                </>
              )}

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-primary-foreground text-sm">
                {selectedIndex + 1} / {media.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Gallery;
