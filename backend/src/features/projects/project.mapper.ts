import { string } from "zod";
import { Project, ProjectFromDB } from "./project.schema";


const createId = () => crypto.randomUUID();

export const createProject = (project: Partial<Project>) => {
    return {
        UUID: createId(),
        createdAt: new Date().toISOString(),
        publishedAt: project.status === "published" ? new Date().toISOString() : null,
        ...project,
    };
}



export const toDb = (data: Partial<Project>) => {
    const project = createProject(data);

    return {
        id: project.UUID,
        name: project.name ?? "",
        description: project.description ?? "",
        version: project.version ?? "",
        tags: data.tags?.join(';') ?? "",
        status: project.status ?? "draft",
        public: project.public ? 1 : 0,
        created_at: project.createdAt,
        updated_at: new Date().toISOString(),
        published_at: project.publishedAt ?? (project.status === "published" ? new Date().toISOString() : null),
    };
}

export const fromDb = (data: ProjectFromDB) => {
    return {
        UUID: data.id,
        name: data.name,
        description: data.description,
        version: data.version,
        tags: data.tags.split(';') as [string, ...string[]],
        status: data.status,
        public: data.public === 1,
        createdAt: new Date(data.created_at).toISOString(),
        updatedAt: new Date(data.updated_at).toISOString(),
        publishedAt: data.published_at ? new Date(data.published_at).toISOString() : null,
    };
};