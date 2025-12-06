-- Media library for images & videos
CREATE TABLE public.cms_media (
  id BIGSERIAL PRIMARY KEY,
  uuid UUID DEFAULT gen_random_uuid() UNIQUE,
  filename TEXT,
  original_filename TEXT,
  type VARCHAR(10), -- 'image' or 'video'
  mime_type TEXT,
  size_bytes BIGINT,
  width INT,
  height INT,
  duration_seconds INT NULL,
  thumbnail_url TEXT,
  url TEXT,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  metadata JSONB DEFAULT '{}'
);

-- Projects content layer (admin-driven)
CREATE TABLE public.cms_projects (
  id BIGSERIAL PRIMARY KEY,
  project_slug TEXT UNIQUE,
  title TEXT NOT NULL,
  summary TEXT,
  detailed_content TEXT,
  client_name TEXT,
  location TEXT,
  start_date DATE,
  end_date DATE,
  budget NUMERIC NULL,
  status VARCHAR(20) DEFAULT 'draft',
  cover_media_id BIGINT NULL REFERENCES public.cms_media(id) ON DELETE SET NULL,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Link projects to media (gallery)
CREATE TABLE public.cms_project_media (
  id BIGSERIAL PRIMARY KEY,
  project_id BIGINT REFERENCES public.cms_projects(id) ON DELETE CASCADE,
  media_id BIGINT REFERENCES public.cms_media(id) ON DELETE CASCADE,
  media_order INT DEFAULT 0,
  caption TEXT,
  is_hero BOOLEAN DEFAULT FALSE
);

-- CMS page content
CREATE TABLE public.cms_pages (
  id BIGSERIAL PRIMARY KEY,
  page_key TEXT UNIQUE NOT NULL,
  title TEXT,
  hero_media_id BIGINT NULL REFERENCES public.cms_media(id) ON DELETE SET NULL,
  content JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Audit log
CREATE TABLE public.cms_audit (
  id BIGSERIAL PRIMARY KEY,
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT,
  target_table TEXT,
  target_id BIGINT NULL,
  before_snapshot JSONB,
  after_snapshot JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.cms_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_audit ENABLE ROW LEVEL SECURITY;

-- RLS Policies for cms_media
CREATE POLICY "Public can view media" ON public.cms_media FOR SELECT USING (true);
CREATE POLICY "Admins can insert media" ON public.cms_media FOR INSERT WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update media" ON public.cms_media FOR UPDATE USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete media" ON public.cms_media FOR DELETE USING (public.is_admin(auth.uid()));

-- RLS Policies for cms_projects
CREATE POLICY "Public can view active projects" ON public.cms_projects FOR SELECT USING (status = 'active' OR public.is_admin(auth.uid()));
CREATE POLICY "Admins can insert projects" ON public.cms_projects FOR INSERT WITH CHECK (public.is_admin(auth.uid()));
CREATE POLICY "Admins can update projects" ON public.cms_projects FOR UPDATE USING (public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete projects" ON public.cms_projects FOR DELETE USING (public.is_admin(auth.uid()));

-- RLS Policies for cms_project_media
CREATE POLICY "Public can view project media" ON public.cms_project_media FOR SELECT USING (true);
CREATE POLICY "Admins can manage project media" ON public.cms_project_media FOR ALL USING (public.is_admin(auth.uid()));

-- RLS Policies for cms_pages
CREATE POLICY "Public can view pages" ON public.cms_pages FOR SELECT USING (true);
CREATE POLICY "Admins can manage pages" ON public.cms_pages FOR ALL USING (public.is_admin(auth.uid()));

-- RLS Policies for cms_audit
CREATE POLICY "Admins can view audit logs" ON public.cms_audit FOR SELECT USING (public.is_admin(auth.uid()));
CREATE POLICY "System can insert audit logs" ON public.cms_audit FOR INSERT WITH CHECK (true);

-- Create updated_at triggers
CREATE TRIGGER update_cms_projects_updated_at
  BEFORE UPDATE ON public.cms_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cms_pages_updated_at
  BEFORE UPDATE ON public.cms_pages
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for CMS media
INSERT INTO storage.buckets (id, name, public) VALUES ('cms-media', 'cms-media', true);

-- Storage policies
CREATE POLICY "Public can view cms media" ON storage.objects FOR SELECT USING (bucket_id = 'cms-media');
CREATE POLICY "Admins can upload cms media" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'cms-media' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins can update cms media" ON storage.objects FOR UPDATE USING (bucket_id = 'cms-media' AND public.is_admin(auth.uid()));
CREATE POLICY "Admins can delete cms media" ON storage.objects FOR DELETE USING (bucket_id = 'cms-media' AND public.is_admin(auth.uid()));