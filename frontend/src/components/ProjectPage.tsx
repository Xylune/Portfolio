import { useProjects } from "../hooks/useProjects";
import AddProjectForm from "../components/AddProjectForm";
import ProjectList from "../components/ProjectList";
import EditProjectForm from "../components/EditProjectForm";

export default function ProjectPage() {
    const {
        projects,
        error,
        loading,
        editingProject,
        actions: { create, remove, save },
        handleEdit,
        handleCancel,
    } = useProjects();

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ProjectList
                projects={projects}
                onDelete={remove}
                onEdit={handleEdit}
            />
            {editingProject ? (
                <EditProjectForm
                    project={editingProject}
                    onSave={save}
                    onCancel={handleCancel}
                />
            ) : (
                <AddProjectForm onAddProject={create} />
            )}
        </>
    );
}