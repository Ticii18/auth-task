import { Router } from "express";
import { deleteTask, getTasksFromId, postTask, updateTask } from "../controllers/todos.controllers.js";

import authMiddleware  from "../middlewares/validar-jwt.js"

const todosRouter = Router();

todosRouter.use(authMiddleware);

todosRouter.get("/:userId", getTasksFromId); // Obtener todas las tareas del usuario
todosRouter.post("/add/:userId", authMiddleware, postTask); // Crear una nueva tarea
todosRouter.put("/put/:id",authMiddleware, updateTask); // Actualizar una tarea
todosRouter.delete("/delete/:id",authMiddleware, deleteTask); // Eliminar una tarea

export { todosRouter };
