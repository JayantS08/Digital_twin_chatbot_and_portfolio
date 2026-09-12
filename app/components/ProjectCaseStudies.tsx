import { ArrowLeft, ArrowRight } from "lucide-react";

const BASE_PATH = "/Digital_twin_chatbot_and_portfolio";

type CaseStudy = {
  eyebrow: string;
  title: string;
  subtitle: string;
  organization: string;
  period: string;
  problemLead: string;
  problem: string;
  challengeTitle: string;
  challenges: { title: string; text: string }[];
  approachTitle: string;
  approach: string;
  pipeline: string[];
  focusTitle: string;
  focus: { label: string; title: string; text: string }[];
  insight: string;
  technologies: string[];

  visuals?: {
    src: string;
    alt: string;
    caption: string;
  }[];

  impact?: {
    value: string;
    label: string;
  }[];

  patent?: {
    title: string;
    description: string;
  };
};

const studies: Record<string, CaseStudy> = {
  "short-fixing-in-chip-design": {
    eyebrow: "ALGORITHMS · COMPUTATIONAL GEOMETRY · CHIP DESIGN",
    title: "Short Fixing in Chip Design",
    subtitle:
      "Automated rerouting for repairing electrical shorts inside extremely dense multi-layer chip designs.",
    organization: "IBM",
    period: "Aug 2024 – Dec 2024",

    problemLead:
      "Find a clean route through a 3D environment containing millions of geometric obstacles.",

    problem:
      "A short occurs when conductive routing shapes that should remain electrically isolated come into illegal contact. Fixing it is significantly harder than simply moving a wire: the replacement route must preserve connectivity, avoid surrounding geometry and satisfy the physical design rules required for manufacturable routing.",

    challengeTitle: "Why is a local short so difficult to repair?",

    challenges: [
      {
        title: "Massive Geometry",
        text:
          "The routing environment can contain millions of wires, vias, pins and other geometric shapes.",
      },
      {
        title: "Multi-Layer Search",
        text:
          "Routing is a 3D problem. A candidate path can move across metal layers through legal via transitions.",
      },
      {
        title: "Design Rules",
        text:
          "A geometrically connected path is not enough. The resulting wiring must also satisfy design-rule constraints.",
      },
      {
        title: "Minimal Disruption",
        text:
          "A localized repair should solve the violation without unnecessarily disturbing already-clean surrounding routing.",
      },
    ],

    approachTitle: "Localized constrained rerouting",

    approach:
      "The algorithm identifies the affected routing region, analyzes the surrounding geometry and searches for a short, legal replacement path. Instead of treating the complete chip as a new routing problem, the search is focused around the violation while candidate solutions are evaluated against nearby routing constraints.",

    pipeline: [
      "Detect short",
      "Identify affected routing",
      "Build local 3D search region",
      "Analyze surrounding geometry",
      "Search candidate routes",
      "Validate design rules",
      "Commit localized fix",
    ],

    focusTitle: "The routing problem",

    focus: [
      {
        label: "SEARCH",
        title: "Path finding",
        text:
          "Find a connection between the required endpoints while navigating dense surrounding geometry.",
      },
      {
        label: "VALIDATE",
        title: "DRC legality",
        text:
          "Candidate geometry must satisfy the physical constraints of the routing environment.",
      },
      {
        label: "OPTIMIZE",
        title: "Least disruption",
        text:
          "Prefer a compact localized solution rather than unnecessarily changing existing routing.",
      },
    ],

    insight:
      "The shortest geometric path is not necessarily the best routing path. A useful solution must simultaneously balance connectivity, legality and disruption.",

    technologies: [
      "C++",
      "Algorithms",
      "Computational Geometry",
      "Graph Search",
      "Optimization",
      "EDA",
      "Physical Design",
      "Routing",
    ],
  },

  "optimization-in-chip-design-with-routing-quality-checker": {
    eyebrow: "ALGORITHMS · OPTIMIZATION · ROUTING QUALITY",
    title: "Routing Quality Checker",
    subtitle:
      "A high-performance analysis system for identifying inefficient routing patterns and suggesting better routing topologies.",
    organization: "IBM",
    period: "Jan 2025 – Mar 2025",

    problemLead:
      "DRC-clean does not necessarily mean routing-optimal.",

    problem:
      "A route can be electrically connected and design-rule clean while still having poor routing quality. Certain topologies introduce unnecessary routing complexity, inefficient layer usage or structural patterns that can negatively affect the overall quality of the design. The objective was therefore not simply to find illegal geometry, but to detect legal routing that could be improved.",

    challengeTitle: "Quality analysis at chip scale",

    challenges: [
      {
        title: "Millions of Shapes",
        text:
          "The checker operates over very large designs containing millions of routing geometries.",
      },
      {
        title: "3D Routing",
        text:
          "Wires are distributed across many metal layers and connected through vias, making topology inherently three-dimensional.",
      },
      {
        title: "Topology Matters",
        text:
          "Two routes can connect the same terminals while having very different routing quality.",
      },
      {
        title: "Performance Critical",
        text:
          "The checker must identify problematic structures quickly enough to remain practical on large designs.",
      },
    ],

    approachTitle: "Fast topology-aware routing analysis",

    approach:
      "Developed a high-performance checker that analyzes existing routing, identifies suspicious topology patterns and evaluates the local routing context around them. Once a poor structure is detected, the system can suggest a cleaner routing topology rather than only reporting the problem.",

    pipeline: [
      "Large 3D chip design",
      "Fast topology analysis",
      "Detect suspicious patterns",
      "Analyze local context",
      "Generate alternative topology",
      "Validate constraints",
      "Suggest improvement",
    ],

    focusTitle: "Routing patterns targeted",

    focus: [
      {
        label: "PATTERN 01",
        title: "Layer Cheating",
        text:
          "Identify routing that uses an undesirable layer configuration when a cleaner topology is available.",
      },
      {
        label: "PATTERN 02",
        title: "Layer Fuse",
        text:
          "Detect layer-transition structures whose topology can potentially be simplified or replaced by cleaner routing.",
      },
      {
        label: "PATTERN 03",
        title: "Daisy Chaining",
        text:
          "Identify unnecessarily chained routing structures where connectivity can be achieved using a cleaner topology.",
      },
    ],

    insight:
      "The key distinction is that this is not simply a DRC checker. The existing route may already be legal — the system reasons about whether its topology is good.",

    technologies: [
      "C++",
      "Algorithms",
      "Computational Geometry",
      "Optimization",
      "3D Geometry",
      "EDA",
      "Physical Design",
      "Routing",
    ],
  },

  "optimizing-power-consumption-on-smartphones-using-machine-learning": {
    eyebrow: "MACHINE LEARNING · ANDROID · SENSOR DATA",
    title: "Smartphone Power Optimization",
    subtitle:
      "An end-to-end ML prototype for recognizing smartphone usage states from sensor data and supporting smarter screen power-management decisions.",
    organization: "Samsung R&D Institute India",
    period: "Feb 2022 – Apr 2022",

    problemLead:
      "Can the phone understand when it is genuinely idle instead of relying only on a fixed screen timeout?",

    problem:
      "Traditional screen timeout policies primarily depend on elapsed time since the last interaction. The project explored whether physical context captured by smartphone sensors could provide an additional signal for distinguishing active usage from states where the device can reasonably be considered idle.",

    challengeTitle: "The dataset did not already exist",

    challenges: [
      {
        title: "Sensor Collection",
        text:
          "Built an Android application in Java to collect raw measurements directly from smartphone sensors.",
      },
      {
        title: "Multiple Signals",
        text:
          "Captured signals including accelerometer, gyroscope and ambient-light measurements.",
      },
      {
        title: "Different Activities",
        text:
          "Collected examples across activities such as walking, running, scrolling, stationary usage and different phone postures.",
      },
      {
        title: "System Decision",
        text:
          "The prediction needed to represent a useful active-versus-idle state rather than being an isolated ML classification exercise.",
      },
    ],

    approachTitle: "From raw sensors to an ML decision",

    approach:
      "We created the dataset ourselves by developing a mobile application that recorded smartphone sensor streams during different activities and device states. The collected measurements were exported for preprocessing and used to train a classifier that distinguishes active and inactive usage patterns.",

    pipeline: [
      "Java sensor application",
      "Raw sensor streams",
      "Dataset construction",
      "Preprocessing",
      "State classification",
      "Idle-state detection",
      "Screen power decision",
    ],

    focusTitle: "What the system observes",

    focus: [
      {
        label: "MOTION",
        title: "Accelerometer",
        text:
          "Captures changes in device motion and orientation associated with different usage states.",
      },
      {
        label: "ROTATION",
        title: "Gyroscope",
        text:
          "Provides rotational motion signals that help distinguish how the device is being handled.",
      },
      {
        label: "CONTEXT",
        title: "Ambient Light",
        text:
          "Adds environmental context that can complement motion-based sensor measurements.",
      },
    ],

    insight:
      "The important part of the project was the complete ML lifecycle: collecting original data, constructing the dataset, training the classifier and connecting its prediction to a practical system-level decision.",

    technologies: [
      "Java",
      "Android",
      "Python",
      "Machine Learning",
      "Naive Bayes",
      "Sensor Data",
      "Accelerometer",
      "Gyroscope",
      "Ambient Light",
    ],
  },

  "movie-recommendation-system": {
    eyebrow: "MACHINE LEARNING · RECOMMENDER SYSTEMS",
    title: "Movie Recommendation System",
    subtitle:
      "An end-to-end recommendation platform combining content-based recommendation, collaborative filtering and fuzzy search.",
    organization: "Aligarh Muslim University",
    period: "Aug 2021 – Nov 2021",

    problemLead:
      "Help users discover relevant movies without manually searching through an overwhelming catalogue.",

    problem:
      "Recommendation systems must infer preferences from incomplete interaction data. Beyond ranking movies, practical systems must also deal with sparse ratings, limited information for some users or movies and ambiguity when a user searches for a title.",

    challengeTitle: "Three practical recommendation challenges",

    challenges: [
      {
        title: "Sparse Ratings",
        text:
          "Most users rate only a small fraction of available movies, producing a sparse user–item interaction space.",
      },
      {
        title: "Cold Data",
        text:
          "New or rarely rated movies contain limited historical information for collaborative recommendation.",
      },
      {
        title: "Search Ambiguity",
        text:
          "Users may misspell or incompletely specify movie titles, so exact string matching is not sufficient.",
      },
      {
        title: "Personalization",
        text:
          "Recommendations should reflect an individual user's preferences rather than only global movie popularity.",
      },
    ],

    approachTitle: "Two complementary recommendation strategies",

    approach:
      "Built both content-based and collaborative-filtering recommendation components using MovieLens data. Content-based recommendation represented user genre preferences and compared them against movie–genre information, while collaborative filtering used rating interactions and nearest-neighbour search to identify similar items. Fuzzy title matching was added to make movie search more tolerant of spelling errors.",

    pipeline: [
      "MovieLens data",
      "Clean + filter ratings",
      "Build preference representation",
      "Content / collaborative models",
      "Similarity search",
      "Rank candidates",
      "Web recommendations",
    ],

    focusTitle: "Recommendation architecture",

    focus: [
      {
        label: "MODEL 01",
        title: "Content Based",
        text:
          "Genre preferences are represented as a user profile and compared with movie–genre information to rank relevant movies.",
      },
      {
        label: "MODEL 02",
        title: "Collaborative Filtering",
        text:
          "MovieLens rating interactions are used with nearest-neighbour search to find similar movies and generate recommendations.",
      },
      {
        label: "SEARCH",
        title: "Fuzzy Matching",
        text:
          "Approximate title matching improves search when the user enters an incomplete or misspelled movie name.",
      },
    ],

    insight:
      "The project covered the full recommendation pipeline — data preprocessing, sparse interaction handling, multiple recommendation strategies, search and a web interface for delivering the results.",

    technologies: [
      "Python",
      "Machine Learning",
      "MovieLens",
      "Content-Based Filtering",
      "Collaborative Filtering",
      "Nearest Neighbours",
      "Fuzzy Matching",
      "Django",
    ],
  },
  "free-hand-routing": {
    eyebrow: "COMPUTER VISION · GRAPH ALGORITHMS · PHYSICAL DESIGN",

    title: "Free-Hand Routing",

    subtitle:
      "Transforming free-form routing sketches into connected, technology-correct, DRC-clean and manufacturable chip layouts.",

    organization: "IBM",
    period: "2025",

    problemLead:
      "Capture routing intent directly from a sketch instead of manually constructing every piece of physical geometry.",

    problem:
      "Manual routing remains necessary for many small layout experiments, routing unit tests and debug reproductions. Even relatively simple layouts can require significant engineering effort because designers must manually construct technology-aware geometry, maintain connectivity and satisfy physical-design constraints.",

    challengeTitle:
      "How do you transform an imprecise hand-drawn topology into a legal physical layout?",

    challenges: [
      {
        title: "Free-Form Input",
        text:
          "The input is an irregular sketch rather than a precise geometric definition of wires, pins, layers and vias.",
      },
      {
        title: "Technology Rules",
        text:
          "Hand-drawn widths, spacings and intersections do not directly correspond to legal manufacturing geometry.",
      },
      {
        title: "Preserve Intent",
        text:
          "Geometric transformations must preserve the connectivity and routing topology intended by the designer.",
      },
      {
        title: "3D Connectivity",
        text:
          "The final solution must maintain connectivity across multiple routing layers and insert legal via transitions where required.",
      },
    ],

    approachTitle:
      "Sketch → technology-aware layout synthesis",

    approach:
      "Built an end-to-end system that interprets a free-hand routing sketch, extracts geometric shapes and labels, and separately captures connectivity as a graph. The extracted geometry is then mapped to technology-specific width and spacing rules, aligned to legal routing tracks and repaired using the preserved connectivity graph. Broken connections can be restored using local shape expansion, elongation, track shifting and via insertion before the final layout is exported into the existing EDA flow.",

    pipeline: [
      "Free-hand sketch",
      "Detect shapes + labels",
      "Build connectivity graph",
      "Technology mapping",
      "Track alignment",
      "Restore connectivity",
      "Generate legal layout",
    ],

    focusTitle:
      "From informal sketch to manufacturable geometry",

    focus: [
      {
        label: "STAGE 01",
        title: "Sketch Interpretation",
        text:
          "Computer-vision techniques extract shapes from the drawing while OCR identifies semantic information such as routing layers and pin labels.",
      },
      {
        label: "STAGE 02",
        title: "Connectivity Extraction",
        text:
          "Connectivity is represented independently as a graph so the designer's intended topology survives later geometric transformations.",
      },
      {
        label: "STAGE 03",
        title: "Technology Mapping",
        text:
          "Irregular sketch geometry is normalized using technology-specific wire widths, spacing requirements and manufacturing constraints.",
      },
      {
        label: "STAGE 04",
        title: "Track-Aligned Layout Synthesis",
        text:
          "Shapes are moved onto legal routing tracks while the connectivity graph guides elongation, shifting and local geometric repair.",
      },
      {
        label: "STAGE 05",
        title: "3D Connectivity Restoration",
        text:
          "Broken inter-layer connections are detected and vias are inserted to restore complete multi-layer connectivity.",
      },
      {
        label: "STAGE 06",
        title: "EDA Integration",
        text:
          "The resulting wires, pins, blockages and vias are exported through a structured JSON representation for downstream layout and routing tools.",
      },
    ],

    insight:
      "The objective is not to reproduce the sketch pixel-for-pixel. The system preserves the designer's routing topology while transforming an informal drawing into legal physical geometry.",

    visuals: [
      {
        src:
          "/Digital_twin_chatbot_and_portfolio/projects/free-hand-routing/system-architecture.png",
        alt: "Free-Hand Routing system architecture",
        caption:
          "End-to-end architecture for interpreting a sketch and transforming it into a legal physical layout.",
      },
      {
        src:
          "/Digital_twin_chatbot_and_portfolio/projects/free-hand-routing/technology-mapping.png",
        alt: "Technology mapping workflow",
        caption:
          "Sketch geometry is normalized using technology-specific width, spacing and manufacturing constraints.",
      },
      {
        src:
          "/Digital_twin_chatbot_and_portfolio/projects/free-hand-routing/connectivity-aware-synthesis.png",
        alt: "Connectivity-aware layout synthesis",
        caption:
          "The connectivity graph guides track alignment and geometric repair while preserving the intended topology.",
      },
      {
        src:
          "/Digital_twin_chatbot_and_portfolio/projects/free-hand-routing/sketch-to-layout-example-1.png",
        alt: "Sketch to physical layout example",
        caption:
          "A free-hand routing idea transformed into structured physical geometry.",
      },
      {
        src:
          "/Digital_twin_chatbot_and_portfolio/projects/free-hand-routing/sketch-to-layout-example-2.png",
        alt: "Second sketch to physical layout example",
        caption:
          "Another example of converting routing intent into a generated layout.",
      },
      {
        src:
          "/Digital_twin_chatbot_and_portfolio/projects/free-hand-routing/runtime-comparison.png",
        alt: "Free-Hand Routing runtime comparison",
        caption:
          "Comparison between conventional tool-assisted layout creation and the Free-Hand Routing workflow.",
      },
    ],

    impact: [
      {
        value: "2–3 hrs",
        label: "Conventional engineering effort per test case",
      },
      {
        value: "Seconds",
        label: "Layout generation using Free-Hand Routing",
      },
      {
        value: "~200",
        label: "Lines of Python previously required per test case",
      },
      {
        value: "Hundreds",
        label: "Small layouts generated using the workflow",
      },
    ],

    patent: {
      title: "Published Patent — Free-Hand Routing",
      description:
        "The methodology behind Free-Hand Routing was developed as an invention around transforming free-form routing sketches into technology-aware, connectivity-preserving physical layouts.",
    },

    technologies: [
      "C++",
      "OpenCV",
      "OCR",
      "Computer Vision",
      "Graph Algorithms",
      "Computational Geometry",
      "EDA",
      "Physical Design",
      "Routing",
      "JSON",
    ],
  },

};

