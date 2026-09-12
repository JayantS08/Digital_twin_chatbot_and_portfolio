#!/bin/bash

set -e

BACKUP_DIR="data_analytics_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

cp app/projects/[slug]/page.tsx "$BACKUP_DIR/page.tsx"
cp app/globals.css "$BACKUP_DIR/globals.css"

echo "Backup created at: $BACKUP_DIR"

python3 - <<'PY'
from pathlib import Path

page = Path("app/projects/[slug]/page.tsx")
text = page.read_text()

# ------------------------------------------------------------
# 1. Add BASE_PATH + custom Data Analytics component
# ------------------------------------------------------------

insert_before = "export function generateStaticParams()"

custom_component = r'''
const BASE_PATH = "/Digital_twin_chatbot_and_portfolio";

function DataAnalyticsCaseStudy() {
  const projects = [
    {
      number: "01",
      eyebrow: "CRICKET ANALYTICS · OPTIMIZATION",
      title: "Duckworth–Lewis Cricket Resource Modelling",
      problem:
        "Model the scoring resources available to an ODI batting side as overs decrease and wickets are lost.",
      data:
        "Ball-by-ball ODI data from 1999–2011, filtered to first innings and cleaned before modelling.",
      method:
        "Fit exponential resource curves for individual wicket states, then jointly optimize ten wicket-level parameters with a shared decay parameter using L-BFGS-B.",
      takeaway:
        "The fitted family of curves captures the expected decline in scoring resources as overs run out and wickets fall.",
      metrics: [
        ["10", "WICKET LEVELS"],
        ["7.96", "SHARED L"],
        ["L-BFGS-B", "OPTIMIZER"],
      ],
      image: "01-dls-resource-curves.png",
      imageAlt: "Duckworth Lewis fitted resource curves",
      figureLabel: "Resources Remaining (%) vs Overs To Go",
      technologies: [
        "Python",
        "Statistics",
        "Optimization",
        "Regression",
        "Data Analysis",
      ],
    },

    {
      number: "02",
      eyebrow: "SCIENTIFIC COMPUTING · OPTIMIZATION",
      title: "Mars Orbit Reconstruction",
      problem:
        "Reconstruct a Kepler-style geometric model of Mars using historical opposition observations.",
      data:
        "Twelve historical Mars opposition observations containing time and angular-position information.",
      method:
        "Estimate orbit radius, equant geometry and angular motion through coordinate-wise search followed by Nelder–Mead optimization.",
      takeaway:
        "A compact geometric model reproduced the observed opposition angles with a maximum angular error of roughly 0.073°.",
      metrics: [
        ["8.17", "ORBIT RADIUS"],
        ["0.524°/day", "ANGULAR MOTION"],
        ["0.073°", "MAX ERROR"],
      ],
      image: "02-mars-orbit.png",
      imageAlt: "Mars orbit reconstruction geometry",
      figureLabel: "Geometric reconstruction of the Mars orbit model",
      technologies: [
        "Python",
        "Numerical Optimization",
        "Scientific Computing",
        "Geometry",
      ],
    },

    {
      number: "03",
      eyebrow: "GRAPH MACHINE LEARNING · NETWORK ANALYSIS",
      title: "Community Detection in Graphs",
      problem:
        "Discover meaningful community structure in large social and trust networks using graph-partitioning algorithms.",
      data:
        "Facebook ego-network data and the Bitcoin-OTC trust network.",
      method:
        "Implemented recursive spectral clustering using the Fiedler vector and compared it with Louvain modularity optimization.",
      takeaway:
        "Spectral methods expose graph partitions through eigenstructure, while Louvain efficiently discovers modular communities through local optimization.",
      metrics: [
        ["8", "FACEBOOK COMMUNITIES"],
        ["5", "BITCOIN COMMUNITIES"],
        ["2", "ALGORITHMS"],
      ],
      gallery: [
        {
          image: "03-facebook-spectral-8-community.png",
          label: "Facebook — recursive spectral partitioning",
        },
        {
          image: "03-louvain-community.png",
          label: "Louvain community detection",
        },
        {
          image: "03-facebook-fiedler-vector.png",
          label: "Fiedler vector",
        },
        {
          image: "03-bitcoin-spectral-5-community.png",
          label: "Bitcoin OTC — spectral communities",
        },
      ],
      technologies: [
        "Graph Algorithms",
        "Spectral Clustering",
        "Louvain",
        "Linear Algebra",
        "Network Analysis",
      ],
    },

    {
      number: "04",
      eyebrow: "BIOINFORMATICS · STRING ALGORITHMS",
      title: "Genomic Read Alignment for Colour-Blindness Diagnosis",
      problem:
        "Align short genomic reads against highly similar red and green opsin genes and infer the most likely gene configuration.",
      data:
        "Reference genome sequences, genomic reads and exon ranges for six red and six green gene regions.",
      method:
        "Built FM-index structures from the Burrows–Wheeler Transform and performed backward read matching with up to two mismatches, including reverse complements.",
      takeaway:
        "Observed exon ratios were compared against canonical configurations, with configuration 2 providing the closest match.",
      metrics: [
        ["2", "MAX MISMATCHES"],
        ["4", "EXON RATIOS"],
        ["#2", "BEST CONFIGURATION"],
      ],
      image: "04-genomic-configuration-comparison.png",
      imageAlt: "Genomic configuration comparison",
      figureLabel: "Observed exon ratios compared with candidate configurations",
      technologies: [
        "Bioinformatics",
        "FM-index",
        "BWT",
        "String Matching",
        "Python",
      ],
    },

    {
      number: "05",
      eyebrow: "EPIDEMIC MODELLING · CONTROL SYSTEMS",
      title: "COVID-19 SEIRV Epidemic Modelling & Control",
      problem:
        "Model epidemic dynamics and investigate how adaptive intervention policies influence the spread of COVID-19.",
      data:
        "Daily confirmed cases, testing and first-dose vaccination data beginning March 2021.",
      method:
        "Fit a SEIRV compartment model and evaluate both open-loop transmission scaling and a closed-loop policy that adapts transmission according to case thresholds.",
      takeaway:
        "The closed-loop strategy responds dynamically to infection levels and produces a substantially flatter epidemic trajectory.",
      metrics: [
        ["70M", "POPULATION"],
        ["0.66", "VACCINE EFFICACY"],
        ["4", "CONTROL LEVELS"],
      ],
      compare: [
        {
          image: "05-covid-open-loop.png",
          label: "Open-loop simulation",
        },
        {
          image: "05-covid-closed-loop.png",
          label: "Closed-loop adaptive policy",
        },
      ],
      technologies: [
        "SEIRV",
        "Time Series",
        "Optimization",
        "Control Systems",
        "Python",
      ],
    },

    {
      number: "06",
      eyebrow: "RECOMMENDER SYSTEMS · MATRIX FACTORIZATION",
      title: "Movie Recommendation System",
      problem:
        "Compare matrix-decomposition approaches for reconstructing sparse user–movie rating matrices.",
      data:
        "MovieLens ml-latest-small user-rating dataset with an 80/20 train-test split.",
      method:
        "Evaluated full SVD, CUR decomposition and SGD-based latent-factor matrix factorization using reconstruction and prediction error.",
      takeaway:
        "Latent-factor methods provide a compact representation of user preferences while exposing the trade-off between model size, runtime and prediction accuracy.",
      metrics: [
        ["30", "LATENT FACTORS"],
        ["500", "ITERATIONS"],
        ["0.91", "TEST ERROR"],
      ],
      compare: [
        {
          image: "06-svd-reconstruction-loss.png",
          label: "SVD reconstruction loss",
        },
        {
          image: "06-cur-reconstruction-loss.png",
          label: "CUR reconstruction loss",
        },
      ],
      technologies: [
        "Recommendation Systems",
        "SVD",
        "CUR",
        "Matrix Factorization",
        "Machine Learning",
      ],
    },
  ];

  const imageRoot = `${BASE_PATH}/projects/data-analytics`;

  return (
    <main className="da-page">
      <section className="da-hero">
        <div className="container">
          <a className="da-back" href={`${BASE_PATH}/`}>
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
                Six applied projects spanning statistical modelling,
                numerical optimization, graph algorithms, bioinformatics,
                epidemic simulation and recommender systems.
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
                  <span>CONTEXT</span>
                  <strong>IISc Bangalore</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="da-index-section">
        <div className="container">
          <div className="da-index">
            {projects.map((project) => (
              <a
                href={`#da-project-${project.number}`}
                key={project.number}
              >
                <span>{project.number}</span>
                <strong>{project.title}</strong>
                <span>↘</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {projects.map((project) => (
        <section
          className="da-project"
          id={`da-project-${project.number}`}
          key={project.number}
        >
          <div className="container">
            <div className="da-project-heading">
              <div className="da-project-number">
                {project.number}
              </div>

              <div>
                <div className="da-eyebrow">
                  {project.eyebrow}
                </div>

                <h2>{project.title}</h2>
              </div>
            </div>

            <div className="da-overview-grid">
              <div className="da-overview-block">
                <span>PROBLEM</span>
                <p>{project.problem}</p>
              </div>

              <div className="da-overview-block">
                <span>DATA</span>
                <p>{project.data}</p>
              </div>

              <div className="da-overview-block da-method">
                <span>METHOD</span>
                <p>{project.method}</p>
              </div>
            </div>

            {"image" in project && project.image && (
              <figure className="da-figure da-figure-large">
                <div className="da-image-wrap">
                  <img
                    src={`${imageRoot}/${project.image}`}
                    alt={project.imageAlt}
                  />
                </div>

                <figcaption>
                  <span>FIGURE {project.number}</span>
                  {project.figureLabel}
                </figcaption>
              </figure>
            )}

            {"gallery" in project && project.gallery && (
              <div className="da-gallery">
                {project.gallery.map((item, index) => (
                  <figure
                    className={
                      index === 0
                        ? "da-gallery-item da-gallery-primary"
                        : "da-gallery-item"
                    }
                    key={item.image}
                  >
                    <div className="da-image-wrap">
                      <img
                        src={`${imageRoot}/${item.image}`}
                        alt={item.label}
                      />
                    </div>

                    <figcaption>
                      {item.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}

            {"compare" in project && project.compare && (
              <div className="da-compare">
                {project.compare.map((item) => (
                  <figure
                    className="da-compare-item"
                    key={item.image}
                  >
                    <div className="da-image-wrap">
                      <img
                        src={`${imageRoot}/${item.image}`}
                        alt={item.label}
                      />
                    </div>

                    <figcaption>
                      {item.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}

            <div className="da-results">
              <div className="da-takeaway">
                <span>KEY TAKEAWAY</span>
                <p>{project.takeaway}</p>
              </div>

              <div className="da-metrics">
                {project.metrics.map(([value, label]) => (
                  <div className="da-metric" key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="da-tech">
              <span>TOOLS / CONCEPTS</span>

              <div>
                {project.technologies.map((technology) => (
                  <span
                    className="da-tech-pill"
                    key={technology}
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}

'''

