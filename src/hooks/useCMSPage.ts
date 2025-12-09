import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";

interface CMSPage {
  id: number;
  page_key: string;
  title: string | null;
  content: Json;
  hero_media_id: number | null;
  created_at: string | null;
  updated_at: string | null;
}

export const useCMSPage = (pageKey: string) => {
  const [page, setPage] = useState<CMSPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("cms_pages")
          .select("*")
          .eq("page_key", pageKey)
          .maybeSingle();

        if (error) throw error;
        setPage(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load page");
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [pageKey]);

  // Helper to safely get content with fallback
  const getContent = <T,>(key: string, fallback: T): T => {
    if (!page?.content || typeof page.content !== "object") return fallback;
    const content = page.content as Record<string, unknown>;
    return (content[key] as T) ?? fallback;
  };

  return { page, loading, error, getContent };
};
