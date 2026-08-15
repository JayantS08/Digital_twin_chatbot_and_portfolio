type P={number:string,title:string,description:string,meta:string,tags:string[]};
export default function ProjectCard({project}:{project:P}){return <article className="project"><div className="project-num">{project.number}</div>
<div><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.tags.map(t=><span className="tag" key={t}>{t}</span>)}</div></div>
<div className="project-meta">{project.meta}</div></article>}