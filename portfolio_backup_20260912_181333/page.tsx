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

export default function Home() {
  const skills = [
    ...profile.skills.programming,
    ...profile.skills.machine_learning,
    ...profile.skills.systems,
    ...profile.skills.other,
  ];

  return (
    <>
      <Nav />

      <main>
        <Hero />

        {/* ==================== WORK ==================== */}

        <section className="section" id="work">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-number">
                  01 / SELECTED WORK
                </div>

                <h2>
                  Things I
                  <br />
                  build.
                </h2>
              </div>

              <p className="section-intro">
                Engineering and research projects, presented as
                technical case studies rather than a conventional
                resume.
              </p>
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

        <section className="section" id="about">
          <div className="container two-col">
            <div>
              <div className="section-number">
                02 / ABOUT
              </div>

              <p className="big-text">
                {profile.about.short}
              </p>
            </div>

            <div className="muted">
              <p>{profile.about.long}</p>
            </div>
          </div>
        </section>

        {/* ==================== EDUCATION ==================== */}

        <section className="section" id="education">
          <div className="container two-col">
            <div>
              <div className="section-number">
                03 / EDUCATION
              </div>

              <h2>
                Where I
                <br />
                learned.
              </h2>
            </div>

            <div className="timeline">
              {profile.education.map((education, index) => (
                <div
                  className="timeline-item"
                  key={`${education.institution}-${index}`}
                >
                  <div className="date">
                    {education.start_year} — {education.end_year}
                  </div>

                  <h3>{education.degree}</h3>

                  <p className="muted">
                    {education.institution}
                  </p>

                  {education.field && (
                    <p className="muted">
                      {education.field}
                    </p>
                  )}

                  {education.description && (
                    <p className="muted">
                      {education.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== RESEARCH ==================== */}

        <section className="section" id="research">
          <div className="container two-col">
            <div>
              <div className="section-number">
                04 / RESEARCH
              </div>

              <h2>
                Research
                <br />
                & ideas.
              </h2>
            </div>

            <div className="muted">
              {profile.research.map((item, index) => (
                <div
                  key={`${item.title}-${index}`}
                  className="research-item"
                >
                  <h3>{item.title}</h3>

                  <p>{item.description}</p>

                  <p>
                    {item.organization} · {item.year}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== EXPERIENCE ==================== */}

        <section className="section" id="experience">
          <div className="container two-col">
            <div>
              <div className="section-number">
                05 / EXPERIENCE
              </div>

              <h2>
                Where I’ve
                <br />
                worked.
              </h2>
            </div>

            <div className="timeline">
              {profile.experience.map((job, index) => (
                <div
                  className="timeline-item"
                  key={`${job.company}-${index}`}
                >
                  <div className="date">
                    {job.start} — {job.end}
                  </div>

                  <h3>
                    {job.company} — {job.role}
                  </h3>

                  <p className="muted">
                    {job.description}
                  </p>

                  {job.skills && job.skills.length > 0 && (
                    <div className="skills">
                      {job.skills.map((skill, skillIndex) => (
                        <span
                          className="skill"
                          key={`${skill}-${skillIndex}`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== SKILLS ==================== */}

        <section className="section" id="skills">
          <div className="container">
            <div className="section-number">
              06 / SKILLS
            </div>

            <h2>
              Tools of
              <br />
              the trade.
            </h2>

            <div className="skills">
              {skills.map((skill, skillIndex) => (
                <span
                  className="skill"
                  key={`${skill}-${skillIndex}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ==================== DIGITAL TWIN ==================== */}

        <section className="section" id="twin">
          <div className="container">
            <div className="section-head">
              <div>
                <div className="section-number">
                  07 / DIGITAL TWIN
                </div>

                <h2>
                  Talk to
                  <br />
                  <em>Jayant AI.</em>
                </h2>
              </div>

              <p className="section-intro">
                Ask questions about Jayant’s work,
                research, education and technical
                interests.
              </p>
            </div>

            <DigitalTwin />
          </div>
        </section>
      </main>

      {/* ==================== FOOTER ==================== */}

      <footer className="footer">
        <div className="container">
          © 2026 Jayant Singh · Interactive technical
          portfolio.
        </div>
      </footer>
    </>
  );
}