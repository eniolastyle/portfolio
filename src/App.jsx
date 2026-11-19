import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import {
  siAnsible,
  siApache,
  siCoolify,
  siDirectus,
  siDigitalocean,
  siDocker,
  siGithubactions,
  siGnubash,
  siGrafana,
  siGooglecloud,
  siKubernetes,
  siMongodb,
  siMinio,
  siMysql,
  siN8n,
  siNextcloud,
  siNginx,
  siOllama,
  siPostgresql,
  siPrometheus,
  siPython,
  siRoundcube,
  siTerraform,
  siUbuntu,
  siVault,
} from "simple-icons";
import { posts as fallbackPosts } from "./content/posts.js";
import { fetchPublishedPosts } from "./content/directus.js";

const organizations = [
  { name: "InnovatiCS", location: "Global", role: "IT Manager · DevOps & Product Engineer", period: "Part-time · 2023 - present", url: "https://innovatics.com", featured: true },
  { name: "OpenCluster", location: "Open source · Global", role: "Product Engineer · Volunteer", period: "Current", url: "https://github.com/open-cluster", featured: true },
  { name: "Codegiant", location: "San Francisco, US", role: "GTM Engineer · Developer Relations", period: "Contract", url: "https://codegiant.io" },
  { name: "Amigoscode", location: "London, UK", role: "Technical Content Creator", period: "Contract", url: "https://amigoscode.com" },
  { name: "NCloud3", location: "Dubai, UAE", role: "Technical Content · Cloud & AWS", period: "Previous", url: "https://ncloud3.com/en/" },
  { name: "Rodnav", location: "Port Harcourt, Nigeria", role: "DevOps Consultant", period: "Contract", url: "https://www.rodnav.com/" },
  { name: "MALhub", location: "Ilorin, Nigeria", role: "DevOps & Software Engineering Instructor", period: "Part-time", url: "https://malhub.org/" },
  { name: "HollarX", location: "Kwara, Nigeria", role: "Chief Technology Officer", period: "Previous", url: "https://hollarx.netlify.app/" },
];

const collaborators = [
  { initials: "ND", name: "Nelson Djalo", title: "Founder, Amigoscode", location: "London, UK", work: "Software and infrastructure engineering education content", url: "https://www.linkedin.com/in/nelsondjalo/" },
  { initials: "S", name: "Saed", title: "Senior Security Engineer at Google", location: "UK", work: "Cloud security education content", url: "https://www.linkedin.com/in/saedf/" },
  { initials: "MU", name: "Mezba Uddin", title: "Microsoft MVP · NHS Digital Infrastructure Engineer", location: "UK", work: "Microsoft Azure education content", url: "https://www.linkedin.com/in/mezbauddin/" },
];

const capabilities = [
  ["01", "Infrastructure & cloud", "Linux systems, VPS and cloud environments, networking, DNS, TLS, databases, capacity planning, migration and cost-aware architecture."],
  ["02", "DevOps & platforms", "Docker, Kubernetes, CI/CD, Terraform, automation, deployment platforms, GitOps patterns, backup, recovery and operational documentation."],
  ["03", "Reliability & observability", "Metrics, logs, dashboards, alerting, troubleshooting and operational improvements using Prometheus, Grafana, Loki and related tooling."],
  ["04", "Software products", "Web, mobile and custom business software - from definition and architecture through implementation, deployment and ongoing operation."],
];

const openSourceSystems = [
  [siDirectus, "CMS"],
  [siDocker, "Containers"],
  [siKubernetes, "Orchestration"],
  [siPostgresql, "Data"],
  [siCoolify, "Deployment"],
  [siGrafana, "Observability"],
  [siVault, "Secrets"],
  [siN8n, "Automation"],
  [siNextcloud, "Collaboration"],
  [siRoundcube, "Email"],
  [siOllama, "Private AI"],
  [siMinio, "Object storage"],
];

