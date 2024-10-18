import { useState } from "react";
import { Project as ProjectProps } from "./types";

type AddProjectFormProps = {
    onAddProject: (project: ProjectProps) => void;
};

export default function AddProjectForm(props: AddProjectFormProps) {
    const { onAddProject } = props;
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectVersion, setProjectVersion] = useState("");
    const [projectTags, setProjectTags] = useState("");
    const [projectVisibility, setProjectVisibility] = useState("Public");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (
            !projectName ||
            !projectDescription ||
            !projectVersion ||
            !projectTags ||
            !projectVisibility
        )
            return;
        const project = {
            UUID: crypto.randomUUID(),
            name: projectName,
            description: projectDescription,
            version: projectVersion,
            tags: projectTags.split(";").map((tag) => tag.trim()),
            visibility: projectVisibility as "Public" | "Private",
            createdAt: new Date().toISOString(),
        };
        onAddProject(project);
        setProjectName("");
        setProjectDescription("");
        setProjectVersion("");
        setProjectTags("");
        setProjectVisibility("Public");
    };

    return (
        <section id="projectFormSection">
            <h2>New projects</h2>
            <form id="projectForm" onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="projectName"
                    name="projectName"
                    placeholder="Project name..."
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                />
                <input
                    type="text"
                    id="projectDescription"
                    name="projectDescription"
                    placeholder="Description..."
                    value={projectDescription}
                    onChange={(e) => setProjectDescription(e.target.value)}
                />
                <input
                    type="text"
                    id="projectVersion"
                    name="projectVersion"
                    placeholder="Version..."
                    value={projectVersion}
                    onChange={(e) => setProjectVersion(e.target.value)}
                />
                <input
                    type="text"
                    id="projectTags"
                    name="projectTags"
                    placeholder="Tag1; Tag2; Tag3"
                    value={projectTags}
                    onChange={(e) => setProjectTags(e.target.value)}
                />
                <select
                    id="projectVisibility"
                    name="projectVisibility"
                    className="form-control"
                    value={projectVisibility}
                    onChange={(e) => setProjectVisibility(e.target.value)}
                >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                </select>
                <button type="submit" id="submit">
                    Submit
                </button>
            </form>
        </section>
    );
}
