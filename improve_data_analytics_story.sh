#!/bin/bash

set -e

FILE="app/projects/[slug]/page.tsx"
CSS="app/globals.css"

cp "$FILE" "${FILE}.before_story_update"
cp "$CSS" "${CSS}.before_story_update"

python3 - <<'PY'
from pathlib import Path

p = Path("app/projects/[slug]/page.tsx")
text = p.read_text()

start = text.find("function DataAnalyticsCaseStudy() {")
end = text.find("export function generateStaticParams()")

if start == -1 or end == -1:
    raise SystemExit("Could not locate DataAnalyticsCaseStudy() or generateStaticParams().")

component = r'''function DataAnalyticsCaseStudy() {
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
                  alt="Observ</div>
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

'''

new_text = text[:start] + component + "\n" + text[end:]
p.write_text(new_text)

print("✓ Replaced DataAnalyticsCaseStudy()")
PY

# Remove prior story CSS if script is re-run.
python3 - <<'PY'
from pathlib import Path

p = Path("app/globals.css")
text = p.read_text()

start_marker = "/* ===== DATA ANALYTICS STORY PASS START ===== */"
end_marker = "/* ===== DATA ANALYTICS STORY PASS END ===== */"

if start_marker in text and end_marker in text:
    before = text.split(start_marker)[0]
    after = text.split(end_marker, 1)[1]
    text = before.rstrip() + "\n" + after.lstrip()

p.write_text(text)
PY

cat >> app/globals.css <<'EOF'

/* ===== DATA ANALYTICS STORY PASS START ===== */

.da-story-intro {
  display: grid;
  grid-template-columns: 180px minmax(0, 1.25fr) minmax(260px, .65fr);
  gap: 42px;
  align-items: start;
  margin-bottom: 64px;
  padding-top: 28px;
  border-top: 1px solid var(--text);
}

.da-story-label,
.da-build-panel span,
.da-method-copy > span,
.da-visual-heading span,
.da-read-visual > span,
.da-result-panel > div > span,
.da-two-methods article > span,
.da-comparison-note > span,
.da-three-methods article > span,
.da-control-card > span {
  color: var(--muted-2);
  font: 9px "DM Mono", monospace;
  letter-spacing: .11em;
}

.da-story-big {
  max-width: 760px;
  font-size: clamp(25px, 2.8vw, 39px);
  line-height: 1.18;
  letter-spacing: -.035em;
}

.da-story-intro > p {
  margin: 2px 0 0;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.75;
}

.da-build-panel {
  display: grid;
  grid-template-columns: 1fr .75fr;
  gap: 72px;
  padding: 42px;
  margin: 0 0 62px;
  background: #11110f;
  color: white;
}

.da-build-panel h3 {
  max-width: 720px;
  margin: 14px 0 0;
  font-size: clamp(25px, 3vw, 40px);
  line-height: 1.12;
  letter-spacing: -.035em;
}

.da-build-panel p {
  align-self: end;
  margin: 0;
  color: #aaa9a0;
  line-height: 1.75;
  font-size: 14px;
}

.da-method-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 80px;
  margin: 68px 0;
}

.da-method-copy p {
  max-width: 720px;
  margin: 17px 0 0;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.8;
}

.da-equation {
  max-width: 620px;
  margin: 28px 0;
  padding: 22px 24px;
  border-left: 3px solid var(--accent);
  background: #fff;
  font: 18px "DM Mono", monospace;
  letter-spacing: -.03em;
}

.da-pipeline {
  padding-left: 28px;
  border-left: 1px solid var(--line);
}

.da-pipeline div {
  padding: 12px 16px;
  border: 1px solid var(--line);
  background: #fff;
  font-size: 12px;
}

.da-pipeline > span {
  display: block;
  padding: 6px 0 6px 16px;
  color: var(--muted-2);
  font-size: 12px;
}

.da-visual-block {
  margin-top: 78px;
  padding-top: 34px;
  border-top: 1px solid var(--text);
}

.da-visual-heading {
  display: grid;
  grid-template-columns: 1fr .65fr;
  gap: 60px;
  align-items: end;
  margin-bottom: 34px;
}

.da-visual-heading h3 {
  margin: 11px 0 0;
  font-size: clamp(28px, 3.4vw, 46px);
  line-height: 1.08;
  letter-spacing: -.04em;
}

.da-visual-heading > p {
  margin: 0;
  color: var(--muted);
  font-size: 13px;
  line-height: 1.7;
}

