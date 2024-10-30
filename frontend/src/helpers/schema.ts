import {z} from 'zod';

export { projectSchema, projectsSchema };

const projectSchema = z.object({
    UUID: z.string().uuid({message: "Invalid UUID"}),
    name: z.string().min(3, {message: "Name must be atleast 3 characters long"}),
    description: z.string().min(1, {message: "Description cannot be empty"}),
    version: z.string().min(1, {message: "Version cannot be empty"}),
    tags: z.array(z.string().min(1, {message: "Tags cannot be empty"})).nonempty({message: "Tags cannot be empty"}),
    status: z.enum(["draft", "published"], {message: "Invalid status"}),
    public: z.boolean({message: "Invalid visiblity"}),
    createdAt: z.string().datetime({message: "Invalid creation date"}),
    updatedAt: z.string().datetime({message: "Invalid update date"}),
    publishedAt: z.string().datetime().nullable(),
})

const projectsSchema = z.array(projectSchema);

export function validateProject(data: unknown) {
    return projectSchema.safeParse(data);
}

export function validateProjects(data: unknown) {
    return projectsSchema.safeParse(data);
}

export function validateCreateProject(data: unknown) {
    return projectSchema.omit({ UUID: true, createdAt: true, updatedAt: true, publishedAt: true }).safeParse(data);
}

export function validateUpdateProject(data: unknown) {
    return projectSchema.safeParse(data);
}