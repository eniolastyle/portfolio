# Lawal Abdullateef - Personal Portfolio

React portfolio for infrastructure, DevOps, platform and software contract work.

## Local preview

```bash
npm install
npm run dev
```

The production bundle is generated with esbuild into `dist/`.

## Blog

Published posts are loaded from Directus at runtime. `src/content/posts.js` contains the existing three articles as a resilient fallback while the CMS is unavailable or being configured. The React application exposes:

- `#/blog` - article index
- `#/blog/<slug>` - individual article

Hash routes keep direct links working on static hosting. The included Nginx fallback also supports future path-based routing.

See [`docs/DIRECTUS_SETUP.md`](docs/DIRECTUS_SETUP.md) for the collection fields, restricted public permissions, CORS configuration and publishing workflow.

## Coolify deployment

Deploy the repository using the included `Dockerfile` or `docker-compose.yml`.

- Container port: `80`
- Health endpoint: `/`
- Persistent storage: none required
- Runtime environment variable: `DIRECTUS_URL=https://cms.aathaar.org`

The portfolio does not require PostgreSQL. Directus and its PostgreSQL service own the persistent content. The image uses a Node build stage and serves the final static bundle from Nginx. At container startup, a public runtime configuration file is generated from `DIRECTUS_URL`; no CMS administrator token is stored in the frontend.

## Structure

- `src/App.jsx` - React content and components
- `src/main.jsx` - React entry point
- `src/content/directus.js` - read-only Directus client and data normalization
- `docs/DIRECTUS_SETUP.md` - CMS collection and permissions checklist
- `styles.css` - responsive visual system
- `resume/` - downloadable current resume

## Content principles

- Employment and infrastructure claims come from the current resume.
- Aathaar, Ibnulhajjaaj and Ibn Baydoh are presented as personally built and deployed volunteer products.
- Kubernetes is included as a deliverable capability without adding an unsupported production-tenure claim.
