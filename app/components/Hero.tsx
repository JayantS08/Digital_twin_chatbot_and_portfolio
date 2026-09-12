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
