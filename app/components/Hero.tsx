import { ArrowDown, MessageCircle } from "lucide-react";

import profile from "../../content/generated/profile.json";

export default function Hero() {
  const nameParts = profile.personal.name.trim().split(" ");

  const firstName = nameParts[0] || "Jayant";
  const lastName = nameParts.slice(1).join(" ") || "Singh";

  return (
    <section className="hero">
      <div className="container">

        <div className="kicker">
          {profile.personal.headline}
        </div>

        <h1>
          {firstName}
          <br />
          <em>{lastName}.</em>
        </h1>

        <p className="hero-copy">
          {profile.about.short}
        </p>

        <div className="actions">
          <a className="btn" href="#work">
            Explore my work
            <ArrowDown size={15} />
          </a>

          <a className="btn secondary" href="#twin">
            Talk to my AI
            <MessageCircle size={15} />
          </a>
        </div>

      </div>
    </section>
  );
}