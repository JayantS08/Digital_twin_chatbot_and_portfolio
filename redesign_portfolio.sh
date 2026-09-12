#!/bin/bash

set -e

BACKUP_DIR="portfolio_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "Creating backup in $BACKUP_DIR ..."

cp app/page.tsx "$BACKUP_DIR/page.tsx"
cp app/globals.css "$BACKUP_DIR/globals.css"
cp app/components/Hero.tsx "$BACKUP_DIR/Hero.tsx"
cp app/components/Nav.tsx "$BACKUP_DIR/Nav.tsx"
cp app/components/ProjectCard.tsx "$BACKUP_DIR/ProjectCard.tsx"

echo "Backup complete."

# ============================================================
# PRESERVE EXISTING PROJECT CASE STUDY CSS
# ============================================================

CASE_STUDY_CSS="/tmp/jayant_case_study_css.txt"

awk '
  /PROJECT CASE STUDY/ {capture=1}
  capture {print}
' app/globals.css > "$CASE_STUDY_CSS"

# ============================================================
# NAV
# ============================================================

cat > app/components/Nav.tsx <<'EOF'
export default function Nav() {
  return (
    <nav className="nav">
      <div className="container nav-inner">
        <a href="#" className="logo">
          <span className="logo-mark">JS</span>

          <span className="logo-copy">
            JAYANT SINGH
          </span>
        </a>

        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#research">Research</a>
          <a href="#experience">Experience</a>
          <a href="#twin">Jayant AI</a>
        </div>

        <a className="nav-cta" href="#twin">
          <span className="nav-status-dot" />
          AI Twin
        </a>
      </div>
    </nav>
  );
}
EOF

# ============================================================
# HERO
# ============================================================

