import { useState, useEffect } from "react";
import AddProjectForm from "./components/AddProjectForm";
import ProjectList from "./components/ProjectList";
import { Project as ProjectProps } from "./components/types";
import { ofetch } from "ofetch";

function App() {
    const [projects, setProjects] = useState<ProjectProps[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data: ProjectProps[] = await ofetch(
                    "http://localhost:3999/"
                );
                setProjects(data);
            } catch (error) {
                console.error("Failed to fetch projects;", error);
            }
        };
        fetchProjects();
    }, []);

    const handleAddProject = async (project: ProjectProps) => {
        try {
            const newProject: ProjectProps = await ofetch(
                "http://localhost:3999/",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(project),
                }
            );
            setProjects((prevProjects) => [...prevProjects, newProject]);
        } catch (error) {
            console.error("Failed to add project:", error);
        }
    };

    const handleDeleteProject = async (UUID: string) => {
        try {
            await ofetch(`http://localhost:3999/${UUID}`, {
                method: "DELETE",
            });
            setProjects((prevProjects) =>
                prevProjects.filter((project) => project.UUID !== UUID)
            );
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    };

    return (
        <>
            <header>
                <h1>My portfolio</h1>
            </header>
            <main>
                <ProjectList
                    projects={projects}
                    onDelete={handleDeleteProject}
                />
                <AddProjectForm onAddProject={handleAddProject} />
            </main>
        </>
    );
}

export default App;
