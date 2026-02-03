import { useEffect, useMemo, useState } from "react";

const emailAddress = "ambrosiasikhosaana@gmail.com";

const projects = [
  {
    tag: "Movie Discovery",
    title: "AmbroMovies",
    description:
      "A cinematic movie discovery experience with curated lists, trailers, and fast search.",
    link: "https://moviesite-blue-chi.vercel.app",
    role: "Full Stack Developer",
    timeline: "2025",
    stack: ["React", "REST APIs", "Vite", "Responsive UI"],
    outcome: "Delivered a premium movie discovery flow with fast search and curated experiences.",
    cover: "cover-movies",
    points: [
      "React frontend with responsive UI",
      "API-driven movie data & filters",
      "Performance-focused page loads",
    ],
  },
  {
    tag: "Streaming Platform",
    title: "AmbroCast",
    description:
      "A modern streaming hub with hero content, featured shows, and smooth navigation flows.",
    link: "https://ambrocast-site.vercel.app",
    role: "Frontend Developer",
    timeline: "2025",
    stack: ["React", "Motion UI", "Design System"],
    outcome: "Built a cinematic layout with high-impact hero moments and clear navigation.",
    cover: "cover-streaming",
    points: [
      "Cinematic layout system",
      "Component-driven UI",
      "Responsive and accessible design",
    ],
  },
  {
    tag: "E-commerce",
    title: "CommerceFlow",
    description:
      "A clean storefront experience with product discovery and conversion-focused layouts.",
    link: "https://e-commerce-plum-three-77.vercel.app",
    role: "Frontend Developer",
    timeline: "2024",
    stack: ["React", "Product UI", "UX Optimization"],
    outcome: "Improved shopping flow clarity with product-first layouts and mobile polish.",
    cover: "cover-commerce",
    points: [
      "Product grids + filters",
      "Conversion-ready UI patterns",
      "Mobile-first experience",
    ],
  },
  {
    tag: "Full Stack Practice",
    title: "StudioStream",
    description:
      "A future-ready concept for memberships, livestreams, and digital products.",
    role: "Full Stack Developer",
    timeline: "2024",
    stack: ["Remix", "GraphQL", "Redis", "Subscriptions"],
    outcome: "Designed a scalable architecture blueprint for creator monetization.",
    cover: "cover-studio",
    points: [
      "Remix + GraphQL API",
      "Redis caching + WebSockets",
      "Subscriptions + usage-based billing",
    ],
  },
];

const skillGroups = [
  {
    title: "Frontend Engineering",
    body: "HTML5, CSS3, modern JavaScript, TypeScript, React, Next.js, Vue, accessibility, responsive UI, design systems, animation.",
  },
  {
    title: "Backend Engineering",
    body: "Node.js, Express, NestJS, Python, FastAPI, REST, GraphQL, authentication, authorization, background jobs, queues.",
  },
  {
    title: "Databases & Data",
    body: "PostgreSQL, MySQL, MongoDB, Redis, Prisma, SQL optimization, caching strategies, ETL pipelines.",
  },
  {
    title: "Cloud & DevOps",
    body: "AWS, Azure, Vercel, Docker, CI/CD, serverless, infrastructure as code, monitoring, logging, observability.",
  },
  {
    title: "Security & Quality",
    body: "OWASP, secure API design, encryption, testing (unit/integration/e2e), QA automation, performance testing.",
  },
  {
    title: "Product & Collaboration",
    body: "UX strategy, stakeholder alignment, agile delivery, roadmap planning, documentation, mentoring teams.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Discovery & Strategy",
    text: "Define the product narrative, user flows, and measurable KPIs before we ship a single line of code.",
  },
  {
    step: "02",
    title: "Design & Build",
    text: "Design systems, modular services, and experience-led frontends built with maintainable architecture.",
  },
  {
    step: "03",
    title: "Launch & Scale",
    text: "CI/CD automation, monitoring, and performance optimization to keep your product future-proof.",
  },
];

const innovations = [
  {
    title: "Experience Lab",
    text: "Micro-interactions, kinetic typography, and dynamic storytelling that makes your product unforgettable.",
  },
  {
    title: "Data Storytelling",
    text: "Executive dashboards that turn complex data into clear, persuasive narratives.",
  },
  {
    title: "AI-Ready Systems",
    text: "Architected to incorporate AI copilots, retrieval pipelines, and automation without rewrites.",
  },
];

const testimonials = [
  {
    quote:
      "Mncedisi ships fast without sacrificing polish. Our product felt premium and reliable from day one.",
    name: "Product Lead",
    company: "Streaming Startup",
  },
  {
    quote:
      "Clear communication, beautiful UI, and a clean codebase we could scale immediately.",
    name: "Founder",
    company: "Commerce Brand",
  },
  {
    quote:
      "The experience design elevated the entire brand. He thinks like a strategist and builds like an engineer.",
    name: "Design Director",
    company: "Digital Studio",
  },
];

