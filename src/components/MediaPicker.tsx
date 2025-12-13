import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Image, Upload, Search, Check } from "lucide-react";

interface MediaItem {
  id: number;
  url: string;
  original_filename: string;
  type: string;
}

interface MediaPickerProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

const MediaPicker = ({ value, onChange, label = "Select Image" }: MediaPickerProps) => {
  const [open, setOpen] = useState(false);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      loadMedia();
    }
  }, [open]);

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
      console.error("Error loading media:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const file = files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("cms-media")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("cms-media")
        .getPublicUrl(filePath);

      const { error: dbError } = await supabase.from("cms_media").insert({
        filename: fileName,
        original_filename: file.name,
        type: "image",
        mime_type: file.type,
        size_bytes: file.size,
        url: urlData.publicUrl,
        thumbnail_url: urlData.publicUrl,
      });

      if (dbError) throw dbError;

      toast({ title: "Success", description: "Image uploaded successfully" });
      loadMedia();
    } catch (error) {
      console.error("Error uploading:", error);
      toast({ title: "Error", description: "Failed to upload image", variant: "destructive" });
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }, [toast]);

  const selectImage = (url: string) => {
    onChange(url);
    setOpen(false);
  };

  const filteredMedia = media.filter((item) =>
    item.original_filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="space-y-2">
          {value ? (
            <div className="relative group cursor-pointer">
              <img src={value} alt="Selected" className="w-full h-32 object-cover rounded-lg border" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
                <span className="text-primary-foreground text-sm">Change Image</span>
              </div>
            </div>
          ) : (
            <Button type="button" variant="outline" className="w-full h-32 flex flex-col gap-2">
              <Image className="h-8 w-8 text-muted-foreground" />
              <span>{label}</span>
            </Button>
          )}
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Image</DialogTitle>
        </DialogHeader>

        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search images..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer"
              disabled={uploading}
            />
            <Button disabled={uploading}>
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : filteredMedia.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No images found. Upload some images first.
            </div>
          ) : (
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {filteredMedia.map((item) => (
                <button
                  key={item.id}
                  onClick={() => selectImage(item.url)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all hover:border-primary ${
                    value === item.url ? "border-primary ring-2 ring-primary" : "border-transparent"
                  }`}
                >
                  <img
                    src={item.url}
                    alt={item.original_filename}
                    className="w-full h-full object-cover"
                  />
                  {value === item.url && (
                    <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                      <Check className="h-8 w-8 text-primary" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaPicker;
