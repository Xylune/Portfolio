import { useState } from "react";
import { AddProjectProps } from "./types";
import { validateCreateProject } from "../helpers/schema";

type AddProjectFormProps = {
    onAddProject: (project: AddProjectProps) => void;
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

        const result = validateCreateProject({
            name: projectName,
            description: projectDescription,
            version: projectVersion,
            tags: projectTags.split(";").map((t) => t.trim()),
            status: projectStatus,
            public: projectPublic,
        });
        if (!result.success) {
            console.error(
                "Validation failed:",
                result.error.errors.map((e) => e.message).join(", ")
            );
            return;
        }

        onAddProject(result.data);
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
                    <option value="draft">Draft</option>
                    <option value="published">Publish</option>
                </select>
                <button type="submit" id="submit">
                    Submit
                </button>
            </form>
        </section>
    );
}
