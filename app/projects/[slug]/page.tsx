import KnowledgeQAResearchCaseStudy from "../../components/KnowledgeQAResearchCaseStudy";
import { notFound } from "next/navigation";
import ProjectCaseStudy, {
  hasProjectCaseStudy,
} from "../../components/ProjectCaseStudies";

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
    organization: "IISc Bangalore",
    description:
      "A collection of deep learning projects exploring how neural networks model and generate natural language, spanning sentiment classification, recurrent sequence modelling and neural machine translation.",
  
    problem:
      "Natural-language tasks require models to capture context across variable-length sequences rather than treating words as independent features. The work explored this challenge across both discriminative tasks, such as sentiment prediction, and generative tasks, such as sequence-to-sequence translation.",
  
    approach:
      "Built complete NLP pipelines covering preprocessing, sequence representation, training and evaluation. Studied recurrent neural networks and LSTM architectures for learning long-range dependencies in text, applied sequence models to sentiment classification, and developed encoder–decoder neural machine translation systems. Attention mechanisms were explored to allow the decoder to dynamically focus on relevant source tokens during generation. Models and training pipelines were implemented in PyTorch.",
  
    results:
      "The projects provided hands-on experience with the full lifecycle of deep-learning-based NLP systems: preparing noisy text data, representing variable-length sequences, training recurrent architectures, evaluating predictions and understanding the transition from basic sequence models to attention-based encoder–decoder systems.",
  
    technologies: [
      "Python",
      "PyTorch",
      "Deep Learning",
      "Natural Language Processing",
      "LSTM",
      "Sequence Modelling",
      "Encoder–Decoder",
      "Neural Machine Translation",
      "Attention"
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


const BASE_PATH = "/Digital_twin_chatbot_and_portfolio";

function DataAnalyticsCaseStudy() {
  const imageRoot =
    `${BASE_PATH}/projects/data-analytics`;

  return (
    <main className="da-page">
      <section className="da-hero">
        <div className="container">
          <a className="da-back" href={`${BASE_PATH}/#work`}>
            ← BACK TO SELECTED WORK
          </a>

          <div className="da-hero-grid">
            <div>
              <div className="da-kicker">
                DATA SCIENCE · MACHINE LEARNING · ANALYTICS
              </div>

              <h1>
                Data Analytics
                <br />
                <em>Projects.</em>
              </h1>
            </div>

            <div className="da-hero-copy">
              <p>
                Six applied studies spanning statistical modelling,
                scientific computing, graph algorithms, bioinformatics,
                epidemiological modelling and recommender systems.
              </p>

              <div className="da-hero-meta">
                <div>
                  <span>PROJECTS</span>
                  <strong>06</strong>
                </div>

                <div>
                  <span>FOCUS</span>
                  <strong>Applied ML</strong>
                </div>

                <div>
                  <span>WORK</span>
                  <strong>Models + Algorithms</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="da-index-section">
        <div className="container">
          <div className="da-index">
            {[
              ["01", "Duckworth–Lewis Cricket Resource Modelling"],
              ["02", "Mars Orbit Reconstruction"],
              ["03", "Community Detection in Graphs"],
              ["04", "Genomic Read Alignment"],
              ["05", "COVID-19 SEIRV Modelling"],
              ["06", "Movie Recommendation System"],
            ].map(([number, title]) => (
              <a href={`#da-project-${number}`} key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <span>↘</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ======================================================
          01 / DUCKWORTH–LEWIS
          ====================================================== */}

      <section className="da-project" id="da-project-01">
        <div className="container">
          <div className="da-project-heading">
            <div className="da-project-number">01</div>

            <div>
              <div className="da-eyebrow">
                STATISTICAL MODELLING · NUMERICAL OPTIMIZATION
              </div>

              <h2>Duckworth–Lewis Cricket Resource Modelling</h2>
            </div>
          </div>

          <div className="da-story-intro">
            <div className="da-story-label">
              WHY THIS PROBLEM?
            </div>

            <div className="da-story-big">
              In a rain-interrupted cricket match, losing ten overs does
              not remove the same amount of scoring opportunity when a
              team has ten wickets available as when it has only two.
            </div>

            <p>
              The objective was to model the two resources available to
              a batting team — <strong>overs and wickets</strong> — and
              estimate how much scoring capacity remains at any point
              in an ODI innings.
            </p>
          </div>

          <div className="da-build-panel">
            <div>
              <span>WHAT I BUILT</span>
              <h3>
                A fitted run-production model that converts match state
                into remaining batting resources.
              </h3>
            </div>

            <p>
              Historical ODI ball-by-ball data from 1999–2011 was
              cleaned and transformed into overs remaining, wickets in
              hand and runs remaining. Only first-innings observations
              were used for fitting.
            </p>
          </div>

          <div className="da-method-layout">
            <div className="da-method-copy">
              <span>HOW IT WORKS</span>

              <p>
                For each wicket state, expected future runs were
                represented using the nonlinear production function:
              </p>

              <div className="da-equation">
                Z × (1 − exp(−L × overs / Z))
              </div>

              <p>
                Each of the ten wicket states has its own
                <strong> Z parameter</strong>, representing its scoring
                capacity, while all curves share a single
                <strong> L parameter</strong> controlling the rate at
                which resources are consumed.
              </p>

              <p>
                Instead of fitting the curves independently, all ten Z
                values and the shared L were optimized together using a
                single sum-of-squared-errors objective and
                <strong> L-BFGS-B</strong>.
              </p>
            </div>

            <div className="da-pipeline">
              <div>Clean ODI data</div>
              <span>↓</span>
              <div>Derive overs remaining</div>
              <span>↓</span>
              <div>Fit run-production function</div>
              <span>↓</span>
              <div>Optimize Z₁ … Z₁₀ + L</div>
              <span>↓</span>
              <div>Normalize against maximum scoring state</div>
              <span>↓</span>
              <div>Resource percentage curves</div>
            </div>
          </div>

          <div className="da-visual-block">
            <div className="da-visual-heading">
              <div>
                <span>MODEL OUTPUT</span>
                <h3>Remaining batting resources</h3>
              </div>

              <p>
                The fitted run-production curves are normalized against
                the maximum resource state: 50 overs remaining with all
                10 wickets available.
              </p>
            </div>

            <figure className="da-explained-figure">
              <div className="da-image-wrap">
                <img
                  src={`${imageRoot}/01-dls-resource-curves.png`}
                  alt="Duckworth Lewis resource curves for different wickets in hand"
                />
              </div>

              <figcaption>
                Fitted resources remaining versus overs to go.
              </figcaption>
            </figure>

            <div className="da-read-visual">
              <span>HOW TO READ THIS GRAPH</span>

              <div className="da-read-grid">
                <div>
                  <strong>X</strong>
                  <p>Overs remaining in the innings.</p>
                </div>

                <div>
                  <strong>Y</strong>
                  <p>Percentage of total batting resources remaining.</p>
                </div>

                <div>
                  <strong>CURVES</strong>
                  <p>
                    Each line represents a different number of wickets
                    in hand — 1 wicket at the bottom, 10 at the top.
                  </p>
                </div>
              </div>

              <p className="da-interpretation">
                At the same number of overs remaining, a team with more
                wickets available retains considerably more scoring
                capacity. Losing wickets therefore reduces usable
                resources even when the number of overs does not
                change.
              </p>
            </div>
          </div>

          <div className="da-result-panel">
            <div>
              <span>RESULT</span>
              <h3>
                A single jointly optimized model produced the complete
                family of DLS-style resource curves.
              </h3>
            </div>

            <div className="da-result-stats">
              <div>
                <strong>7.956</strong>
                <span>SHARED L</span>
              </div>

              <div>
                <strong>12.70 → 298.56</strong>
                <span>FITTED Z RANGE</span>
              </div>

              <div>
                <strong>L-BFGS-B</strong>
                <span>FINAL OPTIMIZER</span>
              </div>
            </div>
          </div>

          <div className="da-tech">
            <span>TOOLS / CONCEPTS</span>
            <div>
              {[
                "Python",
                "SciPy",
                "L-BFGS-B",
                "Statistical Modelling",
                "Numerical Optimization",
              ].map((item) => (
                <span className="da-tech-pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          02 / MARS
          ====================================================== */}

      <section className="da-project" id="da-project-02">
        <div className="container">
          <div className="da-project-heading">
            <div className="da-project-number">02</div>

            <div>
              <div className="da-eyebrow">
                SCIENTIFIC COMPUTING · GEOMETRIC OPTIMIZATION
              </div>
              <h2>Mars Orbit Reconstruction</h2>
            </div>
          </div>

          <div className="da-story-intro">
            <div className="da-story-label">WHY THIS PROBLEM?</div>

            <div className="da-story-big">
              Can a geometric model of Mars&apos;s orbit be recovered
              using only historical observations of where Mars appeared
              in the sky?
            </div>

            <p>
              The task was to reconstruct a Kepler-style orbital model
              from twelve recorded Mars oppositions by finding the
              geometry and motion parameters that make predicted
              longitudes match the observations.
            </p>
          </div>

          <div className="da-build-panel">
            <div>
              <span>WHAT I BUILT</span>
              <h3>
                A geometric simulator and optimization pipeline for
                fitting the orbit centre, equant and angular motion.
              </h3>
            </div>

            <p>
              Historical date/time measurements were converted to
              elapsed days, while zodiac-position measurements were
              converted into continuous angular longitudes.
            </p>
          </div>

          <div className="da-method-layout">
            <div className="da-method-copy">
              <span>HOW IT WORKS</span>

              <p>
                For a candidate parameter set, the model places the orbit
                centre <strong>C</strong> and equant
                <strong> E</strong>, constructs the rotating equant line
                for each observation time and computes where that line
                intersects the candidate Mars orbit.
              </p>

              <p>
                The resulting intersection point gives the predicted
                longitude of Mars. Prediction error is measured against
                all twelve observed opposition angles.
              </p>

              <p>
                A coordinate-wise grid search provided strong initial
                estimates for the inner parameters before
                <strong> Nelder–Mead</strong> refinement. Radius and
                angular rate were then alternately searched until the
                maximum angular error stopped improving.
              </p>
            </div>

            <div className="da-pipeline">
              <div>12 historical oppositions</div>
              <span>↓</span>
              <div>Convert time + longitude</div>
              <span>↓</span>
              <div>Construct orbit + equant geometry</div>
              <span>↓</span>
              <div>Predict opposition angle</div>
              <span>↓</span>
              <div>Measure maximum angular error</div>
              <span>↓</span>
              <div>Search + refine parameters</div>
            </div>
          </div>

          <div className="da-visual-block">
            <div className="da-visual-heading">
              <div>
                <span>MODEL GEOMETRY</span>
                <h3>How an opposition angle is predicted</h3>
              </div>

              <p>
                This is the geometric construction behind the model —
                not merely a decorative orbit diagram.
              </p>
            </div>

            <figure className="da-explained-figure da-figure-medium">
              <div className="da-image-wrap">
                <img
                  src={`${imageRoot}/02-mars-orbit.png`}
                  alt="Mars orbit equant geometry"
                />
              </div>

              <figcaption>
                Sun, candidate orbit centre, equant point and predicted
                Mars position.
              </figcaption>
            </figure>

            <div className="da-read-visual">
              <span>WHY THIS MATTERS</span>

              <p className="da-interpretation">
                Every set of orbital parameters produces twelve
                predicted longitudes. The optimization problem is
                therefore geometric: adjust the model until the worst
                disagreement between predicted and observed opposition
                angles is minimized.
              </p>
            </div>
          </div>

          <div className="da-result-panel">
            <div>
              <span>RESULT</span>
              <h3>
                The fitted model reproduced the historical observations
                with a maximum angular error of about 0.0726°.
              </h3>
            </div>

            <div className="da-result-stats">
              <div>
                <strong>0.0726°</strong>
                <span>MAX ERROR</span>
              </div>
              <div>
                <strong>4.35′</strong>
                <span>ARC MINUTES</span>
              </div>
              <div>
                <strong>0.5241°/day</strong>
                <span>ANGULAR RATE</span>
              </div>
            </div>
          </div>

          <div className="da-tech">
            <span>TOOLS / CONCEPTS</span>
            <div>
              {[
                "Python",
                "SciPy",
                "Nelder-Mead",
                "Computational Geometry",
                "Numerical Optimization",
              ].map((item) => (
                <span className="da-tech-pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          03 / COMMUNITY DETECTION
          ====================================================== */}

      <section className="da-project" id="da-project-03">
        <div className="container">
          <div className="da-project-heading">
            <div className="da-project-number">03</div>

            <div>
              <div className="da-eyebrow">
                GRAPH ALGORITHMS · UNSUPERVISED LEARNING
              </div>
              <h2>Community Detection in Graphs</h2>
            </div>
          </div>

          <div className="da-story-intro">
            <div className="da-story-label">WHY THIS PROBLEM?</div>

            <div className="da-story-big">
              Large networks often contain groups of nodes that interact
              far more strongly with each other than with the rest of
              the graph.
            </div>

            <p>
              The goal was to discover those hidden communities in two
              very different networks — a Facebook ego network and the
              Bitcoin-OTC trust graph — and compare spectral clustering
              with Louvain-style modularity optimization.
            </p>
          </div>

          <div className="da-two-methods">
            <article>
              <span>METHOD 01</span>
              <h3>Spectral clustering</h3>
              <p>
                Compute the graph&apos;s Fiedler vector — the eigenvector
                associated with the second-smallest Laplacian
                eigenvalue — and split nodes according to the sign of
                its entries.
              </p>
              <p>
                The process is repeated on the largest remaining
                community until the requested number of communities is
                produced.
              </p>
            </article>

            <article>
              <span>METHOD 02</span>
              <h3>Louvain optimization</h3>
              <p>
                Start with many small communities and greedily move nodes
                wherever the move improves modularity.
              </p>
              <p>
                Unlike spectral clustering, the optimization directly
                asks whether a reassignment makes the community
                structure stronger.
              </p>
            </article>
          </div>

          <div className="da-process-strip">
            <span>SPECTRAL PIPELINE</span>
            <strong>Graph Laplacian</strong>
            <b>→</b>
            <strong>Fiedler Vector</strong>
            <b>→</b>
            <strong>Sign-based Split</strong>
            <b>→</b>
            <strong>Recursive Partitioning</strong>
          </div>

          <div className="da-community-visuals">
            <figure>
              <div className="da-image-wrap">
                <img
                  src={`${imageRoot}/03-facebook-fiedler-vector.png`}
                  alt="Sorted Fiedler vector"
                />
              </div>
              <figcaption>
                <strong>Step 1 — Fiedler vector.</strong>
                The spectral signal used to decide the first graph
                partition.
              </figcaption>
            </figure>

            <figure>
              <div className="da-image-wrap">
                <img
                  src={`${imageRoot}/03-facebook-spectral-2way.png`}
                  alt="Facebook two way spectral partition"
                />
              </div>
              <figcaption>
                <strong>Step 2 — Initial partition.</strong>
                Nodes separated according to the spectral cut.
              </figcaption>
            </figure>

            <figure className="da-community-main">
              <div className="da-image-wrap">
                <img
                  src={`${imageRoot}/03-facebook-spectral-8-community.png`}
                  alt="Facebook graph split into eight communities"
                />
              </div>
              <figcaption>
                <strong>Final recursive partition.</strong>
                Spectral decomposition continued until eight Facebook
                communities were produced.
              </figcaption>
            </figure>

            <figure>
              <div className="da-image-wrap">
                <img
                  src={`${imageRoot}/03-facebook-adjacency-community.png`}
                  alt="Adjacency matrix sorted by community"
                />
              </div>
              <figcaption>
                <strong>Validation through adjacency structure.</strong>
                Dense blocks near the diagonal indicate stronger
                connectivity within discovered communities.
              </figcaption>
            </figure>
          </div>

          <div className="da-comparison-note">
            <span>WHAT DID THE COMPARISON SHOW?</span>
            <p>
              Spectral clustering gives a principled balanced cut but
              requires expensive eigenvector computation. Louvain
              instead optimizes modularity through local node moves and
              progressively compressed thousands of initial communities
              into a much smaller set.
            </p>
          </div>

          <div className="da-result-panel">
            <div>
              <span>RESULT</span>
              <h3>
                Recursive spectral clustering produced interpretable
                partitions on both datasets, while Louvain demonstrated
                a more scalable optimization strategy.
              </h3>
            </div>

            <div className="da-result-stats">
              <div>
                <strong>8</strong>
                <span>FACEBOOK CLUSTERS</span>
              </div>
              <div>
                <strong>5</strong>
                <span>BITCOIN CLUSTERS</span>
              </div>
              <div>
                <strong>≈4000 → 93</strong>
                <span>LOUVAIN PASS</span>
              </div>
            </div>
          </div>

          <div className="da-tech">
            <span>TOOLS / CONCEPTS</span>
            <div>
              {[
                "NetworkX",
                "Graph Laplacian",
                "Spectral Clustering",
                "Fiedler Vector",
                "Louvain",
                "Modularity",
              ].map((item) => (
                <span className="da-tech-pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          04 / GENOMICS
          ====================================================== */}

      <section className="da-project" id="da-project-04">
        <div className="container">
          <div className="da-project-heading">
            <div className="da-project-number">04</div>

            <div>
              <div className="da-eyebrow">
                BIOINFORMATICS · STRING ALGORITHMS
              </div>
              <h2>
                Genomic Read Alignment for Colour-Blindness Diagnosis
              </h2>
            </div>
          </div>

          <div className="da-story-intro">
            <div className="da-story-label">WHY THIS PROBLEM?</div>

            <div className="da-story-big">
              Red and green opsin genes are extremely similar, making
              short DNA reads difficult to assign confidently to the
              correct gene.
            </div>

            <p>
              The task was to align sequencing reads against chromosome
              X, measure how strongly different red and green exons were
              represented, and use that pattern to infer the most likely
              genetic configuration.
            </p>
          </div>

          <div className="da-build-panel">
            <div>
              <span>WHAT I BUILT</span>
              <h3>
                An FM-index based sequence-search pipeline supporting
                approximate read matching and exon-level diagnosis.
              </h3>
            </div>

            <p>
              The implementation used a Burrows–Wheeler Transform,
              cumulative Rank tables and a first-occurrence map to avoid
              scanning the complete chromosome sequence for every read.
            </p>
          </div>

          <div className="da-process-flow">
            <div>
              <strong>01</strong>
              <span>Build FM-index</span>
              <p>Rank matrix + first occurrence table.</p>
            </div>

            <div>
              <strong>02</strong>
              <span>Align reads</span>
              <p>Backward search with up to two mismatches.</p>
            </div>

            <div>
              <strong>03</strong>
              <span>Check reverse complement</span>
              <p>Search both DNA orientations.</p>
            </div>

            <div>
              <strong>04</strong>
              <span>Map to exons</span>
              <p>Assign candidate positions to red/green exons.</p>
            </div>

            <div>
              <strong>05</strong>
              <span>Compute ratios</span>
              <p>Compare red/green coverage for exons 2–5.</p>
            </div>

            <div>
              <strong>06</strong>
              <span>Select configuration</span>
              <p>Minimum Euclidean distance to known templates.</p>
            </div>
          </div>

          <div className="da-visual-block">
            <div className="da-visual-heading">
              <div>
                <span>DIAGNOSTIC RESULT</span>
                <h3>Observed exon pattern vs candidate configurations</h3>
              </div>

              <p>
                The plot is the final stage of the pipeline: it compares
                the ratios obtained from aligned DNA reads against four
                known configuration templates.
              </p>
            </div>

            <figure className="da-explained-figure">
              <div className="da-image-wrap">
                <img
                  src={`${imageRoot}/04-genomic-configuration-comparison.png`}
                  alt="Observed exon ratios compared with genomic configuration templates"
                />
              </div>

              <figcaption>
                Observed red/green exon ratios compared with candidate
                genetic configurations.
              </figcaption>
            </figure>

            <div className="da-read-visual">
              <span>HOW THE DIAGNOSIS IS MADE</span>

              <p className="da-interpretation">
                The observed red/green ratios for exons 2–5 were
                approximately <strong>0.316, 0.500, 1.134 and
                0.784</strong>. Their Euclidean distance was measured
                against each candidate template; the smallest distance
                identified <strong>Configuration 2</strong>.
              </p>
            </div>
          </div>

          <div className="da-result-panel">
            <div>
              <span>RESULT</span>
              <h3>
                Approximate sequence alignment was converted into a
                higher-level genomic diagnosis: Configuration 2 was the
                closest match.
              </h3>
            </div>

            <div className="da-result-stats">
              <div>
                <strong>2</strong>
                <span>MAX MISMATCHES</span>
              </div>
              <div>
                <strong>12</strong>
                <span>RED + GREEN EXONS</span>
              </div>
              <div>
                <strong>#2</strong>
                <span>BEST MATCH</span>
              </div>
            </div>
          </div>

          <div className="da-tech">
            <span>TOOLS / CONCEPTS</span>
            <div>
              {[
                "FM-index",
                "Burrows-Wheeler Transform",
                "Backward Search",
                "String Matching",
                "Bioinformatics",
              ].map((item) => (
                <span className="da-tech-pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          05 / COVID
          ====================================================== */}

      <section className="da-project" id="da-project-05">
        <div className="container">
          <div className="da-project-heading">
            <div className="da-project-number">05</div>

            <div>
              <div className="da-eyebrow">
                EPIDEMIOLOGICAL MODELLING · CONTROL SYSTEMS
              </div>
              <h2>COVID-19 SEIRV Epidemic Modelling &amp; Control</h2>
            </div>
          </div>

          <div className="da-story-intro">
            <div className="da-story-label">WHY THIS PROBLEM?</div>

            <div className="da-story-big">
              Predicting an epidemic is only one part of the problem.
              The more interesting question is how intervention policy
              changes its trajectory.
            </div>

            <p>
              I fitted a compartmental epidemic model to observed case
              data and then used the model as a simulator for comparing
              fixed and adaptive transmission-control strategies.
            </p>
          </div>

          <div className="da-seirv">
            <div>
              <strong>S</strong>
              <span>Susceptible</span>
            </div>
            <b>→</b>
            <div>
              <strong>E</strong>
              <span>Exposed</span>
            </div>
            <b>→</b>
            <div>
              <strong>I</strong>
              <span>Infected</span>
            </div>
            <b>→</b>
            <div>
              <strong>R</strong>
              <span>Recovered</span>
            </div>

            <div className="da-vaccine-node">
              <strong>V</strong>
              <span>Vaccination effect</span>
            </div>
          </div>

          <div className="da-method-layout">
            <div className="da-method-copy">
              <span>MODEL + FITTING</span>

              <p>
                The SEIRV dynamics model infection flow through
                susceptible, exposed, infected and recovered
                populations while also incorporating vaccination.
              </p>

              <p>
                The implementation used a population of
                <strong> 70 million</strong>, vaccine efficacy of
                <strong> 0.66</strong>, incubation rate
                <strong> 1/5.8</strong> and recovery rate
                <strong> 1/5</strong>.
              </p>

              <p>
                Initial conditions, transmission rate and case
                identification ratio were fitted through coordinate-wise
                gradient updates against reported COVID case data.
              </p>
            </div>

            <div className="da-control-card">
              <span>CLOSED-LOOP POLICY</span>

              <div>
                <strong>&lt; 10k</strong>
                <p>β</p>
              </div>
              <div>
                <strong>10k–25k</strong>
                <p>2β / 3</p>
              </div>
              <div>
                <strong>25k–100k</strong>
                <p>β / 2</p>
              </div>
              <div>
                <strong>&gt; 100k</strong>
                <p>β / 3</p>
              </div>
            </div>
          </div>

          <div className="da-visual-block">
            <div className="da-visual-heading">
              <div>
                <span>CONTROL EXPERIMENT</span>
                <h3>Fixed policy vs adaptive policy</h3>
              </div>

              <p>
                Open-loop control fixes the transmission reduction in
                advance. Closed-loop control reacts to the current
                infection level and changes β as cases rise or fall.
              </p>
            </div>

            <div className="da-compare">
              <figure className="da-compare-item">
                <div className="da-image-wrap">
                  <img
                    src={`${imageRoot}/05-covid-open-loop.png`}
                    alt="COVID open loop epidemic simulation"
                  />
                </div>
                <figcaption>
                  <strong>Open-loop.</strong> Transmission scaling stays
                  fixed throughout the simulation.
                </figcaption>
              </figure>

              <figure className="da-compare-item">
                <div className="da-image-wrap">
                  <img
                    src={`${imageRoot}/05-covid-closed-loop.png`}
                    alt="COVID closed loop epidemic simulation"
                  />
                </div>
                <figcaption>
                  <strong>Closed-loop.</strong> Transmission control
                  reacts to the simulated infection level.
                </figcaption>
              </figure>
            </div>

            <div className="da-read-visual">
              <span>WHAT DO THESE PLOTS TELL US?</span>
              <p className="da-interpretation">
                Lowering β changes the height and timing of epidemic
                waves. The adaptive controller goes further: as case
                counts cross predefined thresholds it progressively
                reduces transmission, substantially flattening the
                simulated peak.
              </p>
            </div>
          </div>

          <div className="da-tech">
            <span>TOOLS / CONCEPTS</span>
            <div>
              {[
                "SEIRV",
                "Gradient Descent",
                "Time Series",
                "Epidemiological Modelling",
                "Open-loop Control",
                "Closed-loop Control",
              ].map((item) => (
                <span className="da-tech-pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================
          06 / RECOMMENDER
          ====================================================== */}

      <section className="da-project" id="da-project-06">
        <div className="container">
          <div className="da-project-heading">
            <div className="da-project-number">06</div>

            <div>
              <div className="da-eyebrow">
                RECOMMENDER SYSTEMS · MATRIX FACTORIZATION
              </div>
              <h2>Movie Recommendation System</h2>
            </div>
          </div>

          <div className="da-story-intro">
            <div className="da-story-label">WHY THIS PROBLEM?</div>

            <div className="da-story-big">
              A user–movie ratings matrix is extremely sparse. The
              challenge is to discover a much smaller latent
              representation that still captures user preferences.
            </div>

            <p>
              This project compared three matrix-decomposition
              strategies — SVD, CUR and gradient-based PQ
              factorization — to understand the trade-off between
              reconstruction quality and computational cost.
            </p>
          </div>

          <div className="da-three-methods">
            <article>
              <span>01</span>
              <h3>SVD</h3>
              <p>
                Decompose the complete ratings matrix and retain the
                strongest singular directions.
              </p>
              <small>Reference low-rank approximation</small>
            </article>

            <article>
              <span>02</span>
              <h3>CUR</h3>
              <p>
                Approximate the matrix using selected real columns and
                rows, with U derived from the intersection matrix.
              </p>
              <small>Interpretable sampled approximation</small>
            </article>

            <article>
              <span>03</span>
              <h3>PQ</h3>
              <p>
                Learn user and movie latent vectors directly from known
                ratings using gradient descent and regularization.
              </p>
              <small>Predictive collaborative filtering</small>
            </article>
          </div>

          <div className="da-visual-block">
            <div className="da-visual-heading">
              <div>
                <span>LOW-RANK APPROXIMATION</span>
                <h3>What happens as latent dimension increases?</h3>
              </div>

              <p>
                Both plots measure reconstruction loss against the
                number of retained latent factors, but the algorithms
                behave differently.
              </p>
            </div>

            <div className="da-compare">
              <figure className="da-compare-item">
                <div className="da-image-wrap">
                  <img
                    src={`${imageRoot}/06-svd-reconstruction-loss.png`}
                    alt="SVD reconstruction loss by latent factors"
                  />
                </div>

                <figcaption>
                  <strong>SVD.</strong> Reconstruction error decreases
                  smoothly as more singular components are retained.
                </figcaption>
              </figure>

              <figure className="da-compare-item">
                <div className="da-image-wrap">
                  <img
                    src={`${imageRoot}/06-cur-reconstruction-loss.png`}
                    alt="CUR reconstruction loss by latent factors"
                  />
                </div>

                <figcaption>
                  <strong>CUR.</strong> Loss also trends downward but is
                  considerably noisier because the approximation depends
                  on sampled rows and columns.
                </figcaption>
              </figure>
            </div>
          </div>

          <div className="da-build-panel da-pq-panel">
            <div>
              <span>PQ MATRIX FACTORIZATION</span>
              <h3>
                Recommendation requires predicting unseen ratings, not
                only reconstructing the original matrix.
              </h3>
            </div>

            <p>
              The ratings were split 80/20. User and movie latent
              vectors were trained with gradient updates and L2
              regularization on observed ratings, then evaluated on
              held-out entries.
            </p>
          </div>

          <div className="da-result-panel">
            <div>
              <span>RESULT</span>
              <h3>
                More latent capacity improved reconstruction, but the
                experiments exposed a substantial runtime trade-off.
              </h3>
            </div>

            <div className="da-result-stats">
              <div>
                <strong>0.663</strong>
                <span>TRAIN ERROR / ENTRY</span>
              </div>
              <div>
                <strong>0.91</strong>
                <span>TEST ERROR / ENTRY</span>
              </div>
              <div>
                <strong>~1.2 h</strong>
                <span>30 FACTORS / 500 ITERS</span>
              </div>
            </div>
          </div>

          <div className="da-runtime-note">
            A 400-factor model achieved lower loss but required roughly
            two days for 600 iterations — illustrating the practical
            trade-off between latent dimension and training cost.
          </div>

          <div className="da-tech">
            <span>TOOLS / CONCEPTS</span>
            <div>
              {[
                "MovieLens",
                "SVD",
                "CUR",
                "Matrix Factorization",
                "Collaborative Filtering",
                "Gradient Descent",
              ].map((item) => (
                <span className="da-tech-pill" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
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

  if (slug === "data-analytics-projects") {
    return <DataAnalyticsCaseStudy />;
  }

  if (
    slug ===
    "knowledge-graph-reasoning-and-knowledge-graph-based-question-answering"
  ) {
    return <KnowledgeQAResearchCaseStudy />;
  }

  if (hasProjectCaseStudy(slug)) {
    return <ProjectCaseStudy slug={slug} />;
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