if "function DataAnalyticsCaseStudy()" not in text:
    text = text.replace(insert_before, custom_component + "\n" + insert_before)

# ------------------------------------------------------------
# 2. Add special rendering before generic return
# ------------------------------------------------------------

needle = """  if (!project) {
    notFound();
  }
"""

replacement = """  if (!project) {
    notFound();
  }

  if (slug === "data-analytics-projects") {
    return <DataAnalyticsCaseStudy />;
  }
"""

if 'slug === "data-analytics-projects"' not in text:
    text = text.replace(needle, replacement)

page.write_text(text)
print("Updated Data Analytics case-study rendering.")
PY

cat >> app/globals.css <<'EOF'

/* =========================================================
   DATA ANALYTICS CASE STUDY
   ========================================================= */

.da-page {
  background: #f7f7f4;
  color: #11110f;
}

.da-hero {
  padding: 140px 0 90px;
  border-bottom: 1px solid var(--line);
  background:
    linear-gradient(rgba(17,17,15,.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(17,17,15,.035) 1px, transparent 1px);
  background-size: 74px 74px;
}

.da-back {
  display: inline-flex;
  margin-bottom: 62px;
  color: var(--muted);
  font: 10px "DM Mono", monospace;
  letter-spacing: .1em;
}

.da-back:hover {
  color: var(--text);
}

.da-hero-grid {
  display: grid;
  grid-template-columns: 1.25fr .75fr;
  gap: 100px;
  align-items: end;
}

.da-kicker,
.da-eyebrow,
.da-overview-block > span,
.da-takeaway > span,
.da-tech > span,
.da-metric span {
  font-family: "DM Mono", monospace;
}

.da-kicker {
  margin-bottom: 20px;
  color: var(--muted-2);
  font-size: 10px;
  letter-spacing: .12em;
}

.da-hero h1 {
  margin: 0;
  font-size: clamp(76px, 9vw, 130px);
  line-height: .82;
  letter-spacing: -.075em;
}

.da-hero h1 em {
  font-family: "Playfair Display", serif;
  font-weight: 500;
}

.da-hero-copy > p {
  margin: 0;
  color: var(--muted);
  font-size: 16px;
  line-height: 1.8;
}

.da-hero-meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: 34px;
  border-top: 1px solid var(--line-dark);
}

