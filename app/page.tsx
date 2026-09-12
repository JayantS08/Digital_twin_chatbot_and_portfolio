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
    number: "04",
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
    number: "05",
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
    number: "06",
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
    number: "07",
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
    number: "08",
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
            <div className="structured-grid">
              <div className="structured-heading">
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
