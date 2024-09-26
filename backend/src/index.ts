import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

const projects = [
    {
        UUID: "359dd1bb-4726-4dfc-b0ac-cb6cb489373e",
        name: "Habit tracker",
        description: "Track your daily habits",
        version: "1.0.0",
        createdAt: new Date().toISOString(),
    },
    {
        UUID: "3540a766-b75c-44a7-8b15-dcec94dd9aea",
        name: "Weather App",
        description: "Get the latest weather updates",
        version: "1.0.0",
        createdAt: new Date().toISOString(),
    },
    {
        UUID: "a1b2c3d4-e5f6-7g8h-9i0j-k1l2m3n4o5p6",
        name: "Task Manager",
        description: "Manage your tasks efficiently",
        version: "1.0.0",
        createdAt: new Date().toISOString(),
    },
    {
        UUID: "b2c3d4e5-f6g7-h8i9-j0k1-l2m3n4o5p6q7",
        name: "Recipe Book",
        description: "Store and share your favorite recipes",
        version: "1.0.0",
        createdAt: new Date().toISOString(),
    },
    {
        UUID: "c3d4e5f6-g7h8-i9j0-k1l2-m3n4o5p6q7r8",
        name: "Fitness Tracker",
        description: "Track your fitness activities and goals",
        version: "1.0.0",
        createdAt: new Date().toISOString(),
    }
];

app.use("*", cors());

app.get("/", (c) => {
    return c.json(projects);
});

app.post("/", async (c) => {
    const project = await c.req.json();
    projects.push({
        UUID: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...project,
    });
    return c.json(project, 201);
});

app.delete("/:UUID", (c) => {
    const { UUID } = c.req.param();
    const index = projects.findIndex((project) => project.UUID === UUID);
    if (index !== -1) {
        projects.splice(index, 1);
        return c.json({ message: "Project deleted" });
    }
    return c.json({ message: "Project not found" }, 404);
});

const port = 3999;
console.log(`Server is running on port ${port}`);

serve({
    fetch: app.fetch,
    port,
});