.da-hero-meta div {
  padding: 16px 14px 0 0;
}

.da-hero-meta span {
  display: block;
  margin-bottom: 8px;
  color: var(--muted-2);
  font: 8px "DM Mono", monospace;
}

.da-hero-meta strong {
  font-size: 11px;
  font-weight: 500;
}

.da-index-section {
  padding: 0;
  background: #11110f;
  color: #fff;
}

.da-index a {
  display: grid;
  grid-template-columns: 50px 1fr auto;
  gap: 20px;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #30302d;
}

.da-index a:last-child {
  border-bottom: 0;
}

.da-index span {
  color: #818178;
  font: 9px "DM Mono", monospace;
}

.da-index strong {
  font-size: 14px;
  font-weight: 500;
}

.da-index a:hover strong {
  color: var(--accent);
}

.da-project {
  padding: 120px 0;
  border-bottom: 1px solid var(--line);
}

.da-project:nth-of-type(even) {
  background: #fff;
}

.da-project-heading {
  display: grid;
  grid-template-columns: 85px 1fr;
  gap: 30px;
  align-items: start;
  margin-bottom: 65px;
}

.da-project-number {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line-dark);
  border-radius: 50%;
  font: 11px "DM Mono", monospace;
}

.da-eyebrow {
  margin-bottom: 14px;
  color: var(--accent);
  font-size: 9px;
  letter-spacing: .11em;
}