const engineeringTools = [
  { icon: siUbuntu, category: "Production" },
  { icon: siDocker, category: "Production" },
  { icon: siGithubactions, category: "Production" },
  { icon: siCoolify, category: "Production" },
  { icon: siPrometheus, category: "Production" },
  { icon: siGrafana, category: "Production" },
  { mark: "POSTGRES", title: "PostgreSQL", category: "Production" },
  { icon: siMysql, category: "Production" },
  { icon: siMongodb, category: "Production" },
  { icon: siPython, category: "Production" },
  { icon: siGnubash, category: "Production" },
  { icon: siDigitalocean, category: "Production" },
  { icon: siKubernetes, category: "Platform" },
  { icon: siTerraform, category: "Infrastructure as code" },
  { icon: siAnsible, category: "Automation" },
  { mark: "JENKINS", title: "Jenkins", category: "CI/CD" },
  { icon: siGooglecloud, category: "Cloud" },
  { icon: siNginx, category: "Web infrastructure" },
  { icon: siApache, category: "Web infrastructure" },
  { mark: "AWS", title: "AWS", category: "Cloud" },
];

const Arrow = () => <span aria-hidden="true">↗</span>;

function OpenSourceLogo({ icon, category }) {
  return (
    <div className="oss-logo-card">
      <svg viewBox="0 0 24 24" role="img" aria-label={`${icon.title} logo`}><path d={icon.path} /></svg>
      <div><strong>{icon.title}</strong><span>{category}</span></div>
    </div>
  );
}

function ToolLogo({ icon, mark, title, category }) {
  const name = title || icon.title;
  return (
    <div className="tool-logo-card">
      {icon ? <svg viewBox="0 0 24 24" role="img" aria-label={`${name} logo`}><path d={icon.path} /></svg> : <span className="tool-wordmark" aria-hidden="true">{mark}</span>}
      <div><strong>{name}</strong><span>{category}</span></div>
    </div>
  );
}

