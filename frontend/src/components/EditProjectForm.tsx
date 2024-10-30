import { useState } from "react";
import { Project as ProjectProps } from "./types";
import { validateUpdateProject } from "../helpers/schema";

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

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        if (name === "tags") {
            setEditedProject({ ...editedProject, [name]: value.split(";") });
        } else if (name === "public") {
            setEditedProject({ ...editedProject, [name]: value === "Public" });
        } else {
            setEditedProject({ ...editedProject, [name]: value });
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const result = validateUpdateProject(editedProject);

        if (!result.success) {
            console.error(
                "Validation failed:",
                result.error.errors.map((e) => e.message).join(", ")
            );
            return;
        }

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
                <select
                    name="public"
                    value={editedProject.public ? "Public" : "Private"}
                    onChange={handleChange}
                    className="form-control"
                >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                </select>
                {project.status !== "published" && (
                    <select
                        name="status"
                        value={editedProject.status}
                        onChange={handleChange}
                        className="form-control"
                    >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                    </select>
                )}
                <button type="submit">Save</button>
                <button type="button" onClick={onCancel}>
                    Cancel
                </button>
            </form>
        </section>
    );
}