.da-project h2 {
  max-width: 920px;
  margin: 0;
  font-size: clamp(42px, 5vw, 70px);
  line-height: .95;
  letter-spacing: -.055em;
}

.da-overview-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border-top: 1px solid var(--text);
  border-bottom: 1px solid var(--line);
}

.da-overview-block {
  padding: 27px 32px 30px 0;
  border-right: 1px solid var(--line);
}

.da-overview-block:nth-child(2) {
  padding-left: 32px;
  border-right: 0;
}

.da-overview-block.da-method {
  grid-column: 1 / -1;
  padding-left: 0;
  border-top: 1px solid var(--line);
  border-right: 0;
}

.da-overview-block > span,
.da-takeaway > span,
.da-tech > span {
  color: var(--muted-2);
  font-size: 9px;
  letter-spacing: .1em;
}

.da-overview-block p {
  max-width: 700px;
  margin: 14px 0 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.75;
}

.da-figure {
  margin: 70px 0 0;
}

.da-image-wrap {
  display: grid;
  place-items: center;
  overflow: hidden;
  padding: 28px;
  border: 1px solid var(--line);
  background: #fff;
}

.da-image-wrap img {
  display: block;
  max-width: 100%;
  height: auto;
}

.da-figure-large .da-image-wrap img {
  max-height: 680px;
}

