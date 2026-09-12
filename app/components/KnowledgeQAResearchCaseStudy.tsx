const BASE_PATH = "/Digital_twin_chatbot_and_portfolio";

export default function KnowledgeQAResearchCaseStudy() {
  const imageRoot = `${BASE_PATH}/projects/kg-qa`;

  return (
    <main className="kg-page">
      <section className="kg-hero">
        <div className="container">
          <a className="kg-back" href={`${BASE_PATH}/#work`}>
            ← BACK TO SELECTED WORK
          </a>

          <div className="kg-hero-grid">
            <div>
              <div className="kg-kicker">
                LLMs · KNOWLEDGE GENERATION · MEDICAL QA
              </div>

              <h1>
                Knowledge-Enhanced
                <br />
                <em>LLM Reasoning.</em>
              </h1>
            </div>

            <div className="kg-hero-copy">
              <p>
                A zero-shot medical question answering framework that improves
                LLM reasoning by generating question-specific knowledge,
                selecting the most relevant evidence, and using it as context
                before producing the final answer.
              </p>

              <div className="kg-hero-meta">
                <div>
                  <span>RESEARCH</span>
                  <strong>ZK-GenMed</strong>
                </div>
                <div>
                  <span>DOMAIN</span>
                  <strong>Medical QA</strong>
                </div>
                <div>
                  <span>SETTING</span>
                  <strong>Zero-shot</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="kg-section">
        <div className="container">
          <div className="kg-section-number">01 / THE PROBLEM</div>

          <div className="kg-problem-grid">
            <div>
              <h2>
                Fluent answers are not necessarily
                <em> reliable answers.</em>
              </h2>
            </div>

            <div className="kg-problem-copy">
              <p>
                Large Language Models can produce fluent answers to complex
                medical questions, but fluency does not guarantee factual
                correctness. A model may generate a response that sounds
                convincing while relying on incomplete or incorrect internal
                knowledge.
              </p>

              <p>
                This is particularly important in medical question answering,
                where hallucinated facts can directly reduce the reliability
                of an otherwise confident prediction.
              </p>

              <div className="kg-question">
                <span>RESEARCH QUESTION</span>

                <strong>
                  Can an LLM improve zero-shot medical QA by first generating
                  supporting knowledge, filtering that knowledge for relevance,
                  and only then reasoning about the original question?
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="kg-section kg-dark">
        <div className="container">
          <div className="kg-section-number">02 / THE IDEA</div>

          <div className="kg-idea">
            <span>NORMAL PROMPTING</span>
            <h2>Question → LLM → Answer</h2>

            <div className="kg-idea-divider">↓</div>

            <span>ZK-GENMED</span>

            <h2 className="kg-accent">
              Question → Generate Knowledge → Rank Relevance → Answer
            </h2>
          </div>

          <p className="kg-idea-copy">
            ZK-GenMed introduces an intermediate knowledge-generation stage.
            Rather than directly answering the original question, the model
            first extracts important concepts, generates related questions,
            ranks them for relevance, and answers the highest-ranked ones.
            Those generated answers are assembled into a temporary
            question-specific knowledge base and passed back into the final
            reasoning prompt.
          </p>
        </div>
      </section>

      <section className="kg-section">
        <div className="container">
          <div className="kg-section-number">03 / ZK-GENMED PIPELINE</div>

          <div className="kg-heading-row">
            <h2>Generate knowledge before generating the answer.</h2>
            <p>
              The original QA task is decomposed into smaller reasoning stages so
              that useful intermediate knowledge can be generated and filtered
              before the final prediction is made.
            </p>
          </div>

          <div className="kg-pipeline">
            <div className="kg-step">
              <span>01</span>
              <strong>Original Question</strong>
              <p>Start with the medical question and answer options.</p>
            </div>

            <div className="kg-step">
              <span>02</span>
              <strong>Extract Concepts</strong>
              <p>Identify important entities and keywords.</p>
            </div>

            <div className="kg-step">
              <span>03</span>
              <strong>Generate Questions</strong>
              <p>Create related questions around the detected concepts.</p>
            </div>

            <div className="kg-step">
              <span>04</span>
              <strong>Rank Relevance</strong>
              <p>Rank generated questions using semantic similarity.</p>
            </div>

            <div className="kg-step">
              <span>05</span>
              <strong>Build Knowledge</strong>
              <p>Answer top-ranked questions and compile generated knowledge.</p>
            </div>

            <div className="kg-step">
              <span>06</span>
              <strong>Final Answer</strong>
              <p>Reason over the original question together with the KB.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="kg-section kg-framework-section">
        <div className="container">
          <div className="kg-section-number">04 / ARCHITECTURE</div>

          <div className="kg-heading-row">
            <h2>The complete ZK-GenMed reasoning flow.</h2>
            <p>
              Knowledge generation happens before final answer generation,
              giving the model richer question-specific context.
            </p>
          </div>

          <figure className="kg-framework">
            <div className="kg-image-wrap">
              <img
                src={`${imageRoot}/zk-genmed-framework.png`}
                alt="ZK-GenMed framework architecture"
              />
            </div>
          </figure>
        </div>
      </section>

      <section className="kg-section">
        <div className="container">
          <div className="kg-section-number">05 / KNOWLEDGE RANKING</div>

          <div className="kg-ranking-grid">
            <div>
              <h2>
                Generated information must also be
                <em> relevant.</em>
              </h2>
            </div>

            <div>
              <div className="kg-ranking-method">
                <span>BARTScore</span>
                <p>
                  Ranks generated questions using sequence-to-sequence likelihood,
                  providing a measure of how well a generated question aligns
                  with the original problem.
                </p>
              </div>

              <div className="kg-ranking-method">
                <span>Cosine Similarity</span>
                <p>
                  Provides a complementary semantic-similarity signal by measuring
                  how close the generated question is to the original question
                  in representation space.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="kg-section kg-soft">
        <div className="container">
          <div className="kg-section-number">06 / EXPERIMENTAL SETUP</div>

          <div className="kg-heading-row">
            <h2>
              Evaluated across multiple medical QA benchmarks and LLM families.
            </h2>

            <p>
              The experiments test whether generated knowledge helps across
              different datasets and model families rather than only one
              isolated configuration.
            </p>
          </div>

          <div className="kg-experiment-grid">
            <article>
              <span>DATASETS</span>
              <h3>Medical QA Benchmarks</h3>
              <p>
                MedHALT-FCT
                <br />
                MedHALT-NOTA
                <br />
                MedHALT-FAKE
                <br />
                MedQA-USMLE
                <br />
                MedMCQA
              </p>
            </article>

            <article>
              <span>MODELS</span>
              <h3>Multiple LLM Families</h3>
              <p>
                Phi-3
                <br />
                LLaMA 2
                <br />
                LLaMA 3
                <br />
                Mistral
                <br />
                OpenBioLLM / Meditron
              </p>
            </article>

            <article>
              <span>MODEL SCALE</span>
              <h3>3.8B – 8B</h3>
              <p>
                Base, instruction-tuned and medical-domain language models.
              </p>
            </article>

            <article>
              <span>EVALUATION</span>
              <h3>Three Metrics</h3>
              <p>
                Accuracy
                <br />
                F1 Score
                <br />
                Pointwise Score
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="kg-section kg-result-visual-section">
        <div className="container">
          <div className="kg-section-number">07 / RESULTS</div>

          <div className="kg-heading-row">
            <h2>
              Generated knowledge can materially improve zero-shot QA.
            </h2>

            <p>
              The framework was evaluated across multiple medical QA benchmarks
              and LLM families. The gains were substantial in several settings,
              although the improvement was not uniform across every
              model–dataset–prompt combination.
            </p>
          </div>

          <figure className="kg-result-chart kg-result-chartmary">
            <div className="kg-result-image">
              <img
                src={`${imageRoot}/results/phi3-medqa.svg`}
                alt="Phi-3-mini MedQA accuracy comparison"
              />
            </div>

            <figcaption>
              Phi-3-mini · MedQA-USMLE — normal prompting achieved 33.58%
              accuracy, while ZK-GenMed-1 reached 52.50%, an improvement of
              18.92 percentage points.
            </figcaption>
          </figure>

          <div className="kg-result-chart-grid">
            <figure className="kg-result-chart">
              <div className="kg-result-image">
                <img
                  src={`${imageRoot}/results/llama3-instruct-medqa.svg`}
                  alt="LLaMA-3-Instruct MedQA accuracy comparison"
                />
              </div>

              <figcaption>
                LLaMA-3-Instruct · MedQA-USMLE — normal prompting achieved
                45.40%, while the strongest ZK-GenMed variant reached 54.88%.
              </figcaption>
            </figure>

            <figure className="kg-result-chart">
              <div className="kg-result-image">
                <img
                  src={`${imageRoot}/results/phi3-medmcqa.svg`}
                  alt="Phi-3-mini MedMCQA accuracy comparison"
                />
              </div>

              <figcaption>
                Phi-3-mini · MedMCQA — accuracy increased from 38.23% with
                normal prompting to 47.61% with ZK-GenMed-1.
              </figcaption>
            </figure>
          </div>

          <div className="kg-result-explanation">
            <span>WHAT THIS SHOWS</span>

            <p>
              For the same model and benchmark, changing the inference
              strategy by generating and ranking supporting knowledge can
              significantly change zero-shot question answering accuracy.
            </p>
          </div>
        </div>
      </section>

      <section className="kg-section kg-dark">
        <div className="container">
          <div className="kg-section-number">08 / KEY LEARNINGS</div>

          <div className="kg-learnings">
            <article>
              <span>01</span>
              <h3>Context quality matters.</h3>
              <p>
                Generating more text is not sufficient. The usefulness of the
                intermediate knowledge depends heavily on whether it remains
                semantically relevant to the original question.
              </p>
            </article>

            <article>
              <span>02</span>
              <h3>Reasoning can be staged.</h3>
              <p>
                Separating knowledge generation from final answer generation makes
                the reasoning pipeline more modular: candidate knowledge can
                be generated, ranked and inspected before it influences the
                final prediction.
              </p>
            </article>

            <article>
              <span>03</span>
              <h3>No fine-tuning required.</h3>
              <p>
                The approach operates at inference time and does not require
                task-specific parameter updates to the underlying language
                model.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="kg-section">
        <div className="container">
          <div className="kg-section-number">09 / LIMITATIONS</div>

          <div className="kg-limitations">
            <div>
              <h2>
                Generated knowledge can still
                <em> hallucinate.</em>
              </h2>
            </div>

            <div>
              <article>
                <span>GENERATED KNOWLEDGE</span>
                <p>
                  Because the knowledge base is itself generated by an LLM, false or
                  hallucinated facts can still propagate into the final
                  reasoning stage.
                </p>
              </article>

              <article>
                <span>COMPUTE</span>
                <p>
                  The multi-stage pipeline requires several additional generations
                  and ranking operations before the final answer, increasing
                  computational cost and latency.
                </p>
              </article>

              <article>
                <span>PROMPT DESIGN</span>
                <p>
                  The prompting strategy is manually designed and may require
                  adaptation before it transfers reliably to substantially
                  different domains or question formats.
                </p>
              </article>

              <article>
                <span>NEXT STEP</span>
                <p>
                  A natural next step is to combine the generated reasoning process
                  with verified external facts or structured Knowledge Graphs,
                  reducing the risk that hallucinated intermediate knowledge
                  enters the final prompt.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
