import { useState } from "react";
import { Project as ProjectProps } from "./types";

type EditProjectFormProps = {
    project: ProjectProps;
    onSave: (project: ProjectProps) => void;
    onCancel: () => void;
};

export default function EditProjectForm({
    project,
    onSave,
    onCancel,
}: EditProjectFormProps) {
    const [editedProject, setEditedProject] = useState(project);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "tags") {
            setEditedProject({ ...editedProject, [name]: value.split(";") });
        } else {
            setEditedProject({ ...editedProject, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (
            !editedProject.name ||
            !editedProject.description ||
            !editedProject.version ||
            !editedProject.tags
        )
            return;
        onSave(editedProject);
    };

    return (
        <section>
            <h2>Edit project</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={editedProject.name}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    value={editedProject.description}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="version"
                    value={editedProject.version}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="tags"
                    value={editedProject.tags?.join(";") ?? ""}
                    onChange={handleChange}
                />
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </form>
        </section>
    );
}
