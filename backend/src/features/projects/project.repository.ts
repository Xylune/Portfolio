import { type DB, db } from '@/db/db';
import { CreateProject, Project, ProjectFromDB, UpdateProject } from './project.schema';
import { Result } from '@/types';
import { fromDb, toDb } from './project.mapper';

export type ProjectRepository = {
    list: () => Promise<Result<Project[]>>;
    getById: (id: string) => Promise<Result<Project>>;
    create: (data: CreateProject) => Promise<Result<Project>>;
    update: (data: UpdateProject) => Promise<Result<Project>>;
    remove: (id: string) => Promise<Result<string>>;
};

export const createProjectRepository = (db: DB): ProjectRepository => {

    const exists = async (id: string): Promise<boolean> => {
        // Check if a project exists
        const query = db.prepare(`
            SELECT COUNT(*) as count 
            FROM projects 
            WHERE id = ?
            `);
        const result = query.get(id) as { count: number };
        return result.count > 0;
    };

    const list = async (): Promise<Result<Project[]>> => {
        // List all projects
        try {
            const stmt = db.prepare('SELECT * FROM projects');
            const data = stmt.all() as ProjectFromDB[];    

            return {
                success: true,
                data: data.map(fromDb)
            }
        } catch (error) {
            return {
                success: false,
                error: {
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to fetch projects'
                }
            }
        }
        
    };

    const getById = async (id: string): Promise<Result<Project>> => {
        // Get a project by id
        try {
            const studentExists = await exists(id);

            if (!studentExists) {
                return {
                    success: false,
                    error: {code: 'NOT_FOUND', message: 'Project not found'}
                }
            }

            const stmt = db.prepare('SELECT * FROM projects WHERE id = ?');
            const data = stmt.get(id) as ProjectFromDB;

            return {
                success: true,
                data: fromDb(data)
            }
            
        } catch (error) {
            return {
                success: false,
                error: {
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to fetch project'
                }
            }
            
        }
    }

    const create = async (data: CreateProject): Promise<Result<Project>> => {
        // Create a project

        try {
            console.log("Received data:", data);

            const project = toDb(data);
            console.log("Converted project data:", project);

            const query = db.prepare(`
                INSERT INTO projects (id, name, description, version, tags, status, public, created_at, updated_at, published_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `);

            console.log("Query:", query);

            query.run(
                project.id,
                project.name,
                project.description,
                project.version,
                project.tags,
                project.status,
                project.public? 1 : 0,
                project.created_at,
                project.updated_at,
                project.published_at
            )

            return {
                success: true,
                data: fromDb(project)
            }

            
        } catch (error) {
            return {
                success: false,
                error: {
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to create project'
                }
            }
        }
    };

    const update = async (data: UpdateProject): Promise<Result<Project>> => {
        // Update a project

        try {
            console.log("Received data for update:", data);

            const projectExists = await exists(data.UUID);
            console.log("Project exists:", projectExists);

            if (!projectExists) {
                return {
                    success: false,
                    error: {code: 'NOT_FOUND', message: 'Project not found'}
                }
            }

            const project = toDb(data);

            const query = db.prepare(`
                UPDATE projects 
                SET name = ?, 
                    description = ?, 
                    version = ?, 
                    tags = ?, 
                    status = ?,
                    public = ?, 
                    updated_at = ?,
                    published_at = ?
                WHERE id = ?
            `);

            query.run(
                project.name,
                project.description,
                project.version,
                project.tags,
                project.status,
                project.public? 1 : 0,
                project.updated_at,
                project.published_at,
                project.id
            )

            return {
                success: true,
                data: fromDb(project)
            }
            
        } catch (error) {
            return {
                success: false,
                error: {
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to update project'
                }
            }
        }
    };

    const remove = async (id: string): Promise<Result<string>> => {
        // Remove a project
        try {
            const projectExists = await exists(id);

            if (!projectExists) {
                return {
                    success: false,
                    error: {code: 'NOT_FOUND', message: 'Project not found'}
                }
            }

            const query = db.prepare('DELETE FROM projects WHERE id = ?');
            query.run(id);

            return {
                success: true,
                data: id
            }
            
        } catch (error) {
            return {
                success: false,
                error: {
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to remove project'
                }
            }
            
        }
    };

    return {
        list,
        getById,
        create,
        update,
        remove
    };

};

export const projectRepository = createProjectRepository(db);