cat > app/components/Hero.tsx <<'EOF'
import {
  ArrowDownRight,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import profile from "../../content/generated/profile.json";

export default function Hero() {
  const nameParts = profile.personal.name.trim().split(" ");

  const firstName = nameParts[0] || "Jayant";
  const lastName = nameParts.slice(1).join(" ") || "Singh";

  return (
    <section className="hero">
      <div className="hero-grid-bg" />

      <div className="container hero-inner">
        <div className="hero-topline">
          <div className="hero-kicker-group">
            <span className="hero-dot" />

            <span className="kicker">
              {profile.personal.headline}
            </span>
          </div>

          <div className="hero-top-meta">
            MACHINE LEARNING · LLMs · SYSTEMS
          </div>
        </div>

        <div className="hero-name-wrap">
          <h1>
            <span>{firstName}</span>
            <br />
            <em>{lastName}.</em>
          </h1>

          <div className="hero-side-note">
            <Sparkles size={16} />

            <p>
              Building intelligent systems at the intersection of
              machine learning, structured knowledge and
              performance-critical engineering.
            </p>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-intro">
            <p className="hero-copy">
              {profile.about.short}
            </p>

            <div className="actions">
              <a className="btn" href="#work">
                Explore selected work
                <ArrowDownRight size={16} />
              </a>

              <a className="btn secondary" href="#twin">
                Talk to Jayant AI
                <MessageCircle size={16} />
              </a>
            </div>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <span>FOCUS</span>
              <strong>ML / AI</strong>
            </div>

            <div className="hero-stat">
              <span>RESEARCH</span>
              <strong>IISc · SML Lab</strong>
            </div>

            <div className="hero-stat">
              <span>ENGINEERING</span>
              <strong>Algorithms · Systems</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
EOF

# ============================================================
# PROJECT CARD
# ============================================================

cat > app/components/ProjectCard.tsx <<'EOF'
import { ArrowUpRight } from "lucide-react";

type Project = {
  number: string;
  title: string;
  description: string;
  meta: string;
  tags: string[];
};

const BASE_PATH = "/Digital_twin_chatbot_and_portfolio";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProjectCard({
  project,
}: {
  project: Project;
}) {
  const slug = slugify(project.title);
  const metaLines = project.meta.split("\n");

  return (
    <a
      href={`${BASE_PATH}/projects/${slug}/`}
      className="project"
      aria-label={`View case study: ${project.title}`}
    >
      <div className="project-index">
        <span>{project.number}</span>
      </div>

      <div className="project-main">
        <div className="project-heading-row">
          <h3>{project.title}</h3>

          <div className="project-arrow">
            <ArrowUpRight size={22} />
          </div>
        </div>

        <p>{project.description}</p>

        <div className="tags">
          {project.tags.map((tag, index) => (
            <span
              className="tag"
              key={`${tag}-${index}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="project-meta">
        <span className="project-meta-label">
          CONTEXT
        </span>

        <strong>{metaLines[0]}</strong>

        {metaLines[1] && (
          <span>{metaLines[1]}</span>
        )}

        <div className="project-link">
          VIEW CASE STUDY
          <ArrowUpRight size={13} />
        </div>
      </div>
    </a>
  );
}
EOF

# ============================================================
# PAGE
# ============================================================

cat > app/page.tsx <<'EOF'
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ProjectCard from "./components/ProjectCard";
import DigitalTwin from "./components/DigitalTwin";
import profile from "../content/generated/profile.json";

const projects = [
  {
    number: "01",
    title: "Data Analytics Projects",
    description:
      "Six applied data science and machine learning projects spanning cricket analytics, Mars orbit reconstruction, community detection, genomic sequence analysis, COVID-19 modelling and recommendation systems.",
    meta: "Data Analytics, IISc Bangalore\nJul 2023 – Dec 2023",
    tags: [
      "Data Science",
      "Machine Learning",
      "Statistics",
      "Optimization",
      "Graph Algorithms",
    ],
  },

  {
    number: "02",
    title: "Deep Learning with Natural Language Processing",
    description:
      "Built deep learning pipelines for sentiment analysis and neural machine translation using LSTMs, encoder-decoder architectures and attention-based sequence modelling.",
    meta: "DLNLP, IISc Bangalore\nJul 2023 – Dec 2023",
    tags: [
      "Deep Learning",
      "NLP",
      "PyTorch",
      "LSTM",
      "Attention",
    ],
  },

  {
    number: "03",
    title: "Forecasting with Temporal Knowledge Graphs",
    description:
      "Explored temporal Knowledge Graphs for modelling timestamped entity relationships and reasoning over historical event sequences to support forecasting tasks.",
    meta: "Indian Institute of Science (IISc)\nAug 2023 – Dec 2023",
    tags: [
      "Knowledge Graphs",
      "Temporal Reasoning",
      "PyTorch",
      "Machine Learning",
    ],
  },

  {
    number: "04",
    title:
      "Knowledge Graph Reasoning and Knowledge Graph-Based Question Answering",
    description:
      "Investigated Knowledge Graph-grounded question answering with large language models, benchmarking structured reasoning and retrieval approaches including GreaseLM and UniKGQA.",
    meta: "SML Lab, IISc / British Telecom\nAug 2023 – Jul 2024",
    tags: [
      "LLMs",
      "Knowledge Graphs",
      "NLP",
      "RAG",
      "PyTorch",
    ],
  },

  {
    number: "05",
    title: "Optimization in Chip Design with Routing Quality Checker",
    description:
      "Developed algorithms to detect degraded routing quality across large multi-layer chip layouts and generate timing-, noise- and DRC-aware routing improvements.",
    meta: "IBM\nJan 2025 – Mar 2025",
    tags: [
      "C++",
      "Algorithms",
      "Optimization",
      "Computational Geometry",
      "EDA",
    ],
  },

  {
    number: "06",
    title: "Short Fixing in Chip Design",
    description:
      "Designed high-performance geometric algorithms to detect short-circuit violations and perform localized timing-aware rerouting across large-scale chip designs.",
    meta: "IBM\nAug 2024 – Dec 2024",
    tags: [
      "C++",
      "Routing",
      "Computational Geometry",
      "Algorithms",
      "EDA",
    ],
  },

  {
    number: "07",
    title: "Free-Hand Routing",
    description:
      "Developed an AI-assisted routing workflow that converts designer-drawn routing intent into legal, manufacturable chip wiring while preserving physical-design constraints.",
    meta: "IBM\nApr 2025 – Jul 2025",
    tags: [
      "AI",
      "Routing",
      "Computer Vision",
      "Algorithms",
      "EDA",
    ],
  },

  {
    number: "08",
    title:
      "Optimizing Power Consumption on Smartphones using Machine Learning",
    description:
      "Used smartphone sensor time-series data and a Naive Bayes classifier to identify active and inactive usage states for adaptive power-management strategies.",
    meta: "Samsung R&D Institute India\nFeb 2022 – Apr 2022",
    tags: [
      "Machine Learning",
      "Naive Bayes",
      "Time Series",
      "Sensor Data",
    ],
  },

  {
    number: "09",
    title: "Movie Recommendation System",
    description:
      "Built an end-to-end recommendation platform combining content-based and collaborative filtering on MovieLens data, with an interactive Django web interface.",
    meta: "Aligarh Muslim University\nAug 2021 – Apr 2022",
    tags: [
      "Machine Learning",
      "Recommendation Systems",
      "Collaborative Filtering",
      "Django",
    ],
  },
];

const skillGroups = [
  {
    title: "Machine Learning & AI",
    description:
      "Models, reasoning systems and data-driven applications.",
    skills: profile.skills.machine_learning,
  },
  {
    title: "Programming & Systems",
    description:
      "Performance-oriented implementation and engineering.",
    skills: [
      ...profile.skills.programming,
      ...profile.skills.systems,
    ],
  },
  {
    title: "Tools & Platforms",
    description:
      "Supporting technologies used across research and engineering.",
    skills: profile.skills.other,
  },
];

export default function Home() {
  return (
    <>
      <Nav />

      <main>
        <Hero />

        {/* ==================== WORK ==================== */}

        <section className="section work-section" id="work">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-number">
                  01 / SELECTED WORK
                </div>

                <h2>
                  Selected
                  <br />
                  <em>projects.</em>
                </h2>
              </div>

              <div className="section-intro-wrap">
                <p className="section-intro">
                  Research and engineering work across machine
                  learning, LLMs, Knowledge Graphs, data science,
                  algorithms and high-performance systems.
                </p>

                <span className="section-count">
                  09 CASE STUDIES
                </span>
              </div>
            </div>

            <div className="projects">
              {projects.map((project) => (
                <ProjectCard
                  key={project.number}
                  project={project}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ==================== ABOUT ==================== */}

        <section className="section about-section" id="about">
          <div className="container">
            <div className="about-grid">
              <div className="about-heading">
                <div className="section-number">
                  02 / ABOUT
                </div>

                <h2>
                  Research depth.
                  <br />
                  <em>Engineering instinct.</em>
                </h2>
              </div>

              <div className="about-content">
                <p className="big-text">
                  {profile.about.short}
                </p>

                <div className="about-rule" />

                <p className="about-long">
                  {profile.about.long}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ==================== EDUCATION ==================== */}

        <section
          className="section structured-section"
          id="education"
        >
          <div className="container">
            <div className="structured-giv className="structured-heading">
                <div className="section-number">
                  03 / EDUCATION
                </div>

                <h2>
                  Where I
                  <br />
                  <em>learned.</em>
                </h2>
              </div>

              <div className="structured-list">
                {profile.education.map(
                  (education, index) => (
                    <article
                      className="structured-item"
                      key={`${education.institution}-${index}`}
                    >
                      <div className="structured-index">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="structured-body">
                        <div className="date">
                          {education.start_year} —{" "}
                          {education.end_year}
                        </div>

                        <h3>
                        {education.degree}
                        </h3>

                        <p className="structured-org">
                          {education.institution}
                        </p>

                        {education.field && (
                          <p className="structured-detail">
                            {education.field}
                          </p>
                        )}

                        {education.description && (
                          <p className="structured-detail">
                            {education.description}
                          </p>
                        )}
                      </div>
                    </article>
                  )
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== RESEARCH ==================== */}

        <section
          className="section research-section"
          id="research"
        >
          <div className="container">
            <div className="research-header">
              <div>
                <div className="section-number">
                  04 / RESEARCH
                </div>

                <h2>
                  Research &
                  <br />
                  <em>ideas.</em>
                </h2>
              </div>

              <p className="section-intro">
                Work focused on large language models,
                Knowledge Graphs, reasoning and intelligent
                systems.
              </p>
            </div>

            <div className="research-grid">
              {profile.research.map((item, index) => (
                <article
                  key={`${item.title}-${index}`}
                  className="research-card"
                >
                  <div className="research-card-top">
                    <span className="research-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="research-year">
                      {item.year}
                    </span>
                  </div>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <div className="research-org">
                    {item.organization}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== EXPERIENCE ==================== */}

        <section
          className="section structured-section experience-section"
          id="experience"
        >
          <div className="container">
            <div className="structured-grid">
              <div className="structured-heading">
                <div className="section-number">
                  05 / EXPERIENCE
                </div>

                <h2>
                  Where I’ve
                  <br />
                  <em>worked.</em>
                </h2>
              </div>

              <div className="structured-list">
              {profile.experience.map((job, index) => (
                  <article
                    className="structured-item experience-item"
                    key={`${job.company}-${index}`}
                  >
                    <div className="structured-index">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="structured-body">
                      <div className="date">
                        {job.start} — {job.end}
                      </div>

                      <h3>
                        {job.role}
                      </h3>

                      <p className="structured-org">
                        {job.company}
                      </p>

                      <p className="structured-detail">
                        {job.description}
                      </p>

                      {job.skills &&
                        job.skills.length > 0 && (
                          <div className="mini-skills">
                            {job.skills.map(
                              (skill, skillIndex) => (
                                <span
                                  key={`${skill}-${skillIndex}`}
                                >
                                  {skill}
                                </span>
                              )
                            )}
                          </div>
                        )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ==================== SKILLS ==================== */}

        <section className="section skills-section" id="skills">
          <div className="container">
            <div className="skills-header">
              <div>
                <div className="section-number">
                  06 / CAPABILITIES
                </div>

                <h2>
                  What I
                  <br />
                  <em>work with.</em>
                </h2>
              </div>

              <p className="section-intro">
                A toolkit spanning machine learning research,
                software engineering and computational systems.
              </p>
            </div>

            <div className="skill-groups">
              {skillGroups.map((group, index) => (
                <article
                  className="skill-group"
                  key={group.title}
                >
                  <div className="skill-group-index">
                    0{index + 1}
                  </div>

                  <h3>{group.title}</h3>

                  <p>{group.description}</p>

                  <div className="skills">
                    {group.skills.map(
                      (skill, skillIndex) => (
                        <span
                          className="skill"
                          key={`${skill}-${skillIndex}`}
                        >
                          {skill}
                        </span>
                      )
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== DIGITAL TWIN ==================== */}

        <section className="section twin-section" id="twin">
          <div className="container">
            <div className="twin-shell">
              <div className="twin-header">
                <div>
                  <div className="section-number twin-number">
                    07 / DIGITAL TWIN
                  </div>

                  <h2>
                    Ask
                    <br />
                    <em>Jayant AI.</em>
                  </h2>
                </div>

                <div className="twin-copy">
                  <div className="live-indicator">
                    <span />
                    AI TWIN ONLINE
                  </div>

                  <p>
                    Ask about my projects, ML/AI research,
                    experience, education or technical work.
                  </p>
                </div>
              </div>

              <DigitalTwin />
            </div>
          </div>
        </section>
      </main>

      {/* ==================== FOOTER ==================== */}

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <strong>JAYANT SINGH</strong>
            <span>ML / AI ENGINEER</span>
          </div>

          <div className="footer-center">
            MACHINE LEARNING · LLMs · KNOWLEDGE GRAPHS · SYSTEMS
          </div>

          <div className="footer-right">
            © 2026
          </div>
        </div>
      </footer>
    </>
  );
}
EOF

# ============================================================
# NEW HOMEPAGE CSS
# ============================================================

cat > app/globals.css <<'EOF'
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;1,500&display=swap');

:root {
  --bg: #f7f7f4;
  --surface: #ffffff;
  --surface-soft: #f0f0eb;
  --text: #11110f;
  --muted: #686861;
  --muted-2: #92928a;
  --line: #d9d9d1;
  --line-dark: #babab0;
  --accent: #ff5a36;
  --max: 1240px;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: Inter, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}

body::selection {
  background: var(--text);
  color: #fff;
}

a {
  color: inherit;
  text-decoration: none;
}

button,
input {
  font: inherit;
}

.container {
  width: min(var(--max), calc(100% - 64px));
  margin: auto;
}

/* =========================================================
   NAVIGATION
   ========================================================= */

.nav {
  position: fixed;
  z-index: 100;
  inset: 0 0 auto;
  border-bottom: 1px solid rgba(17, 17, 15, 0.08);
  background: rgba(247, 247, 244, 0.88);
  backdrop-filter: blur(18px);
}

.nav-inner {
  height: 76px;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.logo {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  width: fit-content;
}

.logo-mark {
  width: 35px;
  height: 35px;
  display: grid;
  place-items: center;
  background: var(--text);
  color: #fff;
  border-radius: 50%;
  font: 10px "DM Mono", monospace;
  letter-spacing: 0.04em;
}

.logo-copy {
  font: 11px "DM Mono", monospace;
  letter-spacing: 0.13em;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 28px;
  font-size: 12px;
  color: var(--muted);
}

.nav-links a {
  position: relative;
}

.nav-links a::after {
  content: "";
  position: absolute;
  left: 0;
  right: 100%;
  bottom: -7px;
  height: 1px;
  background: var(--text);
  transition: right 0.2s ease;
}

.nav-links a:hover {
  color: var(--text);
}

.nav-links a:hover::after {
  right: 0;
}

.nav-cta {
  justify-self: end;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 9px 13px;
  border: 1px solid var(--line);
  border-radius: 999px;
  font: 10px "DM Mono", monospace;
  letter-spacing: 0.07em;
  background: rgba(255, 255, 255, 0.7);
}

.nav-status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
}

/* =========================================================
   HERO
   ========================================================= */

.hero {
  position: relative;
  min-height: 100vh;
  padding: 150px 0 72px;
  display: flex;
  align-items: center;
  overflow: hidden;
  border-bottom: 1px solid var(--line);
}

.hero-grid-bg {
  position: absolute;
  inset: 76px 0 0;
  opacity: 0.35;
  pointer-events: none;
  background-image:
    linear-gradient(to right, rgba(17, 17, 15, 0.055) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(17, 17, 15, 0.055) 1px, transparent 1px);
  background-size: 80px 80px;
  mask-image: linear-gradient(to bottom, black, transparent 92%);
}

.hero-inner {
  position: relative;
  z-index: 1;
}

.hero-topline {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 25px;
  border-bottom: 1px solid var(--line-dark);
}

.hero-kicker-group {
  display: flex;
  align-items: center;
  gap: 11px;
}

.hero-dot {
  width: 8px;
  height: 8px;
  background: var(--accent);
  border-radius: 50%;
}

.kicker,
.section-number,
.date,
.project-meta,
.project-index,
.section-count {
  font-family: "DM Mono", monospace;
}

.kicker {
  font-size: 11px;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

.hero-top-meta {
  font: 10px "DM Mono", monospace;
  letter-spacing: 0.11em;
  color: var(--muted);
}

.hero-name-wrap {
  position: relative;
  padding: 42px 0 32px;
}

.hero h1 {
  margin: 0;
  max-width: 1040px;
  font-size: clamp(88px, 13.2vw, 180px);
  line-height: 0.73;
  letter-spacing: -0.088em;
  font-weight: 600;
}

.hero h1 span {
  display: inline-block;
}

.hero h1 em,
.section h2 em {
  font-family: "Playfair Display", serif;
  font-weight: 500;
}

.hero h1 em {
  display: inline-block;
  margin-left: 8vw;
}

.hero-side-note {
  position: absolute;
  right: 0;
  bottom: 62px;
  width: 280px;
  padding-top: 16px;
  border-top: 1px solid var(--text);
  color: var(--muted);
}

.hero-side-note svg {
  margin-bottom: 14px;
  color: var(--accent);
}

.hero-side-note p {
  margin: 0;
  font-size: 13px;
  line-height: 1.65;
}

.hero-bottom {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 480px;
  gap: 90px;
  align-items: end;
  margin-top: 20px;
  padding-top: 32px;
  border-top: 1px solid var(--line);
}

.hero-copy {
  max-width: 690px;
  margin: 0;
  color: #454540;
  font-size: 18px;
  line-height: 1.65;
  letter-spacing: -0.012em;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 28px;
}

.btn {
  min-height: 47px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border: 1px solid var(--text);
  border-radius: 999px;
  padding: 0 18px;
  cursor: pointer;
  background: var(--text);
  color: #fff;
  font-size: 12px;
  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn.secondary {
  background: transparent;
  color: var(--text);
  border-color: var(--line-dark);
}

.btn.secondary:hover {
  background: #fff;
}

.hero-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--line-dark);
}

.hero-stat {
  padding: 17px 17px 4px 0;
  border-right: 1px solid var(--line);
}

.hero-stat:last-child {
  border-right: 0;
  padding-left: 17px;
}

.hero-stat:nth-child(2) {
  padding-left: 17px;
}

.hero-stat span {
  display: block;
  margin-bottom: 9px;
  color: var(--muted-2);
  font: 9px "DM Mono", monospace;
  letter-spacing: 0.1em;
}

.hero-stat strong {
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
}

/* =========================================================
   GENERAL SECTIONS
   ========================================================= */

.section {
  padding: 130px 0;
  border-bottom: 1px solid var(--line);
}

.section-head,
.skills-header,
.research-header {
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 80px;
  align-items: end;
  margin-bottom: 70px;
}

.section-number {
  margin-bottom: 22px;
  color: var(--muted-2);
  font-size: 10px;
  letter-spacing: 0.12em;
}

.section h2 {
  margin: 0;
  font-size: clamp(52px, 6.6vw, 88px);
  line-height: 0.88;
  letter-spacing: -0.067em;
  font-weight: 600;
}

.section-intro-wrap {
  align-self: end;
}

.section-intro {
  margin: 0;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.75;
}

.section-count {
  display: block;
  margin-top: 24px;
  color: var(--muted-2);
  font-size: 9px;
  letter-spacing: 0.12em;
}

/* =========================================================
   PROJECTS
   ========================================================= */

.work-section {
  background: var(--surface);
}

.projects {
  border-top: 1px solid var(--text);
}

.project {
  position: relative;
  display: grid;
  grid-template-columns: 74px minmax(0, 1fr) 230px;
  gap: 30px;
  padding: 34px 0;
  border-bottom: 1px solid var(--line);
  overflow: hidden;
  transition:
    padding 0.25s ease,
    background 0.25s ease;
}

.project::before {
  content: "";
  position: absolute;
  inset: 0;
  background: var(--surface-soft);
  transform: translateX(-101%);
  transition: transform 0.35s cubic-bezier(.4, 0, .2, 1);
  z-index: 0;
}

.project:hover::before {
  transform: translateX(0);
}

.project > * {
  position: relative;
  z-index: 1;
}

.project:hover {
  padding-left: 16px;
  padding-right: 16px;
}

.project-index {
  padding-top: 6px;
  color: var(--muted-2);
  font-size: 11px;
}

.project-main {
  min-width: 0;
}

.project-heading-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 24px;
}

.project h3 {
  max-width: 760px;
  margin: 0;
  font-size: clamp(25px, 3vw, 38px);
  line-height: 1.08;
  letter-spacing: -0.045em;
  font-weight: 600;
}

.project-arrow {
  flex: 0 0 auto;
  opacity: 0;
  transform: translate(-8px, 8px);
  transition:
    opacity 0.22s ease,
    transform 0.22s ease;
}

.project:hover .project-arrow {
  opacity: 1;
  transform: translate(0, 0);
}

.project p {
  max-width: 760px;
  margin: 15px 0 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.72;
}

.project-meta {
  padding-top: 5px;
  color: var(--muted);
  font-size: 10px;
  line-height: 1.7;
}

.project-meta-label {
  display: block;
  margin-bottom: 12px;
  color: var(--muted-2);
  font-size: 9px;
  letter-spacing: 0.12em;
}

.project-meta strong {
  display: block;
  margin-bottom: 2px;
  color: var(--text);
  font-family: Inter, Arial, sans-serif;
  font-size: 12px;
  font-weight: 500;
}

.project-meta > span:not(.project-meta-label) {
  font-family: Inter, Arial, sans-serif;
  font-size: 11px;
}

.project-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  margin-top: 24px;
  color: var(--text);
  font-size: 9px;
  letter-spacing: 0.1em;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 19px;
}

.tag {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 6px 9px;
  color: var(--muted);
  background: rgba(255, 255, 255, 0.65);
  font: 9px "DM Mono", monospace;
}

/* =========================================================
   ABOUT
   ========================================================= */

.about-section {
  background: var(--text);
  color: #fff;
}

.about-section .section-number {
  color: #898981;
}

.about-grid {
  display: grid;
  grid-template-columns: 0.86fr 1.14fr;
  gap: 110px;
}

.about-heading h2 {
  color: #fff;
}

.about-content {
  padding-top: 40px;
}

.big-text {
  margin: 0;
  font-size: clamp(27px, 3vw, 43px);
  line-height: 1.18;
  letter-spacing: -0.045em;
}

.about-rule {
  width: 100%;
  height: 1px;
  margin: 40px 0;
  background: #33332f;
}

.about-long {
  max-width: 720px;
  margin: 0;
  color: #aaa9a0;
  font-size: 15px;
  line-height: 1.85;
}

/* =========================================================
   STRUCTURED LISTS
   ========================================================= */

.structured-grid {
  display: grid;
  grid-template-columns: 0.72fr 1.28fr;
  gap: 100px;
}

.structured-heading {
  position: sticky;
  top: 130px;
  align-self: start;
}

.structured-list {
  border-top: 1px solid var(--text);
}

.structured-item {
  display: grid;
  grid-template-columns: 62px 1fr;
  gap: 24px;
  padding: 34px 0 38px;
  border-bottom: 1px solid var(--line);
}

.structured-index {
  color: var(--muted-2);
  font: 10px "DM Mono", monospace;
}

.structured-body h3 {
  margin: 8px 0 7px;
  font-size: 25px;
  letter-spacing: -0.035em;
}

.structured-org {
  margin: 0 0 16px;
  color: var(--text);
  font-size: 14px;
  font-weight: 500;
}

.structured-detail {
  max-width: 700px;
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.75;
}

.date {
  color: var(--muted-2);
  font-size: 9px;
  letter-spacing: 0.08em;
}

.mini-skills {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 18px;
}

.mini-skills span {
  color: var(--muted);
  font: 9px "DM Mono", monospace;
  letter-spacing: 0.04em;
}

.mini-skills span::before {
  content: "↳";
  margin-right: 5px;
  color: var(--accent);
}

/* =========================================================
   RESEARCH
   ========================================================= */

.research-section {
  background: #eaeae4;
}

.research-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--text);
  border-left: 1px solid var(--line-dark);
}

.research-card {
  min-height: 390px;
  display: flex;
  flex-direction: column;
  padding: 28px;
  border-right: 1px solid var(--line-dark);
  border-bottom: 1px solid var(--line-dark);
  transition:
    background 0.22s ease,
    transform 0.22s ease;
}

.research-card:hover {
  background: var(--surface);
  transform: translateY(-4px);
}

.research-card-top {
  display: flex;
  justify-content: space-between;
  margin-bottom: 65px;
  color: var(--muted-2);
  font: 9px "DM Mono", monospace;
}

.research-card h3 {
  margin: 0 0 18px;
  font-size: 24px;
  line-height: 1.12;
  letter-spacing: -0.04em;
}

.research-card p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.75;
}

.research-org {
  margin-top: auto;
  padding-top: 30px;
  color: var(--text);
  font: 9px "DM Mono", monospace;
  letter-spacing: 0.04em;
}

/* =========================================================
   SKILLS
   ========================================================= */

.skills-section {
  background: var(--surface);
}

.skill-groups {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--text);
  border-left: 1px solid var(--line);
}

.skill-group {
  padding: 32px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.skill-group-index {
  margin-bottom: 70px;
  color: var(--muted-2);
  font: 10px "DM Mono", monospace;
}

.skill-group h3 {
  margin: 0 0 12px;
  font-size: 24px;
  letter-spacing: -0.035em;
}

.skill-group > p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.65;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-top: 27px;
}

.skill {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 8px 10px;
  color: var(--muted);
  background: #fafaf8;
  font: 9px "DM Mono", monospace;
}

/* =========================================================
   DIGITAL TWIN
   ========================================================= */

.twin-section {
  background: var(--text);
  color: #fff;
}

.twin-shell {
  padding: 50px;
  border: 1px solid #373733;
  border-radius: 30px;
  background:
    radial-gradient(
      circle at top right,
      rgba(255, 90, 54, 0.14),
      transparent 30%
    ),
    #151513;
}

.twin-header {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 80px;
  align-items: end;
  margin-bottom: 55px;
}

.twin-header h2 {
  color: #fff;
}

.twin-number {
  color: #77776f;
}

.twin-copy {
  color: #aaa99f;
  font-size: 14px;
  line-height: 1.7;
}

.twin-copy p {
  margin: 18px 0 0;
}

.live-indicator {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #d5d4cc;
  font: 9px "DM Mono", monospace;
  letter-spacing: 0.11em;
}

.live-indicator span {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 0 5px rgba(255, 90, 54, 0.12);
}

.chat {
  overflow: hidden;
  border: 1px solid #3b3b36;
  border-radius: 20px;
  background: #1b1b18;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.25);
}

.chat-head {
  display: flex;
  justify-content: space-between;
  padding: 19px 22px;
  border-bottom: 1px solid #353530;
}

.status {
  color: #8e8e85;
  font: 9px "DM Mono", monospace;
}

.chat-messages {
  min-height: 400px;
  max-height: 560px;
  overflow: auto;
  padding: 24px;
}

.msg {
  max-width: 78%;
  margin-bottom: 18px;
}

.msg.user {
  margin-left: auto;
  text-align: right;
}

.bubble {
  display: inline-block;
  padding: 13px 15px;
  border: 1px solid #3c3c37;
  border-radius: 14px;
  background: #242420;
  color: #e7e7df;
  line-height: 1.65;
}

.msg.user .bubble {
  background: #f4f4ef;
  color: #111;
  border-color: #f4f4ef;
}

.chat-form {
  display: flex;
  gap: 10px;
  padding: 14px;
  border-top: 1px solid #353530;
  background: #181816;
}

.chat-input {
  flex: 1;
  border: 0;
  outline: 0;
  padding: 12px;
  background: transparent;
  color: #fff;
}

.chat-input::placeholder {
  color: #6f6f68;
}

/* =========================================================
   FOOTER
   ========================================================= */

.footer {
  padding: 58px 0;
  background: var(--bg);
  color: var(--muted);
  border-top: 1px solid var(--line);
}

.footer-inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: end;
  gap: 30px;
}

.footer-inner > div:first-child {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.footer strong {
  color: var(--text);
  font: 10px "DM Mono", monospace;
  letter-spacing: 0.1em;
}

.footer span,
.footer-center,
.footer-right {
  font: 9px "DM Mono", monospace;
  letter-spacing: 0.07em;
}

.footer-center {
  text-align: center;
}

.footer-right {
  text-align: right;
}

/* =========================================================
   RESPONSIVE
   ========================================================= */

@media (max-width: 1000px) {
  .hero-bottom {
    grid-template-columns: 1fr;
    gap: 45px;
  }

  .hero-side-note {
    width: 240px;
  }

  .section-head,
  .skills-header,
  .research-header {
    grid-template-columns: 1fr 330px;
    gap: 50px;
  }

  .project {
    grid-template-columns: 56px 1fr 190px;
  }

  .about-grid,
  .structured-grid {
    gap: 65px;
  }

  .research-grid,
  .skill-groups {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 800px) {
  .container {
    width: min(var(--max), calc(100% - 30px));
  }

  .nav-inner {
    grid-template-columns: 1fr auto;
  }

  .nav-links {
    display: none;
  }

  .logo-copy {
    display: none;
  }

  .hero {
    min-height: auto;
    padding: 125px 0 70px;
  }

  .hero-top-meta {
    display: none;
  }

  .hero h1 {
    font-size: 21vw;
    line-height: 0.77;
  }

  .hero h1 em {
    margin-left: 0;
  }

  .hero-side-note {
    position: static;
    width: 100%;
    max-width: 420px;
    margin-top: 35px;
  }

  .hero-bottom {
    margin-top: 10px;
  }

  .hero-stats {
    grid-template-columns: 1fr;
  }

  .hero-stat,
  .hero-stat:nth-child(2),
  .hero-stat:last-child {
    padding: 14px 0;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .section {
    padding: 85px 0;
  }

  .section-head,
  .skills-header,
  .research-header,
  .about-grid,
  .structured-grid,
  .twin-header {
    grid-template-columns: 1fr;
    gap: 38px;
  }

  .section h2 {
    font-size: 14vw;
  }

  .project {
    grid-template-columns: 42px 1fr;
    gap: 14px;
  }

  .project-meta {
    grid-column: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4px 20px;
    margin-top: 8px;
    padding-top: 18px;
    border-top: 1px solid var(--line);
  }

  .project-meta-label {
    grid-column: 1 / -1;
    margin-bottom: 4px;
  }

  .project-link {
    grid-column: 1 / -1;
  }

  .project-arrow {
    display: none;
  }

  .about-content {
    padding-top: 0;
  }

  .structured-heading {
    position: static;
  }

  .research-grid,
  .skill-groups {
    grid-template-columns: 1fr;
  }

  .research-card {
    min-height: 320px;
  }

  .twin-shell {
    padding: 28px 20px;
    border-radius: 20px;
  }

  .footer-inner {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .footer-center,
  .footer-right {
    text-align: left;
  }
}

@media (max-width: 520px) {
  .hero h1 {
    font-size: 22vw;
  }

  .hero-copy {
    font-size: 16px;
  }

  .actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .project {
    grid-template-columns: 1fr;
  }

  .project-index,
  .project-meta {
    grid-column: 1;
  }

  .project-meta {
    grid-template-columns: 1fr;
  }

  .project h3 {
    font-size: 27px;
  }

  .structured-item {
    grid-template-columns: 35px 1fr;
    gap: 12px;
  }

  .research-card {
    padding: 22px;
  }

  .skill-group {
    padding: 24px;
  }

  .skill-group-index {
    margin-bottom: 40px;
  }

  .msg {
    max-width: 90%;
  }
}

EOF

# ============================================================
# APPEND EXISTING CASE STUDY CSS
# ============================================================

echo "" >> app/globals.css
echo "/* =========================================================" >> app/globals.css
echo "   EXISTING PROJECT CASE STUDY STYLES" >> app/globals.css
echo "   ========================================================= */" >> app/globals.css
cat "$CASE_STUDY_CSS" >> app/globals.css

rm -f "$CASE_STUDY_CSS"

echo ""
echo "============================================================"
echo "Portfolio redesign applied."
echo "============================================================"
echo ""
echo "Backup: $BACKUP_DIR"
echo ""
echo "Next run:"
echo "  npm run build"
echo "  npm run dev"
echo ""
