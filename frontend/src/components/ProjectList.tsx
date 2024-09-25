import Project from "./Project";
import { Project as ProjectProps } from "./types";

type ProjectListProps = {
    projects: ProjectProps[];
};

export default function ProjectList(props: ProjectListProps) {
    const { projects } = props;
    
    return (
        <section id="projectListSection">
            <h2>My projects</h2>
            <ul id="projectsList">
                {projects.map((project) => (
                    <Project key={project.UUID} {...project} />
                ))}
            </ul>
        </section>
    );
}
