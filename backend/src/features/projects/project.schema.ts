import {z} from "zod";

export const projectSchema = z.object({
    UUID: z.string(),
    name: z.string(),
    description: z.string(),
    version: z.string(),
    tags: z.array(z.string()),
    public: z.boolean(),
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const projectFromDBSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    version: z.string(),
    tags: z.string(),
    public: z.boolean(),
    created_at: z.string(),
    updated_at: z.string(),
});

export const createProjectSchema = projectSchema.omit({ 
    UUID: true, 
    createdAt: true, 
    updatedAt: true 
});

export const updateProjectSchema = projectSchema.omit({
    createdAt: true, 
    updatedAt: true
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectFromDB = z.infer<typeof projectFromDBSchema>;
export type CreateProject = z.infer<typeof createProjectSchema>
export type UpdateProject = z.infer<typeof updateProjectSchema>