const toolbelt = [
  "React",
  "Vite",
  "React Router",
  "Next.js",
  "Node.js",
  "Express",
  "MongoDB",
  "PostgreSQL",
  "Firebase",
  "Tailwind",
  "Framer Motion",
  "Docker",
  "Vercel",
  "AWS",
  "CI/CD",
  "Testing",
];

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [copiedHero, setCopiedHero] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "dark");

  const marqueeItems = useMemo(() => toolbelt.concat(toolbelt), []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const elements = document.querySelectorAll("[data-animate]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedProject) {
      return undefined;
    }

    const handleKey = (event) => {
      if (event.key === "Escape") {
        setSelectedProject(null);
      }
    };

    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [selectedProject]);

  const handleCopy = async (setter) => {
    await navigator.clipboard.writeText(emailAddress);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="page">
      <div className="orb orb-1"></div>
      <div className="orb orb-2"></div>
      <div className="orb orb-3"></div>

      <header className="hero" data-animate>
        <nav className="nav">
          <div className="logo">MAS</div>
          <div className="nav-links">
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a href="#process">Process</a>
            <a href="#toolbelt">Toolbelt</a>
            <a href="#contact">Contact</a>
          </div>
          <div className="nav-actions">
            <button
              className="ghost"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            <button className="cta" onClick={() => handleCopy(setCopiedHero)}>
              {copiedHero ? "Email Copied" : "Copy Email"}
            </button>
          </div>
        </nav>

        <section className="hero-content">
          <div className="hero-text" data-animate>
            <p className="eyebrow">Full Stack Web Developer</p>
            <h1>MNCEDISI AMBROSIA SIKHOSANA</h1>
            <p className="lead">
              I build world-class web platforms that feel effortless, look unforgettable,
              and scale confidently. From UI systems to back-end architecture, I
              translate big ideas into high-impact products.
            </p>
            <div className="hero-actions">
              <a className="primary" href="#projects">Explore Projects</a>
              <a className="ghost" href="#contact">Let’s Collaborate</a>
              <a
                className="ghost ghost-outline"
                href="https://www.linkedin.com/in/ambrosia-sikhosana-08aab3317"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>
            <div className="stats">
              <div>
                <span className="stat-number">6+</span>
                <span className="stat-label">Enterprise-grade builds</span>
              </div>
              <div>
                <span className="stat-number">12</span>
                <span className="stat-label">Tech stacks mastered</span>
              </div>
              <div>
                <span className="stat-number">100%</span>
                <span className="stat-label">Design-to-dev delivery</span>
              </div>
            </div>
          </div>
          <div className="hero-card" data-animate>
            <div className="profile-frame">
              <img src="/profile.jpg" alt="Portrait of Mncedisi Ambrosia Sikhosana" />
            </div>
            <div className="availability">
              <span className="pulse"></span>
              Available for new roles and freelance partnerships
            </div>
            <div className="highlights">
              <div>
                <h3>Product Focus</h3>
                <p>Strategic, human-first, and measurable outcomes.</p>
              </div>
              <div>
                <h3>Performance</h3>
                <p>Optimized for speed, accessibility, and resilience.</p>
              </div>
              <div>
                <h3>Modern Stack</h3>
                <p>React, Node, cloud-first delivery, and scalable APIs.</p>
              </div>
            </div>
          </div>
        </section>
      </header>

      <main>
        <section className="section marquee" aria-label="Core stack">
          <div className="marquee-track">
            {marqueeItems.map((tool, index) => (
              <span key={`${tool}-${index}`}>{tool}</span>
            ))}
          </div>
        </section>

        <section className="section impact" data-animate>
          <div className="section-title">
            <p>Impact</p>
            <h2>Results that move the needle</h2>
          </div>
          <div className="impact-grid">
            <div className="impact-card" data-animate>
              <h3>35%+</h3>
              <p>Average perceived performance boost from UI optimization</p>
            </div>
            <div className="impact-card" data-animate>
              <h3>3x</h3>
              <p>Faster build velocity with component-driven systems</p>
            </div>
            <div className="impact-card" data-animate>
              <h3>Top 10%</h3>
              <p>Portfolio designs benchmarked against modern product studios</p>
            </div>
          </div>
        </section>

        <section id="projects" className="section" data-animate>
          <div className="section-title">
            <p>Recent Projects</p>
            <h2>Bold builds for modern brands</h2>
          </div>
          <div className="projects-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card" data-animate>
                <div className={`project-cover ${project.cover}`}>
                  <span>{project.title}</span>
                </div>
                <div className="project-tag">{project.tag}</div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.link ? (
                  <a className="project-link" href={project.link} target="_blank" rel="noreferrer">
                    Visit Live Site
                  </a>
                ) : null}
                <ul>
                  {project.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                <button
                  className="ghost project-cta"
                  onClick={() => setSelectedProject(project)}
                >
                  View Case Study
                </button>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section skills" data-animate>
          <div className="section-title">
            <p>Core Skills</p>
            <h2>Everything a full stack partner should bring</h2>
          </div>
          <div className="skills-grid">
            {skillGroups.map((group) => (
              <div key={group.title} className="skill-group" data-animate>
                <h3>{group.title}</h3>
                <p>{group.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="process" className="section process" data-animate>
          <div className="section-title">
            <p>How I Work</p>
            <h2>From vision to launch</h2>
          </div>
          <div className="process-steps">
            {processSteps.map((step) => (
              <div key={step.step} className="step" data-animate>
                <span>{step.step}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="toolbelt" className="section toolbelt" data-animate>
          <div className="section-title">
            <p>Toolbelt</p>
            <h2>Technologies I ship with</h2>
          </div>
          <div className="toolbelt-grid">
            {toolbelt.map((tool) => (
              <span key={tool} className="tool-pill" data-animate>{tool}</span>
            ))}
          </div>
        </section>

        <section className="section innovation" data-animate>
          <div className="section-title">
            <p>Innovation</p>
            <h2>Signature capabilities</h2>
          </div>
          <div className="innovation-grid">
            {innovations.map((item) => (
              <div key={item.title} className="innovation-card" data-animate>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section testimonials" data-animate>
          <div className="section-title">
            <p>Testimonials</p>
            <h2>Trusted creative + engineering partner</h2>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((item) => (
              <div key={item.name} className="testimonial-card" data-animate>
                <p className="testimonial-quote">“{item.quote}”</p>
                <p className="testimonial-name">{item.name}</p>
                <p className="testimonial-company">{item.company}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="section resume" data-animate>
          <div className="section-title">
            <p>Resume</p>
            <h2>One-page overview</h2>
          </div>
          <div className="resume-card" data-animate>
            <div>
              <h3>Download my resume</h3>
              <p>A clean, focused summary of roles, impact, and technical depth.</p>
            </div>
            <a className="primary" href="/resume.pdf" download>
              Download Resume
            </a>
          </div>
        </section>

        <section id="contact" className="section contact" data-animate>
          <div className="section-title">
            <p>Let’s Build</p>
            <h2>Ready to create something remarkable?</h2>
          </div>
          <div className="contact-card" data-animate>
            <div>
              <h3>Let’s talk about your next platform.</h3>
              <p>
                Email: <strong>{emailAddress}</strong>
              </p>
              <p>
                LinkedIn:{" "}
                <a href="https://www.linkedin.com/in/ambrosia-sikhosana-08aab3317">
                  linkedin.com/in/ambrosia-sikhosana-08aab3317
                </a>
              </p>
              <p>
                Instagram:{" "}
                <a href="https://www.instagram.com/ambro.sia_/">
                  instagram.com/ambro.sia_
                </a>
              </p>
              <p>Phone: 0832288601</p>
              <p>Location: Remote / Global</p>
            </div>
            <div className="contact-actions">
              <button className="primary" onClick={() => handleCopy(setCopied)}>
                {copied ? "Email Copied" : "Copy Email"}
              </button>
              <button
                className="ghost"
                onClick={() => window.open("/resume.pdf", "_blank")}
              >
                Download Resume
              </button>
            </div>
          </div>
        </section>
      </main>

      {selectedProject ? (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          onClick={() => setSelectedProject(null)}
        >
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              Close
            </button>
            <div className="modal-header">
              <p className="project-tag">{selectedProject.tag}</p>
              <h3>{selectedProject.title}</h3>
              <p>{selectedProject.description}</p>
            </div>
            <div className="modal-body">
              <div>
                <h4>Role</h4>
                <p>{selectedProject.role}</p>
              </div>
              <div>
                <h4>Timeline</h4>
                <p>{selectedProject.timeline}</p>
              </div>
              <div>
                <h4>Stack</h4>
                <p>{selectedProject.stack.join(", ")}</p>
              </div>
              <div>
                <h4>Outcome</h4>
                <p>{selectedProject.outcome}</p>
              </div>
            </div>
            {selectedProject.link ? (
              <a
                className="primary"
                href={selectedProject.link}
                target="_blank"
                rel="noreferrer"
              >
                Visit Live Site
              </a>
            ) : null}
          </div>
        </div>
      ) : null}

      <footer className="footer">
        <p>© 2026 Mncedisi Ambrosia Sikhosana. Crafted with precision, empathy, and ambitious ideas.</p>
      </footer>
    </div>
  );
}