.da-figure figcaption,
.da-gallery figcaption,
.da-compare figcaption {
  margin-top: 11px;
  color: var(--muted);
  font-size: 11px;
}

.da-figure figcaption span {
  margin-right: 16px;
  color: var(--text);
  font: 9px "DM Mono", monospace;
}

.da-gallery {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
  margin-top: 70px;
}

.da-gallery-primary {
  grid-column: 1 / -1;
}

.da-gallery-primary .da-image-wrap img {
  max-height: 720px;
}

.da-gallery-item .da-image-wrap {
  min-height: 320px;
}

.da-compare {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
  margin-top: 70px;
}

.da-compare-item .da-image-wrap {
  min-height: 420px;
}

.da-results {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  margin-top: 75px;
  padding-top: 38px;
  border-top: 1px solid var(--text);
}

.da-takeaway p {
  max-width: 680px;
  margin: 16px 0 0;
  font-size: clamp(22px, 2.5vw, 34px);
  line-height: 1.25;
  letter-spacing: -.035em;
}

.da-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-self: end;
}

.da-metric {
  padding: 8px 20px 8px 0;
  border-right: 1px solid var(--line);
}

.da-metric:not(:first-child) {
  padding-left: 20px;
}

.da-metric:last-child {
  border-right: 0;
}

.da-metric strong {
  display: block;
  margin-bottom: 9px;
  font-size: 22px;
  letter-spacing: -.035em;
}

.da-metric span {
  color: var(--muted-2);
  font-size: 8px;
  letter-spacing: .08em;
}

.da-tech {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 24px;
  align-items: start;
  margin-top: 55px;
  padding-top: 24px;
  border-top: 1px solid var(--line);
}

.da-tech > div {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.da-tech-pill {
  padding: 7px 10px;
  border: 1px solid var(--line);
  border-radius: 999px;
  color: var(--muted);
  background: rgba(255,255,255,.55);
  font: 9px "DM Mono", monospace;
}

@media (max-width: 900px) {
  .da-hero-grid,
  .da-results {
    grid-template-columns: 1fr;
    gap: 45px;
  }

  .da-project-heading {
    grid-template-columns: 60px 1fr;
  }

  .da-compare {
    grid-template-columns: 1fr;
  }

  .da-metrics {
    max-width: 620px;
  }
}

@media (max-width: 700px) {
  .da-hero {
    padding: 110px 0 70px;
  }

  .da-back {
    margin-bottom: 40px;
  }

  .da-hero h1 {
    font-size: 17vw;
  }

  .da-hero-meta {
    grid-template-columns: 1fr;
  }

  .da-hero-meta div {
    padding: 12px 0;
    border-bottom: 1px solid var(--line);
  }

  .da-index a {
    grid-template-columns: 38px 1fr auto;
  }

  .da-project {
    padding: 80px 0;
  }

  .da-project-heading {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 45px;
  }

  .da-project-number {
    width: 42px;
    height: 42px;
  }

  .da-project h2 {
    font-size: 12vw;
  }

  .da-overview-grid {
    grid-template-columns: 1fr;
  }

  .da-overview-block,
  .da-overview-block:nth-child(2),
  .da-overview-block.da-method {
    grid-column: auto;
    padding: 24px 0;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .da-gallery {
    grid-template-columns: 1fr;
    gap: 22px;
    margin-top:mary {
    grid-column: auto;
  }

  .da-gallery-item .da-image-wrap,
  .da-compare-item .da-image-wrap {
    min-height: 0;
  }

  .da-image-wrap {
    padding: 16px;
  }

  .da-results {
    margin-top: 55px;
  }

  .da-metrics {
    grid-template-columns: 1fr;
  }

  .da-metric,
  .da-metric:not(:first-child) {
    padding: 15px 0;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .da-tech {
    grid-template-columns: 1fr;
  }
}

EOF

echo ""
echo "Data Analytics redesign applied."
echo ""
echo "Now run:"
echo "  rm -rf .next out"
echo "  npm run build"
