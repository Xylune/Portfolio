export type Project = {
    UUID: string;
    name: string;
    description: string;
    version: string;
    tags?: string[];
    visibility: "Public" | "Private";
    createdAt: string;
}