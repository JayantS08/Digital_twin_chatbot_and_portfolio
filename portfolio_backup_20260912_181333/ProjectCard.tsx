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
  
    return (
      <a
        href={`${BASE_PATH}/projects/${slug}/`}
        className="project"
        aria-label={`View case study: ${project.title}`}
      >
        <div className="project-num">
          {project.number}
        </div>
  
        <div>
          <h3>{project.title}</h3>
  
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
          {project.meta.split("\n").map((line, index) => (
            <div key={`${line}-${index}`}>
              {line}
            </div>
          ))}
  
          <div className="project-link">
            VIEW CASE STUDY →
          </div>
        </div>
      </a>
    );
  }