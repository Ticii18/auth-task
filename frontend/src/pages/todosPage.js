export const todosPage = () => {
  const container = document.createElement("div");

  container.classList.add(
    "flex",
    "flex-col",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gray-200",
    "relative" // Agregamos relative para el posicionamiento absoluto del botón
  );

  // Crear el botón "+"
  const btnAddTask = document.createElement("button");
  btnAddTask.textContent = "+";
  btnAddTask.classList.add(
    "absolute",
    "top-4",
    "left-4",
    "bg-green-500",
    "text-white",
    "p-2",
    "rounded-full",
    "hover:bg-green-600",
    "text-xl"
  );

  // Añadir evento al botón "+"
  btnAddTask.addEventListener("click", () => {
    window.location.pathname = "/todos/add";
  });

  // Crear botón "Home"
  const btnHome = document.createElement("button");
  btnHome.classList.add(
    "bg-blue-500",
    "text-white",
    "p-2",
    "rounded",
    "hover:bg-blue-600",
    "mb-4"
  );
  btnHome.textContent = "Home";
  btnHome.addEventListener("click", () => {
    window.location.pathname = "/home";
  });

  const title = document.createElement("h1");
  title.classList.add("text-3xl", "font-bold", "mb-4");
  title.textContent = "List of Todos";

  const table = document.createElement("table");
  table.classList.add(
    "w-1/2",
    "bg-white",
    "shadow-md",
    "h-[700px]",
    "overflow-y-scroll"
  );

  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  const th1 = document.createElement("th");
  th1.classList.add("border", "px-4", "py-2");
  th1.textContent = "ID";

  const th2 = document.createElement("th");
  th2.classList.add("border", "px-4", "py-2");
  th2.textContent = "Title";

  const th3 = document.createElement("th");
  th3.classList.add("border", "px-4", "py-2");
  th3.textContent = "Completed";

  const th4 = document.createElement("th");
  th4.classList.add("border", "px-4", "py-2");
  th4.textContent = "Owner Id";

  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  tr.appendChild(th4);
  thead.appendChild(tr);

  const tbody = document.createElement("tbody");
  tbody.classList.add("text-center");
  table.appendChild(thead);
  table.appendChild(tbody);

  container.appendChild(btnHome);
  container.appendChild(btnAddTask); // Añadir el botón "+" al contenedor
  container.appendChild(title);
  container.appendChild(table);

  // Verifica que el userId esté presente en el almacenamiento local
  const userId = localStorage.getItem("userId");

  if (!userId) {
    console.error("User ID no encontrado en el almacenamiento local.");
    const errorMessage = document.createElement("p");
    errorMessage.textContent = "Error: User ID no encontrado.";
    container.appendChild(errorMessage);
    return container;
  }

  // Obtén las tareas del usuario
  fetch(`http://localhost:4000/todos/${userId}`, {
    method: "GET",
    credentials: "include" // Asegúrate de incluir las cookies de sesión
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data from server:", data);
      if (data.todos.length === 0) {
        const noTasksMessage = document.createElement("p");
        noTasksMessage.textContent = "No tienes tareas.";
        container.appendChild(noTasksMessage);
      } else {
        data.todos.forEach((tasks) => {
          const tr = document.createElement("tr");

          const td1 = document.createElement("td");
          td1.classList.add("border", "px-4", "py-2");
          td1.textContent = tasks.id;

          const td2 = document.createElement("td");
          td2.classList.add("border", "px-4", "py-2");
          td2.textContent = tasks.title;

          const td3 = document.createElement("td");
          td3.classList.add("border", "px-4", "py-2");
          td3.textContent = tasks.completed ? "Sí" : "No";

          const td4 = document.createElement("td");
          td4.classList.add("border", "px-4", "py-2");
          td4.textContent = tasks.owner;

          tr.appendChild(td1);
          tr.appendChild(td2);
          tr.appendChild(td3);
          tr.appendChild(td4);
          tbody.appendChild(tr);
        });
      }
    })
    .catch((error) => {
      console.error("Error fetching todos:", error);
      const errorMessage = document.createElement("p");
      errorMessage.textContent = "Error al cargar las tareas.";
      container.appendChild(errorMessage);
    });

  return container;
};
