import { error } from "console";
import { ProjectService, projectService } from "./project.service";
import { Hono } from "hono";
import { ErrorCode, errorResponse } from "@/lib/error";


export const createProjectController = (projectService: ProjectService) => {
    const app = new Hono();


    app.get("/", async (c) => {
        const projects = await projectService.list();
        
        if (!projects.success) {
            return errorResponse(c, projects.error.code as ErrorCode, projects.error.message);
        }
        return c.json(projects.data);
    });

    app.get("/:id", async (c) => {
        const result = await projectService.getById(c.req.param("id"));
        
        if (!result.success) {
            return errorResponse(c, result.error.code as ErrorCode, result.error.message);
        }
        return c.json(result.data);
    });

    app.post("/", async (c) => {
        console.log("Received data:", c.req.json());
        const project = await c.req.json();
        const result = await projectService.create(project);

        if (!result.success) {
            return errorResponse(c, result.error.code as ErrorCode, result.error.message);
        }
        return c.json(result.data, { status: 201 });
    });

    app.delete("/:id", async (c) => {
        const result = await projectService.remove(c.req.param("id"));

        if (!result.success) {
            return errorResponse(c, result.error.code as ErrorCode, result.error.message);
        }
        return c.json(result.data);
    });

    app.patch("/:id", async (c) => {
        const id = c.req.param("id");
        const project = await c.req.json();

        const result = await projectService.update({id ,...project});

        if (!result.success) {
            return errorResponse(c, result.error.code as ErrorCode, result.error.message);
        }
        return c.json(result.data);
    });

    return app;
};

export const projectController = createProjectController(projectService);