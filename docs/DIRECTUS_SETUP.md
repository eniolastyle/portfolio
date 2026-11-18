# Directus blog setup

The portfolio reads published articles from `https://cms.aathaar.org`. No Directus administrator token is used by the browser.

## 1. Create the collection

In **Settings → Data Model**, create a collection named `blog_posts` with these fields:

| Field | Directus type | Required / notes |
| --- | --- | --- |
| `id` | UUID | Primary key |
| `status` | Dropdown | Values: `draft`, `published`, `archived`; default `draft` |
| `title` | String | Required |
| `slug` | String | Required and unique; URL-safe text |
| `summary` | Text | Required; one short paragraph |
| `content` | WYSIWYG | Required; article body |
| `category` | String | Required; e.g. Infrastructure Decisions |
| `featured_image` | File | Optional image |
| `published_at` | DateTime | Required when published |
| `reading_time` | Integer | Minutes only, e.g. `6` |
| `seo_title` | String | Optional; defaults to title |
| `seo_description` | Text | Optional; defaults to summary |
| `date_created` | Created On | Automatic |
| `date_updated` | Updated On | Automatic |

Set the display template to `{{title}}` and sort the collection by `published_at` descending.

## 2. Configure safe public access

In **Settings → Access Policies**, edit the public policy and grant `Read` access to `blog_posts` with:

- Item filter: `status` equals `published`
- Allowed fields: `id`, `slug`, `title`, `summary`, `content`, `category`, `featured_image`, `published_at`, `reading_time`, `seo_title`, `seo_description`

Grant public `Read` access to `directus_files` only if featured images are used. Do not grant create, update or delete permissions to the public role.

## 3. Configure Directus CORS

Set Directus environment variables in Coolify:

```env
CORS_ENABLED=true
CORS_ORIGIN=https://YOUR-PORTFOLIO-DOMAIN
```

Use the final HTTPS portfolio origin. Restart Directus after changing these variables.

## 4. Write and publish

1. Sign in at `https://cms.aathaar.org/admin`.
2. Open **Content → Blog Posts → Create Item**.
3. Write the article using the WYSIWYG editor.
4. Leave `status` as `draft` while editing.
5. Set `published_at`, change `status` to `published`, and save.

The portfolio requests fresh posts whenever a visitor opens it. If Directus is temporarily unavailable, the three existing local articles remain visible as a fallback.

## 5. Coolify portfolio configuration

Deploy this repository with the Dockerfile and expose port `80`. Add:

```env
DIRECTUS_URL=https://cms.aathaar.org
```

The portfolio does **not** need PostgreSQL or a persistent volume. Directus and its PostgreSQL service own all persistent blog data and uploads.
