import { ArrowUpRight } from "lucide-react";

type Project = {
  number: string;
  title: string;
  description: string;
  meta: string;
  tags: string[];
};

const BASE_PATH = "/Digital_twin_chatbot_and_portfolio";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function ProjectCard({
  project,
}: {
  project: Project;
}) {
  const slug = slugify(project.title);
  const metaLines = project.meta.split("\n");

  return (
    <a
      href={`${BASE_PATH}/projects/${slug}/`}
      className="project"
      aria-label={`View case study: ${project.title}`}
    >
      <div className="project-index">
        <span>{project.number}</span>
      </div>

      <div className="project-main">
        <div className="project-heading-row">
          <h3>{project.title}</h3>

          <div className="project-arrow">
            <ArrowUpRight size={22} />
          </div>
        </div>

        <p>{project.description}</p>

        <div className="tags">
          {project.tags.map((tag, index) => (
            <span
              className="tag"
              key={`${tag}-${index}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="project-meta">
        <span className="project-meta-label">
          CONTEXT
        </span>

        <strong>{metaLines[0]}</strong>

        {metaLines[1] && (
          <span>{metaLines[1]}</span>
        )}

        <div className="project-link">
          VIEW CASE STUDY
          <ArrowUpRight size={13} />
        </div>
      </div>
    </a>
  );
}
