import { database } from "../db/database.js";



// Obtener tareas por ID de usuario (como parámetro de ruta)
export const getTasksFromId = (req, res) => {
  const { userId } = req.params;

  const todos = database.todos.filter(todo => todo.owner === parseInt(userId, 10));

  if (todos.length === 0) {
    return res.status(404).json({ message: "No se encontraron tareas para este usuario." });
  }

  return res.json({ todos });
};

// Crear una nueva tarea
export const postTask = (req, res) => {
  const { title, completed } = req.body;
  const owner = req.user.id; // Asignar el ID del usuario autenticado

  // Generador de ID automático
  const newId = database.todos.length
    ? Math.max(...database.todos.map(t => t.id)) + 1
    : 1;

  const newTask = { id: newId, title, completed, owner };
  database.todos.push(newTask);

  res.json({ message: 'Tarea agregada correctamente', newTask });
};

// Actualizar una tarea existente
export const updateTask = (req, res) => {
  const userId = req.user.id;
  const { title, completed } = req.body;
  const { id } = req.params; // Obtener el ID desde los parámetros de la ruta

  // Verificar si la tarea pertenece al usuario
  const task = database.todos.find(task => task.id === parseInt(id, 10) && task.owner === userId);

  if (!task) {
    return res.status(404).json({ message: "Tarea no encontrada o no autorizada" });
  }

  // Actualizar los campos de la tarea
  task.title = title;
  task.completed = completed;

  res.json({ message: 'Tarea actualizada correctamente', task });
};

// Eliminar una tarea existente
export const deleteTask = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params; // Obtener el ID desde los parámetros de la ruta

  // Verificar si la tarea pertenece al usuario
  const taskIndex = database.todos.findIndex(task => task.id === parseInt(id, 10) && task.owner === userId);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Tarea no encontrada o no autorizada" });
  }

  // Eliminar la tarea
  database.todos.splice(taskIndex, 1);
  res.json({ message: 'Tarea eliminada correctamente' });
};
