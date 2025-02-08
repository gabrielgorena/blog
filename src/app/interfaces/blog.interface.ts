export interface Blog {
  id?: number | string;
  title: string;
  content: string;
  created_at?: string;
  is_published?: boolean;
  image_url: string;
}
