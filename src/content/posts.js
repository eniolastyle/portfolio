export const posts = [
  {
    slug: "owning-the-moodle-image",
    category: "Infrastructure decisions",
    date: "18 November 2026",
    readTime: "6 min read",
    title: "Owning the Moodle image: avoiding $50K-$72K in annual licensing",
    summary: "How a maintained, upstream-based container image replaced an expensive registry dependency while preserving upgrades, backups and rollback discipline.",
    sections: [
      {
        heading: "The decision was larger than a container image",
        paragraphs: [
          "Our Moodle environment needed a dependable path for upgrades. The commercial option was operationally simple, but enterprise registry pricing of roughly $50,000-$72,000 per year was difficult to justify for the application we needed to maintain.",
          "The alternative was not merely to write a Dockerfile. It meant accepting responsibility for the image lifecycle: upstream compatibility, PHP extensions, repeatable builds, data protection, cutover planning and recovery.",
        ],
      },
      {
        heading: "The engineering approach",
        paragraphs: ["I chose free upstream components and built an InnovatiCS-maintained Moodle image that could be deployed through Docker Compose and Coolify."],
        bullets: [
          "Pin and document the Moodle and runtime versions used by each release.",
          "Keep application data, configuration and database state outside the disposable container layer.",
          "Back up the database, Moodle data and configuration before every material change.",
          "Validate the new image before cutover and retain an explicit rollback path.",
          "Document restoration, not only backup creation.",
        ],
      },
      {
        heading: "Cost avoidance without false economy",
        paragraphs: [
          "Removing the annual licence did not make engineering effort free. It exchanged recurring vendor cost for controlled internal ownership. That trade made sense because the platform already had the Linux, Docker and operational capability to maintain the image responsibly.",
          "The result was an estimated $50,000-$72,000 in annual licensing cost avoidance, together with greater control over our release timing. The important part was not the headline number; it was ensuring that cost reduction did not weaken reliability or recovery readiness.",
        ],
      },
      {
        heading: "The reusable lesson",
        paragraphs: ["Self-hosting is valuable when ownership is deliberate. Before replacing a managed product, measure the true subscription cost, the engineering burden, the failure modes and the recovery requirements. Choose the option whose risks your team can actually operate."],
      },
    ],
  },
  {
    slug: "from-cpanel-to-container-platform",
    category: "Platform engineering",
    date: "18 November 2026",
    readTime: "5 min read",
    title: "From cPanel to a container platform on an Ubuntu VPS",
    summary: "A practical modernization path for moving web, API, chatbot, learning and monitoring services into a coherent deployment environment.",
    sections: [
      {
        heading: "Why the old model had reached its limit",
        paragraphs: ["The original environment was centered on cPanel and a conventionally served website. As the organization added a React frontend, Express backend, Python chatbot, Moodle, CRM pilots and monitoring services, the deployment model needed clearer boundaries and more repeatable operations."],
      },
      {
        heading: "Modernize the operating model, not only the tooling",
        paragraphs: ["I cleaned the Ubuntu VPS, introduced Coolify as the application management layer and moved workloads toward containerized delivery. The objective was a simpler operational model: each service should have an identifiable runtime, configuration, health state and deployment path."],
        bullets: [
          "Separate frontend, backend, data and supporting services.",
          "Use Docker and Compose definitions as repeatable operational documentation.",
          "Keep DNS, TLS and deployment responsibilities explicit.",
          "Retire experimental or duplicated services when their value does not justify their resource use.",
          "Prefer the infrastructure that meets current needs comfortably over unnecessary cloud complexity.",
        ],
      },
      {
        heading: "Operate for the people depending on it",
        paragraphs: ["The platform supports more than 25,000 active students. That changes the standard for maintenance: migrations require backups, upgrades require rollback plans and observability must help explain what the host and containers are doing before users report a problem."],
      },
      {
        heading: "A pragmatic platform is still a platform",
        paragraphs: ["Platform engineering is not defined by the most expensive cloud architecture. A well-run VPS environment can be a sound platform when deployments are repeatable, services are observable, recovery is tested and capacity remains appropriate for the workload."],
      },
    ],
  },
  {
    slug: "observability-on-a-shared-vps",
    category: "Observability",
    date: "18 November 2026",
    readTime: "4 min read",
    title: "Observability on a shared VPS: useful signals before more tooling",
    summary: "What Prometheus, Grafana and Loki should answer when multiple containerized services share constrained infrastructure.",
    sections: [
      {
        heading: "Start with operational questions",
        paragraphs: ["An observability stack is useful only when it shortens the path from a symptom to a decision. On shared infrastructure, I wanted to know whether pressure came from the host, memory and swap behavior, a specific container, application logs or an avoidable workload."],
      },
      {
        heading: "A focused stack",
        paragraphs: ["Prometheus and Node Exporter provide host signals, cAdvisor adds container-level visibility, Loki and Promtail centralize logs, and Grafana brings the evidence together."],
        bullets: [
          "Track host CPU, memory, disk and swap alongside container consumption.",
          "Correlate resource changes with deployments and application logs.",
          "Alert on conditions that require action, not every interesting fluctuation.",
          "Use evidence to remove unused services before purchasing more capacity.",
        ],
      },
      {
        heading: "Observability supports cost decisions",
        paragraphs: ["The same signals used during troubleshooting also improve capacity and cost decisions. If monitoring shows that duplicated or unused services are consuming the margin required by Moodle or another critical workload, removing them may be a better first response than adding another server."],
      },
      {
        heading: "The outcome to optimize",
        paragraphs: ["The goal is not a dashboard collection. It is a system that helps an engineer detect meaningful change, understand likely causes and act with less uncertainty."],
      },
    ],
  },
];

export const getPost = (slug) => posts.find((post) => post.slug === slug);
