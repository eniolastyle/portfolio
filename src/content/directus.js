const DEFAULT_DIRECTUS_URL = "https://cms.aathaar.org";

export function getDirectusUrl() {
  const configured = window.__APP_CONFIG__?.DIRECTUS_URL?.trim();
  return (configured || DEFAULT_DIRECTUS_URL).replace(/\/$/, "");
}

function formatDate(value) {
  if (!value) return "";
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value)).toUpperCase();
}

function normalizePost(post) {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    summary: post.summary,
    category: post.category || "Engineering",
    date: formatDate(post.published_at),
    publishedAt: post.published_at,
    readTime: `${post.reading_time || 5} MIN READ`,
    content: post.content || "",
    seoTitle: post.seo_title || post.title,
    seoDescription: post.seo_description || post.summary,
    featuredImage: post.featured_image
      ? `${getDirectusUrl()}/assets/${typeof post.featured_image === "string" ? post.featured_image : post.featured_image.id}`
      : null,
  };
}

export async function fetchPublishedPosts() {
  const params = new URLSearchParams({
    "filter[status][_eq]": "published",
    sort: "-published_at",
    fields: "id,slug,title,summary,content,category,published_at,reading_time,seo_title,seo_description,featured_image.id",
    limit: "100",
  });
  const response = await fetch(`${getDirectusUrl()}/items/blog_posts?${params}`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) throw new Error(`Directus returned ${response.status}`);
  const payload = await response.json();
  return payload.data.map(normalizePost);
}