.da-explained-figure {
  width: min(78%, 950px);
  margin: 0 auto;
}

.da-figure-medium {
  width: min(62%, 740px);
}

.da-explained-figure .da-image-wrap {
  padding: 22px;
}

.da-explained-figure img {
  max-height: 620px;
}

.da-explained-figure figcaption {
  margin-top: 11px;
  color: var(--muted);
  text-align: center;
  font-size: 11px;
}

.da-read-visual {
  max-width: 900px;
  margin: 34px auto 0;
  padding: 26px 0 0;
  border-top: 1px solid var(--line);
}

.da-read-grid {
  display: grid;
  grid-template-columns: .6fr .8fr 1.6fr;
  gap: 0;
  margin-top: 20px;
}

.da-read-grid > div {
  padding: 0 24px;
  border-right: 1px solid var(--line);
}

.da-read-grid > div:first-child {
  padding-left: 0;
}

.da-read-grid > div:last-child {
  padding-right: 0;
  border-right: 0;
}

.da-read-grid strong {
  display: block;
  margin-bottom: 6px;
  font: 11px "DM Mono", monospace;
}

.da-read-grid p,
.da-interpretation {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.7;
}

.da-interpretation {
  margin: 27px 0 0;
  padding: 20px 22px;
  background: #efefe9;
}

.da-result-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 70px;
  margin-top: 68px;
  padding: 36px 0;
  border-top: 1px solid var(--text);
  border-bottom: 1px solid var(--line);
}

.da-result-panel h3 {
  max-width: 700px;
  margin: 13px 0 0;
  font-size: clamp(23px, 2.6vw, 35px);
  line-height: 1.2;
  letter-spacing: -.03em;
}

.da-result-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: end;
}

.da-result-stats > div {
  min-height: 76px;
  padding: 7px 18px;
  border-left: 1px solid var(--line);
}

.da-result-stats strong {
  display: block;
  margin-bottom: 8px;
  font-size: 19px;
  letter-spacing: -.025em;
}

.da-result-stats span {
  color: var(--muted-2);
  font: 8px "DM Mono", monospace;
  letter-spacing: .08em;
}

.da-two-methods,
.da-three-methods {
  display: grid;
  gap: 1px;
  margin: 64px 0;
  background: var(--line);
  border: 1px solid var(--line);
}

.da-two-methods {
  grid-template-columns: repeat(2, 1fr);
}

.da-three-methods {
  grid-template-columns: repeat(3, 1fr);
}

.da-two-methods article,
.da-three-methods article {
  padding: 34px;
  background: white;
}

.da-two-methods h3,
.da-three-methods h3 {
  margin: 13px 0;
  font-size: 25px;
}

.da-two-methods p,
.da-three-methods p {
  color: var(--muted);
  font-size: 13px;
  line-height: 1.7;
}

.da-three-methods small {
  display: block;
  margin-top: 24px;
  padding-top: 15px;
  border-top: 1px solid var(--line);
  color: var(--muted-2);
  font: 8px "DM Mono", monospace;
}

.da-process-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 13px;
  align-items: center;
  padding: 21px 0;
  margin-bottom: 55px;
  border-top: 1px solid var(--text);
  border-bottom: 1px solid var(--line);
}

.da-process-strip > span {
  margin-right: 12px;
  color: var(--muted-2);
  font: 8px "DM Mono", monospace;
}

.da-process-strip strong {
  font-size: 12px;
  font-weight: 500;
}

.da-process-strip b {
  color: var(--accent);
  font-weight: 400;
}

.da-community-visuals {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 34px;
}

.da-community-visuals figure {
  margin: 0;
}

.da-community-main {
  grid-column: 1 / -1;
}

.da-community-visuals .da-image-wrap {
  min-height: 320px;
}

.da-community-main .da-image-wrap {
  min-height: 520px;
}

.da-community-visuals img {
  max-height: 590px;
}

.da-community-visuals figcaption {
  margin-top: 13px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.6;
}

.da-community-visuals figcaption strong {
  color: var(--text);
}

.da-comparison-note {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 40px;
  margin-top: 50px;
  padding: 28px 0;
  border-top: 1px solid var(--line);
}

.da-comparison-note p {
  max-width: 820px;
  margin: 0;
  color: var(--muted);
  font-size: 15px;
  line-height: 1.8;
}

.da-process-flow {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  margin: 65px 0;
  background: var(--line);
  border: 1px solid var(--line);
}

