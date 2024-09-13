import { database } from "../db/database.js";

export const getAllTodosCtrl = (req, res) => {
  const userId = req.user.id;
  const todos = database.todos.filter(todo => todo.owner === userId);

  res.json({ todos });
};

export const getTasksFromId = (req, res) => {
  const { userId } = req.params;

  const todos = database.todos.filter(todo => todo.owner === parseInt(userId, 10));

  if (todos.length === 0) {
    return res.status(404).json({ message: "No se encontraron tareas para este usuario." });
  }

  return res.json({ todos });
};

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


export const updateTask = (req, res) => {
  const userId = req.user.id;
  const { id, title, completed } = req.body;

  // Verificar que el ID esté presente en el cuerpo de la solicitud
  if (!id) {
    return res.status(400).json({ message: "ID de tarea requerido" });
  }

  const task = database.todos.find(task => task.id === id && task.owner === userId);

  if (!task) {
    return res.status(404).json({ message: "Tarea no encontrada o no autorizada" });
  }

  task.title = title;
  task.completed = completed;

  res.json({ message: 'Tarea actualizada correctamente', task });
};


export const deleteTask = (req, res) => {
  const userId = req.user.id;
  const { id } = req.body;

  // Verificar que el ID esté presente en el cuerpo de la solicitud
  if (!id) {
    return res.status(400).json({ message: "ID de tarea requerido" });
  }

  const taskIndex = database.todos.findIndex(task => task.id === id && task.owner === userId);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Tarea no encontrada o no autorizada" });
  }

  database.todos.splice(taskIndex, 1);
  res.json({ message: 'Tarea eliminada correctamente' });
};