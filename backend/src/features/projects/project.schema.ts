import {z} from "zod";

export const projectSchema = z.object({
    UUID: z.string().uuid({message: "Invalid UUID"}),
    name: z.string().min(3, {message: "Name must be atleast 3 characters long"}),
    description: z.string().min(1, {message: "Description cannot be empty"}),
    version: z.string().min(1, {message: "Version cannot be empty"}),
    tags: z.array(z.string()).nonempty({message: "Tags cannot be empty"}),
    status: z.enum(["draft", "published"]),
    public: z.boolean(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
    publishedAt: z.string().datetime().nullable(),
    
});

export const projectFromDBSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    version: z.string(),
    tags: z.string(),
    status: z.enum(["draft", "published"]),
    public: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
    published_at: z.string().datetime().nullable(),

});

export const createProjectSchema = projectSchema.omit({ 
    UUID: true, 
    createdAt: true, 
    updatedAt: true,
    publishedAt: true
});

export const updateProjectSchema = projectSchema.omit({
    createdAt: true, 
    updatedAt: true,
    publishedAt: true
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectFromDB = z.infer<typeof projectFromDBSchema>;
export type CreateProject = z.infer<typeof createProjectSchema>
export type UpdateProject = z.infer<typeof updateProjectSchema>

export const validateProject = (data: unknown) => {
    return projectSchema.safeParse(data);
}

export const validateCreateProject = (data: unknown) => {
    return createProjectSchema.safeParse(data);
}

export const validateUpdateProject = (data: unknown) => {
    return updateProjectSchema.safeParse(data);
}