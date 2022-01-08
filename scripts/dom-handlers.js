// ====================================================
// =============            EVENTS         ============
// ====================================================
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const todoText = keepOnlyPlainTodoText(todoInput.value.trim());
  todoInput.value = "";
  event.preventDefault();
  // validation
  if (!todoText) {
    alert("Tog'ri qiymat kiriting!!!");
    return;
  }

  app.addTodo(todoText);
});

todoEditForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const todoText = keepOnlyPlainTodoText(todoEditInput.value.trim());
  // todoId string bo'lgani uchun + qoyib number tipiga o'tkazdim
  const todoId = +todoEditInput.dataset.todoId;
  todoInput.value = "";
  event.preventDefault();
  // validation
  if (!todoText) {
    alert("Tog'ri qiymat kiriting!!!");
    return;
  }

  app.updateTodo(todoText, todoId);
});

// ====================================================
// =============        Funksiyalar        ============
// ====================================================

const handleDeleteTodo = (id) => {
  app.deleteTodo(id);
};

const handleEditTodo = (id) => {
  const todo = app.state.find((elem) => elem.id === id);
  ui.showEditModal(todo.text, id);
};
