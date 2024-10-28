import { useState, useEffect } from "react";
import AddProjectForm from "./components/AddProjectForm";
import ProjectList from "./components/ProjectList";
import EditProjectForm from "./components/EditProjectForm";
import { AddProjectProps, Project as ProjectProps } from "./components/types";
import { ofetch } from "ofetch";
import { endpointsV3 } from "./config/urls";

function App() {
    const [projects, setProjects] = useState<ProjectProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [editingProject, setEditingProject] = useState<ProjectProps | null>(
        null
    );

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const data: ProjectProps[] = await ofetch(endpointsV3);
            setProjects(data);
        } catch (error) {
            console.error("Failed to fetch projects;", error);
            setError("Failed to fetch projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleAddProject = async (project: AddProjectProps) => {
        try {
            const result: ProjectProps[] = await ofetch(endpointsV3, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(project),
            });
            console.log(result);
            fetchProjects();
        } catch (error) {
            console.error("Failed to add project:", error);
        }
    };

    const handleDeleteProject = async (UUID: string) => {
        try {
            await ofetch(`${endpointsV3}/${UUID}`, {
                method: "DELETE",
            });
            fetchProjects();
        } catch (error) {
            console.error("Failed to delete project:", error);
        }
    };

    const handleSave = async (updatedProject: ProjectProps) => {
        try {
            const result = await ofetch(
                `${endpointsV3}/${updatedProject.UUID}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedProject),
                }
            );
            console.log(result);
            fetchProjects();
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
