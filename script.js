const todosWrapper = document.querySelector(".todos__wrapper");
const todoForm = document.querySelector(".todo__add__form form");
const todoInput = document.querySelector(".todo__add__form form .todo__input");

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

const deleteTodo = (id) => {
  // splice - dastlabki array o'zgartiradi
  const idx = state.findIndex((todo) => todo.id === id);
  state.splice(idx, 1);
  //   Draw UI
  drawUIByState();
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

// ====================================================
// =============   Utility  Funksiyalar        ============
// ====================================================

const makeID = (state) => {
  if (!state.length) return 1;

  return state[state.length - 1].id + 1;
};

const makeOneTodoHtmlContent = (todo, todoNumber) => {
  const todoContent = `<div class="one__todo__wrapper">
    <div class="one__todo__content">
      <h3>${todoNumber}. ${todo.text}</h3>
    </div>
    <div class="one__todo__actions">
      <button class="button__edit">Edit</button>
      <button class="button__delete" onclick="deleteTodo(${todo.id})">Delete</button>
    </div>
  </div>`;

  return todoContent;
};
