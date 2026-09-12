import { notFound } from "next/navigation";

type SubProject = {
  title: string;
  problem: string;
  dataset: string;
  approach: string;
  results: string;
  technologies: string[];
};

type Project = {
  name: string;
  period: string;
  organization: string;
  description: string;
  problem?: string;
  approach?: string;
  results?: string;
  technologies: string[];
  links: string[];
  subprojects?: SubProject[];
};

const projects: Project[] = [
  {
    name: "Data Analytics Projects",
    period: "Jul 2023 – Dec 2023",
    organization: "Data Analytics, IISc Bangalore",
    description:
      "A collection of end-to-end data analysis and machine learning projects spanning sports analytics, astronomy, graph mining, genomics, epidemiological modelling and recommendation systems.",
    technologies: [
      "Python",
      "Data Analytics",
      "Statistics",
      "Machine Learning",
      "Numerical Optimization",
      "Graph Algorithms",
      "Linear Algebra",
    ],
    links: [],
    subprojects: [
      {
        title: "Duckworth–Lewis Cricket Resource Modelling",
        problem:
          "Model how batting resources change as overs and wickets are consumed in an ODI innings, and derive a resource-percentage table similar to the Duckworth–Lewis methodology used for rain-affected matches.",
        dataset:
          "Ball-by-ball ODI cricket data from 1999–2011 containing innings information, overs, wickets in hand, runs, total overs and data-quality flags.",
        approach:
          "Cleaned the dataset, derived overs remaining and focused on first-innings data. Explored relationships between wickets, overs and runs remaining using statistical visualizations. Compared multiple numerical optimization strategies before fitting a joint run-production model across all wicket states. The final model used the function Z × (1 − exp(−L × overs_remaining / Z)) with ten wicket-specific Z parameters and a shared slope parameter L, optimized using L-BFGS-B.",
        results:
          "Generated resource-remaining curves for all wicket levels by normalizing the fitted run-production functions against the maximum achievable score. This produced a Duckworth–Lewis-style resource table showing how available batting resources decrease with lost overs and wickets.",
        technologies: [
          "Python",
          "SciPy",
          "L-BFGS-B",
          "Numerical Optimization",
          "Statistical Modelling",
        ],
      },

      {
        title: "Mars Orbit Reconstruction",
        problem:
          "Reconstruct the orbit of Mars from historical opposition observations by fitting a geometric orbital model whose predicted longitudes closely match the recorded measurements.",
        dataset:
          "Twelve historical Mars opposition observations containing date/time information and geocentric longitude measurements.",
        approach:
          "Converted the historical observations into continuous time and longitude representations. Implemented a geometric Mars equant model containing orbit radius, orbit-centre direction, equant position and mean angular motion. Used coordinate-wise grid search to obtain strong initial parameter estimates and then refined them using Nelder–Mead optimization.",
        results:
          "The optimized model achieved a maximum angular error of approximately 0.0726°, demonstrating that the geometric construction could closely reproduce the historical Mars observations.",
        technologies: [
          "Python",
          "SciPy",
          "Nelder-Mead",
          "Numerical Optimization",
          "Computational Geometry",
        ],
      },

      {
        title:
          "Community Detection in Graphs — Spectral Clustering & Louvain",
        problem:
          "Identify natural communities within large network datasets and compare classical graph-partitioning approaches in terms of clustering behaviour and computational cost.",
        dataset:
          "A Facebook ego-network represented as an undirected graph and the Bitcoin-OTC trust network represented using weighted trust relationships.",
        approach:
          "Implemented recursive spectral clustering using the Fiedler vector of the graph Laplacian to repeatedly partition graphs into communities. Also implemented Louvain-style modularity optimization that greedily moves nodes between neighbouring communities to increase modularity. Community structure was inspected using reordered adjacency matrices and graph visualizations.",
        results:
          "Spectral clustering produced clear recursive graph partitions but required expensive eigenvector computation. Louvain-style optimization scaled more effectively and progressively merged thousands of initial communities into a much smaller set of meaningful groups.",
        technologies: [
          "Python",
          "Graph Algorithms",
          "Spectral Clustering",
          "Louvain",
          "Linear Algebra",
          "Network Analysis",
        ],
      },

      {
        title: "Genomic Read Alignment for Colour-Blindness Diagnosis",
        problem:
          "Infer the genetic configuration associated with red-green colour blindness by aligning short DNA sequencing reads against red and green opsin gene regions on chromosome X.",
        dataset:
          "Short DNA reads, chromosome-X reference information, a Burrows-Wheeler Transform representation and known exon coordinate ranges for red and green opsin genes.",
        approach:
          "Built an FM-index using the Burrows-Wheeler Transform, rank tables and first-occurrence information. Implemented backward-search based read alignment supporting exact matching and up to two mismatches, including reverse-complement matching. Candidate alignments were mapped to red and green exon regions and used to compute exon-level red/green coverage ratios.",
        results:
          "The observed exon coverage ratios were compared against four known gene-configuration templates using Euclidean distance. The closest match corresponded to Configuration 2.",
        technologies: [
          "Python",
          "FM-Index",
          "Burrows-Wheeler Transform",
          "String Algorithms",
          "Bioinformatics",
        ],
      },

      {
        title: "COVID-19 SEIRV Epidemic Modelling & Control",
        problem:
          "Fit an epidemiological model to observed COVID-19 case data and study how different transmission-control policies affect the progression of infections.",
        dataset:
          "Daily national COVID-19 data including confirmed cases, testing counts and first-dose vaccination counts from March 2021 onward.",
        approach:
          "Implemented an SEIRV compartmental model representing Susceptible, Exposed, Infected, Recovered and Vaccinated populations. Model parameters were fitted using coordinate-wise gradient descent. After fitting, simulated fixed transmission-reduction strategies using open-loop control and an adaptive closed-loop strategy in which transmission reduction changed according to current infection levels.",
        results:
          "The simulations demonstrated the trade-off between fixed intervention levels and adaptive policies. The closed-loop strategy substantially flattened infection peaks by dynamically reducing transmission as case counts increased.",
        technologies: [
          "Python",
          "SEIRV",
          "Epidemiological Modelling",
          "Gradient Descent",
          "Control Systems",
        ],
      },

      {
        title:
          "Movie Recommendation System — SVD, CUR & Matrix Factorization",
        problem:
          "Compare multiple matrix-decomposition approaches for collaborative-filtering recommendation and study the trade-off between reconstruction quality and computational cost.",
        dataset:
          "MovieLens ratings data represented as a user × movie rating matrix.",
        approach:
          "Implemented Singular Value Decomposition, CUR decomposition and gradient-based latent-factor matrix factorization. SVD reconstruction quality was evaluated across different retained ranks. CUR used probability-based row and column sampling with a pseudoinverse of the intersection matrix. The latent-factor approach used stochastic gradient descent with regularization on an 80/20 train-test split.",
        results:
          "The matrix-factorization approach achieved a training error of approximately 0.663 and test error of approximately 0.91. A 30-factor model required around 1.2 hours to converge, while much larger latent-factor models improved reconstruction quality at significantly higher computational cost.",
        technologies: [
          "Python",
          "SVD",
          "CUR Decomposition",
          "Matrix Factorization",
          "Recommendation Systems",
          "Collaborative Filtering",
        ],
      },
    ],
  },

  {
    name: "Deep Learning with Natural Language Processing",
    period: "Jul 2023 – Dec 2023",
    organization: "DLNLP, IISc Bangalore",
    description:
      "Deep learning and NLP projects exploring sequence modelling, sentiment analysis and neural machine translation.",
    problem:
      "The projects focused on learning useful representations from sequential textual data. One task involved predicting sentiment from large-scale review text, while another required converting dates written in different textual formats into a single standardized representation.",
    approach:
      "For sentiment analysis, used recurrent neural networks with LSTM units to capture long-range dependencies in textual reviews. For date normalization, developed an encoder-decoder neural machine translation architecture with an attention mechanism to learn mappings between variable input date formats and a unified output representation.",
    results:
      "Implemented complete deep-learning pipelines for text preprocessing, sequence modelling, training and evaluation. The work provided practical experience with LSTMs, encoder-decoder architectures and attention-based sequence-to-sequence learning.",
    technologies: [
      "Python",
      "PyTorch",
      "Deep Learning",
      "NLP",
      "LSTM",
      "Encoder-Decoder",
      "Machine Translation",
      "Attention",
    ],
    links: [],
  },

  {
    name: "Forecasting with Temporal Knowledge Graphs",
    period: "Aug 2023 – Dec 2023",
    organization: "Indian Institute of Science (IISc)",
    description:
      "Research project exploring temporal Knowledge Graphs in which event timestamps are associated with entity relationships, enabling reasoning and forecasting over time.",
    problem:
      "Traditional Knowledge Graphs represent relationships between entities but usually do not explicitly model how those relationships evolve over time. The project explored how temporal information can be incorporated into structured knowledge representations for forecasting future events.",
    approach:
      "Studied Temporal Knowledge Graph representations and reasoning techniques in which timestamped relationships are used to model evolving interactions between entities. Explored temporal reasoning and forecasting over historical event sequences.",
    results:
      "Developed practical experience with temporal Knowledge Graph modelling and with using structured historical relationships for reasoning and forecasting tasks.",
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
    period: "Aug 2023 – Jul 2024",
    organization: "SML Lab, IISc / British Telecom",
    description:
      "Collaborative research on improving question answering with large language models through Knowledge Graph integration and structured knowledge grounding.",
    problem:
      "Large language models can generate fluent answers while still producing incorrect or unsupported information. The research investigated whether structured Knowledge Graph information could improve reasoning and provide more reliable grounding for question answering.",
    approach:
      "Experimented with Knowledge Graph-based question-answering architectures and retrieval strategies. Benchmarked approaches including GreaseLM and UniKGQA and explored hybrid neural-symbolic methods combining language models with structured knowledge.",
    results:
      "Evaluated Knowledge Graph-assisted question-answering approaches across benchmark datasets and studied how structured grounding can complement language-model reasoning.",
    technologies: [
      "Python",
      "PyTorch",
      "NLP",
      "Knowledge Graphs",
      "LLMs",
      "RAG",
    ],
    links: [],
  },

  {
    name: "Optimization in Chip Design with Routing Quality Checker",
    period: "Jan 2025 – Mar 2025",
    organization: "IBM",
    description:
      "Developed routing-quality analysis and optimization infrastructure for large-scale chip layouts, focusing on detecting degraded routing and generating timing- and noise-aware fixes.",
    problem:
      "Modern chip layouts contain millions of multi-layer routing geometries. A routing modification that resolves one issue can introduce timing degradation, noise problems or new design-rule violations elsewhere. The challenge was to identify poor routing and improve it while preserving overall design quality.",
    approach:
      "Developed infrastructure to identify routing-quality degradation across complex multi-layer geometries. Candidate routing improvements were evaluated using geometric and routing constraints while considering timing and noise impact. The work combined computational geometry, routing algorithms and optimization strategies.",
    results:
      "Built routing-quality analysis and fix-up infrastructure capable of supporting automated improvements while maintaining design constraints and minimizing secondary routing degradation.",
    technologies: [
      "C++",
      "Computational Geometry",
      "Algorithms",
      "Optimization",
      "EDA",
      "Routing",
    ],
    links: [],
  },

  {
    name: "Short Fixing in Chip Design",
    period: "Aug 2024 – Dec 2024",
    organization: "IBM",
    description:
      "Developed high-performance algorithms to detect and repair short-circuit violations across large-scale multi-layer chip layouts.",
    problem:
      "Chip layouts contain millions of routing geometries distributed across many metal layers. Short-circuit violations must be detected efficiently and repaired without introducing new shorts, opens, timing degradation or additional design-rule violations.",
    approach:
      "Developed a high-performance 3D sweep-line based approach for detecting short-circuit violations across routing geometries. Built a timing-aware rerouting workflow that selectively modifies affected routing while preserving surrounding topology and design constraints.",
    results:
      "Created an automated workflow for identifying and repairing routing shorts at scale while minimizing secondary violations and unnecessary routing changes.",
    technologies: [
      "C++",
      "Algorithms",
      "Computational Geometry",
      "Optimization",
      "EDA",
      "Routing",
    ],
    links: [],
  },

  {
    name: "Free-Hand Routing",
    period: "Apr 2025 – Jul 2025",
    organization: "IBM",
    description:
      "Developed a routing paradigm that allows designers to sketch desired routing topologies while the system translates the sketch into legal, manufacturable chip wiring.",
    problem:
      "Traditional routing tools provide limited ways for designers to communicate high-level routing intent. Manually constructing an exact topology can be cumbersome, particularly when designers already know approximately how they want a connection to be routed.",
    approach:
      "Designed a workflow in which a designer provides a free-hand routing sketch representing the desired topology. The system interprets the sketch, maps it onto the chip layout and generates routing that satisfies connectivity and physical-design constraints.",
    results:
      "Developed a system that bridges human routing intent and automated physical-design generation, reducing manual effort while still producing manufacturable routing. A patent was filed around the core methodology and implementation.",
    technologies: [
      "AI",
      "Computer Vision",
      "Algorithms",
      "Routing",
      "EDA",
    ],
    links: [],
  },

  {
    name: "Optimizing Power Consumption on Smartphones using Machine Learning",
    period: "Feb 2022 – Apr 2022",
    organization: "Samsung R&D Institute India",
    description:
      "Used smartphone sensor data and machine learning to infer device usage states that could support adaptive power-management decisions.",
    problem:
      "Smartphone sensors and background components may remain active even during periods of limited user interaction. Detecting whether the device is actively being used can provide useful signals for reducing unnecessary power consumption.",
    approach:
      "Collected and processed time-series data from smartphone sensors including ambient light, gyroscope and accelerometer readings. Extracted usage-related patterns and trained a Naive Bayes classifier to distinguish active and inactive device states.",
    results:
      "Built a sensor-based usage-state classification pipeline that could serve as an input to adaptive power-management strategies aimed at improving smartphone energy efficiency.",
    technologies: [
      "Python",
      "Machine Learning",
      "Naive Bayes",
      "Time-Series Data",
      "Sensor Data",
      "Data Analysis",
    ],
    links: [],
  },

  {
    name: "Movie Recommendation System",
    period: "Aug 2021 – Apr 2022",
    organization: "Aligarh Muslim University",
    description:
      "Built an end-to-end movie recommendation system combining content-based and collaborative-filtering techniques and exposed the recommendations through a web application.",
    problem:
      "Recommendation systems must infer user preferences from incomplete interaction data while dealing with challenges such as sparse ratings, cold-start users or movies and ambiguity in movie search.",
    approach:
      "Used MovieLens data to build both content-based and collaborative-filtering recommendation components. Combined similarity-based recommendation with user-rating information and integrated the system into an interactive Django web application.",
    results:
      "Developed a complete recommendation pipeline from dataset preprocessing and recommendation logic through to an interactive web interface.",
    technologies: [
      "Python",
      "Machine Learning",
      "Recommendation Systems",
      "Collaborative Filtering",
      "Django",
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

        {project.subprojects ? (
          <section className="case-section">
            <div className="case-label">
              02 / PROJECTS
            </div>

            <div className="case-content">
              <h2>Individual Projects</h2>

              <div className="analytics-project-grid">
                {project.subprojects.map(
                  (subproject, index) => (
                    <article
                      className="analytics-project-card"
                      key={subproject.title}
                    >
                      <div className="analytics-project-number">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <h3>{subproject.title}</h3>

                      <div className="analytics-project-section">
                        <span>PROBLEM</span>
                        <p>{subproject.problem}</p>
                      </div>

                      <div className="analytics-project-section">
                        <span>DATASET</span>
                        <p>{subproject.dataset}</p>
                      </div>

                      <div className="analytics-project-section">
                        <span>APPROACH</span>
                        <p>{subproject.approach}</p>
                      </div>

                      <div className="analytics-project-section">
                        <span>RESULTS</span>
                        <p>{subproject.results}</p>
                      </div>

                      <div className="case-tags">
                        {subproject.technologies.map(
                          (technology) => (
                            <span
                              className="skill"
                              key={technology}
                            >
                              {technology}
                            </span>
                          )
                        )}
                      </div>
                    </article>
                  )
                )}
              </div>
            </div>
          </section>
        ) : (
          <>
            <section className="case-section">
              <div className="case-label">
                02 / THE PROBLEM
              </div>

              <div className="case-content">
                <h2>
                  What problem was I trying to solve?
                </h2>

                <p>{project.problem}</p>
              </div>
            </section>

            <section className="case-section">
              <div className="case-label">
                03 / APPROACH
              </div>

              <div className="case-content">
                <h2>How did I approach it?</h2>

                <p>{project.approach}</p>
              </div>
            </section>

            <section className="case-section">
              <div className="case-label">
                04 / RESULTS
              </div>

              <div className="case-content">
                <h2>What did I achieve?</h2>

                <p>{project.results}</p>
              </div>
            </section>
          </>
        )}

        <section className="case-section">
          <div className="case-label">
            {project.subprojects
              ? "03 / TECHNOLOGIES"
              : "05 / TECHNOLOGIES"}
          </div>

          <div className="case-content">
            <div className="case-tags">
              {project.technologies.map(
                (technology, index) => (
                  <span
                    className="skill"
                    key={`${technology}-${index}`}
                  >
                    {technology}
                  </span>
                )
              )}
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