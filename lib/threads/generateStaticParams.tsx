import { createAdminClient } from "@/utils/supabase/admin";
import slugify from "slugify";

export default async function generateStaticParams() {
  const supabase = createAdminClient();
  const { data: threads } = await supabase.from("threads").select("slug");

  return (
    threads?.map(thread => ({
      slug: thread.slug
    })) ?? []
  );
}