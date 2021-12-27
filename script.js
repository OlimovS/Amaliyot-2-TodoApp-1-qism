const todosWrapper = document.querySelector(".todos__wrapper");
const todoForm = document.querySelector(".todo__add__form form");
const todoInput = document.querySelector(".todo__add__form form .todo__input");
// Edit Modal
const editModal = document.querySelector(".edit__modal");
const todoEditForm = document.querySelector(".edit__modal form");
const todoEditInput = document.querySelector(
  ".edit__modal form .edit__todo__input"
);

const state = [];
/*
[
  {
      text: "TODO TEXT",
      completed: false,
      id: unique_number
  }
]
*/

// ====================================================
// =============            EVENTS         ============
// ====================================================
todoForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const todoText = todoInput.value.trim();
  todoInput.value = "";
  event.preventDefault();
  // validation
  if (!todoText) {
    alert("Tog'ri qiymat kiriting!!!");
    return;
  }

  addTodoToState(todoText);
});

todoEditForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const todoText = todoEditInput.value.trim();
  // todoId string bo'lgani uchun + qoyib number tipiga o'tkazdim
  const todoId = +todoEditInput.dataset.todoId;
  todoInput.value = "";
  event.preventDefault();
  // validation
  if (!todoText) {
    alert("Tog'ri qiymat kiriting!!!");
    return;
  }

  updateEditedTodo(todoText, todoId);
});

// ====================================================
// =============        Funksiyalar        ============
// ====================================================
const addTodoToState = (todoText) => {
  // statega qo'shadi
  const newTodo = {
    text: todoText,
    completed: false,
    id: makeID(state),
  };

  state.push(newTodo);
  //   Draw UI
  drawUIByState();
};
const updateEditedTodo = (todoText, todoId) => {
  const todoIndex = state.findIndex((elem) => elem.id === todoId);
  state[todoIndex].text = todoText;
  //   Draw UI
  drawUIByState();
  hideEditModal();
};

const deleteTodo = (id) => {
  // splice - dastlabki array o'zgartiradi
  const idx = state.findIndex((todo) => todo.id === id);
  state.splice(idx, 1);
  //   Draw UI
  drawUIByState();
};

const editTodo = (id) => {
  const todo = state.find((elem) => elem.id === id);
  showEditModal(todo.text, id);
};

const drawUIByState = () => {
  let todosHTML = "";
  state.forEach((todo, index) => {
    let oneTodoHTML = makeOneTodoHtmlContent(todo, index + 1);
    todosHTML += oneTodoHTML;
  });

  //   innerHTML hafli narsa
  todosWrapper.innerHTML = todosHTML;
};

const showEditModal = (todoText, todoId) => {
  const safeTodoText = keepOnlyPlainTodoText(todoText);
  editModal.style.display = "flex";
  todoEditInput.value = safeTodoText;
  todoEditInput.dataset.todoId = todoId;
};

const hideEditModal = () => {
  editModal.style.display = "none";
  todoEditInput.value = "";
  delete todoEditInput.dataset.todoId;
};

// ====================================================
// =============   Utility  Funksiyalar        ============
// ====================================================

const makeID = (state) => {
  if (!state.length) return 1;

  return state[state.length - 1].id + 1;
};

const keepOnlyPlainTodoText = (inputTodoText) => {
  const safeInputTodoText = filterXSS(inputTodoText, {
    whiteList: [], // empty, means filter out all tags
    stripIgnoreTag: true, // filter out all HTML not in the whilelist
    stripIgnoreTagBody: ["script"], // the script tag is a special case, we need
    // to filter out its content
  });

  return safeInputTodoText;
};

const makeOneTodoHtmlContent = (todo, todoNumber) => {
  const safeTodoText = keepOnlyPlainTodoText(todo.text);

  const todoContent = `<div class="one__todo__wrapper">
    <div class="one__todo__content">
      <h3>${todoNumber}. ${safeTodoText}</h3>
    </div>
    <div class="one__todo__actions">
      <button class="button__edit" onclick="editTodo(${todo.id})">Edit</button>
      <button class="button__delete" onclick="deleteTodo(${todo.id})">Delete</button>
    </div>
  </div>`;

  return todoContent;
};
