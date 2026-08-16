import Nav from "./components/Nav";
import Hero from "./components/Hero";
import ProjectCard from "./components/ProjectCard";
import DigitalTwin from "./components/DigitalTwin";

import profile from "../content/generated/profile.json";

const projects = profile.projects.map((project, index) => ({
  number: String(index + 1).padStart(2, "0"),
  title: project.name,
  description: project.description,
  meta: `${project.organization}\n${project.period}`,
  tags: project.technologies,
}));

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

                <h3>
                    {education.degree}
                </h3>

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

                  {job.skills &&
                    job.skills.length > 0 && (
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