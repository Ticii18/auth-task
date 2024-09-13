export const addTask = () => {
  const container = document.createElement("div");
  container.classList.add(
    "flex",
    "items-center",
    "justify-center",
    "h-screen",
    "bg-gray-200",
    "p-4"
  );

  const formContainer = document.createElement("div");
  formContainer.classList.add(
    "w-full",
    "max-w-md", 
    "bg-white",
    "p-6",
    "rounded",
    "shadow-md",
    "space-y-4",
    "md:w-1/3"
  );

  // Create and style the home button
  const homeButton = document.createElement("button");
  homeButton.classList.add(
    "mb-4",
    "bg-gray-300",
    "hover:bg-gray-500",
    "text-gray-800",
    "font-bold",
    "py-2",
    "px-4",
    "rounded"
  );
  homeButton.textContent = "Volver";
  homeButton.addEventListener("click", () => {
    window.location.pathname = "/todos";
  });

  const form = document.createElement("form");
  form.classList.add(
    "flex",
    "flex-col",
    "gap-4"
  );

  const title = document.createElement("h2");
  title.classList.add("text-2xl", "font-bold");
  title.textContent = "Add New Task";

  const titleInput = document.createElement("input");
  titleInput.type = "text";
  titleInput.id = "title";
  titleInput.name = "title";
  titleInput.required = true;
  titleInput.classList.add(
    "w-full",
    "p-2",
    "border",
    "border-gray-300",
    "rounded"
  );
  titleInput.placeholder = "Task Title";

  const completedLabel = document.createElement("label");
  completedLabel.htmlFor = "completed";
  completedLabel.textContent = "Completed";
  completedLabel.classList.add("flex", "items-center");

  const completedInput = document.createElement("input");
  completedInput.type = "checkbox";
  completedInput.id = "completed";
  completedInput.name = "completed";
  completedInput.classList.add(
    "mr-2",
    "mx-2"
  );

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.classList.add(
    "w-full",
    "bg-blue-500",
    "hover:bg-blue-700",
    "text-white",
    "font-bold",
    "py-2",
    "px-4",
    "rounded"
  );
  submitButton.textContent = "Add Task";

  form.appendChild(title);
  form.appendChild(titleInput);
  form.appendChild(completedLabel);
  completedLabel.appendChild(completedInput); // Checkbox dentro del label
  form.appendChild(submitButton);

  const divError = document.createElement("div");
  divError.id = "message";
  divError.classList.add(
    "text-red-500",
    "text-center",
    "font-bold"
  );
  form.appendChild(divError);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = titleInput.value;
    const completed = completedInput.checked;

    if (!title) {
      document.getElementById("message").innerText =
        "Please fill in all fields.";
      return;
    }

    const userId = localStorage.getItem("userId");

    try {
      const response = await fetch(`http://localhost:4000/todos/add/${userId}`, {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, completed }),
      });

      if (!response.ok) {
        throw new Error("Error al agregar la tarea");
      }

      const data = await response.json();
      console.log(data);
      window.alert("Se ha creado la tarea correctamente");
      window.location.pathname = "/todos"; // Redirige a la página de tareas después de agregar
    } catch (error) {
      console.error("Error al agregar la tarea:", error);
      divError.innerText = "Error al agregar la tarea.";
    }
  });

  formContainer.appendChild(homeButton); // Add home button to formContainer
  formContainer.appendChild(form);
  container.appendChild(formContainer);

  return container;
};