export function hasProjectCaseStudy(slug: string) {
  return Boolean(studies[slug]);
}

export default function ProjectCaseStudy({ slug }: { slug: string }) {
  const project = studies[slug];

  if (!project) return null;

  return (
    <main className="pcs-page">
      <section className="pcs-hero">
        <div className="container">
          <a className="pcs-back" href={`${BASE_PATH}/#work`}>
            <ArrowLeft size={14} />
            BACK TO SELECTED WORK
          </a>

          <div className="pcs-hero-grid">
            <div>
              <div className="pcs-eyebrow">{project.eyebrow}</div>
              <h1>{project.title}</h1>
            </div>

            <div className="pcs-hero-side">
              <p>{project.subtitle}</p>

              <div className="pcs-meta">
                <div>
                  <span>CONTEXT</span>
                  <strong>{project.organization}</strong>
                </div>

                <div>
                  <span>PERIOD</span>
                  <strong>{project.period}</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pcs-section pcs-problem">
        <div className="container">
          <div className="pcs-section-label">01 / THE PROBLEM</div>

          <div className="pcs-problem-grid">
            <h2>{project.problemLead}</h2>

            <div>
              <p>{project.problem}</p>

              <div className="pcs-callout">
                <span>CORE CHALLENGE</span>
                <strong>{project.challengeTitle}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pcs-section pcs-challenge-section">
        <div className="container">
          <div className="pcs-section-label">02 / WHY IT IS HARD</div>

          <div className="pcs-challenge-grid">
            {project.challenges.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pcs-section pcs-dark pcs-approach-section">
        <div className="container">
          <div className="pcs-section-label">03 / THE APPROACH</div>

          <div className="pcs-approach-hero">
            <div className="pcs-approach-kicker">WHAT I BUILT</div>

            <h2>{project.approachTitle}</h2>

            <p>{project.approach}</p>
          </div>

          <div className="pcs-approach-divider" />

          <div className="pcs-approach-flow-heading">
            <span>HOW THE SYSTEM WORKS</span>
            <strong>
              From problem detection to a validated solution.
            </strong>
          </div>

          <div className="pcs-pipeline pcs-pipeline-emphasis">
            {project.pipeline.map((step, index) => (
              <div className="pcs-pipeline-item" key={step}>
                <div>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{step}</strong>
                </div>

                {index < project.pipeline.length - 1 && (
                  <ArrowRight className="pcs-pipeline-arrow" size={18} />
                )}
              </div>
            ))}
          </div>

          <div className="pcs-approach-principle">
            <span>DESIGN PRINCIPLE</span>
            <p>{project.insight}</p>
          </div>
        </div>
      </section>

      <section className="pcs-section">
        <div className="container">
          <div className="pcs-section-label">04 / DEEP DIVE</div>

          <div className="pcs-focus-heading">
            <h2>{project.focusTitle}</h2>
          </div>

          <div className="pcs-focus-grid">
            {project.focus.map((item) => (
              <article key={item.title}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="pcs-insight">
        <div className="container">
          <span>KEY ENGINEERING INSIGHT</span>
          <p>{project.insight}</p>
        </div>
      </section>

      {project.visuals && (
        <section className="pcs-section pcs-visual-section">
          <div className="container">
            <div className="pcs-section-label">
              05 / SYSTEM IN ACTION
            </div>

            <div className="pcs-visual-intro">
              <h2>From sketch to physical layout.</h2>

              <p>
                Routing intent is progressively interpreted, mapped to
                technology rules and reconstructed as connected legal
                physical geometry.
              </p>
            </div>

            <div className="pcs-visual-grid">
              {project.visuals.map((visual, index) => (
                <figure
                  className={
                    index < 3
                      ? "pcs-visual-card pcs-visual-card-large"
                      : "pcs-visual-card"
                  }
                  key={visual.src}
                >
                  <div className="pcs-visual-image">
                    <img
                      src={visual.src}
                      alt={visual.alt}
                      loading="lazy"
                    />
                  </div>

                  <figcaption>
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p>{visual.caption}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.impact && (
        <section className="pcs-section pcs-impact-section">
          <div className="container">
            <div className="pcs-section-label">
              06 / IMPACT
            </div>

            <div className="pcs-impact-heading">
              <h2>
                From hours of manual construction to seconds
                of layout generation.
              </h2>
            </div>

            <div className="pcs-impact-grid">
              {project.impact.map((item) => (
                <article key={item.label}>
                  <strong>{item.value}</strong>
                  <p>{item.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {project.patent && (
        <section className="pcs-patent-section">
          <div className="container">
            <div className="pcs-patent-card">
              <div>
                <span className="pcs-patent-label">
                  INTELLECTUAL PROPERTY
                </span>

                <h2>{project.patent.title}</h2>
              </div>

              <p>{project.patent.description}</p>
            </div>
          </div>
        </section>
      )}

      <section className="pcs-tech-section">
        <div className="container">
          <span>TOOLS / CONCEPTS</span>

          <div className="pcs-tech">
            {project.technologies.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
