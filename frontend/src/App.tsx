import { useState, useEffect } from "react";
import AddProjectForm from "./components/AddProjectForm";
import ProjectList from "./components/ProjectList";
import EditProjectForm from "./components/EditProjectForm";
import { Project as ProjectProps } from "./components/types";
import { ofetch } from "ofetch";

function App() {
    const [projects, setProjects] = useState<ProjectProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [editingProject, setEditingProject] = useState<ProjectProps | null>(
        null
    );

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                const data: ProjectProps[] = await ofetch(
                    "http://localhost:3999/api/projects"
                );
                setProjects(data);
            } catch (error) {
                console.error("Failed to fetch projects;", error);
                setError("Failed to fetch projects");
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    const handleAddProject = async (project: ProjectProps) => {
        try {
            const projects: ProjectProps[] = await ofetch(
                "http://localhost:3999/api/projects",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(project),
                }
            );
            setProjects(projects);
        } catch (error) {
            console.error("Failed to add project:", error);
        }
    };

    const handleDeleteProject = async (UUID: string) => {
        try {
            await ofetch(`http://localhost:3999/api/projects/${UUID}`, {
                method: "DELETE",
            });
            setProjects((prevProjects) =>
                prevProjects.filter((project) => project.UUID !== UUID)
            );
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    };

    const handleSave = async (updatedProject: ProjectProps) => {
        try {
            const projects: ProjectProps[] = await ofetch(
                `http://localhost:3999/api/projects/${updatedProject.UUID}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedProject),
                }
            );

            setProjects(projects);
        } catch (error) {
            console.error("Failed to save project:", error);
        } finally {
            setEditingProject(null);
        }
    };

    const handleEdit = (project: ProjectProps) => {
        setEditingProject(project);
    };

    const handleCancel = () => {
        setEditingProject(null);
    };

    return (
        <div>
            <header>
                <h1>My portfolio</h1>
            </header>
            <main>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                <ProjectList
                    projects={projects}
                    onDelete={handleDeleteProject}
                    onEdit={handleEdit}
                />
                {editingProject ? (
                    <EditProjectForm
                        project={editingProject}
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                ) : (
                    <AddProjectForm onAddProject={handleAddProject} />
                )}
            </main>
        </div>
    );
}

export default App;
