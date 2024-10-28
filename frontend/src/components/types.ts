export type Project = {
    UUID: string;
    name: string;
    description: string;
    version: string;
    tags: string[];
    status: "draft" | "published";
    public: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string | null;
}

export type AddProjectProps = Omit<Project, "UUID" | "createdAt" | "updatedAt" | "publishedAt">;
export type UpdateProjectProps = Omit<Project, "UUID" | "createdAt" | "updatedAt" | "publishedAt">;