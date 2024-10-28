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
    const [projectPublic, setProjectPublic] = useState(false);
    const [projectStatus, setProjectStatus] = useState("draft");

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (
            !projectName ||
            !projectDescription ||
            !projectVersion ||
            !projectTags ||
            !projectStatus
        )
            return;
        const project = {
            UUID: crypto.randomUUID(),
            name: projectName,
            description: projectDescription,
            version: projectVersion,
            tags: projectTags.split(";").map((tag) => tag.trim()),
            status: projectStatus as "draft" | "published",
            public: projectPublic,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            publishedAt:
                projectStatus === "published" ? new Date().toISOString() : null,
        };

        onAddProject(project);
        setProjectName("");
        setProjectDescription("");
        setProjectVersion("");
        setProjectTags("");
        setProjectPublic(false);
        setProjectStatus("draft");
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
                    id="projectPublic"
                    name="projectPublic"
                    className="form-control"
                    value={projectPublic ? "Public" : "Private"}
                    onChange={(e) =>
                        setProjectPublic(e.target.value === "Public")
                    }
                >
                    <option value="Public">Public</option>
                    <option value="Private">Private</option>
                </select>
                <select
                    id="projectStatus"
                    name="projectStatus"
                    className="form-control"
                    value={projectStatus}
                    onChange={(e) => setProjectStatus(e.target.value)}
                >
                    <option value="Draft">Draft</option>
                    <option value="Publish">Publish</option>
                </select>
                <button type="submit" id="submit">
                    Submit
                </button>
            </form>
        </section>
    );
}