function useRoute() {
  const readRoute = () => {
    if (!window.location.hash.startsWith("#/")) return [];
    return window.location.hash.replace(/^#\//, "").split("/").filter(Boolean);
  };
  const [route, setRoute] = useState(readRoute);
  useEffect(() => {
    const syncHash = () => {
      const isAppRoute = window.location.hash.startsWith("#/");
      setRoute(readRoute());

      if (isAppRoute) {
        window.scrollTo({ top: 0, behavior: "auto" });
        return;
      }

      const sectionId = window.location.hash.slice(1);
      if (sectionId) {
        window.requestAnimationFrame(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
        });
      }
    };
    const onChange = () => syncHash();
    window.addEventListener("hashchange", onChange);
    syncHash();
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

function useMetadata(title, description) {
  useEffect(() => {
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}

function Header({ onHome = false }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <header className="site-header" aria-label="Primary navigation">
      <a className="wordmark" href={onHome ? "#/" : "#top"} onClick={close} aria-label="Lawal Abdullateef home"><span className="wordmark-mark">LA</span><span>Lawal Abdullateef</span></a>
      <nav className={open ? "nav-open" : ""}>
        <a href="#experience" onClick={close}>Experience</a>
        <a href="#work" onClick={close}>Work</a>
        <a href="#capabilities" onClick={close}>Capabilities</a>
        <a href="#/blog" onClick={close}>Blog</a>
      </nav>
      <a className="header-cta" href="mailto:amiolastyle@gmail.com">Start a conversation <Arrow /></a>
      <button className="menu-button" aria-expanded={open} aria-label="Toggle navigation" onClick={() => setOpen((value) => !value)}>{open ? "Close" : "Menu"}</button>
    </header>
  );
}

function Footer() {
  return <footer><div className="wordmark"><span className="wordmark-mark">LA</span><span>Lawal Abdullateef</span></div><p>Infrastructure & Software Engineer · Ilorin, Nigeria · Working globally</p><p>© {new Date().getFullYear()}</p></footer>;
}

function BlogCard({ post, index }) {
  return (
    <a className="blog-card" href={`#/blog/${post.slug}`}>
      <div className="project-meta"><span>{post.category}</span><span>{String(index + 1).padStart(2, "0")}</span></div>
      <h3>{post.title}</h3>
      <p>{post.summary}</p>
      <div className="blog-card-footer"><span>{post.date}</span><span>{post.readTime} <Arrow /></span></div>
    </a>
  );
}

function Home({ posts }) {
  useMetadata("Lawal Abdullateef - Infrastructure & Software Engineer", "Infrastructure, DevOps, platform and software engineering portfolio of Lawal Abdullateef.");
  return (
    <div className="page-shell">
      <Header />
      <main id="top">
        <section className="hero section-pad" aria-labelledby="hero-title"><div className="status-pill"><span></span> Infrastructure · Platforms · Software</div><h1 id="hero-title">I build and operate<br /><span>technology that holds up.</span></h1><div className="hero-bottom"><p className="hero-copy">Infrastructure, DevOps, platform engineering and software delivery - from the first architecture decision to a reliable production system.</p><div className="hero-actions"><a className="button button-dark" href="#experience">See experience <span>↓</span></a><a className="button button-light" href="/resume/Lawal-Abdullateef-A-Resume.pdf" target="_blank" rel="noreferrer">View resume <Arrow /></a></div></div></section>
        <section className="signal-strip" aria-label="Core disciplines"><p>Linux infrastructure</p><span>•</span><p>Cloud & Kubernetes</p><span>•</span><p>DevOps automation</p><span>•</span><p>Software engineering</p></section>
        <section className="experience section-pad" id="experience" aria-labelledby="experience-title"><div className="section-heading"><div><p className="eyebrow">01 / Experience</p><h2 id="experience-title">Trusted across products, platforms and education.</h2></div><p>Professional employment, contracts and current open-source work across the US, UK, UAE and Nigeria.</p></div><div className="org-grid">{organizations.map((org) => <a className={`org-card${org.featured ? " org-featured" : ""}`} href={org.url} target="_blank" rel="noreferrer" key={org.name}><div className="org-top"><span>{org.location}</span><Arrow /></div><h3>{org.name}</h3><p>{org.role}</p><small>{org.period}</small></a>)}</div></section>
        <section className="collaborators section-pad" aria-labelledby="collaborators-title"><div className="section-heading compact-heading"><div><p className="eyebrow">02 / Selected collaborations</p><h2 id="collaborators-title">Technical education for respected practitioners.</h2></div><p>Content work delivered for individual technology leaders. Listed as collaborations, not endorsements.</p></div><div className="people-list">{collaborators.map((person) => <a href={person.url} target="_blank" rel="noreferrer" className="person-row" key={person.name}><span className="person-avatar">{person.initials}</span><div><h3>{person.name}</h3><p>{person.title}</p></div><div className="person-work"><small>Work delivered</small><p>{person.work}</p></div><span className="person-location">{person.location}</span><Arrow /></a>)}</div></section>
        <section className="opensource-band section-pad" id="opensource"><div><p className="eyebrow">Open-source engineering</p><h2>Own more of the systems your work depends on.</h2></div><div className="opensource-copy"><p>I contribute to OpenCluster as a volunteer Product Engineer and have contributed IAMbic documentation for infrastructure workflows.</p><p>I can also assess, deploy and operate open-source systems on private infrastructure—helping companies and individuals replace suitable recurring subscriptions without giving up security, backups, upgrades or operational clarity.</p><div className="inline-links"><a href="https://github.com/open-cluster" target="_blank" rel="noreferrer">OpenCluster GitHub <Arrow /></a><a href="https://github.com/noqdev/iambic" target="_blank" rel="noreferrer">IAMbic <Arrow /></a></div></div><div className="opensource-offer"><div className="opensource-offer-head"><div><p className="eyebrow">Private infrastructure toolkit</p><h3>CMS, infrastructure, email, automation, observability, secrets, AI and business systems.</h3></div><div><p>The right solution depends on workload, support needs and total operating cost. I help select the fit, deploy it cleanly, secure it, document it and establish backup and recovery procedures.</p><a className="button button-dark" href="mailto:amiolastyle@gmail.com?subject=Open-source%20infrastructure%20project">Discuss an open-source deployment <Arrow /></a></div></div><div className="oss-logo-grid">{openSourceSystems.map(([icon, category]) => <OpenSourceLogo icon={icon} category={category} key={icon.slug} />)}</div></div></section>
        <section className="work section-pad" id="work" aria-labelledby="work-title"><div className="section-heading"><div><p className="eyebrow">03 / Selected work</p><h2 id="work-title">Systems built for real use.</h2></div><p>Production infrastructure and personally built volunteer products delivered from architecture through deployment.</p></div><article className="project project-featured"><div className="project-meta"><span>Production infrastructure</span><span>25,000+ active students</span></div><div className="project-layout"><div className="project-copy"><h3>InnovatiCS infrastructure</h3><p>Modernized a cPanel-based environment into containerized services managed through Coolify on Ubuntu VPS infrastructure.</p><ul className="outcome-list"><li>Centralized metrics and logs with Prometheus, Grafana and Loki</li><li>Migrated legacy email to Microsoft 365 while preserving historical data</li><li>Built a maintained Moodle image and repeatable upgrade and recovery workflow</li><li>Avoided an estimated $50,000-$72,000 in annual enterprise registry licensing</li></ul></div><div className="infra-visual" aria-label="Infrastructure topology illustration"><div className="infra-top"><span>INNOVATICS / PLATFORM</span><span className="live-dot">LIVE</span></div><div className="infra-core"><div className="node primary-node"><small>Runtime</small><strong>Docker / Coolify</strong><span>Ubuntu VPS</span></div><div className="connector"></div><div className="node-row"><div className="node"><small>Learning</small><strong>Moodle</strong></div><div className="node"><small>Product</small><strong>React + Express</strong></div><div className="node"><small>Data</small><strong>SQL services</strong></div></div><div className="metrics">{[55,72,43,88,65,78,52,91].map((height, index) => <span style={{height: `${height}%`}} key={index}></span>)}</div></div></div></div></article><div className="product-grid-react"><a className="product-card-react aathaar-card" href="https://aathaar.app" target="_blank" rel="noreferrer"><div className="project-meta"><span>Volunteer product</span><span>Live <Arrow /></span></div><div className="product-symbol">A</div><div><h3>Aathaar</h3><p>Full-stack scholarly knowledge platform with authenticated content, search, scholar profiles, Quran and adhkar experiences, memorization tools and role-based administration.</p><div className="tags"><span>React</span><span>NestJS</span><span>PostgreSQL</span><span>Docker</span></div></div></a><a className="product-card-react hajjaaj-card" href="https://ibnulhajjaaj.com" target="_blank" rel="noreferrer"><div className="project-meta"><span>Volunteer product</span><span>Live <Arrow /></span></div><div className="product-symbol">ا</div><div><h3>Al-Imam Muslim bin al-Hajjāj Academy</h3><p>Bilingual academy product covering programmes, admissions, student access, seminars, publishing, support and international learning.</p><div className="tags"><span>Bilingual UX</span><span>Education</span><span>Deployment</span></div></div></a><a className="product-card-react baydoh-card" href="https://ibnbaydoh.com.ng" target="_blank" rel="noreferrer"><div className="project-meta"><span>Volunteer product</span><span>Live <Arrow /></span></div><div className="product-symbol">ب</div><div><h3>Ibn Baydoh Platform</h3><p>Arabic-first system for books, research, audio lessons, poetry and enquiries, backed by PostgreSQL content and object storage.</p><div className="tags"><span>React</span><span>TypeScript</span><span>PostgreSQL</span><span>R2</span></div></div></a></div></section>
        <section className="capabilities section-pad" id="capabilities" aria-labelledby="capabilities-title"><div className="section-heading"><div><p className="eyebrow">04 / Capabilities</p><h2 id="capabilities-title">From infrastructure to finished product.</h2></div><p>Available for focused engineering work or complete project delivery with additional specialists where required.</p></div><div className="capability-list">{capabilities.map(([number, title, description]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>
        <section className="toolkit section-pad" id="toolkit" aria-labelledby="toolkit-title"><div className="section-heading"><div><p className="eyebrow">05 / Engineering toolkit</p><h2 id="toolkit-title">Tools selected for the system—not the trend.</h2></div><p>Technologies I use to build, automate, observe and operate infrastructure and software across production and project environments.</p></div><div className="tool-logo-grid">{engineeringTools.map((tool) => <ToolLogo {...tool} key={tool.title || tool.icon.slug} />)}</div></section>
        <section className="blog section-pad" id="blog" aria-labelledby="blog-title"><div className="section-heading"><div><p className="eyebrow">06 / Field notes</p><h2 id="blog-title">Writing from the work.</h2></div><p>Practical notes from building, operating and improving technology systems. No recycled theory.</p></div><div className="blog-grid">{posts.map((post, index) => <BlogCard post={post} index={index} key={post.slug} />)}</div><a className="blog-all-link" href="#/blog">View all field notes <Arrow /></a></section>
        <section className="contact section-pad" id="contact"><p className="eyebrow">07 / Start a project</p><h2>Have a system to build,<br />stabilize or scale?</h2><p>Tell me what must work, where it is today and what success looks like. I work across time zones and consider infrastructure, DevOps, cloud, platform and software engagements aligned with my values.</p><div className="contact-actions"><a className="button button-invert" href="mailto:amiolastyle@gmail.com?subject=Project%20enquiry">amiolastyle@gmail.com <Arrow /></a><a className="text-link" href="https://www.linkedin.com/in/eniolaamiola" target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a className="text-link" href="https://github.com/eniolastyle" target="_blank" rel="noreferrer">GitHub <Arrow /></a></div></section>
      </main><Footer />
    </div>
  );
}

function BlogIndex({ posts }) {
  useMetadata("Field Notes - Lawal Abdullateef", "Practical writing on infrastructure, DevOps, platform engineering, observability and software delivery.");
  return <div className="page-shell"><Header onHome /><main className="blog-page"><section className="blog-hero section-pad"><p className="eyebrow">Field notes / Blog</p><h1>What the work<br />actually teaches.</h1><p>Practical writing about infrastructure decisions, operational trade-offs and building systems that remain understandable after deployment.</p></section><section className="blog-archive section-pad"><div className="archive-heading"><span>{posts.length} published notes</span><span>Infrastructure · Platform · Reliability</span></div><div className="blog-list">{posts.map((post, index) => <BlogCard post={post} index={index} key={post.slug} />)}</div></section></main><Footer /></div>;
}

function Article({ post }) {
  useMetadata(`${post.title} - Lawal Abdullateef`, post.summary);
  if (!post) return null;
  const cleanContent = post.content ? DOMPurify.sanitize(post.content, { USE_PROFILES: { html: true } }) : "";
  return <div className="page-shell"><Header onHome /><main className="article-page"><article><header className="article-header section-pad"><a className="back-link" href="#/blog">← All field notes</a><div className="article-meta"><span>{post.category}</span><span>{post.date}</span><span>{post.readTime}</span></div><h1>{post.title}</h1><p>{post.summary}</p></header>{post.featuredImage && <img className="article-cover" src={post.featuredImage} alt="" />}<div className="article-body section-pad">{cleanContent ? <div className="cms-content" dangerouslySetInnerHTML={{ __html: cleanContent }} /> : post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}</section>)}</div><footer className="article-end section-pad"><p>Need help with a similar infrastructure or software problem?</p><a className="button button-dark" href="mailto:amiolastyle@gmail.com?subject=Engineering%20conversation">Start a conversation <Arrow /></a></footer></article></main><Footer /></div>;
}

function NotFound() {
  useMetadata("Not found - Lawal Abdullateef", "The requested portfolio page was not found.");
  return <div className="page-shell"><Header onHome /><main className="not-found section-pad"><p className="eyebrow">404 / Not found</p><h1>This page is not here.</h1><a className="button button-dark" href="#/">Return home</a></main><Footer /></div>;
}

function App() {
  const route = useRoute();
  const [posts, setPosts] = useState(fallbackPosts);

  useEffect(() => {
    let active = true;
    fetchPublishedPosts()
      .then((publishedPosts) => {
        if (active && publishedPosts.length) setPosts(publishedPosts);
      })
      .catch(() => {
        // The bundled articles keep the portfolio useful during CMS maintenance.
      });
    return () => { active = false; };
  }, []);

  if (route[0] === "blog" && route[1]) {
    const post = posts.find((item) => item.slug === route[1]);
    return post ? <Article post={post} /> : <NotFound />;
  }
  if (route[0] === "blog") return <BlogIndex posts={posts} />;
  return <Home posts={posts} />;
}

export default App;
