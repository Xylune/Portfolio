import Project from "./Project";
import { Project as ProjectProps } from "./types";

type ProjectListProps = {
    projects: ProjectProps[];
    onDelete: (UUID: string) => void;
};

export default function ProjectList({ projects, onDelete }: ProjectListProps) {
    return (
        <section id="projectListSection">
            <h2>My projects</h2>
            <ul id="projectsList">
                {projects.length === 0 ? (
                    <li>
                        <p>No projects found</p>
                    </li>
                ) : (
                    projects.map((project) => (
                        <Project key={project.UUID} {...project}>
                            <button
                                id="delete-btn"
                                onClick={() => onDelete(project.UUID)}
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                        </Project>
                    ))
                )}
            </ul>
        </section>
    );
}
