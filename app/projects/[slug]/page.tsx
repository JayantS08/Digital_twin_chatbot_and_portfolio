import { notFound } from "next/navigation";

type Project = {
  name: string;
  period: string;
  organization: string;
  description: string;
  technologies: string[];
  links: string[];
};

const projects: Project[] = [
  {
    name: "Forecasting with Temporal Knowledge Graphs",
    period: "Aug 2023 – Dec 2023",
    organization: "Indian Institute of Science (IISc)",
    description:
      "Research project exploring temporal Knowledge Graphs in which event timestamps are associated with entity relationships, enabling reasoning and forecasting over time.",
    technologies: [
      "Python",
      "PyTorch",
      "Knowledge Graphs",
      "Temporal Reasoning",
    ],
    links: [],
  },
  {
    name:
      "Knowledge Graph Reasoning and Knowledge Graph-Based Question Answering",
    period: "TODO",
    organization: "SML Lab, IISc",
    description:
      "Research on using Knowledge Graphs to improve reasoning and question answering with machine learning and large language models.",
    technologies: [
      "Python",
      "PyTorch",
      "NLP",
      "Knowledge Graphs",
      "LLMs",
    ],
    links: [],
  },
  {
    name: "Optimization in Chip Design with Routing Quality Checker",
    period: "May 2023 – Aug 2023",
    organization: "IBM",
    description:
      "Developed an optimized software architecture for a Routing Quality Checker and worked on a Timing-Aware Fixer as part of an IBM internship.",
    technologies: [
      "C++",
      "Computational Geometry",
      "Algorithms",
    ],
    links: [],
  },
  {
    name: "Data Analytics Projects",
    period: "Jul 2023 – Dec 2023",
    organization: "Data Analytics, IISc Bangalore",
    description:
      "Worked on diverse data analytics projects across sports, health, neuroscience, space, social networks and machine learning. Projects included the Duckworth-Lewis-Stern method, effects of smoking, COVID-19 modelling, colour blindness, visual processing, Mars orbit analysis, community detection, hypothesis testing, recommendation systems and NLP.",
    technologies: [
      "Data Analytics",
      "Statistics",
      "Machine Learning",
      "NLP",
    ],
    links: [],
  },
  {
    name: "Deep Learning with Natural Language Processing",
    period: "Jul 2023 – Dec 2023",
    organization: "DLNLP, IISc Bangalore",
    description:
      "Worked on deep learning and NLP projects including sentiment analysis using LSTM networks on a large-scale review dataset and unified date-format conversion using machine translation with an Encoder-Decoder Attention architecture.",
    technologies: [
      "Deep Learning",
      "NLP",
      "LSTM",
      "Machine Translation",
      "Attention",
    ],
    links: [],
  },
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: slugify(project.name),
  }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = projects.find(
    (item) => slugify(item.name) === slug
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="project-page">
      <div className="container">

        <a
            href="/Digital_twin_chatbot_and_portfolio/#work"
            className="back-link"
            >
            ← BACK TO SELECTED WORK
        </a>

        <header className="project-hero">
          <div className="section-number">
            PROJECT / CASE STUDY
          </div>

          <h1>{project.name}</h1>

          <div className="project-info">
            <div>
              <span>ORGANIZATION</span>
              <strong>{project.organization}</strong>
            </div>

            <div>
              <span>PERIOD</span>
              <strong>{project.period}</strong>
            </div>
          </div>
        </header>

        <section className="case-section">
          <div className="case-label">
            01 / OVERVIEW
          </div>

          <div className="case-content">
            <p className="case-lead">
              {project.description}
            </p>
          </div>
        </section>

        <section className="case-section">
          <div className="case-label">
            02 / THE PROBLEM
          </div>

          <div className="case-content">
            <h2>
              What problem was I trying to solve?
            </h2>

            <p className="case-placeholder">
              TODO: Add the problem statement,
              motivation and context for this project.
            </p>
          </div>
        </section>

        <section className="case-section">
          <div className="case-label">
            03 / APPROACH
          </div>

          <div className="case-content">
            <h2>
              How did I approach it?
            </h2>

            <p className="case-placeholder">
              TODO: Describe the architecture,
              methodology, algorithms and implementation.
            </p>
          </div>
        </section>

        <section className="case-section">
          <div className="case-label">
            04 / RESULTS
          </div>

          <div className="case-content">
            <h2>
              What did I achieve?
            </h2>

            <p className="case-placeholder">
              TODO: Add experiments, metrics,
              findings and measurable results.
            </p>
          </div>
        </section>

        <section className="case-section">
          <div className="case-label">
            05 / TECHNOLOGIES
          </div>

          <div className="case-content">
            <div className="case-tags">
              {project.technologies.map((technology, index) => (
                <span
                  className="skill"
                  key={`${technology}-${index}`}
                >
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </section>

        <div className="case-footer">
            <a
            href="/Digital_twin_chatbot_and_portfolio/#work"
            className="btn"
            >
            ← BACK TO WORK
            </a>
        </div>

      </div>
    </main>
  );
}