.da-process-flow > div {
  padding: 28px;
  background: white;
}

.da-process-flow strong {
  display: block;
  color: var(--accent);
  font: 9px "DM Mono", monospace;
}

.da-process-flow span {
  display: block;
  margin-top: 13px;
  font-size: 16px;
  font-weight: 600;
}

.da-process-flow p {
  margin: 8px 0 0;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.6;
}

.da-seirv {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 17px;
  margin: 60px 0;
}

.da-seirv > div {
  min-width: 120px;
  padding: 22px 16px;
  border: 1px solid var(--line);
  background: white;
  text-align: center;
}

.da-seirv strong {
  display: block;
  font-size: 27px;
}

.da-seirv span {
  color: var(--muted);
  font: 8px "DM Mono", monospace;
}

.da-seirv b {
  color: var(--accent);
}

.da-seirv .da-vaccine-node {
  margin-left: 28px;
  border-style: dashed;
}

.da-control-card {
  border: 1px solid var(--line);
  background: white;
}

.da-control-card > span {
  display: block;
  padding: 16px;
  border-bottom: 1px solid var(--line);
}

.da-control-card > div {
  display: grid;
  grid-template-columns: 1fr 70px;
  padding: 12px 16px;
  border-bottom: 1px solid var(--line);
}

.da-control-card > div:last-child {
  border-bottom: 0;
}

.da-control-card strong {
  font-size: 12px;
}

.da-control-card p {
  margin: 0;
  text-align: right;
  font: 11px "DM Mono", monospace;
}

.da-compare {
  align-items: start;
}

.da-compare-item {
  margin: 0;
}

.da-compare-item .da-image-wrap {
  min-height: 0;
  aspect-ratio: 1.25 / 1;
}

.da-compare-item img {
  max-height: 470px;
}

.da-compare-item figcaption {
  margin-top: 14px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.6;
}

.da-compare-item figcaption strong {
  color: var(--text);
}

.da-pq-panel {
  margin-top: 70px;
}

.da-runtime-note {
  margin-top: 22px;
  padding-left: 18px;
  border-left: 2px solid var(--accent);
  color: var(--muted);
  font-size: 13px;
  line-height: 1.7;
}

@media (max-width: 950px) {
  .da-story-intro {
    grid-template-columns: 120px 1fr;
  }

  .da-story-intro > p {
    grid-column: 2;
  }

  .da-build-panel,
  .da-method-layout,
  .da-visual-heading,
  .da-result-panel {
    grid-template-columns: 1fr;
    gap: 35px;
  }

  .da-pipeline {
    padding-left: 0;
    border-left: 0;
  }

  .da-three-methods {
    grid-template-columns: 1fr;
  }

  .da-result-stats {
    max-width: 700px;
  }

  .da-explained-figure,
  .da-figure-medium {
    width: 100%;
  }
}

@media (max-width: 700px) {
  .da-story-intro {
    grid-template-columns: 1fr;
    gap: 19px;
  }

  .da-story-intro > p {
    grid-column: auto;
  }

  .da-build-panel {
    padding: 27px;
  }

  .da-two-methods,
  .da-process-flow,
  .da-community-visuals {
    grid-template-columns: 1fr;
  }

  .da-community-main {
    grid-column: auto;
  }

  .da-community-main .da-image-wrap,
  .da-community-visuals .da-image-wrap {
    min-height: 0;
  }

  .da-read-grid {
    grid-template-columns: 1fr;
  }

  .da-read-grid > div,
  .da-read-grid > div:first-child,
  .da-read-grid > div:last-child {
    padding: 14px 0;
    border-right: 0;
    border-bottom: 1px solid var(--line);
  }

  .da-result-stats {
    grid-template-columns: 1fr;
  }

  .da-result-stats > div {
    min-height: 0;
    padding: 15px 0;
    border-left: 0;
    border-bottom: 1px solid var(--line);
  }

  .da-comparison-note {
    grid-template-columns: 1fr;
    gap: 16px;
  }

  .da-seirv {
    display: grid;
    grid-template-columns: 1fr 28px 1fr;
  }

  .da-seirv .da-vaccine-node {
    margin-left: 0;
  }
}

/* ===== DATA ANALYTICS STORY PASS END ===== */

EOF

echo ""
echo "✓ Data Analytics story redesign applied."
echo ""
echo "Run:"
echo "  rm -rf .next out"
echo "  npm run build"
