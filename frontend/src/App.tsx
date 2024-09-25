import { useState } from "react";
import AddProjectForm from "./components/AddProjectForm";
import ProjectList from "./components/ProjectList";
import { Project as ProjectProps } from "./components/types";

const initialProjects = [
    {
        UUID: "1",
        name: "My first project",
        description: "This is my first project",
        version: "1.0.0",
        createdAt: new Date().toISOString(),
    },
    {
        UUID: "2",
        name: "My second project",
        description: "This is my second project",
        version: "1.0.0",
        createdAt: new Date().toISOString(),
    },
];

function App() {
    const [projects, setProjects] = useState<ProjectProps[]>(
        initialProjects ?? []
    );

    const handleAddProject = (project: ProjectProps) => {
        setProjects((prevProjects) => [...prevProjects, project]);
    };

    return (
        <>
            <header>
                <h1>My portfolio</h1>
            </header>
            <main>
                <ProjectList projects={projects} />
                <AddProjectForm onAddProject={handleAddProject} />
            </main>
        </>
    );
}

export default App;
