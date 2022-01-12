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

  const todoId = todo.id;

  const todoStatusValues = makeTodoStatusValues(todo.completed);

  const todoContent = `<div class="one__todo__wrapper">
      <div class="one__todo__content">
        <h3>${todoNumber}. ${safeTodoText}</h3>
      </div>
      <div class="one__todo__actions">
        <span class="${todoStatusValues.wrapperClass}" onclick="handleCompleteTodo(${todoId})">${todoStatusValues.iconHtml}</span>
        <button class="button__edit" onclick="handleEditTodo(${todoId})">Edit</button>
        <button class="button__delete" onclick="handleDeleteTodo(${todoId})">Delete</button>
      </div>
    </div>`;

  return todoContent;
};

const makeTodoStatusValues = (isCompleted) => {
  let infos;
  if (isCompleted) {
    infos = {
      wrapperClass: "completed__icon__wrapper",
      iconHtml: '<i class="far fa-check-circle"></i>',
    };
  } else {
    infos = {
      wrapperClass: "uncompleted__icon__wrapper",
      iconHtml: '<i class="far fa-circle"></i>',
    };
  }

  return infos;
};
