import { Result } from "@/types";
import { projectRepository, ProjectRepository } from "./project.repository";
import { CreateProject, Project, UpdateProject, validateCreateProject } from "./project.schema";


export const createProjectService = (projectRepository: ProjectRepository) => {

    const list = async () => {
        return projectRepository.list();
    };

    const getById = async (id: string) => {
        return projectRepository.getById(id);
    };

    const create = async (data: CreateProject): Promise<Result<Project>> => {
        const validationResult = validateCreateProject(data);
        if (!validationResult.success) {
            const errorMessage = validationResult.error.errors.map(e => e.message).join(', ');
            return {success: false, error: {code: 'BAD_REQUEST', message: errorMessage}};
        }
        return projectRepository.create(data);
    };

    const update = async (data: UpdateProject): Promise<Result<Project>> => {
        const validationResult = validateCreateProject(data);
        if (!validationResult.success) {
            const errorMessage = validationResult.error.errors.map(e => e.message).join(', ');
            return {success: false, error: {code: 'BAD_REQUEST', message: errorMessage}};
        }
        return projectRepository.update(data);
    };
    
    const remove = async (id: string) => {
        return projectRepository.remove(id);
    };



    return {
        list,
        getById,
        create,
        update,
        remove
    };


};

export const projectService = createProjectService(projectRepository);

export type ProjectService = ReturnType<typeof createProjectService>;