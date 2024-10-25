import { projectRepository, ProjectRepository } from "./project.repository";
import { CreateProject, UpdateProject } from "./project.schema";


export const createProjectService = (projectRepository: ProjectRepository) => {

    const list = async () => {
        return projectRepository.list();
    };

    const getById = async (id: string) => {
        return projectRepository.getById(id);
    };

    const create = async (data: CreateProject) => {
        return projectRepository.create(data);
    };

    const update = async (data: UpdateProject) => {
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